
import React from "react";
import io from "socket.io-client";
import { useEffect, useState } from "react";

// 2.Sending a connection request to server
const socket = io.connect("http://localhost:8000");

export default function App() {
   //Room State
   const [room, setRoom] = useState("");

  // 4. This function is connected to submit button. On typing the input and submitting the btn. if the room state does not exist. it will set the room value to input value and emits the custom event "join room" with the custom room id with which it wants to join
   const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    // 6. client is sending a message to server by emitting a custom event named "send_message" with the message and room it wants to send.
    socket.emit("send_message", { message,room });
    console.log("msg");
  };

  // 9. Whenever the component first mounts, it check whether server sent him a message first. After that, whenever socket variable changes, it attempts to listen any event emitted by server
  useEffect(() => {
    socket.on("reply", (data) => {
      setMessageReceived(data);
      // console.log(data)
    });
  }, [socket]);

  return (
    <div className="App">
       <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={() => sendMessage()}> Send Message</button>
      <h1> Message: {messageReceived && messageReceived}</h1>
    </div>
  );
}




/*---------------------------------------
-----------------------------------------
A simple socket.io client example without room
----------------------------------------
----------------------------------------
*/


// import React from "react";
// import io from "socket.io-client";
// import { useEffect, useState } from "react";

// 2.Sending a connection request to server
// const socket = io.connect("http://localhost:8000");

// export default function App() {
//  ;

//   // Messages States
//   const [message, setMessage] = useState("");
//   const [messageReceived, setMessageReceived] = useState("");

//   const sendMessage = () => {
//     4. client is sending a message to server by emitting an custom event named "send_message" with the message it wants to send.
//     socket.emit("send_message", { message });
//     console.log("msg");
//   };

//   7. Whenever the component first mounts, it check whether server sent him a message first. After that, whenever socket variable changes, it attempts to listen any event emitted by server
//   useEffect(() => {
//     socket.on("reply", (data) => {
//       setMessageReceived(data);
//       // console.log(data)
//     });
//   }, [socket]);

//   return (
//     <div className="App">
      
//       <input
//         placeholder="Message..."
//         onChange={(event) => {
//           setMessage(event.target.value);
//         }}
//       />
//       <button onClick={() => sendMessage()}> Send Message</button>
//       <h1> Message: {messageReceived && messageReceived}</h1>
//     </div>
//   );
// }
