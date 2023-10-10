import { Categories } from "@/components/categories";
import { Companions } from "@/components/companions";
import { Groups } from "@/components/groups";
import { SearchInput } from "@/components/search-input";
import { AIService } from "@/domain/services/AIService";
import { GroupService } from "@/domain/services/GroupService";
import {
  ListAIsRequestParams,
  ListAIsRequestScope,
} from "@/domain/services/dtos/ListAIsRequestParams";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

interface RootPageProps {
  searchParams: {
    scope: string;
    groupId: string;
    categoryId: string;
    search: string;
  };
}

const RootPage = async ({ searchParams }: RootPageProps) => {
  const authorization = await auth();

  const scopeParam = searchParams.scope;
  let scope: ListAIsRequestScope | undefined;
  if (
    !scopeParam ||
    !Object.values(ListAIsRequestScope).includes(
      scopeParam as ListAIsRequestScope
    )
  ) {
    scope = undefined;
  } else {
    scope = ListAIsRequestScope[scopeParam as keyof typeof ListAIsRequestScope];
  }

  const requestParams: ListAIsRequestParams = {
    scope: scope,
    groupId: searchParams.groupId,
    categoryId: searchParams.categoryId,
    search: searchParams.search,
  };

  const aiService = new AIService();
  const data = await aiService.findAIsForUser(authorization, requestParams);

  const groupService = new GroupService();
  const groups = await groupService.findGroupsByUser(authorization);

  const categories = await prismadb.category.findMany();

  return (
    <div className="h-full px-4 space-y-2">
      <Groups data={groups} orgId={authorization?.orgId} />
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  );
};

export default RootPage;
