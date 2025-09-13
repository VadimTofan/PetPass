import NextAuth from "next-auth";

import Google from "next-auth/providers/google";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      const email = user?.email || token?.email;
      if (email && !token.role) {
        try {
          const base = process.env.NEXT_PUBLIC_DB_ACCESS;
          const url = `${base}/api/users/${encodeURIComponent(email)}`;
          const res = await fetch(url, { headers: { "Content-Type": "application/json" } });
          if (res.ok) {
            const data = await res.json();
            token.role = data?.admin ? "admin" : "owner";
          } else {
            token.role = "owner";
          }
        } catch {
          token.role = "owner";
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = session.user || {};
      session.user.role = token.role || "owner";
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
