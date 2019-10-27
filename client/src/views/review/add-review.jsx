import React from 'react'
import PropTypes from 'prop-types';

class AddReview extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      review: undefined,
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
      if (this.props.onUpdate) {
        this.props.onUpdate()
      }
    } else {
      console.error(result.message)
    }
  }

  onFieldChange(e, fieldName) {
    this.setState({ [fieldName]: e.target.value })
  }

  render() {
    const { reviewee, review } = this.props;
    const defaultReview = review ? review : ''

    return (
      <section className="review">
        <h4>Review {reviewee && reviewee.username}:</h4>
        <textarea 
            name="" 
            id="" 
            cols="30" 
            rows="10"
            value={this.state.review === undefined ? defaultReview : this.state.review}
            onChange={e => this.onFieldChange(e, 'review')}
        >
        </textarea>
        <button onClick={() => this.submit()}>UPDATE</button>
      </section>
    )
  }
}

AddReview.propTypes = {
  reviewee: PropTypes.object.isRequired,
  review: PropTypes.string,
  onUpdate: PropTypes.func,
}

export default AddReview
