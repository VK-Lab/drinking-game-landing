import Link from "next/link";
import localFont from "next/font/local";

const myFont = localFont({ src: "./SuperMario256.ttf", variable: "--my-font" });

export default function Home() {
  return (
    <main
      className={`${myFont.variable} font-sans flex min-h-screen flex-col items-center bg-[#0a0b0b]`}
    >
      <div className="w-full h-20 flex items-center">
        <div className="mr-auto px-10 flex items-center">
          <img src="/drinking-logo.png" alt="logo" width="60" height="60" />
          <div className="mt-2 bg-gradient-to-r from-pink-500 via-green-400 to-yellow-400 inline-block text-transparent bg-clip-text shadow-lg text-2xl font-bold">
            Drinking Simulator
          </div>
        </div>

        <div className="flex ml-auto px-10 gap-2 items-center">
          <Link href="/api/auth/login">
            <div className="justify-end self-end rounded bg-red-500 px-10 py-2 font-bold cursor-pointer">
              Login
            </div>
          </Link>
        </div>

        {/* <img
          src="/comingsoon.webp"
          alt="logo"
          width="160"
          height="80"
          className="mr-10"
        /> */}
      </div>
      <img src="/background.webp" alt="logo" className="grow object-cover" />
      <div className="h-20 flex items-center">
        Copyright &copy; 2024. Created By{" "}
        <a
          href="https://crossx.one"
          className="ml-2 underline bg-gradient-to-r from-pink-500 via-green-400 to-yellow-400 inline-block text-transparent bg-clip-text shadow-lg font-bold"
        >
          CrossX
        </a>{" "}
      </div>
    </main>
  );
}
