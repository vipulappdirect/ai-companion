import { cn } from "@/src/lib/utils";
import Link from "next/link";

interface Props {
  className?: string;
}

const LandingTerms = ({ className }: Props) => {
  return (
    <div className={cn("text-xs mt-14", className)}>
      By clicking “continue”, you agree to{" "}
      <Link href="/landing/terms" className="underline">
        terms of use
      </Link>{" "}
      and our{" "}
      <Link href="/landing/privacy" className="underline">
        privacy policy
      </Link>
      .
    </div>
  );
};

export default LandingTerms;
