import React, { createContext, useContext, useState } from 'react';

export interface Message {
  id: string;
  isAI: boolean;
  message: string;
  timestamp: string;
}

interface ChatContextType {
  messages: Message[];
  addMessage: (message: string, isAI: boolean) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      isAI: true,
      message: "Hello Haven here, What do you want to build with AI today?, i will guide on you available models and AI products?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const addMessage = (message: string, isAI: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      isAI,
      message,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};