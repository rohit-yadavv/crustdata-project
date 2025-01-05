import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Message } from './types';
import { generateResponse } from './utils/chatbot';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your Crustdata API assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    
    // Show bot typing indicator
    setIsTyping(true);

    // Generate bot response
    const response = await generateResponse(content);
    
    // Add bot response
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response,
      sender: 'bot',
      timestamp: new Date(),
    };
    
    // Hide typing indicator and add bot message
    setIsTyping(false);
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">
              Crustdata API Support
            </h1>
          </div>
        </div>
      </header>

      {/* Chat container */}
      <main className="flex-1 p-4">
        <div className="mx-auto max-w-4xl">
          <div className="h-[calc(100vh-16rem)] overflow-y-auto rounded-lg bg-gray-100 p-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg bg-white px-4 py-2 text-gray-500 shadow-sm">
                  Typing...
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="mt-4">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;