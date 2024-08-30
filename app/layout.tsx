import './globals.css';

import { Zen_Maru_Gothic} from 'next/font/google';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';


import Head from 'next/head';

import SessionProviderWrapper from './session-provider-wrapper'; // Import a separate client component

import { FlashMessageProvider } from './context/FlashMessageContext'; // Import the FlashMessageProvider
import FlashMessage from './components/FlashMessage'; // Import the FlashMessage component
import HomeButton from './components/HomeButton';

config.autoAddCss = false;

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ['400', '700', '900'],
  subsets: ['latin']
});

export const metadata = {
  title: 'MommiEnglish',
  description: '英語習慣プログラム'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en" className={zenMaruGothic.className}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="zen-maru-gothic-regular">
        < SessionProviderWrapper>
          <FlashMessageProvider>
            <FlashMessage />
            <HomeButton />
            <main>{children}</main>
            <footer className = "footer">
              <p>&copy; 2024 MommiEnglish</p>
            </footer>
          </FlashMessageProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
