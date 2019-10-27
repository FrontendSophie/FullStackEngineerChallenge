import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Routes from './config/router'
import './App.css';

import { UserContext } from './context';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this.getCurrentUser()
  }

  async getCurrentUser() {
    const getUrl = `/api/users/current`
    
    const response = await fetch(getUrl)
    const result = await response.json()
    if (result.errno === 0) {
      this.setState({
        user: result.data
      })
    }
  }

  render() {
    if (!this.state.user) {
      return null
    }

    return (
      <UserContext.Provider value={{user: this.state.user, updateUser: (user) => {
        this.setState({
          user
        })
      }}}>
        <BrowserRouter>
          <div className="App">
            <Routes />
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    )
  };
}

export default App;
