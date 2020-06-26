import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";


import login from "./login/login";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";
import UserTable from "./tables/UserTable";
import App from "./App";



export default class Routes extends Component  {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" Component={login} />
                    <Route exact path="/App" component={App} />
                    
                    <Route path="/AddUserForm" component={AddUserForm} />
                    <Route path="/EditUserForm" component={EditUserForm} />
                    <Route path="/UserTable" component={UserTable} />
                </Switch>
            </Router>
        )
    }
}