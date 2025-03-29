import { z } from 'zod';
import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const admin = {
  password: 'password',
  email: 'admin@example.com'
};
export const loginSchema = z.object({
  email: z.string().email('Shold be valid Email'),
  password: z.string().nonempty({ message: 'Password is required' })
});

export const authConfig = {
  providers: [],
  pages: { signIn: '/login' },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const isOnLogin = request.nextUrl.pathname.startsWith('/login');
      const homePage = Response.redirect(new URL('/', request.nextUrl));

      if (!isLoggedIn) return false;
      if (isLoggedIn && isOnLogin) return homePage;

      return true;
    }
  }
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  pages: { signIn: '/login' },
  providers: [
    Credentials({
      async authorize(credentials) {
        const result = loginSchema.safeParse(credentials);

        if (!result.success) return null;
        const { email, password } = result.data;

        if (email !== admin.email && password !== admin.password) return null;

        return { email, password };
      }
    })
  ]
});
