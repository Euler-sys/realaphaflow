

export default function ForexCrossRatesWidget() {
  return (
    <section className="px-6 py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
     <div className="bg-white rounded-2xl shadow border overflow-hidden">
  <iframe
    title="forex cross-rates TradingView widget"
    src="https://www.tradingview-widget.com/embed-widget/forex-cross-rates/?locale=en#%7B%22currencies%22%3A%5B%22EUR%22%2C%22USD%22%2C%22JPY%22%2C%22BTC%22%2C%22ETH%22%2C%22LTC%22%2C%22GBP%22%2C%22CHF%22%2C%22AUD%22%2C%22CAD%22%2C%22NZD%22%2C%22CNY%22%5D%2C%22colorTheme%22%3A%22light%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A600%2C%22utm_source%22%3A%22truenorthassetspartners.org%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22forex-cross-rates%22%2C%22page-uri%22%3A%22truenorthassetspartners.org%2F%22%7D"
    style={{ display: "block", width: "100%", height: "600px", border: "none", overflow: "hidden" }}
  />
  <div className="text-center text-sm text-gray-400 py-3">
    <a
      href="https://www.tradingview.com/markets/currencies/forex-cross-rates/"
      rel="noopener noreferrer"
      target="_blank"
      className="text-blue-600 hover:underline"
    >
      Forex Rates
    </a>{" "}
    by TradingView
  </div>
</div>

      </div>
    </section>
  );
}