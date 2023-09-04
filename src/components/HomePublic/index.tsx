import React from "react";
import RocketSvg from "@/components/svg/RocketSvg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from "@/features/auth/components/SignInForm";
import { SignUpForm } from "@/features/auth/components/SignUpForm";

type Props = {};

const HomePublic = (props: Props) => {
  return (
    <>
      <span className="fixed bottom-1/3 md:bottom-0 -right-[200px] md:-right-[350px] xl:-right-[540px]">
        <RocketSvg className="w-[400px] h-[400px] md:w-[700px] md:h-[700px] xl:w-[1200px] xl:h-[1080px]" />
      </span>
      <div className="max-w-screen-xl mx-auto min-h-screen relative flex flex-col lg:flex-row justify-around items-center">
        <div className=" h-full flex flex-col justify-center px-8 drop-shadow-xl">
          <h2 className="text-5xl sm:text-5xl xl:text-7xl font-bold text-cyan-100">
            PMTool
          </h2>
          <h1 className="text-3xl sm:text-5xl xl:text-7xl font-bold text-cyan-800">
            Unlock <span className="underline text-cyan-100">the Power</span>
            <br />
            <span className="no-underline font-light text-2xl">
              of Project Management
            </span>
            <br />
          </h1>
        </div>
        <div className="px-4 w-full md:w-2/3 lg:w-1/3 h-full grid place-items-center">
          <Tabs defaultValue="signUp" className="w-[300px]">
            <TabsList>
              <TabsTrigger value="signUp">Sign Up</TabsTrigger>
              <TabsTrigger value="signIn">Sign In</TabsTrigger>
            </TabsList>
            <div className="p-4 bg-white/80 mt-2 rounded-lg shadow-2xl shadow-cyan-500">
              <TabsContent value="signUp">
                <SignUpForm />
              </TabsContent>
              <TabsContent value="signIn">
                <SignInForm />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default HomePublic;
