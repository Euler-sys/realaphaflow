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
    const supportEmail = "support@alphaflownow.top"; // replace with your support email
    const subject = encodeURIComponent(`Support Request: ${selectedIssue}`);
    window.location.href = `mailto:${supportEmail}?subject=${subject}`;
  };

  return (
    <>
      {/* Sticky chat icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition z-50"
      >
        <FiMessageCircle size={24} />
      </button>

      {/* Chat popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-80 bg-white border rounded-lg shadow-lg p-4 z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Investment Support</h2>
            <button onClick={() => setIsOpen(false)}>
              <FiX size={20} />
            </button>
          </div>

          {!selectedIssue ? (
            <>
              <p className="mb-2">Select your issue:</p>
              <div className="flex flex-col gap-2">
                {investmentIssues.map((issue) => (
                  <button
                    key={issue}
                    onClick={() => setSelectedIssue(issue)}
                    className="bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2 text-left transition"
                  >
                    {issue}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="mb-4">
                You're about to contact support regarding: <br />
                <span className="font-medium">{selectedIssue}</span>
              </p>
              <button
                onClick={handleContactSupport}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full mb-2"
              >
                Contact Support
              </button>
              <button
                onClick={() => setSelectedIssue(null)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition w-full"
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