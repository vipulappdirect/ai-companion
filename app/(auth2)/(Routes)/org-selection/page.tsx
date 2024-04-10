"use client";
import BlobAnimation from "@/components/blob-animation";
import LandingNav from "@/components/landing-nav";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const OrgSelect = () => {
  const clerk = useClerk();
  const [loading, setLoading] = useState(false);
  const [invitations, setInvitations] = useState<any[]>([]);

  useEffect(() => {
    const fetchInvitations = async () => {
      if (clerk.user) {
        const result = await clerk.user.getOrganizationInvitations();
        setInvitations(result.data);
        console.log(result.data);
      }
    };
    fetchInvitations();
  }, [clerk.user]);
  return (
    <div className="bg-white flex flex-col text-navy h-screen">
      <LandingNav transparent />

      <div className="h-full w-full flex items-center justify-center">
        <div className="absolute z-10 flex flex-col items-center ">
          <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="bg-gradient4 z-10 rounded-lg flex flex-col items-center p-8 md:p-16 mx-2 mt-16">
              <h1 className="text-3xl mb-12 font-bold">Company</h1>
              <div>
                {invitations.map((invitation: any) => (
                  <div key={invitation.id}>
                    <div className="flex flex-row pl-4 pt-4 mb-1">
                      <Image
                        alt={invitation.publicOrganizationData.name}
                        src={invitation.publicOrganizationData.imageUrl}
                        width="44"
                        height="44"
                        className="rounded-lg"
                      />
                      <div className="pl-4">
                        <div className="truncate max-w-64">
                          {invitation.publicOrganizationData.name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex text-white text-sm justify-stretch w-full items-center">
                <div className="border-b border-white grow h-1"></div>
                <div className="grow-0 mx-2">or</div>
                <div className="border-b border-white grow h-1"></div>
              </div>
              <div className="flex flex-col gap-8 mt-8 w-full md:w-80">
                <input
                  type="text"
                  placeholder="Company Name"
                  className="rounded-md w-full h-12 px-4 bg-white"
                  onChange={(e) => {}}
                  id="company"
                  name="company"
                />

                <Button
                  className="bg-white rounded-md px-16 py-2 text-center text-navy"
                  onClick={() => {}}
                >
                  Create New Company
                  {loading ? <Loader className="w-4 h-4 ml-2 spinner" /> : null}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <BlobAnimation />
      </div>
    </div>
  );
};

export default OrgSelect;
