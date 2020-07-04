import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

//setting attributes of material-ui stylings
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
  }));
const EditUserForm = props => {
const classes = useStyles();
//declare user and set user as current-user
const [ user, setUser ] = useState(props.currentUser)
//use life cycle hook method for set user as current-user
useEffect(
    () => {
      setUser(props.currentUser)
  },
    [ props ]
  )
  var Name=user.name;
  var Employeeid=user.employeeid;
  var Salary=user.salary;
  var Leaves=user.leaves;
  const handleInputChange = event => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }
  const baseUrl=`https://localhost:5001/api/Employee/`;
  //using axios put http method for updation
  function update()
   {
	  axios.put(baseUrl+  Employeeid, {Name, Employeeid, Salary,Leaves})
				  .then(res => {
					console.log(res);
					console.log(res.data);
					})
    }
    //refresh method for refreshing page
  const refreshPage=()=> {
      const timer = setTimeout(() =>{window.location.reload(false);}, 200);
      return () => clearTimeout(timer);
    }
  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        props.updateUser(Employeeid, user)
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
    value={user.name}
    onChange={handleInputChange}
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
    value={user.employeeid}
    onChange={handleInputChange}
    variant="outlined"
      /><br/>
    <TextField
      label="Salary"
		  name="salary"
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start">INR.</InputAdornment>,
		  }}
		  value={user.salary}
      onChange={handleInputChange}
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
    value={user.leaves}
    onChange={handleInputChange}
    variant="outlined"
      /><br/><br/>
      <Button type='submit' variant={'contained'} color={'primary'} onClick={()=>{update();refreshPage()}}>Update Employee</Button>&nbsp;
      <Button type='submit' variant={'contained'} color={'primary'} onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </Button>
    </form>
  )
}
export default EditUserForm