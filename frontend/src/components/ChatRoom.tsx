import { useState, useEffect } from "react";
import { Tooltip, Box } from "@mui/material";
// import { socket } from "@utils/socket";

const ChatRoom = () => {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [fooEvents, setFooEvents] = useState([]);

  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   function onFooEvent(value: string) {
  //     setFooEvents([value]);
  //   }

  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);
  //   socket.on("foo", onFooEvent);

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //     socket.off("foo", onFooEvent);
  //   };
  // }, []);
  return (
    <Tooltip title="ChatRoom" placement="right-end">
      <Box>
        <div className="App">hello, world</div>
      </Box>
    </Tooltip>
  );
};

export default ChatRoom;
