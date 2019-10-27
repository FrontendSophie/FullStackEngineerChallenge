import React from 'react'
import PaypayIcon from '../assets/images/paypay-icon.png'
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

  goToHome() {
    window.location.assign('/')
  }

  render() {
    const currentUser = this.context.user

    return (
      <nav className="flex-v-h-center">
        <img src={PaypayIcon} onClick={this.goToHome} alt="paypay-icon"/>
        <h2>PayPay Peformance Review System</h2>
        { currentUser && (
          <>
            <span>welcome, <strong>{currentUser.username}</strong>!</span>
            <button onClick={this.logout} className="btn-text">Logout</button>
          </>
        )}
      </nav>
    )
  }
}

export default Nav
