import ChatBotIcon from "./ChatBotIcon";

const ChatMessage = ({ chat }) => {
  return (
    <div className={`message ${chat.role === 'user' ? 'user-message' : 'bot-message'}
    -message ${chat.isError ? "error" : ''}`}>  
      {chat.role !== 'user' && <ChatBotIcon />}
      <p className="message-text">{chat.text}</p>
    </div>
  );
};

export default ChatMessage;
