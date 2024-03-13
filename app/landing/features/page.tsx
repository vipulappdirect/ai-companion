import LandingCTA from "@/components/landing-cta";
import LandingFooter from "@/components/landing-footer";
import LandingNav from "@/components/landing-nav";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LandingFeatures = () => {
  return (
    <div className="bg-white flex flex-col text-navy">
      <LandingNav />

      <div className="py-10 mt-10 flex flex-col items-center bg-[#F8F8F8]">
        <div className="md:w-[1140px] ">
          <h2 className="text-5xl font-extrabold">How it works</h2>
          <div className="md:w-[700px] mt-10 text-lg">
            Transform your AI app ideas into reality without needing any coding
            skills. Unlock innovation and productivity for you, your team, and
            your customers.
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-20 mb-12">
        <div className="flex">
          <div className="md:w-[460px] gap-8 flex flex-col">
            <div>Create</div>
            <div className="text-3xl font-extrabold md:w-[300px]">
              Custom AI apps, created in minutes
            </div>
            <ul className="list-disc gap-4 flex flex-col ml-4">
              <li>
                <b>Advanced data ingestion options:</b> AppDirect AI provides
                more built-in choices than any other solution to define your
                app&nbsp;s data sources (files, drive folders, and websites) and
                schedule automated data updates.
              </li>
              <li>
                <b>App personality optimization:</b> Customize your AI app to
                speak with users in an appropriate language style for the task.
              </li>
              <li>
                <b>Secure environment:</b> Build your AI app on your proprietary
                data sets in a secure environment without worry.
              </li>
            </ul>
            <Link href="/sign-up" className="py-2 text-ring">
              Start building
              <ArrowRight className="inline-block w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="bg-cta-pattern p-20 md:w-[600px] ml-20">
            <Image
              src="/datasources_screenshot.jpg"
              alt="AI Data Source Screenshot"
              width="512"
              height="360"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-20 mb-12">
        <div className="flex">
          <div className="bg-cta-pattern p-20 md:w-[600px]">
            <Image
              src="/datasources_screenshot.jpg"
              alt="AI Data Source Screenshot"
              width="512"
              height="360"
            />
          </div>
          <div className="md:w-[460px] gap-8 flex flex-col ml-20">
            <div>Use</div>
            <div className="text-3xl font-extrabold md:w-[300px]">
              Boost productivity-for everyone
            </div>
            <ul className="list-disc gap-4 flex flex-col ml-4">
              <li>
                <b>Thought partner:</b> Use your AI to help you get to the right
                answer, faster. Ask for advice on blind spots, get help editing
                a proposal, or learn how to align your calendar to your
                priorities.
              </li>
              <li>
                <b>Quickly pull insights:</b> Summarize large documents or data
                sets, pull themes to help you build a business case, or quickly
                cut through the noise to find answers.
              </li>
              <li>
                <b>Gain new knowledge:</b> Upload data and pull inquiries
                relevant to your specific needs to help you learn new skills,
                gain new insights, or challenge your assumptions..
              </li>
            </ul>
            <Link href="/sign-up" className="py-2 text-ring">
              Start using
              <ArrowRight className="inline-block w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-20 mb-12">
        <div className="flex">
          <div className="md:w-[460px] gap-8 flex flex-col">
            <div>Share</div>
            <div className="text-3xl font-extrabold md:w-[300px]">
              Share apps with confidence
            </div>
            <ul className="list-disc gap-4 flex flex-col ml-4">
              <li>
                <b>Privacy first:</b> Sharing your AI bot securely is paramount.
                Whatever data you use to create your AI, rest assured that it
                will stay in the app and will never be used to train LLMs
                outside your organization.
              </li>
              <li>
                <b>AI-powered collaboration:</b> App sharing with colleagues
                gives teams a powerful tool to gain new insights, unlock
                innovation, and increase productivity.
              </li>
              <li>
                <b>Public sharing:</b> Sharing apps within your organization or
                publicly is easy and secure.
              </li>
            </ul>
            <Link href="/sign-up" className="py-2 text-ring">
              Start creating
              <ArrowRight className="inline-block w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="bg-cta-pattern p-20 md:w-[600px] ml-20">
            <Image
              src="/datasources_screenshot.jpg"
              alt="AI Data Source Screenshot"
              width="512"
              height="360"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-20 mb-12">
        <div className="flex">
          <div className="bg-cta-pattern p-20 md:w-[600px]">
            <Image
              src="/datasources_screenshot.jpg"
              alt="AI Data Source Screenshot"
              width="512"
              height="360"
            />
          </div>
          <div className="md:w-[460px] gap-8 flex flex-col ml-20">
            <div>Browse</div>
            <div className="text-3xl font-extrabold md:w-[360px]">
              Explore marketplace of built-for-purpose AIs
            </div>
            <ul className="list-disc gap-4 flex flex-col ml-4 mt-6">
              <li>
                <b>Out of the box AIs:</b> Explore the rich catalog of AIs ready
                to use immediately.
              </li>
              <li>
                <b>Search by category:</b> Everything from data analytics to
                legal support to marketing content. You can also search for apps
                based on keywords.
              </li>
            </ul>
            <Link href="/sign-up" className="py-2 mt-20 text-ring">
              Browse catalog
              <ArrowRight className="inline-block w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-20 mb-12 gap-8">
        <h2 className="text-3xl font-extrabold">Choose your LLM</h2>
        <div className="md:w-[820px] text-center">
          Choose the LLM provider most suitable for the task for each app you
          create. You can also create your own model with the help from our
          partner, Ivado Labs.
        </div>
        <div className="flex gap-20">
          <div className="bg-navylight px-8 py-4 shadow-lg flex items-center">
            <Image src="/meta.png" alt="Meta Logo" width="131" height="51" />
          </div>
          <div className="bg-navylight px-8 py-4 shadow-lg flex items-center">
            <Image
              src="/anthropic.png"
              alt="Anthropic Logo"
              width="177"
              height="21"
            />
          </div>
          <div className="bg-navylight px-8 py-4 shadow-lg flex items-center">
            <Image
              src="/openai.png"
              alt="OpenAI Logo"
              width="141"
              height="39"
            />
          </div>
          <div className="bg-navylight px-8 py-4 shadow-lg flex items-center">
            <Image
              src="/cohere.png"
              alt="Cohere Logo"
              width="162"
              height="28"
            />
          </div>
        </div>
      </div>

      <LandingCTA />

      <LandingFooter />
    </div>
  );
};

export default LandingFeatures;