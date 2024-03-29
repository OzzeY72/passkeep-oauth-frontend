import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from "next";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    userId?: string,
    username?: string;
  }
}

const sessionOptions = {
  password: "ncGv62NEPTKyc0aU2eNfjlYtiYWcoVqb",
  cookieName: "session_cookie",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 100
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr<P extends { [key: string]: unknown } = { [key: string]: unknown } >(
  handler: ({req, res}: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(handler, sessionOptions);
}