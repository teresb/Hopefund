// client/src/hooks/useSocket.js

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to your backend's Socket.io server URL
    const newSocket = io('http://localhost:5000'); // Adjust URL if needed
    setSocket(newSocket);

    // Clean up when the component unmounts
    return () => newSocket.disconnect();
  }, []);

  return socket;
};

export default useSocket;
