---
runme:
  id: 01JA0427KP863WR62CPAW2NT72
  version: v3
---

# Socket.IO Chat Application

This project is a simple real-time chat application built using Socket.IO, Express.js, and React (with Material-UI for styling). It supports both public and private messaging, and displays the number of users connected in real-time.



## Features
- Real-time public chat
- Private messaging between users
- Display of connected users in real-time
- Frontend built using React and Material-UI
- Backend built using Express and Socket.IO

```sh {"id":"01JA04689V63CYJYQ1A90NJ78S"}
/client        # React frontend
/server        # Express.js backend

```

Getting Started
Prerequisites
Ensure you have the following installed:

Node.js (v14.x or higher)
npm or yarn
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/socketio-chat-app.git
cd socketio-chat-app
Install dependencies for both server and client:

bash
Copy code
# In the project root
cd client
npm install

cd ../server
npm install
Running the Application
Start the server:

bash
Copy code
cd server
npm start
This will start the Express server on http://localhost:3000.

Start the client:

Open another terminal:

bash
Copy code
cd client
npm start
This will start the React app at http://localhost:3001.

Note: The client is configured to communicate with the server running on localhost:3000. Make sure both the server and client are running.

Usage
Once both the client and server are running, open http://localhost:3001 in your browser.
You will see the Socket.IO chat interface:
Type a message and press Send to broadcast it to all users.
Select a specific user from the dropdown to send a private message.
The number of connected users is displayed at the top of the chat window.
Socket Events
Public Message: Emitted when a user sends a message to all connected users.
Private Message: Emitted when a user sends a direct message to a selected user.
User Count: Broadcasted whenever a user connects or disconnects, updating the count in real-time.
User List: Broadcasted whenever the list of connected users changes, allowing private message functionality.
Technologies Used
Frontend:

React
Material-UI
Socket.IO Client
Backend:

Express.js
Socket.IO
Folder Structure
bash
Copy code
/client
  /public
  /src
    └── App.js           # Main chat component
    └── index.js         # React entry point
/server
  └── app.js             # Main server file
License
This project is licensed under the MIT License.
