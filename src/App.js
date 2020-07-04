import React , {useState,Fragment, useEffect} from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import UserTable from './tables/UserTable';
import { useHistory } from 'react-router-dom';
import EditUserForm from './forms/EditUserForm'
import logo_1 from './logo/add_logo.PNG';
import logo_2 from './logo/edit_logo.PNG';
import RegistrationUserForm from './forms/RegistrationUserForm';

const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
	},
	menuButton: {
	  marginRight: theme.spacing(2),
	},
	title: {
	  flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(3),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	  }
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
  const App = () => {
	const usersData = [
		{ id: 1, name: 'Tania', employeeid: 'tania.sharma', salary: '10000', leaves:'1' }
	]
	const [open, setOpen] = React.useState(false);
	//declare form attributes with null values
	const initialFormState = { id: null, name: '', employeeid: '', salary:'',leaves:'' }
	const [ users, setUsers ] = useState(usersData)
	//declare current-user as null 
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	//declare edit flag as false initially for editing
	const [ editing, setEditing ] = useState(false)
	let history = useHistory();
	useEffect(()=>
	{
		const localStorage_flag=localStorage.getItem('flag');
		if(localStorage_flag==='true')
		{
			return 
		}
		else{
			history.push('/');
		}
	});
	//function for setting open flag true, for opening up dialog box 
	const handleClickOpen = () => {
	  setOpen(true);
	};
	//function for setting open flag false, for closing down dialog box 
	const handleClose = () => {
	  setOpen(false);
	};
	const classes = useStyles();
	//logout function for logging out page
	const logout=()=> {
        localStorage.clear();
		window.location.href = "/";
		}

		//add user to usertable
	const addUser = user => {
			user.id = users.length + 1
			setUsers([ ...users, user ])
		}
		//delete user from usertable
	const deleteUser = id => {
			setEditing(false)
			setUsers(users.filter(user => user.id !== id))
		}
		//update user from usertable
	const updateUser = (id,updatedUser) => {
			setEditing(false)
			setUsers(users.map(user => (user.id === id ? updatedUser : user)))
			}
		//edit row from usertable
	const editRow = user => {
			setEditing(true)
			setCurrentUser({ id: user.id, name: user.name, employeeid:user.employeeid,salary:user.salary,leaves:user.leaves })
		}
	return (
	<React.Fragment>
		<div className={classes.root}>
		<AppBar position="static">
		  <Toolbar>
			<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClickOpen}>
			  <MenuIcon />
			</IconButton>
			<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
			<DialogTitle id="customized-dialog-title" onClose={handleClose}>
			  Greetings.
			</DialogTitle>
			<DialogContent dividers>
			<Typography gutterBottom>
				Hey, We're super excited to have you as Admin....
				please explore
			  </Typography>
			<Typography gutterBottom>
				Thank You!
			  </Typography>
			 </DialogContent>
			</Dialog>
			<Typography variant="h5" className={classes.title}>
			  Employee App
			</Typography>
			<Button color="inherit" href="/" onClick={() => logout()}>LOGOUT</Button>
		  </Toolbar>
		</AppBar>
	<Grid container spacing={3}  >
		<Grid item xs={7}>
		<Paper className={classes.paper} >
				<div className="flex-large">
					<h2>View Employees</h2><br/><br/>
					<UserTable   addUser={addUser} editRow={editRow} deleteUser={deleteUser} />
				</div>
				</Paper>
		</Grid>
	<Grid item xs={5}  >
		<Paper className={classes.paper}>
	  	<div className="flex-row">
			  <div className="flex-large">
				  {editing ? (
					  <Fragment>
					  <img src={logo_2} alt="edit_logo" />
						  <h2>Edit Employee</h2>
						  <EditUserForm
							  editing={editing}
							  setEditing={setEditing}
							  currentUser={currentUser}
							  updateUser={updateUser}
						  />
					  </Fragment>
					  ) : (
					  <Fragment>
					  <img src={logo_1} alt="add_logo" />
						  <h2>Add Employee</h2>
						  <RegistrationUserForm addUser={addUser}  />
					  </Fragment>
				  )}
			  </div>
			  </div>
			  </Paper>
	  </Grid>
		</Grid>
			</div>
				</React.Fragment>
		)
}
export default App