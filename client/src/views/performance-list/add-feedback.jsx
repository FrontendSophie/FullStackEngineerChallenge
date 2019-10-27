import React from 'react'
import PropTypes from 'prop-types';
import { UserContext } from '../../context';

class AddFeedBack extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props)

    this.state = {
      feedback: '',
    }

    this.submit = this.submit.bind(this)
  }

  async submit(reviewerId) {
    if (!this.state.feedback) return

    const currentUser = this.context.user
    const url = `/api/reviews/${currentUser.id}/feedback`
    const data = {
      feedback: this.state.feedback,
      reviewerId
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    if (result.errno === 0) {
      this.props.onUpdate()
    } else {
      console.error(result.message)
    }
  }

  onFieldChange(e, fieldName) {
    this.setState({ [fieldName]: e.target.value })
  }

  render() {
    const { data } = this.props;

    return (
      <div className="feedback">
        <p>Review: {data.review}</p>
        {
          data.feedback ? (
            <p>My feedback: {data.feedback}</p>
          ) : (
            <>
              <textarea 
                name="" 
                id="" 
                cols="30" 
                rows="10"
                value={this.state.feedback}
                onChange={e => this.onFieldChange(e, 'feedback')}
              >
              </textarea>
              <button onClick={() => this.submit(data.reviewerId)}>ADD</button>
            </>
          )
        }
      </div>
    )
  }
}

AddFeedBack.propTypes = {
  data: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default AddFeedBack
