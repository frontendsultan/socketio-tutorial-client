import { useEffect, useState } from "react";

import useWebsocket from "react-use-websocket";
function App() {

  const [sendMsg, setSendMsg] = useState("");
  const [receivedMsg, setReceivedMsg] = useState("");

  const [socketURL, setSocketURL] = useState("ws://localhost:8000");

  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebsocket(socketURL);
  //2. send handshake request to server
  useWebsocket(socketURL, {
    // 4. if user accepts the connection
    onOpen: () => {
      console.log("web socket connection is established");
    },
    // 8.Receiving message from server
    onMessage:(message)=>{
      setReceivedMsg(message)
    }
  });



  function formSubmitHandler(e) {
    e.preventDefault();
    // 5. on submitting the form, the useWebsocket property 'sendMessage' is used to send message in the input. websocket first converts into buffer to increase efficiency
    sendMessage(sendMsg + "I am a client");
  }
// 9. closing connection.
function closeConnection(){
  const socket = getWebSocket();
    if (socket) {
      socket.close();
      console.log('socket is closed')
    }
}

  return (
    <>
      <div>Received Message: {receivedMsg && receivedMsg.data}</div>
      <div>
        <form action="" onSubmit={(e) => formSubmitHandler(e)}>
          <input
            type="text"
            value={sendMsg}
            onChange={(e) => setSendMsg(e.target.value)}
          />
          <button type="submit">Send Message</button>
        </form>
        <button onClick={closeConnection}>Close Connection</button>
      </div>
    </>
  );
}

export default App;
