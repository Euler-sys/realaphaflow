import { useState } from "react";
import { TrendingUp, DollarSign, AlertTriangle, Info, CheckCircle } from "lucide-react";
import BottomNav from "../pages/stickyNav";
import BottomNav2 from "../pages/bottomnav2";

type Message = {
  id: number;
  icon: JSX.Element;
  subject: string;
  preview: string;
  full: string;
  date: string;
  unread: boolean;
};

const messages: Message[] = [
  {
    id: 1,
    icon: <TrendingUp className="text-green-600" size={24} />,
    subject: "Portfolio Growth Alert",
    preview: "Your investment portfolio gained +12% this month.",
    full: `📈 Great news!  
Your investment portfolio has grown by **12%** over the last 30 days, driven mainly by your crypto and stock allocations. Keep monitoring your dashboard for real-time updates.`,
    date: "July 5, 2025",
    unread: true,
  },
  {
    id: 2,
    icon: <DollarSign className="text-yellow-500" size={24} />,
    subject: "New Investment Plan Available",
    preview: "We’ve launched a new high-yield plan starting at $500.",
    full: `🚀 A new investment plan is now live!  
You can now start investing with as little as **$500** in our High-Yield Growth Plan. This plan offers competitive returns with flexible withdrawal options.`,
    date: "July 3, 2025",
    unread: true,
  },
  {
    id: 3,
    icon: <AlertTriangle className="text-red-600" size={24} />,
    subject: "Market Volatility Notice",
    preview: "Crypto and tech stocks are experiencing higher volatility.",
    full: `⚠️ Market Update:  
The past week has seen increased volatility in **crypto** and **tech stocks**. Consider reviewing your risk profile and adjusting your portfolio allocation if needed.`,
    date: "July 1, 2025",
    unread: true,
  },
  {
    id: 4,
    icon: <Info className="text-blue-500" size={24} />,
    subject: "New Feature: Auto-Reinvest",
    preview: "Automatically reinvest your profits into active plans.",
    full: `💡 We’ve introduced **Auto-Reinvest**.  
You can now set your profits to be automatically reinvested into your active plans, helping your money grow faster without manual action.`,
    date: "June 29, 2025",
    unread: false,
  },
  {
    id: 5,
    icon: <CheckCircle className="text-green-500" size={24} />,
    subject: "Withdrawal Successful",
    preview: "Your recent withdrawal request has been processed.",
    full: `✅ Success!  
Your withdrawal has been processed successfully and the funds have been transferred to your selected wallet.`,
    date: "June 25, 2025",
    unread: false,
  },
];

const InboxPage = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  return (
    <>
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
