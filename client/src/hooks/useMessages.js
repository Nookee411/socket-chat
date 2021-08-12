import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MessageController from '../controller/messageController';
import { userSelectors } from '../store/slices/userSlice';
import { isEmpty } from 'lodash';
import socket from '../utils/socket';

const useMessages = () => {
  const user = useSelector(userSelectors.user);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (isEmpty(messages)) MessageController.getMessages(user.name);
    socket.on('messages', (messages) => {
      setMessages(messages);
    });
  }, []);

  return messages;
};

export default useMessages;
