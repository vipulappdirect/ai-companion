import LandingFooter from "@/components/landing-footer";
import LandingNav from "@/components/landing-nav";
import Image from "next/image";

const LandingFeatures = () => {
  return (
    <div className="bg-white flex flex-col text-navy">
      <LandingNav />

      <div className="py-20 flex flex-col items-center bg-navy text-white">
        <div className="lg:w-[1140px] mx-4 flex justify-between">
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-bold">AI for the Enterprise</h2>
            <div className="lg:w-[300px] mt-10 text-lg">
              For companies looking to build AI-driven solutions that solve
              complex supply chain problems.
            </div>
          </div>
          <div className="lg:bg-gradient1 lg:w-[572px] lg:h-[544px] flex items-center">
            <Image
              src="/ship.png"
              alt="Container Ship"
              width="451"
              height="422"
              className="-ml-10"
            />
          </div>
        </div>
      </div>

      <div className="py-10 flex flex-col items-center">
        <div className="lg:w-[1140px] mx-4">
          <h2 className="text-5xl font-bold">Building AI for the real world</h2>
          <div className="lg:w-[700px] mt-10 text-lg">
            In partnership with IVADO Labs, our unique team of world-class
            researchers, data scientists, and strategists will help you realize
            the transformational potential of AI for your business.
          </div>
          <div className="lg:w-[700px] mt-10 text-lg">
            Founded in 2017, IVADO Labs is a leading AI solution provider with a
            mission to take advanced AI technologies out of the lab and apply
            them in the real world.
          </div>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
};

export default LandingFeatures;