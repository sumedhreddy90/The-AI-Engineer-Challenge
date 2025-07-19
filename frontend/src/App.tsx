import React, { useState, useEffect, useRef } from 'react';
import { Send, Settings, Trash2, Sparkles } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';
import SettingsModal from './components/SettingsModal';
import { ChatMessage as ChatMessageType, Settings as SettingsType } from './types';
import { ApiService } from './services/api';

const defaultSettings: SettingsType = {
  apiKey: '',
  model: 'gpt-4.1-nano',
  developerMessage: 'You are a helpful AI assistant. Provide clear, accurate, and engaging responses.'
};

function App() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<SettingsType>(() => {
    const saved = localStorage.getItem('chat-settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    localStorage.setItem('chat-settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    checkConnection();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const checkConnection = async () => {
    const connected = await ApiService.healthCheck();
    setIsConnected(connected);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !settings.apiKey) return;

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const request = {
        developer_message: settings.developerMessage,
        user_message: userMessage.content,
        model: settings.model,
        api_key: settings.apiKey
      };

      const stream = await ApiService.sendChatMessage(request);
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      
      let currentResponse = '';
      const aiMessageId = (Date.now() + 1).toString();
      
      const aiMessage: ChatMessageType = {
        id: aiMessageId,
        content: '',
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);

        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === aiMessageId
              ? { ...msg, content: (msg.content || '') + chunk }
              : msg
          )
        );
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessageType = {
        id: Date.now().toString(),
        content: 'Sorry, I encountered an error. Please check your API key and try again.',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const handleSaveSettings = (newSettings: SettingsType) => {
    setSettings(newSettings);
    checkConnection();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AI Chat</h1>
              <span className="text-sm text-gray-500">Powered by Sumedh Koppula AI via OpenAI</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-500">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
              
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              
              <button
                onClick={clearChat}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Clear Chat"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-200px)] flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Welcome to AI Chat!</h3>
                  <p className="text-sm">Start a conversation by typing a message below.</p>
                  {!settings.apiKey && (
                    <p className="text-xs text-red-500 mt-2">
                      Don't forget to set your OpenAI API key in settings!
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <div className="flex-1">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="input-field resize-none"
                  rows={1}
                  disabled={isLoading || !settings.apiKey}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading || !settings.apiKey}
                className="btn-primary self-end"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            {!settings.apiKey && (
              <p className="text-xs text-red-500 mt-2">
                Please set your OpenAI API key in settings to start chatting.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSave={handleSaveSettings}
      />
    </div>
  );
}

export default App; 