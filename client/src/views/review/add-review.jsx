import React from 'react'
import PropTypes from 'prop-types';
import Swal from 'sweetalert2'

class AddReview extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      review: undefined,
      hasChange: false,
    }
  }

  async submit() {
    if (!this.state.review) return

    const revieweeId = this.props.reviewee.id
    const url = `/api/reviews/${revieweeId}`
    const data = {
      review: this.state.review,
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
      this.setState({
        hasChange: false,
      })

      if (this.props.onUpdate) {
        this.props.onUpdate()
      }
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
    const { review } = this.props;
    const defaultReview = review ? review : ''

    return (
      <div className="add-review flex-v-center">
        <textarea 
            className="flex-1" 
            rows="4"
            value={this.state.review === undefined ? defaultReview : this.state.review}
            placeholder="Write your review..."
            onChange={e => this.onFieldChange(e, 'review')}
        >
        </textarea>
        <button 
          onClick={() => this.submit()} 
          className="btn btn-primary"
          disabled={!this.state.hasChange || !this.state.review}
        >
          UPDATE
        </button>
      </div>
    )
  }
}

AddReview.propTypes = {
  reviewee: PropTypes.object.isRequired,
  review: PropTypes.string,
  onUpdate: PropTypes.func,
}

export default AddReview
