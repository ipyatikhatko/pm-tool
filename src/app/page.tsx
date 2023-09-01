import RocketSvg from "@/components/svg/RocketSvg";
import { SignUpForm } from "@/features/auth/components/SignUpForm";

export default function Home() {
  return (
    <main className="h-full bg-gradient-to-bl from-slate-600 to-white">
      <span className="fixed bottom-1/3 md:bottom-0 -right-[200px] md:-right-[350px] xl:-right-[540px]">
        <RocketSvg className="w-[400px] h-[400px] md:w-[700px] md:h-[700px] xl:w-[1200px] xl:h-[1080px]" />
      </span>
      <div className="max-w-screen-xl mx-auto relative h-full flex flex-col lg:flex-row justify-center items-center">
        <div className=" h-full flex flex-col justify-center px-8">
          <h1 className="text-center lg:text-left text-3xl sm:text-5xl xl:text-7xl font-bold text-slate-600">
            Unlock the Power <br /> of Project{" "}
            <span className="underline">Management</span>
            <br />
          </h1>
          <h2 className="mt-4 text-center lg:text-left text-3xl sm:text-5xl xl:text-7xl font-bold text-white">
            <span className="text-xl lg:text-4xl font-semibold text-slate-600">
              with{" "}
            </span>
            PM Tool
          </h2>
        </div>
        <div className="px-4 w-full md:w-2/3 lg:w-1/3 h-full flex justify-center items-center">
          <div className="p-6 w-full bg-white/80 backdrop-blur-sm rounded-md shadow-cyan-500 shadow-2xl">
            <SignUpForm />
          </div>
        </div>
      </div>
    </main>
  );
}
