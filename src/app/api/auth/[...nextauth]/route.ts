import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_ID || '',
        clientSecret: process.env.GITHUB_SECRET || '',
        profile(profile){
          return {
            id: profile.id,
            email: profile.email,
            name: profile.name || profile.login,
            image: profile.avatar_url,
          }
        }
      }),
    ],
  callbacks: {
    async jwt({ token, account }) {
      // if (account?.provider === "github") {
      //   token.accessToken = account.access_token as string;
      // }
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.provider = token.provider as string;
      return session;
    },
  },
})

export {handler as GET, handler as POST}