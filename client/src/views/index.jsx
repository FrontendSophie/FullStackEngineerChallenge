import React from "react";
import { Redirect } from 'react-router'
import EmployeeList from './employee-list';
import PropTypes from 'prop-types';

const Status = {
  Idle: 'Idle',
  Loading: 'Loading',
  Loaded: 'Loaded',
  Error: 'Error'
}

class Index extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      status: Status.Idle,
      user: null
    }
  }

  static childContextTypes = {
    history: PropTypes.object
  }

  getChildContext() {
    return {
      history: this.props.history
    }
  }

  async componentDidMount() {
    this.setState({
      status: Status.Loading
    })

    const url = '/api/users/current'

    try {
      const response = await fetch(url)
      const result = await response.json()
      if (result.errno === 0) {
        this.setState({
          status: Status.Loaded,
          user: result.data.user
        })
      } else {
        this.setState({
          status: Status.Error
        })
      }
    } catch (e) {
      this.setState({
        status: Status.Error
      })
    }
  }

  render() {
    const { status, user } = this.state;
    if (status === Status.Loading || status === Status.Idle) {
      return <div><h1>Loading</h1></div>
    }

    if (status === Status.Error) {
      return <Redirect to="/login" />
    }

    if (!user.username) {
      return <Redirect to="/login" />
    }

    const isAdmin = user.role === 0
    if (isAdmin) {
      return <div><EmployeeList /></div>
    }

    return (
      <div>Index page</div>
    )
  }
}

export default Index;
