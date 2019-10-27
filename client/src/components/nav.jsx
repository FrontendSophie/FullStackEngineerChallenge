import React from 'react'
import PaypayIcon from '../assets/images/paypay-icon.png'
import { UserContext } from '../context';
import { Link } from 'react-router-dom'

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
      <nav className="flex-v-h-center">
        <Link to="/">
          <img src={PaypayIcon} alt="paypay-icon" className="logo"/>
          <span className="logo-text">PayPay Peformance Review System</span>
        </Link>
        { currentUser && (
          <div>
            <span className="welcome-text">welcome, <strong>{currentUser.username}</strong>!</span>
            <button onClick={this.logout} className="btn-text">Logout</button>
          </div>
        )}
      </nav>
    )
  }
}

export default Nav
