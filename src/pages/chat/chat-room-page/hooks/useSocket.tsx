import { useState, useEffect } from 'react';
interface ISOCKET {
  roomId: string
}
const useSocket = (props: ISOCKET) => {
  const org = localStorage.getItem('org');
  const token = localStorage.getItem('Token')?.split(" ")[1];
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [recvMessages, setRecvMessages] = useState<string[]>([]);
  const host = 'api.yorcrm.com';
  useEffect(() => {
    if(props.roomId, token, org){
      // dev-space
      // const socketURL = `wss://${window.location.host}/ws/chat/${props.roomId}/?token=${token}&org=${org}`; 
    const socketURL = `wss://api.yorcrm.com/ws/chat/${props.roomId}/?token=${token}&org=${org}`; 
    const newSocket = new WebSocket(
      socketURL
    );

    newSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      //console.log("message-received->",data)
      if(data.message.received)
      setRecvMessages((recvMessages) => [...recvMessages, data.message.msg]);      
    };

    
    newSocket.onopen = function (e) {
      console.log('WebSocket connection opened');
      setIsConnected(true);
    };

    newSocket.onerror = function (error) {
      console.error('WebSocket error:', error);
    };

    newSocket.onclose = function (e) {
      console.error('Chat socket closed unexpectedly', e);
      setIsConnected(false);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
    }
  }, [props.roomId, token, org]);

  const sendMessage = (message:string):boolean => {
    if (isConnected && socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        message: message,
      }));
      return true;
    } else {
      console.error('WebSocket is not connected.');
      return false;
    }
  };

  return { recvMessages, isConnected, sendMessage };
};

export default useSocket;
