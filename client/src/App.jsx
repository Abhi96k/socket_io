import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
 
    const socket = io("http://localhost:3000");

    // On successful connection
    socket.on("connect", () => {
      console.log("Connected to server", socket.id);
    });

    // Listen for incoming messages
    socket.on("message", (msg) => {
      console.log("Message from server:", msg);
      setReceivedMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Listen for the user count update
    socket.on("user-count", (count) => {
      console.log("User count updated:", count);
      setUserCount(count);
    });

    // Cleanup the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Send message to server
  const sendMessage = () => {
    const socket = io("http://localhost:3000");
    socket.emit("message", message); // Send message to backend
    setMessage(""); // Clear input
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Socket.IO Chat</h1>

      {/* Display the number of connected users */}
      <p>Connected Users: {userCount}</p>

      {/* Input field to send a message */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>

      {/* Display received messages */}
      <div style={{ marginTop: "20px" }}>
        <h2>Messages</h2>
        {receivedMessages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
