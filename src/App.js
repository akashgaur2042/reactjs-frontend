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
import axios from 'axios';

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
	const [open, setOpen] = React.useState(false);
	//declare form attributes with null values
	const initialFormState = { id: null, name: '', employeeid: '', salary:'',leaves:'' }
	const [ users, setUsers ] = useState([]);
	//declare current-user as null 
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	//declare edit flag as false initially for editing
	const [ editing, setEditing ] = useState(false)
	let history = useHistory();
	const baseUrl="https://localhost:5001/api/Employee/";
	
	useEffect(()=>
	{
		const localStorage_flag=JSON.parse(localStorage.getItem("currentuser"));
		if(localStorage_flag !=null)
		{		
		getEmployees();
		}
		else{
			history.push('/');
		}
		
	 // eslint-disable-next-line react-hooks/exhaustive-deps
	 },[]);

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

	  function getEmployees() {
		  axios.get(baseUrl)
			  .then((res) => {
				  setUsers(res.data);
			  }).catch(err => {
				  
			  });
	  }
	  //addUser method uses axios post http method for sending data to server
	  const addUser = addUser => {
		const Name=addUser.name;
		const Employeeid=addUser.employeeid;
		const Salary=addUser.salary;
		const Leaves=addUser.leaves;
		axios.post(baseUrl, { Name,Employeeid,Salary,Leaves })
				  .then(res => {
					getEmployees();
			})
	}
	//delete user from usertable
	  const deleteUser = (id) => {
			axios.delete(baseUrl + id)
			  .then(res => {
				  getEmployees();
			  });
	};
	//update user from usertable, uses put axios http method
	const updateUser = (id,updatedUsers) => {
			setEditing(false);
			const Name=updatedUsers.name;
			 const Employeeid=updatedUsers.employeeid;
			 const Salary=updatedUsers.salary;
			 const Leaves=updatedUsers.leaves;
			axios.put(baseUrl+  id, {Name,Employeeid,Salary,Leaves})
				  .then(res => { 
					getEmployees();
					})
					}
	//edit row from usertable
	const editRow = (user) => {
			setEditing(true);
			getEmployees();
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
	<Grid container spacing={5}  >
		<Grid item xs={7}>
		<Paper className={classes.paper} >
				<div className="flex-large">
					<h2>View Employees</h2><br/><br/>
					<UserTable users={users} key={Math.random} editRow={editRow} deleteUser={deleteUser} />
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