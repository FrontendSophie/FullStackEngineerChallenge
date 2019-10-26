import React from 'react'
import PropTypes from 'prop-types';

class AddReviewee extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      revieweeId: null,
    }

    this.submit = this.submit.bind(this)
  }

  onFieldChange(e, fieldName) {
    this.setState({ [fieldName]: parseInt(e.target.value, 10) })
  }

  async submit() {
    if (this.state.revieweeId === null) return

    const url = `/api/users/${this.props.currentUserId}/reviewee`
    const data = {
      revieweeId: this.state.revieweeId,
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
      this.props.onAdd()
    } else {
      console.error(result.message)
    }
  }

  render() { 
    return (
      <div className="reviewee-form">
        <select 
          defaultValue={'DEFAULT'}
          onChange={e => this.onFieldChange(e, 'revieweeId')}
        >
          <option value="DEFAULT" disabled hidden>Please select</option>
          {
            this.props.filteredUsers.map(user => (
              <option value={user.id} key={user.id}>{user.username}</option>
            ))
          }
        </select>

        <button onClick={this.submit}>ADD</button>
      </div>
    )
  }
}

AddReviewee.propTypes = {
  currentUserId: PropTypes.number.isRequired,
  filteredUsers: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
}

export default AddReviewee
