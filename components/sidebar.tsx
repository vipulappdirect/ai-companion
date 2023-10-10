"use client";

import {
  Store,
  Plus,
  Settings,
  Wrench,
  MessageSquare,
  Atom,
  UserPlus,
} from "lucide-react";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { useProModal } from "@/hooks/use-pro-modal";

interface SidebarProps {
  isPro: boolean;
}

interface Route {
  icon: any;
  href: string;
  pathname?: string;
  searchparams?: Record<string, string>;
  label: string;
  pro: boolean;
}

const isActive = (
  route: Route,
  pathname: string,
  searchparams: ReadonlyURLSearchParams
) => {
  const pathActive = route.pathname
    ? pathname === route.pathname
    : pathname === route.href;
  if (route.searchparams) {
    const params = Object.fromEntries(searchparams.entries());
    const requiredParams = Object.entries(route.searchparams);
    if (requiredParams.length === 0) {
      return pathActive;
    }
    const searchActive = requiredParams.every(([key, value]) =>
      value === null ? !params[key] : params[key] === value
    );
    return pathActive && searchActive;
  }
  return pathActive;
};

export const Sidebar = ({ isPro }: SidebarProps) => {
  const proModal = useProModal();
  const router = useRouter();
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const lastChatUrl = "";
  // const lastChatUrl = localStorage.getItem("lastChatUrl") || "";

  const onNavigate = (url: string, pro: boolean) => {
    if (pro && !isPro) {
      return proModal.onOpen();
    }

    return router.push(url);
  };

  const routes = [
    {
      icon: Store,
      href: "/",
      pathname: "/",
      searchparams: { scope: null },
      label: "Browse",
      pro: false,
    },
    {
      icon: Plus,
      href: "/companion/new",
      label: "Create",
      pro: false,
    },
    {
      icon: Atom,
      href: "/?scope=PRIVATE",
      pathname: "/",
      searchparams: { scope: "PRIVATE" },
      label: "Your AIs",
      pro: false,
    },
    {
      icon: UserPlus,
      href: "/?scope=GROUP",
      pathname: "/",
      searchparams: { scope: "GROUP" },
      label: "Shared",
      pro: false,
    },
    {
      icon: Wrench,
      href: "/dashboard",
      label: "Tools",
      pro: true,
    },
    {
      icon: Settings,
      href: "/settings",
      label: "Settings",
      pro: true,
    },
  ] as Route[];
  return (
    <div className="p-3 flex-1 flex justify-between flex-col h-full">
      <div className="space-y-2 flex flex-col items-center">
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
          }}
        />
        <div
          onClick={() => onNavigate(lastChatUrl, false)}
          className={cn(
            "text-muted-foreground text-xs group py-3 px-8 flex w-full justify-center font-medium  rounded-lg transition",
            pathname.startsWith("/chat/") && "bg-accent text-primary",
            lastChatUrl
              ? "cursor-pointer hover:text-primary hover:bg-primary/10"
              : "opacity-25"
          )}
        >
          <div className="flex flex-col items-center flex-1">
            <MessageSquare className="h-5 w-5 mb-1" />
            Chat
          </div>
        </div>
        {routes.map((route) => (
          <div
            onClick={() => onNavigate(route.href, route.pro)}
            key={route.href}
            className={cn(
              "text-muted-foreground text-xs group py-3 px-8 flex w-full justify-center font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
              isActive(route, pathname, searchparams) &&
                "bg-accent text-primary",
              route.pro && "hidden"
            )}
          >
            <div className="flex flex-col items-center flex-1">
              <route.icon className="h-5 w-5 mb-1" />
              <span className="w-12 text-center">{route.label}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-2 flex flex-col items-center py-3 px-8">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            baseTheme: dark,
          }}
        />
      </div>
    </div>
  );
};
