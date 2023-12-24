import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Tooltip, Box } from "@mui/material";
import { socket } from "@utils/socket";
import { useParams } from "react-router-dom";

const ChatRoom = () => {
  const { webtoonId = "" } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on("message", (data: string) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleJoinRoom = () => {
    socket.emit("joinRoom", { room: webtoonId });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("sendMessage", { room: webtoonId, message });
    setMessage("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <Tooltip title="ChatRoom" placement="right-end">
      <Box>
        <form action="" onSubmit={handleSubmit}>
          <input type="text" name="" id="" onChange={handleChange} value={message} />
          <input type="submit" value="" />
        </form>
      </Box>
    </Tooltip>
  );
};

export default ChatRoom;
