import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";
import "./App.css";

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
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Socket.IO Chat
        </Typography>

        {/* Display the number of connected users */}
        <Typography variant="subtitle1" align="center" gutterBottom>
          Connected Users: {userCount}
        </Typography>

        {/* Input field and button to send a message */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={sendMessage}>
            Send
          </Button>
        </Box>

        {/* Display received messages */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Messages</Typography>
          <Box
            sx={{
              maxHeight: 200,
              overflowY: "auto",
              mt: 2,
              p: 2,
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
            }}
          >
            {receivedMessages.map((msg, index) => (
              <Typography
                key={index}
                variant="body1"
                className="message"
                gutterBottom
              >
                {msg}
              </Typography>
            ))}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
