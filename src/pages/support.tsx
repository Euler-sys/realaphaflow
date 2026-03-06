import React, { useState } from "react";
import { FiMessageCircle, FiX } from "react-icons/fi";

const investmentIssues = [
  "Account Login Issue",
  "Login Issues",
  "Deposit Problem",
  "Withdrawal Delay",
  "Investment Plan Question",
  "Technical Bug",
  "Other",
];

const SupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const handleContactSupport = () => {
    if (!selectedIssue) return;
    const supportEmail = "support@alphaflownow.top";
    const subject = encodeURIComponent(`Support Request: ${selectedIssue}`);
    window.location.href = `mailto:${supportEmail}?subject=${subject}`;
  };

  return (
    <>
      {/* Floating Support Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full shadow-lg transition hover:bg-red-600 hover:scale-105 animate-[bounce_3s_infinite] z-50"
        >
          <FiMessageCircle size={20} />
          <span className="text-sm font-medium">Contact Support</span>
        </button>
      )}

      {/* Chat popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-80 bg-white border rounded-lg shadow-lg p-4 z-50">

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Investment Support</h2>
            <button onClick={() => setIsOpen(false)}>
              <FiX size={20} />
            </button>
          </div>

          {!selectedIssue ? (
            <>
              <p className="mb-2 text-sm text-gray-600">
                Select the issue you need help with:
              </p>

              <div className="flex flex-col gap-2">
                {investmentIssues.map((issue) => (
                  <button
                    key={issue}
                    onClick={() => setSelectedIssue(issue)}
                    className="bg-gray-100 hover:bg-red-100 rounded-md px-3 py-2 text-left transition text-sm"
                  >
                    {issue}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="mb-4 text-sm">
                You're about to contact support regarding:
                <br />
                <span className="font-medium">{selectedIssue}</span>
              </p>

              <button
                onClick={handleContactSupport}
                className="bg-black text-white px-4 py-2 rounded hover:bg-red-600 transition w-full mb-2 text-sm"
              >
                Contact Support
              </button>

              <button
                onClick={() => setSelectedIssue(null)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition w-full text-sm"
              >
                Choose Another Issue
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SupportChat;