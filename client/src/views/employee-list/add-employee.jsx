import React from "react";
import PropTypes from 'prop-types';
import Swal from 'sweetalert2'

class AddEmployee extends React.Component {
  constructor(props) {
    super(props);
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
    const url = '/api/users'
    const data = {
      username: this.state.username,
      password: this.state.password,
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    if (result.errno === 0) {
        Swal.fire('success', result.message, 'success')
        this.setState ({
            username: '',
            password: '',
        })
        this.props.onAdd()
    } else {
      Swal.fire('Oops...', 'Something went wrong', 'error')
    }
  }

  render() {
    const isFormInvalid = !this.state.username || !this.state.password

    return (
      <div className="employee-form flex-v-center">
        <input
          type="text"
          id="username"
          value={this.state.username}
          onChange={e => this.onFieldChange(e, 'username')}
          placeholder="username"
          required
        />

        <input
          type="password"
          id="password"
          value={this.state.password}
          onChange={e => this.onFieldChange(e, 'password')}
          placeholder="password"
          required
        />

        <button onClick={this.submit} disabled={isFormInvalid}>
          <svg viewBox="0 0 20 20" className="icon-add">
            <path
              d="M11 9v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10v0c5.523 0 10 4.477 10 10s-4.477 10-10 10v0z"
            ></path>
          </svg>
        </button>
      </div>
    )
  }
}

AddEmployee.propTypes = {
  onAdd: PropTypes.func.isRequired,
}

export default AddEmployee;
