import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export function marketAuthConfigured() {
  return Boolean(process.env.AUTH_SECRET && process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
}

export const { handlers, auth } = NextAuth({
  pages: { error: '/market-watch' },
  providers: [Google({ authorization: { params: { scope: 'openid email profile', prompt: 'select_account' } } })],
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    signIn({ account, profile }) {
      return account?.provider === 'google' && profile?.email_verified === true && typeof profile.sub === 'string';
    },
    jwt({ token, account, profile }) {
      if (account?.provider === 'google' && profile?.sub) token.sub = profile.sub;
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub;
      return session;
    },
  },
});
