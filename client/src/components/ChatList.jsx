import React, { useEffect, useRef } from 'react';
import { isEmpty } from 'lodash';

import UserMessage from './UserMessage';
import useMessages from '../hooks/useMessages';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  chat: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    minHeight: '90vh',
    overflowY: 'scroll',

    '&::-webkit-scrollbar': {
      width: '1em',
    },

    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.black.tertiary,
      outline: `1px solid ${theme.palette.white.tertiary}`,
    },
  },
}));

function ChatList() {
  const classes = useStyles();
  const messages = useMessages();
  const chatListRef = useRef(null);

  useEffect(() => {
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className={classes.chat} ref={chatListRef}>
      {!isEmpty(messages) &&
        messages.map((ele) => <UserMessage key={ele.id} message={ele} />)}
    </div>
  );
}

export default ChatList;
