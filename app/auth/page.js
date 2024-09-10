"use client"
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Auth() {
  const {data:session} = useSession();
  //console.log(session?.user);

  return (
    <main className="min-h-screen flex justify-center mt-[108px] lg:mt-[120px] lg:pt-0 px-3 md:px-0">
      <div className="h-full w-full md:w-[320px] flex flex-col gap-8 border border-gray-300 rounded-md p-3 md:p-5">
          <p className="text-gray-700">Whether you are a new or an existing user, sign in to continue to your account</p>
          <form
          action={async () => {
            await signIn("google")
          }}
          className="flex flex-col gap-3">
            <button
            type="submit"
            className="w-full h-[56px] flex justify-center items-center gap-6 border border-gray-400 rounded-md">
              <FcGoogle className="text-3xl"/>
              <span className="text-gray-700">Google</span> 
            </button>
          </form>
      </div>
    </main>
  )
}