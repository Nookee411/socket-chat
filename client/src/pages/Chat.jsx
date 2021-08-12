import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import ChatList from '../components/ChatList';
import MessageInput from '../components/MessageInput';

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: '98vh',
    display: 'flex',
    flexDirection: 'column',
  },
  chatList: {
    flex: '0 0 85%',
  },
}));

const Chat = (sendMessage, messageList) => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.container}>
      <ChatList messages={messageList} />
      <MessageInput sendMessage={sendMessage} />
    </Container>
  );
};

export default Chat;
