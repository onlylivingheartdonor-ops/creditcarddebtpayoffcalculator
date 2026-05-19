export const metadata = {
  title: "Credit Card Debt Payoff Calculator | Snowball, Avalanche & More",
  description: "Plan how to pay off multiple credit cards using snowball, avalanche, or emotional priority methods. See payoff time and interest savings.",
  
  alternates: {
    canonical: "https://www.creditcardpayoffcalculator.com",           // ← MUST CHANGE
  },

  openGraph: {
    title: "Credit Card Debt Payoff Calculator | Snowball, Avalanche & More",
    description: "Plan how to pay off multiple credit cards using snowball, avalanche, or emotional priority methods. See payoff time and interest savings.",
    url: "https://www.creditcardpayoffcalculator.com",                 // ← MUST CHANGE
    siteName: "Moneywise Calculators",             // ← Change
    images: [
      {
        url: "https://www.creditcardpayoffcalculator.com/og-image.png", // ← MUST CHANGE
        width: 1200,
        height: 630,
        alt: "Debt Payoff Calculator",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Credit Card Debt Payoff Calculator | Snowball, Avalanche & More",
    description: "Plan how to pay off multiple credit cards using snowball, avalanche, or emotional priority methods. See payoff time and interest savings.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  authors: [{name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}