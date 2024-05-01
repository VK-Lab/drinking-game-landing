import { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import localFont from "next/font/local";
import { http, createConfig } from "wagmi";
import { base, mainnet, optimism } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

import "./globals.css";

const myFont = localFont({ src: "./SuperMario256.ttf", variable: "--my-font" });

const projectId = "bc74d9ca10f837f40de70bddb477484a";
export const wagmiConfig = createConfig({
  chains: [mainnet, base],
  connectors: [walletConnect({ projectId })],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <main className={`${myFont.variable} !font-sans`}>
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
