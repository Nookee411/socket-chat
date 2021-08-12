import {
  IconButton,
  Input,
  InputAdornment,
  makeStyles,
  TextField,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MessageController from '../controller/messageController';
import { userSelectors } from '../store/slices/userSlice';

const useStyles = makeStyles((theme) => ({
  messageInput: {
    width: '100%',
    border: `2px solid ${theme.palette.border.black.primary}`,
    borderRadius: theme.spacing(2),
    boxShadow: 'none',
    '& .MuiSvgIcon-root': {
      color: theme.palette.icon.primary,
      width: theme.spacing(5),
      margin: theme.spacing(0, 1, 2),
    },
  },
}));

function MessageInput() {
  const user = useSelector(userSelectors.user);
  const classes = useStyles();
  const [text, setText] = useState('');
  const handleMessageSending = (e) => {
    e.preventDefault();
    MessageController.sendMessage({
      text,
      senderName: user.name,
    });
    setText('');
  };
  return (
    <form onSubmit={handleMessageSending}>
      <TextField
        className={classes.messageInput}
        label="Chat"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleMessageSending}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </form>
  );
}

export default MessageInput;
