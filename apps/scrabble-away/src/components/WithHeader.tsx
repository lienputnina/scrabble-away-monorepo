import type { FC, ReactNode } from "react";

import Link from "next/link";
import Image from "next/image";

import { Header, Title } from "@liene-putnina/react-components-for-you";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export interface WithHeaderProps {
  children: ReactNode;
  headerTitle?: string;
}

export const WithHeader: FC<WithHeaderProps> = ({
  children,
  headerTitle,
}: WithHeaderProps) => {
  const user = useUser();

  return (
    <>
      <Header
        customLogo={
          <Link href="/">
            <Image
              priority
              src="/images/logo-icon.png"
              height={40}
              width={40}
              alt="logo"
            />
          </Link>
        }
      >
        <Title style={{ fontSize: "35px", lineHeight: "35px", margin: "0" }}>
          {headerTitle}
        </Title>
        {!user.isSignedIn && (
          <div className="absolute right-6 flex rounded-lg border-2 border-rose-900 bg-rose-900 px-2 py-1 text-slate-50 hover:bg-rose-800 hover:text-slate-100">
            <SignInButton />
          </div>
        )}
        {!!user.isSignedIn && (
          <div className="absolute right-4">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10 ",
                },
              }}
            />
          </div>
        )}
      </Header>
      <main id="main">{children}</main>
    </>
  );
};
