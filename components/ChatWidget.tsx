import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { Chat, GenerateContentResponse } from "@google/genai";
import { createResumeChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import ReactMarkdown from 'react-markdown';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm an AI assistant. Ask me anything about Alex's experience, skills, or background!", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat session on mount
  useEffect(() => {
    if (!chatSession) {
      try {
        const chat = createResumeChat();
        setChatSession(chat);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim() || !chatSession || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatSession.sendMessageStream({ message: userMessage.text });
      
      let fullResponseText = "";
      
      // Add a placeholder message for the bot
      setMessages(prev => [...prev, { role: 'model', text: "", timestamp: new Date() }]);

      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
            fullResponseText += c.text;
            
            // Update the last message (the bot's message) with the accumulated text
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMsg = newMessages[newMessages.length - 1];
                if (lastMsg.role === 'model') {
                    lastMsg.text = fullResponseText;
                }
                return newMessages;
            });
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I encountered an error connecting to the AI service. Please try again later.", timestamp: new Date() }]);
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

  return (
    <div className="fixed bottom-4 right-4 z-50 no-print flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white/80 backdrop-blur-xl w-[90vw] sm:w-96 h-[500px] rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-white/50 flex flex-col mb-4 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 pattern-dots"></div>
            <div className="flex items-center gap-2 relative z-10">
              <div className="bg-white/20 p-1.5 rounded-lg border border-white/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-sm tracking-wide text-white">Ask AI About Alex</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="relative z-10 p-1.5 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-br-none' 
                      : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'
                  }`}
                >
                  <div className="prose prose-sm max-w-none break-words prose-p:leading-relaxed">
                    <ReactMarkdown 
                      components={{
                        p: ({node, ...props}) => <p className={msg.role === 'user' ? 'text-white' : 'text-slate-700'} {...props} />,
                        strong: ({node, ...props}) => <strong className={msg.role === 'user' ? 'text-white font-bold' : 'text-slate-900 font-bold'} {...props} />
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                  <span className={`text-[10px] block mt-1 text-right ${msg.role === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1].text.length === 0 && (
                 <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-slate-100 shadow-sm">
                         <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                    </div>
                 </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about experience..."
                className="flex-1 bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-slate-800' : 'bg-white/80 backdrop-blur-lg border border-white/40 hover:bg-white'} text-slate-800 p-4 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all transform hover:scale-105 flex items-center gap-2 font-medium group ring-1 ring-black/5`}
      >
        {isOpen ? (
            <X className="w-6 h-6 text-white" />
        ) : (
            <>
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap opacity-0 group-hover:opacity-100 pr-0 group-hover:pr-2 text-slate-600">
                    Ask AI Assistant
                </span>
                <MessageCircle className="w-6 h-6 text-indigo-600" />
            </>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;