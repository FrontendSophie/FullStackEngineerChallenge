import React from 'react'
import AddReviewee from './add-reviewee'
import Nav from '../../components/nav'
import Auth from '../../components/auth';

class Assign extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      reviewees: [],
    }
  }

  componentDidMount() {
    this.getUserList()

    const reviewerId = Number.parseInt(this.props.match.params.id)
    this.getRevieweeList(reviewerId)
  }

  async getUserList() {
    const getUrl = '/api/users'
    
    const response = await fetch(getUrl)
    const result = await response.json()
    if (result.errno === 0) {
      this.setState({
        users: result.data
      })
    }
  }

  async getRevieweeList(id) {
    const getUrl = `/api/reviews/${id}/reviewee`
    
    const response = await fetch(getUrl)
    const result = await response.json()
    if (result.errno === 0) {
      this.setState({
        reviewees: result.data
      })
    }
  }

  async remove(reviewerId, revieweeId) {
    const url = `/api/reviews/${reviewerId}/reviewee/${revieweeId}`

    const response = await fetch(url, {
      method: 'DELETE',
    })
    const result = await response.json()
    if (result.errno === 0) {
      this.getRevieweeList(reviewerId)
    } 
  }

  render() {
    const users = this.state.users
    const reviewerId = Number.parseInt(this.props.match.params.id)
    const reviewer = users.find(user => user.id === reviewerId)
    const filteredUsers = this.state.users.filter(user => user.id !== reviewerId && user.role !== 0)

    return (
      <Auth>
        <Nav/>
        <main className="assign">
          <section>
            <h2>Assign {reviewer && reviewer.username} to review:</h2>
            <AddReviewee
              reviewerId={reviewerId}
              filteredUsers={filteredUsers} 
              onAdd={() => this.getRevieweeList(reviewerId)}
            ></AddReviewee>
          </section>

          <section>
            <h2>{reviewer && reviewer.username} is currently reviewing:</h2>
            <ul>
              {
                this.state.reviewees.map((user, index) => (
                  <li key={index}>
                    <span>{user.username}</span>
                    <button onClick={() => this.remove(reviewerId, user.id)}>delete</button>
                  </li>
                ))
              }
            </ul>
          </section>
        </main>
      </Auth>
    )
  }
}

export default Assign
