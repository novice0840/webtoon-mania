import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Tooltip, Box } from "@mui/material";
import { socket } from "@utils/socket";
import { useParams } from "react-router-dom";

const ChatRoom = () => {
  const { webtoonId = "" } = useParams();
  const [room, setRoom] = useState(webtoonId);
  const [message, setMessage] = useState("");

  const onConnect = () => {
    console.log("Socket io connected");
  };

  const onDisconnect = () => {
    console.log("Socket io disconnected");
  };

  const onMessage = (data: { clientId: string; message: string }) => {
    console.log(`${data.clientId}: ${data.message}`);
  };

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("message", onMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
    };
  }, []);

  const handleJoinRoom = () => {
    socket.emit("joinRoom", { room });
  };

  const handleMessageSend = () => {
    socket.emit("sendMessage", { room, message });
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter room name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleMessageSend}>Send Message</button>
      </div>
    </div>
  );
};

export default ChatRoom;
