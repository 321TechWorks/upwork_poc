import "@pp/styles/globals.css";

import Image from "next/image";
import { Fira_Sans } from "next/font/google";

import { TRPCReactProvider } from "@pp/trpc/react";
import { getServerAuthSession } from "@pp/server/auth";

import headerIcon from "../../public/images/headerIcon.svg";
import logoWhite from "../../public/images/logoWhite.svg";

import { UserAvatar } from "./(licensing)/_components/Avatar";
import * as Scrollable from "./(licensing)/_components/Scrollable";

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
      <body className={`bg-gray-50 font-sans ${fira.variable}`}>
        <TRPCReactProvider>
          <header className="flex h-24 w-full items-center justify-between bg-white px-28">
            <div></div>
            <div className="text-red-primary flex h-[56px] w-[205px] flex-col items-center">
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
          <Scrollable.Container className="h-[calc(100vh-12rem)]">
            <Scrollable.Content>{children}</Scrollable.Content>
          </Scrollable.Container>
          <footer className="absolute bottom-0 z-50 flex h-[88px] w-full items-center justify-between bg-[#545454] px-28 text-white">
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
