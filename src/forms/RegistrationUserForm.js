import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const numbric=RegExp(/^[0-9\b]+$/);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};
export default class RegistrationUserForm extends React.Component {
constructor() {
    super();
    //  this.classes = this.useStyles();
    this.state = {
        name: null,
        employeeid: null,
        salary: null,
        leaves: null,
        errors: {
          name: '',
          employeeid: '',
          salary: '',
          leaves:'',
        },
        flag:true,
      };
    }
  useStyles = makeStyles((theme) => ({
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
	  width: '15ch',
    },
   wrapper: {
		margin: theme.spacing(1),
		position: 'relative',
	  },
	}));
  refreshPage=()=> {
    const timer = setTimeout(() =>{window.location.reload(false);}, 200);
    return () => clearTimeout(timer);
  }
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'name': 
      errors.name = 
          value.length < 5
            ? this.flag=true && 'enter name at least 5 characters long!' 
            : '';
            break;
      case 'employeeid': 
        errors.employeeid = 
          validEmailRegex.test(value)
            ? ''
            : this.flag=true && 'e-mail is not valid!';
        break;
      case 'salary': 
        errors.salary = 
        !numbric.test(value) || value.length < 5
            ?this.flag=true && 'only numbric Values and 5 digits atleast!'
            : '';
        break;
      case 'leaves': 
        errors.leaves = 
        !numbric.test(value) || value.length > 3
            ? this.flag=true && 'only numbric values and 3 digits atmost!'
            : this.flag=false;
        break;
      default:
        break;
    }
    this.setState({errors, [name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      console.info('Valid Form')
    }else{
        console.info('Invalid Form')
    }
  const User = {
        name: this.state.name,
        employeeid: this.state.employeeid,
        salary: this.state.salary,
        leaves: this.state.leaves
        };
      const Name=User.name;
       const Employeeid=User.employeeid;
       const Salary=User.salary;
       const Leaves=User.leaves;
       const baseUrl=`https://localhost:5001/api/Employee`;
       axios.post(baseUrl, { Name,Employeeid,Salary,Leaves })
				  .then(res => {
					console.log(res);
					console.log(res.data);
					
			})
  }
  render() {
    const {errors} = this.state;
    return (
      <div className='wrapper'>
        <div className='form-wrapper'>
         <form onSubmit={this.handleSubmit} noValidate>
            <div className='name'>
              <TextField
			label="Name: "
			name="name"
			id="outlined-start-adornment"
			className={clsx(this.useStyles.margin, this.useStyles.textField)}
			InputProps={{
			  startAdornment: <InputAdornment position="start"></InputAdornment>,
			}}
			onChange={this.handleChange}
            variant="outlined"
		     noValidate />
		  <br/>
              {errors.name.length > 0 && 
                <span className='error'>{errors.name}</span>}
            </div>
            <br/>
      <div className='employeeid'>
             <TextField
		  label="Employee ID:"
		  name="employeeid"
          id="outlined-start-adornment"
          className={clsx(this.useStyles.margin, this.useStyles.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
		  }}
		  onChange={this.handleChange}
		  variant="outlined"
          noValidate
		/><br/>
        {errors.employeeid.length > 0 && 
                <span className='error'>{errors.employeeid}</span>}
           </div><br/>
            <div className='salary'>
            <TextField
            
      label="Salary:"
		  name="salary"
          id="outlined-start-adornment"
          className={clsx(this.useStyles.margin, this.useStyles.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start">INR.</InputAdornment>,
		  }}
		onChange={this.handleChange}
		variant="outlined"
          noValidate
		/>
		<br/>
              {errors.salary.length > 0 && 
                <span className='error' color="red">{errors.salary}</span>}
            </div><br/>
            <div className='leaves'>
             <TextField
             
	    label="Leaves"
		  name="leaves"
          id="outlined-start-adornment"
          className={clsx(this.useStyles.margin, this.useStyles.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
		  }}
		onChange={this.handleChange}
	        variant="outlined"
          noValidate
		/>
		<br/>
              {errors.leaves.length > 0 && 
                <span className='error'>{errors.leaves}</span>}
            </div> <br/><br/>
    <Grid container justify="center">
		<div className={this.useStyles.root}>
		<div className={this.useStyles.wrapper}>
        <Button
          variant="contained"
		  color="primary"
		  type="submit"
        //   disabled={!this.formValid}
        disabled={this.flag}
        onClick={this.refreshPage}
		>
          Save
        </Button>
        </div>
			</div>
			</Grid>
          </form>
        </div>
      </div>
    );
  }
}


