import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string | null;
      image?: string | null;
      isCommunityMember: boolean;
    };
  }

  interface User {
    id: string;
    username?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string | null;
    isCommunityMember: boolean;
  }
}
