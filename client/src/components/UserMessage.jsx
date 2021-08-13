import {
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelectors } from '../store/slices/userSlice';
import MessageController from '../controller/messageController';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  messageRoot: {
    position: 'relative',
    display: 'flex',
    margin: theme.spacing(4),
    '&.user_message:hover [class*=messageActions]': {
      opacity: 1,
      pointerEvents: 'auto',
    },
  },
  messageTime: {
    ...theme.typography.p4,
    width: theme.spacing(10),
    color: theme.palette.white.tertiary,
    marginRight: theme.spacing(3),
  },
  messageIcon: {
    margin: theme.spacing(0, 2, -0.5, 0),
    ...theme.typography.p3,
    color: theme.palette.accent.primary,
  },
  messageAuthor: {
    color: theme.palette.accent.primary,
    marginRight: theme.spacing(1),
  },
  message: {
    ...theme.typography.p4,
    flex: '0 0 90%',
  },
  messageActions: {
    position: 'absolute',
    right: 0,
    top: 0,
    opacity: 0,
    background: theme.palette.surface.dark.primary,
    pointerEvents: 'none',
    '&:before': {
      position: 'absolute',
      bottom: 0,
      right: '100%',
      content: '""',
      height: '100%',
      width: '30px',
      background: `linear-gradient(90deg, transparent 0%, ${theme.palette.surface.dark.primary} 100%)`,
    },
    transition: 'opacity 100ms ease-in',
    '& .MuiSvgIcon-root': {
      color: theme.palette.accent.primary,
    },
    '& .MuiIconButton-root': {
      padding: 0,
    },
  },
}));

const UserMessage = ({ message: { id, text, created_at, name } }) => {
  const classes = useStyles();
  const user = useSelector(userSelectors.user);
  const isUserSender = user.name === name;
  const [isEditing, setEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const time = new Date(created_at).toLocaleTimeString('ru-RU').slice(0, 5);

  const handleMessageDelete = () => {
    MessageController.deleteMessage(user.id, id);
  };

  const handleEditSubmit = () => {
    setEditing(false);
    MessageController.editMessage(id, editText);
  };

  return !isEditing ? (
    <div className={clsx(classes.messageRoot, { user_message: isUserSender })}>
      <Typography className={classes.messageTime}>{`${time}`}</Typography>
      <div className={classes.message}>
        <AccountCircleIcon className={classes.messageIcon} />
        <span className={classes.messageAuthor}>{name}:</span>
        <span className={classes.messageText}>{text}</span>
        <div className={classes.messageActions}>
          <IconButton onClick={() => setEditing(true)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleMessageDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  ) : (
    <TextField
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleEditSubmit}>
              <CheckIcon />
            </IconButton>
            <IconButton onClick={() => setEditing(false)}>
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default UserMessage;
