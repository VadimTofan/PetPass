import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        try {
          const base = process.env.NEXT_PUBLIC_DB_ACCESS; 
          const url = `${base}/api/users/${encodeURIComponent(user.email)}`;
          const res = await fetch(url, { headers: { "Content-Type": "application/json" } });

          if (res.ok) {
            const data = await res.json();
            token.role = data?.admin ? "admin" : "owner";
          } else {
            // If 404 error or other
            token.role = "owner";
          }
        } catch {
          token.role = "owner";
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role || "owner";
      return session;
    },
  },
});

export { handler as GET, handler as POST };
