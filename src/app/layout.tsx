import "@pp/styles/globals.css";

import Image from "next/image";
import { Fira_Sans } from "next/font/google";

import { TRPCReactProvider } from "@pp/trpc/react";
import { getServerAuthSession } from "@pp/server/auth";

import headerIcon from "../../public/images/headerIcon.svg";
import logoWhite from "../../public/images/logoWhite.svg";

import { UserAvatar } from "./_components/Avatar";

const fira = Fira_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

export const metadata = {
  title: "License Your Pet",
  description: "License Your Pet",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body className={`bg-lightGray font-sans ${fira.variable}`}>
        <TRPCReactProvider>
          <header className="fixed top-0 flex h-24 w-full items-center justify-between bg-white px-28">
            <div></div>
            <div className="text-red flex w-44 flex-col items-center">
              LICENSE YOUR PET
              <Image
                priority
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                src={headerIcon}
                alt="License Your Pet"
              />
            </div>
            <div>
              <UserAvatar />
            </div>
          </header>
          {children}
          <footer className="bg-gray fixed bottom-0 flex h-24 w-full items-center justify-between px-28 text-white">
            <div>Powered by</div>
            <div>
              <Image
                priority
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                src={logoWhite}
                alt="License Your Pet"
              />
            </div>
          </footer>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
