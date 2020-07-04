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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme)=>({
  table: {
    minWidth: 650,
    borderBottom:2
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
  var Employeeid=users.employeeid;
  const baseUrl="https://localhost:5001/api/Employee/"
 useEffect(()=> {
   axios.get(baseUrl)
   .then((res)=>{
    setUsers(res.data);   
   });
  },[]);
<<<<<<< HEAD
  const deleteUser = id => {
  axios.delete(baseUrl+id)
=======

  const deleteUser = employeeid => {
    
    axios.delete(`https://localhost:5001/api/Employee/${users.employeeid}`)
>>>>>>> d8f67889743031e8bbd7756460350d6b831ce7e2
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
<<<<<<< HEAD
    setUsers(users.filter(user => user.employeeid !== id))
=======
    setUsers(users.filter(user => user.employeeid !== employeeid))
>>>>>>> d8f67889743031e8bbd7756460350d6b831ce7e2
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
               <Fab size="small" color="primary" aria-label="edit"  
              onClick={() => { 
              props.editRow(employee)
              }}>
              <EditIcon fontSize="small"/>
              </Fab>&nbsp;&nbsp;&nbsp;
              <IconButton aria-label="delete" className={classes.margin} onClick={() => deleteUser(employee.employeeid)}>
          <DeleteIcon fontSize="small" />
         </IconButton>
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

