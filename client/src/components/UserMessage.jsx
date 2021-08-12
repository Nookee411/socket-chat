import { IconButton, makeStyles, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelectors } from '../store/slices/userSlice';
import MessageController from '../controller/messageController';

const useStyles = makeStyles((theme) => ({
  messageRoot: {
    position: 'relative',
    display: 'flex',
    padding: theme.spacing(4),
    '&.user_message:hover [class*=deleteMessage]': {
      opacity: 1,
    },
  },
  messageTime: {
    ...theme.typography.p4,
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
  deleteMessage: {
    position: 'absolute',
    right: 2,
    top: theme.spacing(3),
    opacity: 0,
    background: `radial-gradient(${theme.palette.surface.dark.primary} 30%, transparent)`,
    borderRadius: theme.spacing(1),
    transition: 'opacity 100ms ease-in',
    '& .MuiSvgIcon-root': {
      color: theme.palette.accent.primary,
    },
  },
}));

const UserMessage = ({ message: { id, text, created_at, name } }) => {
  const time = new Date(created_at);
  const classes = useStyles();
  const user = useSelector(userSelectors.user);
  const [isUserSender, setUserSender] = useState(null);

  useEffect(() => {
    setUserSender(user.name === name);
  }, [user, name]);

  const handleMessageDelete = () => {
    MessageController.deleteMessage(id);
  };

  return (
    <div className={clsx(classes.messageRoot, { user_message: isUserSender })}>
      <Typography className={classes.messageTime}>
        {`${time.getHours()}:${time.getMinutes()}`}
      </Typography>
      <div className={classes.message}>
        <AccountCircleIcon className={classes.messageIcon} />
        <span className={classes.messageAuthor}>{name}:</span>
        <span className={classes.messageText}>{text}</span>
        <div className={classes.deleteMessage}>
          <IconButton onClick={handleMessageDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
