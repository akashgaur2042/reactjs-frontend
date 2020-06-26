import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
	  display: 'flex',
	  flexWrap: 'wrap',
	},
	margin: {
	  margin: theme.spacing(1),
	},
	withoutLabel: {
	  marginTop: theme.spacing(3),
	},
	textField: {
	  width: '25ch',
	},
	wrapper: {
		margin: theme.spacing(1),
		position: 'relative',
	  },
	buttonSuccess: {
		backgroundColor: green[500],
		'&:hover': {
		  backgroundColor: green[700],
		}},
		  buttonProgress: {
			color: green[500],
			position: 'absolute',
			top: '50%',
			left: '50%',
			marginTop: -12,
			marginLeft: -12,
		  }
		}));


const AddUserForm = props => {

	const classes = useStyles();
	  
	const initialFormState = {  name: '', employeeid: '', salary:'',leaves:'' }
	const [ user, setUser ] = useState(initialFormState) 

	
	  const[redirect, setRedirect]=useState(false);

	  useEffect(() => {
		const timer = setTimeout(() => setRedirect({redirect: true}), 20000);
		return () => clearTimeout(timer);

	}, []);
	
	
	const handleInputChange = event => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
	}
	const Name=user.name;
	const Employeeid=user.employeeid;
	const Salary=user.salary;
	const Leaves=user.leaves;

	

	  

		

	 return (
		<form
		
		onSubmit = {event => {
				event.preventDefault();
				axios.post(`https://localhost:5001/api/Employee`, { Name,Employeeid,Salary,Leaves })
				  .then(res => {
					console.log(res);
					console.log(res.data);
			})
				
					if (!user.name || !user.employeeid || !user.salary || !user.leaves) return 
					
					props.addUser(user)
					setUser(initialFormState)
				
			
				 
			  }}

		>
		<TextField
			label="Name: "
			name="name"
			id="outlined-start-adornment"
			className={clsx(classes.margin, classes.textField)}
			InputProps={{
			  startAdornment: <InputAdornment position="start"></InputAdornment>,
			}}
			
			onChange={handleInputChange}
			value={user.name}
  
			variant="outlined"
		  /><br/>



			<TextField
		  label="Employee ID:"
		  name="employeeid"
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
		  }}
		//   value={employeeid}
		  onChange={handleInputChange}
		  value={user.employeeid}
		//   onChange={e => setUser(e.target.value)}
		  variant="outlined"
        /><br/>
		
		<TextField
		
		  label="Salary:"
		  name="salary"
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start">INR.</InputAdornment>,
		  }}
		//   value={salary}
		  onChange={handleInputChange}
		  value={user.salary}
		//   onChange={e => setUser(e.target.value)}
		  variant="outlined"
		/><br/>
		
		<TextField
		
		  label="Leaves"
		  name="leaves"
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
		  }}
		//   value={leaves}
		  onChange={handleInputChange}
		  value={user.leaves}
		//   onChange={e => setUser(e.target.value)}
		  

          variant="outlined"
        /><br/><br/>


		<Grid container justify="center">
			
			
		<div className={classes.root}>
		<div className={classes.wrapper}>
        <Button
          variant="contained"
		  color="primary"
		  type="submit"
         
		//   onClick={addValues}

		
		  
        >
          Save
        </Button>
        
        </div>
			</div>
			</Grid>



		</form>
	)
}


export default AddUserForm