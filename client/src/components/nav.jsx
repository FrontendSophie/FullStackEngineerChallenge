import React from 'react'
import PaypayIcon from '../images/paypay-icon.png'
import { UserContext } from '../context';

class Nav extends React.Component {
  static contextType = UserContext;

  async logout() {
    const logoutUrl = '/api/users/logout'
   
    const response = await fetch(logoutUrl, {
      method: 'POST'
    })
    const result = await response.json()
    if (result.errno === 0) {
      window.location.assign('/')
    } else {
      console.error(result.message)
    }
  }

  render() {
    const currentUser = this.context.user

    return (
      <nav>
        <img src={PaypayIcon} alt="paypay-icon"/>
        { currentUser && (
          <>
            <span>welcome, {currentUser.username}</span>
            <button onClick={this.logout}>Logout</button>
          </>
        )}
      </nav>
    )
  }
}

export default Nav
