import React from "react";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }

    this.onFieldChange = this.onFieldChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onFieldChange(e, fieldName) {
    this.setState({ [fieldName]: e.target.value })
  }

  async submit() {
    const loginUrl = '/api/users/login'
    const data = {
      username: this.state.username,
      password: this.state.password,
    }

    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    if (result.errno === 0) {
      window.location.assign("/")
    } else {
      console.error(result.message)
    }
  }

  render() {
    return (
      <section className="login-form">
        <input
          type="text"
          id="username"
          value={this.state.username}
          onChange={e => this.onFieldChange(e, 'username')}
          placeholder="username"
        />

        <input
          type="password"
          id="password"
          value={this.state.password}
          onChange={e => this.onFieldChange(e, 'password')}
          placeholder="password"
        />

        <button onClick={this.submit}>Login</button>
      </section>
    )
  }
}

export default Login;
