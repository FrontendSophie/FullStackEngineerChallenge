import React from 'react'
import { Route } from 'react-router'
import Index from '../views/index'
import Login from '../views/login'
import EmployeeList from '../views/employee-list'
import Assign from '../views/assign'
import Review from '../views/review'

export default () => [
  <Route key="root" path="/" component={Index} exact />,
  <Route key="login" path="/login" component={Login} />,
  <Route key="employee-list" path="/employee-list" component={EmployeeList} />,
  <Route key="assign" path="/assign/:id" component={Assign} />,
  <Route key="review" path="/review/:id" component={Review} />,
]