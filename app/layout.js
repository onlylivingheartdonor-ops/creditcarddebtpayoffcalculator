export const metadata = {
  title: "Credit Card Debt Payoff Calculator | Snowball, Avalanche & Emotional Methods",
  description: "Plan how to pay off multiple credit cards using snowball, avalanche, or emotional priority methods. See payoff time, total interest, and compare strategies side by side.",

  alternates: {
    canonical: "https://www.creditcarddebtpayoffcalculator.com",
  },

  openGraph: {
    title: "Credit Card Debt Payoff Calculator | Snowball, Avalanche & More",
    description: "Plan how to pay off multiple credit cards using snowball, avalanche, or emotional priority methods. See payoff time and interest savings.",
    url: "https://www.creditcarddebtpayoffcalculator.com",
    siteName: "MoneyWise Calculators",
    images: [
      {
        url: "https://www.creditcarddebtpayoffcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Credit Card Debt Payoff Calculator — Plan your debt freedom",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Credit Card Debt Payoff Calculator | Snowball, Avalanche & More",
    description: "Plan how to pay off multiple credit cards. See payoff time and interest savings.",
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

  authors: [{ name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Credit Card Debt Payoff Calculator",
              description: "Free tool to plan credit card debt payoff using snowball, avalanche, or emotional methods. See payoff timeline, total interest, and compare strategies.",
              url: "https://www.creditcarddebtpayoffcalculator.com",
              applicationCategory: "FinanceApplication",
              operatingSystem: "All",
              browserRequirements: "Requires JavaScript",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD"
              },
              author: {
                "@type": "Organization",
                name: "MoneyWise Calculators",
                url: "https://moneywisecalculator.com"
              }
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}