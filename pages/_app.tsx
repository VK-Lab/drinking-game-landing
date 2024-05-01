import { Providers } from './providers';
import { AppProps } from 'next/app';
import localFont from 'next/font/local';
import './globals.css';

const myFont = localFont({ src: './SuperMario256.ttf', variable: '--my-font' });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <main className={`${myFont.variable} !font-sans`}>
        <Component {...pageProps} />
      </main>
    </Providers>
  );
}

export default MyApp;
