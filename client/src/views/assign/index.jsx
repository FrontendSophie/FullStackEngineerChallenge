import React from 'react'
import AddReviewee from './add-reviewee'

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

    const currentUserId = Number.parseInt(this.props.match.params.id)
    this.getRevieweeList(currentUserId)
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
    const getUrl = `/api/users/${id}/reviewee`
    
    const response = await fetch(getUrl)
    const result = await response.json()
    if (result.errno === 0) {
      this.setState({
        reviewees: result.data
      })
    }
  }

  async remove(reviewerId, revieweeId) {
    const url = `/api/users/${reviewerId}/reviewee/${revieweeId}`

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
    const currentUserId = Number.parseInt(this.props.match.params.id)
    const currentUser = users.find(user => user.id === currentUserId)
    const filteredUsers = this.state.users.filter(user => user.id !== currentUserId && user.role !== 0)

    return (
      <main className="assign">
        <section>
          <h2>Assign {currentUser && currentUser.username} to review:</h2>
          <AddReviewee
            currentUserId={currentUserId}
            filteredUsers={filteredUsers} 
            onAdd={() => this.getRevieweeList(currentUserId)}
          ></AddReviewee>
        </section>

        <section>
          <h2>{currentUser && currentUser.username} is currently reviewing:</h2>
          <ul>
            {
              this.state.reviewees.map((user, index) => (
                <li key={index}>
                  <span>{user.username}</span>
                  <button onClick={() => this.remove(currentUserId, user.id)}>delete</button>
                </li>
              ))
            }
          </ul>
        </section>
      </main>
    )
  }
}

export default Assign
