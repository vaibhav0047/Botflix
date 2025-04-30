import React, { useRef } from 'react';

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = '';

    // 1. Add user message immediately
    setChatHistory((history) => [...history, { role: 'user', text: userMessage }]);

    // 2. After 600ms, add "Thinking..." and call generateBotResponse
    setTimeout(() => {
      // Add "Thinking..." bot message
      setChatHistory((history) => [...history, { role: 'bot', text: 'Thinking...' }]);
      
      // Call generateBotResponse with updated history including the user message
      generateBotResponse([...chatHistory, { role: 'user', text: userMessage }]);
    }, 600);
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Message..."
        className="message-input"
        ref={inputRef}
        required
      />
      <button className="material-symbols-outlined">arrow_upward</button>
    </form>
  );
};

export default ChatForm;
