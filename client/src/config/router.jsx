import React from 'react'
import { Route } from 'react-router'
import Index from '../views/index'
import Login from '../views/login'
import EmployeeList from '../views/employee-list/'

export default () => [
  <Route key="root" path="/" component={Index} exact />,
  <Route key="login" path="/login" component={Login} />,
  <Route key="employee-list" path="/employee-list" component={EmployeeList} />,
]