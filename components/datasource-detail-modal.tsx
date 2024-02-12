"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Table } from "./table";

type Props = {
  dataSource: any;
  onClose: () => void;
};

export const DataSourceDetailModal = ({ dataSource, onClose }: Props) => {
  if (!dataSource) return null;

  return (
    <Dialog
      open={!!dataSource}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-[800px] overflow-auto">
        <DialogHeader className="space-y-4">
          <DialogTitle className="truncate max-w-[480px]">
            <div className="truncate max-w-[480px]">
              Details for {dataSource.name}
            </div>
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <Table
          headers={["Name", "Last Indexed", "Status", "Progress"]}
          className="w-full my-4 max-h-60"
        >
          {dataSource.knowledges.map(({ knowledge }: any) => (
            <>
              <tr key={knowledge.id} className="p-2">
                <td className="p-2">{knowledge.name}</td>
                <td className="p-2">
                  {dataSource.lastIndexedAt
                    ? format(
                        new Date(dataSource.lastIndexedAt),
                        "h:mma M/d/yyyy "
                      )
                    : "Never"}
                </td>
                <td className="p-2">{knowledge.indexStatus}</td>
                <td className="p-2">
                  {knowledge.metadata.percentComplete ? (
                    <div>{knowledge.metadata.percentComplete.toFixed(2)}%</div>
                  ) : (
                    "0%"
                  )}
                </td>
              </tr>
              {knowledge.metadata.errors && (
                <tr key={`error-${knowledge.id}`} className="p-2">
                  <td colSpan={4} className="p-2 text-destructive text-sm">
                    Error:&nbsp;
                    {(
                      Object.values(knowledge.metadata.errors) as string[]
                    ).find((x: string) => x !== undefined)}
                  </td>
                </tr>
              )}
            </>
          ))}
        </Table>
      </DialogContent>
    </Dialog>
  );
};
