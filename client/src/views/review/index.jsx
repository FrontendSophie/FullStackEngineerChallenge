import React from 'react'
import AddReview from './add-review'

class Review extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      reviewee: null,
      currentUser: null,
      myReview: '',
      reviews: [],
    }

    this.getAllReviews = this.getAllReviews.bind(this)
  }

  async componentDidMount() {
    this.getReviewee()
    this.getAllReviews()
    await this.getCurrentUser()
    await this.getMyReview()
  }

  async getCurrentUser() {
    const getUrl = `/api/users/current`
    
    const response = await fetch(getUrl)
    const result = await response.json()
    if (result.errno === 0) {
      this.setState({
        currentUser: result.data.user
      })
    }
  }

  async getMyReview() {
    const { currentUser } = this.state;
    const revieweeId = this.props.match.params.id
    const getUrl = `/api/reviews/${revieweeId}?reviewerId=${currentUser.id}`
    
    const response = await fetch(getUrl)
    const result = await response.json()
    if (result.errno === 0) {
      if (result.data[0]) {
        this.setState({
          myReview: result.data[0].review
        })
      }
    }
  }

  async getAllReviews() {
    const revieweeId = this.props.match.params.id
    const getUrl = `/api/reviews/${revieweeId}`
    const response = await fetch(getUrl)
    const result = await response.json()
    if (result.errno === 0) {
      this.setState({
        reviews: result.data
      })
    }
  }

  async getReviewee() {
    const revieweeId = this.props.match.params.id
    const getUrl = `/api/users/${revieweeId}`
    
    const response = await fetch(getUrl)
    const result = await response.json()
    if (result.errno === 0) {
      this.setState({
        reviewee: result.data
      })
    }
  }

  render() {
    const { reviewee, myReview, reviews } = this.state;

    return (
      reviewee && (
        <main className="review">
          <AddReview 
            reviewee={reviewee} 
            review={myReview}
            onUpdate={this.getAllReviews}
          ></AddReview>

          <section>
            <h2>{reviewee.username}'s Performance Reviews</h2>
            <ul>
              {
                reviews.map(item => (
                  <li key={item.id}>{item.review}</li>
                )) 
              } 
            </ul>
          </section>
        </main>
      )
    )
  }
}

export default Review
