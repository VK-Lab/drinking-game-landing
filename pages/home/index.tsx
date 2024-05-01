import { useState } from "react";
import "../globals.css";
import Link from "next/link";

import { MainCard } from "./main-card/main-card";

// pages/home.js
export function parseCookies(req: any) {
  const cookie = req.headers.cookie;
  return cookie
    .split(";")
    .map((v: string) => v.split("="))
    .reduce((acc: { [x: string]: string }, v: string[]) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
}

export async function getServerSideProps(context: { req: any; res: any }) {
  const { req, res } = context;
  const cookies = parseCookies(req);

  if (!cookies.userData) {
    // Redirect to login if userData cookie is not found
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const userData = JSON.parse(cookies.userData);

  // Pass userData to the page as props
  return {
    props: { initUserData: userData },
  };
}

export default function Home({ initUserData }: { initUserData: any }) {
  const [userData, setUserData] = useState(initUserData);
  const onLogout = async () => {
    setUserData(undefined);

    document.cookie =
      "userData=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    await fetch("/api/auth/logout");
  };

  // Construct the HTML response with user information from userData
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24"
      style={{
        backgroundImage: "url(/background.webp)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div className="w-[100vw] h-16 bg-slate-800 fixed top-0 flex items-center">
        <div className="mr-auto px-10 flex items-center">
          <img src="/drinking-logo.png" alt="logo" width="60" height="60" />
          <div className="font-bold text-2xl italic">Drinking Simulator</div>
        </div>
        {!!userData ? (
          <div className="flex ml-auto px-10 gap-2 items-center">
            <img
              src={userData.picture}
              alt="User Picture"
              width="40"
              height="40"
              className="rounded-full"
            />
            <h1>Hello, {userData.nickname} </h1>(
            <a
              href={userData.profile}
              target="_blank"
              className="underline text-blue-400"
            >
              {userData.sub}
            </a>
            )
            <div
              className="rounded bg-red-500 px-10 py-2 font-bold cursor-pointer"
              onClick={onLogout}
            >
              Logout
            </div>
          </div>
        ) : (
          <Link href="/api/auth/login">
            <div className="justify-end self-end rounded bg-red-500 px-10 py-2 font-bold cursor-pointer mr-2">
              Login
            </div>
          </Link>
        )}
      </div>
      {userData && <MainCard userData={userData} />}
    </main>
  );
}
