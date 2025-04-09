import "./global.css";

export const metadata = {
  title: 'USDC Balance Checker',
  description: 'Check the USDC token balance of any Ethereum wallet address.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>
          USDC Balance Checker
        </title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
