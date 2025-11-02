import React from 'react';
import Chatbot from '../components/Chatbot';

const ChatbotPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-900">
      {/* The Chatbot component is now a full-screen experience */}
      <Chatbot />
    </main>
  );
};

export default ChatbotPage;
