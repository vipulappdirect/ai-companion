"use client";

import { useUser } from "@clerk/nextjs";
import { AI, Chat, Message } from "@prisma/client";
import axios from "axios";
import {
  CopyPlus,
  Edit,
  ExternalLink,
  MessagesSquare,
  MoreVertical,
  Pin,
  PinOff,
  RefreshCw,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { BotAvatar } from "@/components/bot-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useChats } from "@/hooks/use-conversations";
import { useState } from "react";
import { ShareModal } from "./share-modal";

interface ChatHeaderProps {
  chat: Chat & {
    messages: Message[];
    ai: AI;
    _count: {
      messages: number;
    };
  };
}

export const ChatHeader = ({ chat }: ChatHeaderProps) => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const { chats: chats, fetchChats: fetchConversations } = useChats();
  const [showShareModal, setShowShareModal] = useState(false);

  const duplicate = async () => {
    const response = await axios.put(
      `/api/v1/conversations/${chat.id}/duplicate`
    );
    if (response.status === 200) {
      toast({ description: "Conversation duplicated." });
      router.push(`/chat/${response.data.id}`);
    }
  };

  const reset = async () => {
    const response = await axios.put(`/api/v1/conversations/${chat.id}/reset`);
    if (response.status === 200) {
      toast({ description: "Conversation reset." });
      router.push(`/chat/${response.data.id}`);
    }
  };

  const pin = async () => {
    const pinned = chats.filter((chat) => chat.pinPosition);
    if (pinned.length >= 9) {
      toast({
        variant: "destructive",
        description:
          "You can only pin up to 9 chats. To pin this chat, unpin another one first.",
      });
      return;
    }
    const response = await axios.put(`/api/v1/conversations/${chat.id}/pin`);
    if (response.status === 200) {
      toast({ description: "Conversation pinned." });
      fetchConversations();
    }
  };

  const unpin = async () => {
    const response = await axios.put(`/api/v1/conversations/${chat.id}/unpin`);
    if (response.status === 200) {
      toast({ description: "Conversation unpinned." });
      fetchConversations();
    }
  };

  const remove = async () => {
    const response = await axios.delete(`/api/v1/conversations/${chat.id}`);
    if (response.status === 200) {
      toast({ description: "Conversation deleted." });
      router.push(`/chat/`);
    }
  };

  return (
    <div className="flex w-full justify-between items-center p-4 bg-accent/30">
      <div className="flex gap-x-2 items-center">
        <BotAvatar src={chat.ai.src} />
        <div className="flex flex-col gap-y-1">
          <p className="font-bold">{chat.ai.name}</p>
          <div className="flex items-center gap-x-2">
            <p className="text-xs text-muted-foreground">
              Created by {chat.ai.userName}
            </p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MessagesSquare className="w-3 h-3 mr-1" />
              {chat._count.messages}
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        {(user?.id === chat.ai.userId || chat.ai.visibility === "PUBLIC") && (
          <Button
            variant="ghost"
            size="icon"
            className="mr-4"
            type="button"
            onClick={() => setShowShareModal(true)}
          >
            <ExternalLink />
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {chat.pinPosition ? (
              <DropdownMenuItem onClick={() => unpin()}>
                <PinOff className="w-4 h-4 mr-2" />
                Unpin
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => pin()}>
                <Pin className="w-4 h-4 mr-2" />
                Pin
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => reset()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => duplicate()}>
              <CopyPlus className="w-4 h-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => remove()}>
              <Trash className="w-4 h-4 mr-2" />
              Remove
            </DropdownMenuItem>
            {user?.id === chat.ai.userId && (
              <DropdownMenuItem
                onClick={() => router.push(`/ai/${chat.ai.id}/edit`)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit AI
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ShareModal
        showModal={showShareModal}
        setShowModal={setShowShareModal}
        ai={chat.ai}
      />
    </div>
  );
};
