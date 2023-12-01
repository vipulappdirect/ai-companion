import { DavinciModel } from "@/src/adapter/ai-model/chat-models/DavinciModel";
import { Gpt35Model } from "@/src/adapter/ai-model/chat-models/Gpt35Model";
import { Gpt4Model } from "@/src/adapter/ai-model/chat-models/Gpt4Model";
import { LLamaModel } from "@/src/adapter/ai-model/chat-models/LLamaModel";
import { StaticAIModelRepository } from "@/src/adapter/repositories/StaticAIModelRepository";
import { AIModel } from "../models/AIModel";
import { AIModelRepository } from "../ports/AIModelRepository";

const CHAT_MODELS = [
  new Gpt4Model(),
  new Gpt35Model(),
  new DavinciModel(),
  new LLamaModel(),
];

export class AIModelService {
  constructor(private aiModelRepository: AIModelRepository) {}

  public async getAIModels(): Promise<AIModel[]> {
    return this.aiModelRepository.findAll();
  }

  public async findAIModelById(id: string): Promise<AIModel | null> {
    return await this.aiModelRepository.findById(id);
  }

  public getChatModelInstance(modelId: string) {
    const supportedModels = CHAT_MODELS.filter((chatModel) =>
      chatModel.supports(modelId)
    );
    if (supportedModels.length > 0) {
      return supportedModels[0];
    }
    return null;
  }
}

const aiModelRepository = new StaticAIModelRepository();
const aiModelService = new AIModelService(aiModelRepository);
export default aiModelService;
