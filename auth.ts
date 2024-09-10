import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import GoogleProvider from "next-auth/providers/google";
 
export const { handlers,auth,signIn,signOut } = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
        clientId:process.env.AUTH_GOOGLE_ID,
        clientSecret:process.env.AUTH_GOOGLE_SECRET
    }),
  ],
});