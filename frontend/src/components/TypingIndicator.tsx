import React from 'react';
import { Bot } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-4 animate-slide-up">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <Bot className="w-4 h-4 text-gray-600" />
        </div>
        
        <div className="chat-message ai-message">
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot" style={{ animationDelay: '0.1s' }}></div>
            <div className="typing-dot" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator; 