"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ShareAIRequest } from "@/src/domain/types/ShareAIRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { AIVisibility, Companion } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const groupFormSchema = z.object({
  visibility: z.enum([
    AIVisibility.PRIVATE,
    AIVisibility.GROUP,
    AIVisibility.PUBLIC,
  ]),
  teammates: z.string(),
});

interface ShareAIFormProps {
  ai: Companion;
}

export const ShareAIForm = ({ ai }: ShareAIFormProps) => {
  const router = useRouter();

  const currentTeammates: string[] = [];

  const form = useForm<z.infer<typeof groupFormSchema>>({
    resolver: zodResolver(groupFormSchema),
    defaultValues: {
      visibility: ai.visibility,
      teammates: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof groupFormSchema>) => {
    const request: ShareAIRequest = {
      emails: values.teammates,
    };

    await axios.put(`/api/v1/ai/${ai.id}/share`, request);

    router.refresh();
    router.push("/");
  };

  const handleRemoveTeammate = (email: string) => {
    // setCurrentTeammates((prevTeammates) =>
    //   prevTeammates.filter((t) => t !== email)
    // );
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <h3 className="text-lg font-medium">Share AI - {ai.name}</h3>

          <>
            <FormField
              name="teammates"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add teammates</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex: jennifer.wallace@acme.com, joe.hamm@acme.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h4 className="mt-4">
              Shared with {currentTeammates.length} people
            </h4>
            <ul className="list-disc pl-5 mt-2">
              {currentTeammates.map((teammate) => (
                <li
                  key={teammate}
                  className="flex justify-between items-center mb-2"
                >
                  {teammate}
                  <button
                    onClick={() => handleRemoveTeammate(teammate)}
                    className="text-red-600 px-2 py-1"
                  >
                    &#x2716;
                  </button>
                </li>
              ))}
            </ul>
          </>

          <div className="w-full flex justify-center">
            <Button size="lg">Share</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
