import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken?: string; // Add accessToken to Session
        provider?: string;
    }
    interface JWT {
        accessToken?: string; // Add accessToken to JWT
    }
}
