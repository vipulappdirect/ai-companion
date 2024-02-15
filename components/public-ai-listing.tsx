import { AIs } from "@/components/ais";
import { Categories } from "@/components/categories";
import { Groups } from "@/components/groups";
import { SearchInput } from "@/components/search-input";
import aiService from "@/src/domain/services/AIService";

import {
  ListAIsRequestParams,
  ListAIsRequestScope,
} from "@/src/adapter-in/api/AIApi";
import categoryService from "@/src/domain/services/CategoryService";
import { AuthorizationContextType } from "@/src/security/models/AuthorizationContext";

interface Props {
  searchParams: {
    scope: string;
    groupId: string;
    categoryId: string;
    approvedByOrg: string;
    search: string;
    sort: string;
  };
  scopeParam?: string;
}

export const PublicAiListing = async ({ searchParams, scopeParam }: Props) => {
  let scope: ListAIsRequestScope | undefined;
  if (!scopeParam) {
    scope = undefined;
  } else {
    const scopeKey = scopeParam.toUpperCase().replace(/-/g, "_");
    if (
      !Object.values(ListAIsRequestScope).includes(
        scopeKey as ListAIsRequestScope
      )
    ) {
      scope = undefined;
    } else {
      scope = ListAIsRequestScope[scopeKey as keyof typeof ListAIsRequestScope];
    }
  }

  let approvedByOrg;
  if (searchParams.approvedByOrg === "true") {
    approvedByOrg = true;
  } else if (searchParams.approvedByOrg === "false") {
    approvedByOrg = false;
  }

  const requestParams: ListAIsRequestParams = {
    scope: ListAIsRequestScope.PUBLIC,
    groupId: searchParams.groupId,
    categoryId: searchParams.categoryId,
    search: searchParams.search,
    approvedByOrg,
    sort: searchParams.sort,
  };

  const data = await aiService.findPublicAIs(requestParams);

  const categories = await categoryService.getCategories();

  const hasElevatedWriteAccess = false;
  const groups = [] as any[];
  const authorizationContext = {
    orgId: "",
    userId: "",
    type: AuthorizationContextType.USER,
    permissions: [],
  };

  return (
    <div className="h-full pr-4 pl-2 space-y-2 pt-2">
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row">
          <h1 className="text-4xl font-bold whitespace-nowrap pt-2 pr-2">
            Browse AIs
          </h1>
        </div>
      </div>
      <SearchInput />
      <Categories data={categories} />
      <Groups
        groups={groups}
        hasElevatedWriteAccess={hasElevatedWriteAccess}
        scopeParam={scopeParam}
      />
      <AIs
        data={data}
        authorizationContext={authorizationContext}
        groups={groups}
      />
    </div>
  );
};
