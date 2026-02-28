import { useState } from "react";
import { TrendingUp, DollarSign, AlertTriangle, Info, CheckCircle } from "lucide-react";
import BottomNav from "../pages/stickyNav";
import BottomNav2 from "../pages/bottomnav2";
import Headerr from "../pages/header2";

type Message = {
  id: number;
  icon: JSX.Element;
  subject: string;
  preview: string;
  full: string;
  date: string;
  unread: boolean;
};

const currentDate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const messages: Message[] = [
  {
    id: 1,
    icon: <TrendingUp className="text-green-600" size={24} />,
    subject: "Investment Performance Update",
    preview: "Your active plans are showing steady growth.",
    full: `📈 Your Alphaflow investment portfolio continues to perform steadily.
Market conditions remain favorable, and your active investment plans are generating consistent daily returns. Stay updated through your dashboard for performance insights.`,
    date: currentDate,
    unread: true,
  },
  {
    id: 2,
    icon: <DollarSign className="text-yellow-500" size={24} />,
    subject: "New Growth Opportunities",
    preview: "Explore upgraded investment plans with higher returns.",
    full: `🚀 Alphaflow has optimized several investment strategies to improve earning potential.
Users can now diversify across multiple plans to maximize long-term portfolio growth while maintaining flexibility.`,
    date: currentDate,
    unread: true,
  },
  {
    id: 3,
    icon: <AlertTriangle className="text-red-600" size={24} />,
    subject: "Market Insight Notice",
    preview: "Digital asset markets are showing increased movement.",
    full: `⚠️ Market Insight:
Recent movements across global financial and digital asset markets may create new investment opportunities. Monitoring diversification and reinvestment strategies is recommended.`,
    date: currentDate,
    unread: true,
  },
  {
    id: 4,
    icon: <Info className="text-blue-500" size={24} />,
    subject: "Portfolio Optimization Tips",
    preview: "Diversification helps improve investment stability.",
    full: `💡 Investment Tip:
Spreading funds across Amateur, Advanced, Professional, and VIP plans can help balance risk while improving overall portfolio performance over time.`,
    date: currentDate,
    unread: false,
  },
  {
    id: 5,
    icon: <CheckCircle className="text-green-500" size={24} />,
    subject: "Platform Growth Update",
    preview: "Alphaflow continues expanding investment solutions.",
    full: `✅ Platform Update:
Alphaflow continues to enhance investment infrastructure to support faster performance tracking, improved analytics, and smarter investment management tools for all users.`,
    date: currentDate,
    unread: false,
  },
];

const InboxPage = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  return (
    <>
    <Headerr/>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-red-800 text-center"> Inbox </h1>

        <ul className="space-y-4">
          {messages.map((msg) => (
            <li
              key={msg.id}
              onClick={() => setSelectedMessage(msg)}
              className={`cursor-pointer border rounded-lg p-4 shadow-sm hover:shadow-md transition flex items-start gap-4 bg-white ${
                msg.unread ? "border-l-4 border-red-600 bg-red-50/30" : "border-gray-200"
              }`}
            >
              <div className="mt-1">{msg.icon}</div>
              <div className="flex-1">
                <h3 className={`text-base font-semibold ${msg.unread ? "text-red-700" : "text-gray-800"}`}>
                  {msg.subject}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{msg.preview}</p>
              </div>
              <div className="text-sm text-gray-500 text-right">
                <p>{msg.date}</p>
                {msg.unread && (
                  <span className="text-xs text-white bg-red-600 px-2 py-0.5 rounded-full ml-1">
                    Unread
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg"
            >
              &times;
            </button>
            <div className="mb-3">{selectedMessage.icon}</div>
            <h2 className="text-xl font-bold text-red-700 mb-2">{selectedMessage.subject}</h2>
            <p className="text-gray-700 text-sm whitespace-pre-line">{selectedMessage.full}</p>
            <p className="text-xs text-gray-400 mt-4">{selectedMessage.date}</p>
          </div>
        </div>
      )}

      <BottomNav />
      <BottomNav2 />
    </>
  );
};

export default InboxPage;
