export interface DataSourceItemList {
  items: DataSourceItem[];
}

export interface DataSourceItem {
  name: string;
  uniqueId?: string;
  originalContent?: KnowledgeOriginalContent;
  metadata?: any;
}

export interface KnowledgeOriginalContent {
  contentBlobUrl: string;
  filename: string;
  mimeType: string;
}

export interface RetrieveContentAdapterResponse {
  status: RetrieveContentResponseStatus;
  originalContent?: KnowledgeOriginalContent;
  metadata?: any;
}

export enum RetrieveContentResponseStatus {
  PENDING,
  SUCCESS,
  FAILED,
}
