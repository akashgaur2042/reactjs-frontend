import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

//setting attributes of material-ui stylings
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
  const users = props.users;

 return(
  <TableContainer component={Paper}>
  <table className={classes.table} aria-label="simple table">
    <thead>
      <tr>
       <th>E-Mail</th>
        <th>Name</th>
        <th>Salary</th>
        <th>Leaves</th> 
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.length  > 0 ? (
        users.map(employee => (
          <tr key={employee.employeeid}>
            <td>{employee.employeeid}</td>
            <td>{employee.name}</td>
            <td>{employee.salary}</td>
            <td>{employee.leaves}</td>
            <td>
              <IconButton aria-label="edit" className={classes.margin} onClick={() => { 
              props.editRow(employee)
              }}>
          <EditIcon fontSize="small" />
         </IconButton>
           &nbsp;&nbsp;&nbsp;
              <IconButton aria-label="delete" className={classes.margin} onClick={() => props.deleteUser(employee.employeeid)}>
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

