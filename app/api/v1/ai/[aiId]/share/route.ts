import aiService from "@/src/domain/services/AIService";
import { ShareAIRequest } from "@/src/domain/types/ShareAIRequest";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { aiId: string } }
): Promise<NextResponse> {
  try {
    const authentication = await auth();
    const userId = authentication?.userId;
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const aiId = params.aiId;
    const shareAiRequest: ShareAIRequest = await req.json();

    const ai = await aiService.findAIById(aiId);
    if (!ai) {
      return NextResponse.json("Not Found", { status: 404 });
    }

    if (ai.userId !== userId) {
      return NextResponse.json("Forbidden", { status: 403 });
    }

    await aiService.shareAi(authentication.orgId, userId, aiId, shareAiRequest);

    return NextResponse.json("", { status: 200 });
  } catch (error) {
    console.log("Error on [PUT /v1/me/ai]", error);
    return NextResponse.json("Internal Error", { status: 500 });
  }
}