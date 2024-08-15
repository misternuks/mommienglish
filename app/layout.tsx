import './globals.css';
import { Zen_Maru_Gothic } from 'next/font/google';

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
        <footer>
          <p>&copy; 2024 MommiEnglish</p>
        </footer>
      </body>
    </html>
  );
}
