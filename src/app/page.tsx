import RocketSvg from "@/components/svg/RocketSvg";
import { SignUpForm } from "@/features/auth/components/SignUpForm";

export default function Home() {
  return (
    <main className="h-full bg-gradient-to-bl from-blue-400 to-cyan-400">
      <span className="fixed bottom-1/3 md:bottom-0 -right-[200px] md:-right-[350px] xl:-right-[540px]">
        <RocketSvg className="w-[400px] h-[400px] md:w-[700px] md:h-[700px] xl:w-[1200px] xl:h-[1080px]" />
      </span>
      <div className="max-w-screen-xl px-8 mx-auto relative h-full grid lg:grid-cols-2">
        <div className=" h-full flex flex-col justify-center">
          <h1 className="text-center lg:text-left text-3xl sm:text-5xl xl:text-7xl font-bold text-cyan-900">
            Unlock the Power <br /> of Project Management
            <br />
          </h1>
          <h2 className="mt-4 text-center lg:text-left text-3xl sm:text-5xl xl:text-7xl font-bold text-white">
            <span className="text-xl lg:text-4xl font-semibold text-cyan-700">
              with{" "}
            </span>
            PM Tool
          </h2>
        </div>
        <div className="grid place-items-center">
          <div className="py-6 px-12 bg-white rounded-md shadow-blue-100 shadow-2xl">
            <SignUpForm />
          </div>
        </div>
      </div>
    </main>
  );
}
