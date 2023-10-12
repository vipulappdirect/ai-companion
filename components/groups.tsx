"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import { cn } from "@/lib/utils";
import { Group } from "@prisma/client";

interface GroupsProps {
  data: Group[];
  orgId?: string | null;
}

export const Groups = ({ data, orgId }: GroupsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const groupId = searchParams.get("groupId");
  const scope = searchParams.get("scope");

  const onClick = (id: string | undefined) => {
    let query;
    if (id === "PUBLIC") {
      query = { scope: "PUBLIC", groupId: undefined };
    } else if (id === "PRIVATE") {
      query = { scope: "PRIVATE", groupId: undefined };
    } else {
      query = { scope: undefined, groupId: id };
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  const createGroup = () => {
    router.push("/group/new");
  };

  return (
    <div className="w-full overflow-x-auto space-x-2 flex p-1">
      <button
        onClick={() => onClick("PUBLIC")}
        className={cn(
          `
          flex
          items-center
          text-center
          text-xs
          md:text-sm
          px-2
          md:px-4
          py-2
          md:py-3
          rounded-md
          bg-primary/10
          hover:opacity-75
          transition
        `,
          scope == "PUBLIC" ? "bg-accent" : "bg-primary/10"
        )}
        key="PUBLIC"
      >
        Public
      </button>
      <button
        onClick={() => onClick("PRIVATE")}
        className={cn(
          `
          flex
          items-center
          text-center
          text-xs
          md:text-sm
          px-2
          md:px-4
          py-2
          md:py-3
          rounded-md
          bg-primary/10
          hover:opacity-75
          transition
        `,
          scope === "PRIVATE" ? "bg-accent" : "bg-primary/10"
        )}
        key="PRIVATE"
      >
        Private
      </button>
      {data.map((item) => (
        <button
          onClick={() => onClick(item.id)}
          className={cn(
            `
            flex
            items-center
            text-center
            text-xs
            md:text-sm
            px-2
            md:px-4
            py-2
            md:py-3
            rounded-md
            bg-primary/10
            hover:opacity-75
            transition
          `,
            item.id === groupId ? "bg-accent" : "bg-primary/10"
          )}
          key={item.id}
        >
          {item.name}
        </button>
      ))}
      {orgId && (
        <button
          onClick={() => createGroup()}
          className={cn(
            `
          flex
          items-center
          text-center
          text-xs
          md:text-sm
          px-2
          md:px-4
          py-2
          md:py-3
          rounded-md
          bg-primary/10
          hover:opacity-75
          transition
        `,
            "bg-primary/10"
          )}
          key="PRIVATE"
        >
          +
        </button>
      )}
    </div>
  );
};