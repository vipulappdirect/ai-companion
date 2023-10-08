import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { CreateGroupRequest } from '../../../../../domain/apiInterfaces/CreateGroupRequest';
import { GroupService } from '../../../../../domain/services/GroupService';

export async function GET(req: Request) {
  try {
    const authentication = await auth();
    if (!authentication?.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let groups: any[];
    if (!authentication?.orgId) {
      groups = [];
    } else {
      const groupService = new GroupService();
      groups = await groupService.findGroupsByUserAndOrgId(authentication.userId, authentication.orgId);
    }

    return NextResponse.json(groups);
  } catch (error) {
    console.log("Error in [GET v1/me/groups]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export async function POST(req: Request) {
  try {
    const authentication = await auth();
    if (!authentication?.userId || !authentication?.orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const createGroupRequest: CreateGroupRequest = await req.json();

    const groupService = new GroupService();
    const group = groupService.createGroup(authentication.orgId, authentication.userId, createGroupRequest)

    return NextResponse.json(group);
  } catch (error) {
    console.log("[POST v1/me/groups]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
