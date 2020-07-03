// import React, { useState } from 'react'
// import { Button } from '@material-ui/core';
// import InputAdornment from '@material-ui/core/InputAdornment';

// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import clsx from 'clsx';

// import Grid from '@material-ui/core/Grid';
// import axios from 'axios';
// import ValidationMessage from './ValidationMessage'



// const useStyles = makeStyles((theme) => ({
// 	root: {
// 	  display: 'flex',
// 	  flexWrap: 'wrap',
// 	},
// 	margin: {
// 	  margin: theme.spacing(1),
// 	},
// 	withoutLabel: {
// 	  marginTop: theme.spacing(3),
// 	},
// 	textField: {
// 	  width: '25ch',
// 	},
// 	wrapper: {
// 		margin: theme.spacing(1),
// 		position: 'relative',
// 	  },
	
// 		}));

	


// const AddUserForm = props => {

	

// 	const classes = useStyles();
// 	// let history = useHistory();
	  
// 	const initialFormState = {  name: '', employeeid: '', salary:'',leaves:'' }
// 	const [ user, setUser ] = useState(initialFormState) 

	

// 	function refreshPage() {
// 		const timer = setTimeout(() =>{window.location.reload(false);}, 5000);
// 		return () => clearTimeout(timer);
// 	  }
	
	
// 	// const handleInputChange = event => {
// 	// 	const { name, value } = event.target

// 	// 	setUser({ ...user, [name]: value })
// 	// }
	
// 	const Name=user.name;
// 	const Employeeid=user.employeeid;
// 	const Salary=user.salary;
// 	const Leaves=user.leaves;

// 	const [nameValid, setNameValid]=useState(false);
// 	const [employeeidValid, setEmployeeidValid]=useState(false);
// 	const [salaryValid, setSalaryValid]=useState(false);
// 	const [leavesValid, setLeavesValid]=useState(false);
// 	const [formValid, setFormValid]=useState(false);
// 	const [errorMsg, setErrorMsg]=useState({});


// 	function validateForm() {
// 		setFormValid ( nameValid && employeeidValid && salaryValid && leavesValid)
// 	  }

	

// 	 function validateName() {
// 		setNameValid(true);
// 		 setErrorMsg({...useState.errorMsg})
	
// 		if (Name.length < 1) {
// 			setNameValid(false);
// 		  errorMsg.username = 'Must be at least 1 characters long'
// 		}
	
// 		setNameValid({nameValid, errorMsg}, validateForm)
// 	  }
	  
// 	  const updateName = (Name) => {
// 		setUser({Name}, validateName)
// 	  }


// 	  function validateEmployeeid() {
		
// 		setEmployeeidValid(true);
// 		var errorMsg = {...useState.errorMsg}
	
// 		// checks for format _@_._
// 		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Employeeid)){
// 			employeeidValid(false);
// 		  errorMsg.Employeeid = 'Invalid email format'
// 		}
	
// 		setEmployeeidValid({employeeidValid, errorMsg}, validateForm)
// 	  }

// 	  const updateEmployeeid = (Employeeid) => {
// 		setUser({Employeeid}, validateEmployeeid)
// 	  }

// 		function validateSalary (){
		
// 		setSalaryValid(true);
// 		 var errorMsg = {...useState.errorMsg}
	
// 		if (Salary.length < 6) {
// 			setSalaryValid(false);
// 		  errorMsg.Salary = 'Password must be at least 6 characters long';
// 		} 
	
// 		setSalaryValid({salaryValid, errorMsg}, validateForm);
// 	  }

// 	  const updateSalary = (Salary) => {
// 		setUser({Salary}, validateSalary)
// 	  }

// 	  function validateLeaves (){
		
// 		setLeavesValid(true);
// 		var errorMsg = {...useState.errorMsg}
	
// 		if (Leaves.length < 2) {
// 			setLeavesValid(false);
// 		  errorMsg.Salary = 'Password must be at least 2 characters long';
// 		} 
	
// 		setLeavesValid({leavesValid, errorMsg}, validateForm);
// 	  }
// 	  const updateLeaves = (Leaves) => {
// 		setUser({Leaves}, validateLeaves)
// 	  }

// 	 return (
// 		<form action='#'
		
// 		onSubmit = {event => {
// 				event.preventDefault();
// 				axios.post(`https://localhost:5001/api/Employee`, { Name,Employeeid,Salary,Leaves })
// 				  .then(res => {
// 					console.log(res);
// 					console.log(res.data);
					
// 			})
				


					
// 					setUser(initialFormState)
// 				}}

// 		>
// 		<TextField
// 			label="Name: "
// 			name="name"
// 			id="outlined-start-adornment"
// 			className={clsx(classes.margin, classes.textField)}
// 			InputProps={{
// 			  startAdornment: <InputAdornment position="start"></InputAdornment>,
// 			}}
			
// 			// onChange={handleInputChange}

// 			onChange={(e) => updateName(e.target.value)}
// 			value={user.name}
  
// 			variant="outlined"
// 		  />
// 		  <ValidationMessage valid={useState.validateName} message={errorMsg.Name} />
// 		  <br/>



// 			<TextField
// 		  label="Employee ID:"
// 		  name="employeeid"
//           id="outlined-start-adornment"
//           className={clsx(classes.margin, classes.textField)}
//           InputProps={{
//             startAdornment: <InputAdornment position="start"></InputAdornment>,
// 		  }}
		
// 		//   onChange={handleInputChange}
// 		onChange={(e) => updateEmployeeid(e.target.value)}
// 		  value={user.employeeid}
		
// 		  variant="outlined"
// 		/>
// 		<ValidationMessage Valid={useState.employeeidValid} message={errorMsg.Employeeid} />
// 		<br/>
		
// 		<TextField
		
// 		  label="Salary:"
// 		  name="salary"
//           id="outlined-start-adornment"
//           className={clsx(classes.margin, classes.textField)}
//           InputProps={{
//             startAdornment: <InputAdornment position="start">INR.</InputAdornment>,
// 		  }}
		
// 		//   onChange={handleInputChange}
// 		onChange={(e) => updateSalary(e.target.value)}
// 		  value={user.salary}
		
// 		  variant="outlined"
// 		/>
// 		<ValidationMessage Valid={useState.salaryValid} message={errorMsg.Salary} />
// 		<br/>
		
// 		<TextField
		
// 		  label="Leaves"
// 		  name="leaves"
//           id="outlined-start-adornment"
//           className={clsx(classes.margin, classes.textField)}
//           InputProps={{
//             startAdornment: <InputAdornment position="start"></InputAdornment>,
// 		  }}
		
// 		//   onChange={handleInputChange}
// 		  onChange={(e) => updateLeaves(e.target.value)}
// 		  value={user.leaves}
		
		  

//           variant="outlined"
// 		/>
// 		<ValidationMessage Valid={useState.leavesValid} message={errorMsg.Leaves} />
// 		<br/><br/>


// 		<Grid container justify="center">
			
			
// 		<div className={classes.root}>
// 		<div className={classes.wrapper}>
//         <Button
//           variant="contained"
// 		  color="primary"
// 		  type="submit"
// 		  disabled={!useState.formValid}
         

// 		onClick={refreshPage}
// 		>
//           Save
//         </Button>
        
//         </div>
// 			</div>
// 			</Grid>



// 		</form>
// 	)
// }


// export default  AddUserForm