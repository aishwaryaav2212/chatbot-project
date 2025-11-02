import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChatMessage } from '../types';
import { generateResponse } from '../services/geminiService';
import { PREDEFINED_QUESTIONS } from '../constants';
import { SendIcon } from './icons/SendIcon';
import ReactMarkdown from 'https://esm.sh/react-markdown@9';
import remarkGfm from 'https://esm.sh/remark-gfm@4';


const TypingIndicator: React.FC = () => (
  <div className="flex items-center space-x-1 p-2">
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
    <span className="text-sm text-gray-600 ml-2">AI is thinking...</span>
  </div>
);


const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'english' | 'kannada'>('english');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const translations = {
    english: {
        title: "AI Startups in Bengaluru",
        welcome: "Welcome!",
        welcomePrompt: "Ask me anything about Bengaluru's AI scene, or select a topic to start:",
        placeholder: "Ask a question...",
    },
    kannada: {
        title: "ಬೆಂಗಳೂರಿನಲ್ಲಿ AI ಸ್ಟಾರ್ಟಪ್‌ಗಳು",
        welcome: "ಸ್ವಾಗತ!",
        welcomePrompt: "ಬೆಂಗಳೂರಿನ AI ದೃಶ್ಯದ ಬಗ್ಗೆ ನನ್ನನ್ನು ಏನು ಬೇಕಾದರೂ ಕೇಳಿ, ಅಥವಾ ಪ್ರಾರಂಭಿಸಲು ಒಂದು ವಿಷಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
        placeholder: "ಪ್ರಶ್ನೆ ಕೇಳಿ...",
    }
  };
  const t = translations[language];


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (prompt?: string) => {
    const userMessageContent = prompt || input;
    if (!userMessageContent.trim()) return;

    const languageInstruction = language === 'kannada'
        ? ' Please provide the response exclusively in the Kannada language.'
        : '';
    const finalPrompt = userMessageContent + languageInstruction;


    const newUserMessage: ChatMessage = { role: 'user', content: userMessageContent };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateResponse(finalPrompt);
      const modelMessage: ChatMessage = { role: 'model', content: response };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { role: 'model', content: 'Sorry, something went wrong. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div 
        className="w-full h-screen flex flex-col bg-cover bg-center"
        style={{ backgroundImage: "url('https://blogs.debutinfotech.com/wp-content/uploads/2025/01/Ai-Startups.jpg')" }}
    >
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" />

      <header className="relative z-10 grid grid-cols-3 items-center p-4 bg-black/30 border-b border-white/20">
        <div className="justify-self-start">
            <h2 className="text-lg font-semibold text-white">{t.title}</h2>
        </div>
        <div className="flex items-center space-x-2 justify-self-center">
            <span className={`text-sm font-medium transition-colors ${language === 'english' ? 'text-white' : 'text-gray-400'}`}>English</span>
            <button
                onClick={() => setLanguage(lang => lang === 'english' ? 'kannada' : 'english')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${language === 'kannada' ? 'bg-yellow-500' : 'bg-gray-600'}`}
                role="switch"
                aria-checked={language === 'kannada'}
                aria-label="Toggle language between English and Kannada"
            >
                <span
                aria-hidden="true"
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${language === 'kannada' ? 'translate-x-5' : 'translate-x-0'}`}
                />
            </button>
            <span className={`text-sm font-medium transition-colors ${language === 'kannada' ? 'text-white' : 'text-gray-400'}`}>ಕನ್ನಡ</span>
        </div>
        <div className="justify-self-end">
            <Link to="/" className="text-gray-300 hover:text-white text-sm font-medium flex items-center gap-1" aria-label="Back to Home">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Home
            </Link>
        </div>
      </header>

      <div className="relative z-10 flex-1 overflow-y-auto p-4 w-full max-w-4xl mx-auto flex flex-col justify-end">
        {messages.length === 0 && !isLoading && (
            <div className="text-center text-gray-200 p-4">
                <h3 className="font-semibold text-lg mb-4 text-white">{t.welcome}</h3>
                <p className="text-sm mb-4">{t.welcomePrompt}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PREDEFINED_QUESTIONS.map(q => (
                        <button key={q.id} onClick={() => handleSend(q.prompt)} className="p-2 text-sm text-left bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                            {q.title}
                        </button>
                    ))}
                </div>
            </div>
        )}

        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-3 ${msg.role === 'user' ? 'bg-yellow-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-table:my-2 prose-table:w-full prose-thead:border-b prose-thead:border-gray-300 prose-tr:border-b prose-tr:border-gray-200 prose-td:px-2 prose-td:py-1 prose-th:px-2 prose-th:py-1">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-gray-200 rounded-2xl p-3 rounded-bl-none">
                  <TypingIndicator />
               </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className="relative z-10 p-4 border-t border-white/20 bg-black/30">
        <div className="flex items-center space-x-2 w-full max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.placeholder}
            className="flex-1 w-full px-4 py-2 bg-white/20 text-white placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-yellow-600 transition-colors"
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
