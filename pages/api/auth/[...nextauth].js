import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    GoogleProvider({

      // clientId: process.env.GOOGLE_CLIENT_ID,
      // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientId: "415414660701-8hs7mbjbmcmdu3v267sbcscnq02qu4a7.apps.googleusercontent.com",
      clientSecret: "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",
    })
    // ...add more providers here
  ],
  session: { jwt: true },
  callbacks: {
    async jwt({ token, user,account, profile }) {
      // console.log(user)
      // console.log(profile)
      // Persist the OAuth access_token and or the user id to the token right after signin
      if(user){
        //console.log(user)
        token.id = user.id
      }
      if(account) {

      }
      if(profile) {

      }
      return token
    },
    async session({ session, token}) {
      //console.log(token)

      if (token) {
        session.accessToken = token.accessToken
        session.user.id = token.sub
      }
      return session
    }
  }
}

export default NextAuth(authOptions)