import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const getSession = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Session is expired, or unathorized");
  }

  return session;
}

export default getSession