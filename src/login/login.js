import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { styled } from '@material-ui/core/styles';
import { compose, spacing, palette, shadows, typography } from '@material-ui/system';
import logo from '../logo/logo_2.png';
import axios from 'axios';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import clsx from 'clsx';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';

//setting attributes of material-ui stylings
const Box = styled('div')(compose(spacing, palette, typography, shadows));
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);
function Login() { 
  //setting boolean open as false initially
  const [open, setOpen] = React.useState(false);
  //method for openning up dialog box at toolbar
  const handleClickOpen = () => {
    setOpen(true);
  };
  //method for closing down dialog box at toolbar
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  let history = useHistory();
  //declaring username and set username as null
  const [username, setUsername] = useState("");
  //declaring password and set password as null
  const [password, setPassword] = React.useState({ password: '', showPassword: false, });
  
  //method for show and hide password in password textfield
  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }
  const baseUrl = `https://localhost:5001/api/User`;
  //axios post method for sending user credentials to server 
  function handleLogin() {
    axios.post(baseUrl, { username, password })
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem("currentuser", JSON.stringify(res.data));
          history.push('/App');
        }
      })
      .catch(function (error) {
        alert("Username password do not match");
        });
  }
  
 useEffect(()=>
 {
  const localStorage_flag=JSON.parse(localStorage.getItem("currentuser"));
  if(localStorage_flag !=null)
  {
    history.push('/App');
  }
  else{
    return 
  }
 })

  return (
    <div className={classes.root}  >
     
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClickOpen}>
              <MenuIcon />
            </IconButton>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
              <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Introduction Card
    </DialogTitle>
              <DialogContent dividers>
                <Typography gutterBottom>
                  Hey, This is Akash. I've been working with Impledge Technologies for last one month as a Trainee Software Engineer.
      </Typography>
                <Typography gutterBottom>
                  This is my second stack, i used React.js to develop this page. And i'am working under Mr.Vipin Sharma.
      </Typography>
                <Typography gutterBottom>
                  Thank You!
      </Typography>
              </DialogContent>
            </Dialog>
            <Typography variant="h6" className={classes.title}>
              ADMIN LOGIN
    </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={8} justify="center"
          alignItems="center" style={{ padding: 5 }}>
          <Grid item >
          &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <img src={logo} alt="Logo" />
            <h2>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; Impledge Technologies</h2>
            <Paper className={classes.paper}>
              <Box fontFamily="Monospace" border={1} bordercolor="primary.main" color="text.secondary" boxShadow={3} height="100%">
                <div className={classes.margin}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <AccountCircle />
                    </Grid>
                    <Grid item>
                      <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                        <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
                        <FilledInput
                          
                          placeholder="Enter Your username"
                          label="Username"
                          onChange={e => setUsername(e.target.value)}
                          margin="dense"
                          size="large"
                        /><br />
                      </FormControl>
                    </Grid>
                  </Grid>
                </div><br />
                <div className={classes.margin}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <AccountCircle />
                    </Grid>
                    <Grid item>
                      <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <FilledInput
                          id="input-with-icon-grid"
                          type={password.showPassword ? 'text' : 'password'}
                          placeholder="Enter Password"
                          label="Password"
                          onChange={e => setPassword(e.target.value)}
                          margin="dense"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {password.showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          } />
                      </FormControl>
                    </Grid>
                  </Grid>
                </div>
                <br /><br /><br />
                <div>
                  <Button variant={'contained'} color={'primary'} size={'small'} onClick={() => { handleLogin() }} disabled={!validateForm()} value='Login' >Login</Button><br /><br />
                </div>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      
    </div>
  );
}
export default Login;
