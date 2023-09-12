import { Toaster } from "@/components/ui/toaster";
import "@/app/globals.css";
import HomePublic from "@/components/layout/public";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import clsx from "clsx";
import Provider from "../context/client-provider";
import PrivateLayout from "@/components/layout";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="relative">
        <Provider session={session}>
          <main className={clsx("h-screen relative bg-gray-300")}>
            {!session ? (
              <HomePublic />
            ) : (
              <PrivateLayout>{children}</PrivateLayout>
            )}
          </main>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
