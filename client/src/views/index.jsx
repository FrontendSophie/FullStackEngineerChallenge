import React from "react";
import { Redirect } from 'react-router'
import EmployeeList from './employee-list';
import PerformanceList from './performance-list';
import PropTypes from 'prop-types';
import { UserContext } from '../context';

class Index extends React.Component {
  static childContextTypes = {
    history: PropTypes.object
  }

  getChildContext() {
    return {
      history: this.props.history
    }
  }

  static contextType = UserContext;

  render() {
    const currentUser = this.context.user
    
    if (!currentUser.username) {
      return <Redirect to="/login" />
    }

    const isAdmin = currentUser.role === 0
    if (isAdmin) {
      return <div><EmployeeList /></div>
    } else {
      return <div><PerformanceList /></div>
    }
  }
}

export default Index;
