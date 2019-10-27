import React from 'react'
import { UserContext } from '../context';
import { Redirect } from 'react-router'

class Auth extends React.Component {
  static contextType = UserContext;

  render() {
    const currentUser = this.context.user

    const isAdmin = currentUser.role === 0
    if (isAdmin) {
        return <>{this.props.children}</>
    } else {
        return <Redirect to="/" />
    }
  }
}

export default Auth
