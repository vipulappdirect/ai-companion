import {withErrorHandler} from "@/src/middleware/ErrorMiddleware";
import {withAuthorization} from "@/src/middleware/AuthorizationMiddleware";
import {SecuredResourceType} from "@/src/security/models/SecuredResourceType";
import {SecuredAction} from "@/src/security/models/SecuredAction";
import {SecuredResourceAccessLevel} from "@/src/security/models/SecuredResourceAccessLevel";
import clerkService from "@/src/domain/services/ClerkService";
import {UserMetaDataInterface} from "@/components/search-input";
import {NextResponse} from "next/server";

async function postHandler(request: Request)  {
    const { userId, sortValue } : UserMetaDataInterface = await request.json();
    await clerkService.updateUserMetadata(userId, sortValue);
    const user= await clerkService.getUserMetadata(userId);
    return NextResponse.json(user);
}

export const POST = withErrorHandler(
    withAuthorization(
        SecuredResourceType.ORG_USAGE,
        SecuredAction.WRITE,
        Object.values(SecuredResourceAccessLevel),
        postHandler));






