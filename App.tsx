
import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage'));
const ChatbotPage = lazy(() => import('./pages/ChatbotPage'));

const App: React.FC = () => {
  return (
    <HashRouter>
      <Suspense fallback={<div className="flex items-center justify-center h-screen bg-gray-900 text-white">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatbotPage />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;
