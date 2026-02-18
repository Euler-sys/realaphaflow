// import React from "react";

export default function CryptoMarketScreener() {
  return (
    <div className="w-full max-w-6xl mx-auto py-10">
   <div className="w-full h-[450px]">
  <iframe
    title="crypto-mkt-screener"
    lang="en"
    // scrolling="no"
    allowTransparency
    src="https://www.tradingview-widget.com/embed-widget/crypto-mkt-screener/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A450%2C%22defaultColumn%22%3A%22overview%22%2C%22screener_type%22%3A%22crypto_mkt%22%2C%22displayCurrency%22%3A%22GBP%22%2C%22colorTheme%22%3A%22light%22%2C%22market%22%3A%22crypto%22%2C%22enableScrolling%22%3Atrue%7D"
    style={{ width: "100%", height: "100%", display: "block", border: "none" }}
  ></iframe>
</div>


      <div className="text-center text-gray-400 text-sm mt-2">
        <a
          href="https://www.tradingview.com/markets/cryptocurrencies/prices-all/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          Crypto Market Screener
        </a>{" "}
        by TradingView
      </div>
    </div>
  );
}
