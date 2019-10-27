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
    const filteredReviews = reviews.filter(item => item.review)
    const hasReview = filteredReviews.length > 0

    return (
      <Auth>
        <Nav />
        {reviewee && (
          <main className="review">
            <section className="add-review">
              <h2>Add Reviews to <span>{reviewee && reviewee.username}</span>:</h2>
              <AddReview 
                reviewee={reviewee} 
                review={myReview}
                onUpdate={this.getAllReviews}
              ></AddReview>
            </section>
            
            <section>
              <h2><span>{reviewee.username}</span>'s Performance Reviews</h2>
              <ul className="list">
                {
                  hasReview 
                    ? filteredReviews.map(item => (
                        <li key={item.id}>
                          <span className="review-line">
                            <strong>review:</strong> 
                            {item.review}
                          </span>
                          <span className="review-line">
                            <strong>feedback:</strong>
                            {item.feedback ? item.feedback : 'currently no feedback.'}
                          </span>
                        </li>
                      )) 
                    : (<li>No record found.</li>)
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
