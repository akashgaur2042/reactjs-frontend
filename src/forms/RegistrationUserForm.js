import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';


//regex expression for e-mail validation
const validEmailRegex = RegExp(
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
);
//regex expression for numbric values 
const numbric=RegExp(/^[0-9\b]+$/);
export default class RegistrationUserForm extends React.Component {
constructor() {
    super();
    //decalring all User-Form attributes as null
    this.state = {
      user:{  
        name: null,
        employeeid: null,
        salary: null,
        leaves: null,
      },
        errors: {
          name: '',
          employeeid: '',
          salary: '',
          leaves:'',
        },
 };
}
  //declaring material-ui styling attributes 
  useStyles = makeStyles((theme) => ({
	root: {
	  display: 'flex',
    flexWrap: 'wrap',
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
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
  //using method for form validation using switch statements 
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'name': 
      errors.name = 
          value.length < 5
            ? 'enter name at least 5 characters long!' 
            : '';
            break;
      case 'employeeid': 
        errors.employeeid = 
          validEmailRegex.test(value)
            ? ''
            :  'e-mail is not valid!';
        break;
      case 'salary': 
        errors.salary = 
        !numbric.test(value) || value.length < 3
            ? 'only numbric Values and  digits atleast!'
            : '';
        break;
      case 'leaves': 
        errors.leaves = 
        !numbric.test(value) || value.length > 3
            ? this.save=false && 'only numbric values and 3 digits atmost!'
            : this.save=true;
        break;
      default:
        break;
    }
    this.setState({errors, [name]: value});
  
  }  
   //submit method for form submission
   handleSubmit = (event) => {
    event.preventDefault();
     const User = {
      name: this.state.name,
      employeeid: this.state.employeeid,
      salary: this.state.salary,
      leaves: this.state.leaves
      }
    this.props.addUser(User);
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
		
			onChange={this.handleChange}
            variant="outlined"
		     noValidate />
		  <br/>
              {errors.name.length > 0 && 
                <span className='error' >{errors.name}</span>}
            </div>
            <br/>
      <div className='employeeid'>
             <TextField
		  label="E-Mail"
		  name="employeeid"
          id="outlined-start-adornment"
          className={clsx(this.useStyles.margin, this.useStyles.textField)}
         
		  onChange={this.handleChange}
		  variant="outlined"
          noValidate
		/><br/>
        {errors.employeeid.length > 0 && <span className='error'>{errors.employeeid}</span>}
          </div><br/>
          <div className='salary'>
          <TextField
          label="Salary:"
         name="salary"
		    className={clsx(this.useStyles.margin, this.useStyles.textField)}
          InputProps={{
          startAdornment: <InputAdornment >$</InputAdornment>,
		  }}
		onChange={this.handleChange}
		variant="outlined"
          noValidate
		/>
		<br/>
              {errors.salary.length > 0 && 
                <span className='error' >{errors.salary}</span>}
            </div><br/>
            <div className='leaves'>
             <TextField
             label="Leaves"
		  name="leaves"
          id="outlined-start-adornment"
          className={clsx(this.useStyles.margin, this.useStyles.textField)}
         
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
        disabled={!this.save}
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


