import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/admin');
      const isOnSignPage = nextUrl.pathname.startsWith('/auth');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && isOnSignPage) {
        return Response.redirect(new URL('/admin', nextUrl));
      }
      
      return true;
    },
  },
  providers: [
  
  ], // Add providers with an empty array for now
} satisfies NextAuthConfig;