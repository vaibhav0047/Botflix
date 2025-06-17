import React, { useState } from 'react'
import ChatBotIcon from './components/ChatBotIcon'
import './index.css'
import ChatForm from './components/ChatForm'
import ChatMessage from './components/ChatMessage'


const App = () => {
  const [chatHistory, setChatHistory] = useState([]);

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
  ...prev.filter(msg => msg.text !== "Processing.."),
  { role: "model", text, isError }
]);
    };
    const formattedHistory = history
      .filter(({ role }) => role === "user" || role === "model")
      .map(({ role, text }) => ({
        role,
        parts: [{ text }],
      }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error.message || "Something went wrong!");

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  return (
    <div className='container'>
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <h2 className="logo-text">BOTFLIX</h2>
          </div>
        </div>

        <div className="chat-body">
          <div className="message bot-message">
            <ChatBotIcon />
            <p className='message-text'>
              Hey there! <br /> How can I help this single today?
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className='chat-footer'>
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
