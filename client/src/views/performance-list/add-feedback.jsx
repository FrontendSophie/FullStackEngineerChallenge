import React from 'react'
import PropTypes from 'prop-types';
import { UserContext } from '../../context';
import Swal from 'sweetalert2'

class AddFeedBack extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props)

    this.state = {
      feedback: '',
      hasChange: false,
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
      Swal.fire('success', result.message, 'success')
      this.props.onUpdate()
    } else {
      Swal.fire('Oops...', 'Something went wrong', 'error')
    }
  }

  onFieldChange(e, fieldName) {
    this.setState({ 
      [fieldName]: e.target.value,
      hasChange: true,
    })
  }

  render() {
    const { data } = this.props;

    return (
      <li className="feedback">
        <span className="review-line">
          <strong>review:</strong> 
          {data.review}
        </span>
        {
          data.feedback ? (
            <span className="review-line">
              <strong>feedback:</strong> 
              {data.feedback}
            </span>
          ) : (
            <span className="flex-v-center">
              <textarea 
                className="flex-1"
                rows="2"
                placeholder="Write your feedback..."
                value={this.state.feedback}
                onChange={e => this.onFieldChange(e, 'feedback')}
              >
              </textarea>
              <button 
                onClick={() => this.submit(data.reviewerId)} 
                disabled={!this.state.hasChange || !this.state.feedback}
              >
                <svg viewBox="0 0 20 20" className="icon-add">
                  <path
                    d="M11 9v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10v0c5.523 0 10 4.477 10 10s-4.477 10-10 10v0z"
                  ></path>
                </svg>
              </button>
            </span>
          )
        }
      </li>
    )
  }
}

AddFeedBack.propTypes = {
  data: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default AddFeedBack
