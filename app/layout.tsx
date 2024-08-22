import './globals.css';
import { Zen_Maru_Gothic } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import Head from 'next/head';

config.autoAddCss = false;

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ['400', '700'],
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
      </Head>
      <body>
        <header>
          {/* <nav>
            <ul className = "navbar">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav> */}
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
