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
  // callbacks: {
  //   async session({ session, user }) {
  //     // Send properties to the client, like an access_token and user id from a provider.
  //     //session.accessToken = token.accessToken
  //     //session.user.iddd = user.id
  //     console.log(user)
  //     return session
  //   },
  //   async jwt({ token, account, profile }) {
  //     // Persist the OAuth access_token and or the user id to the token right after signin
  //     console.log(token, account, profile)
  //     // if (account) {
  //     //   token.accessToken = account.access_token
  //     //   token.id = profile.id
  //     // }
  //     return token
  //   },
  //   async signIn({ user, account, profile, email, credentials }) {
  //     //console.log(user, account, profile, email, credentials)
  //     // const isAllowedToSignIn = true
  //     // if (isAllowedToSignIn) {
  //     //   return true
  //     // } else {
  //     //   // Return false to display a default error message
  //     //   return false
  //     //   // Or you can return a URL to redirect to:
  //     //   // return '/unauthorized'
  //     // }
  //     return true
  //   }
  // }
}

export default NextAuth(authOptions)