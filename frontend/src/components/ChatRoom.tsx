import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Tooltip, Box } from "@mui/material";
import { socket } from "@utils/socket";
import { useParams } from "react-router-dom";

const ChatRoom = () => {
  const { webtoonId = "" } = useParams();

  const [message, setMessage] = useState("");
  useEffect(() => {
    socket.on("connect", function () {
      console.log("Connected");
    });
    socket.on("disconnect", function () {
      console.log("Disconnected");
    });
    socket.on("room1", (data) => {
      console.log("room1: ", data);
    });
    socket.on("roomName", (data) => {
      console.log("room1: ", data);
    });
    socket.on(webtoonId, (data) => {
      console.log(`${webtoonId}: `, data);
    });
  }, []);

  const handleSubmt = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("room1", message);
    socket.emit(webtoonId, message);
    setMessage("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <Tooltip title="ChatRoom" placement="right-end">
      <Box>
        <form action="" onSubmit={handleSubmt}>
          <input type="text" name="" id="" onChange={handleChange} value={message} />
          <input type="submit" value="" />
        </form>
      </Box>
    </Tooltip>
  );
};

export default ChatRoom;
