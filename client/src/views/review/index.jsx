import React from 'react'
import AddReview from './add-review'
import Nav from '../../components/nav'
import Auth from '../../components/auth';
import { UserContext } from '../../context';

class Review extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props)

    this.state = {
      reviewee: null,
      myReview: '',
      reviews: [],
    }

    this.getAllReviews = this.getAllReviews.bind(this)
  }

  componentDidMount() {
    this.getReviewee()
    this.getAllReviews()
    this.getMyReview()
  }

  async getMyReview() {
    const currentUser = this.context.user
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
      <Auth>
        <Nav />
        {reviewee && (
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
                    <li key={item.id}>
                      <span>review: {item.review}</span>
                      <span>feedback: {item.feedback}</span>
                    </li>
                  )) 
                } 
              </ul>
            </section>
          </main>
        )}
      </Auth>
    )
  }
}

export default Review
