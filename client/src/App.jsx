import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css"; // Import the CSS file

function App() {
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server", newSocket.id);
    });

    newSocket.on("message", (msg) => {
      console.log("Message from server:", msg);
      setReceivedMessages((prevMessages) => [...prevMessages, msg]);
    });

    newSocket.on("user-count", (count) => {
      console.log("User count updated:", count);
      setUserCount(count);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Socket.IO Chat</h1>
      <p className="user-count">Connected Users: {userCount}</p>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      </div>
      <div className="messages-container">
        <h2>Messages</h2>
        {receivedMessages.map((msg, index) => (
          <p key={index} className="message">
            {msg}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
