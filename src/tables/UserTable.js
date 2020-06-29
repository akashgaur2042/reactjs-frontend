import React, {useState, useEffect} from 'react'
import { Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';



const useStyles = makeStyles((theme)=>({
  table: {
    minWidth: 650,
  },
  root: {
    color: theme.palette.text.primary,
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function UserTable(props)
{
  const classes = useStyles();

  const [ users, setUsers ] = useState([])

  console.log(users.name);
  
 useEffect(()=> {
   axios.get("https://localhost:5001/api/Employee")
   .then((res)=>{
    setUsers(res.data);    
    });
  },[]);

  const deleteUser = employeeid => {
    
    axios.delete(`https://localhost:5001/api/Employee/${users.employeeid}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    setUsers(users.filter(user => user.employeeid !== employeeid))
  }
 
return(
  
  <TableContainer component={Paper}>

  <table className={classes.table} aria-label="simple table">
    <thead>
      <tr>
       
        <th>Employee ID</th>
        <th>Name</th>
        <th>Salary</th>
        <th>Leaves</th> 
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.length  > 0 ? (
        users.map(employee => (
          <tr key={employee.id}>
            
            <td>{employee.employeeid}</td>
            <td>{employee.name}</td>
            <td>{employee.salary}</td>
            <td>{employee.leaves}</td>
            <td>
               
              <Fab color="primary" aria-label="edit"  
              onClick={() => { 
              props.editRow(employee)
              }}>
              <EditIcon />
              </Fab>&nbsp;&nbsp;&nbsp;
              <Button
              variant={'contained'} 
                onClick={() => deleteUser(employee.id)}
                className="button muted-button"
              >
              <Grid container className={classes.root}>
      
              <Grid item xs={1}>
              <DeleteForeverTwoToneIcon />
               
              </Grid>
              </Grid>
              </Button>
              </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No employee</td>
        </tr>
      )}
    </tbody>
  </table>
  </TableContainer>
);}

