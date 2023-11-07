import { Document } from "langchain/document";

import { BadRequestError } from "@/src/domain/errors/Errors";
import { MemoryManager } from "@/src/lib/memory";
import { getTokenLength } from "@/src/lib/tokenCount";
import { Knowledge } from "@prisma/client";
import { writeFile } from "fs/promises";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { DocxLoader } from "./DocxLoader";
import { EPubLoader } from "langchain/document_loaders/fs/epub";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
export class FileLoader {
  private async getFilepath(file: File) {
    if (!file) {
      throw new Error("Error reading file");
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = `/tmp/${file.name}`;
    await writeFile(path, buffer);
    return path;
  }

  public async loadFile(
    knowledgeId: string,
    filename: string,
    mimeType: string,
    filePathOrBlob: string | Blob
  ) {
    let docs;
    console.log(`Loading file ${filename} with mime type ${mimeType}`);

    try {
      if (mimeType === "text/csv") {
        const loader = new CSVLoader(filePathOrBlob);
        docs = await loader.load();
      } else if (mimeType === "text/plain" || mimeType === "text/markdown") {
        const loader = new TextLoader(filePathOrBlob);
        docs = await loader.load();
      } else if (
        mimeType === "application/epub+zip" &&
        filePathOrBlob instanceof File
      ) {
        const path = await this.getFilepath(filePathOrBlob);
        const loader = new EPubLoader(path);
        docs = await loader.load();
      } else if (mimeType === "application/epub+zip") {
        const loader = new EPubLoader(filePathOrBlob as string);
        docs = await loader.load();
      } else if (
        mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        console.log("Loading docx file");
        const loader = new DocxLoader(filePathOrBlob);
        console.log("Initialized DocxLoader");
        docs = await loader.load();
      } else if (mimeType === "application/pdf") {
        const loader = new PDFLoader(filePathOrBlob);
        docs = await loader.load();
      } else {
        throw new BadRequestError(`Unsupported file type ${mimeType}`);
      }
    } catch (e) {
      console.error(e);
      throw new Error(`Error loading file ${filename}`);
    }

    console.log(`Loaded ${docs.length} documents`);
    let totalTokenCount = 0;
    for (const doc of docs) {
      doc.metadata.source = filename;
      doc.metadata.knowledge = knowledgeId;
      const tokenCount = getTokenLength(doc.pageContent);
      totalTokenCount += tokenCount;
      doc.metadata.tokenCount = tokenCount;
    }

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 4000,
      chunkOverlap: 600,
    });

    const docOutput = await splitter.splitDocuments(docs);

    const memoryManager = await MemoryManager.getInstance();
    await memoryManager.vectorUpload(docOutput);

    return {
      documentCount: docOutput.length,
      totalTokenCount,
    };
  }

  public async loadJsonArray(jsonArray: any[], knowlegeId: string) {
    let totalTokenCount = 0;
    const docs: Document[] = jsonArray.map((json) => {
      const pageContent = JSON.stringify(json);
      const tokenCount = getTokenLength(pageContent);
      totalTokenCount += tokenCount;
      return new Document({
        pageContent,
        metadata: { knowledge: knowlegeId, tokenCount },
      });
    });

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 4000,
      chunkOverlap: 600,
    });

    const docOutput = await splitter.splitDocuments(docs);

    const memoryManager = await MemoryManager.getInstance();
    await memoryManager.vectorUpload(docOutput);

    return {
      documentCount: docOutput.length,
      totalTokenCount,
    };
  }

  public async pollKnowledgeIndexingStatus(
    knowledge: Knowledge
  ): Promise<void> {
    return;
  }

  public async deleteKnowledge(knowledgeId: string): Promise<void> {
    const memoryManager = await MemoryManager.getInstance();
    await memoryManager.vectorDelete(knowledgeId);
  }
}

const fileLoader = new FileLoader();
export default fileLoader;