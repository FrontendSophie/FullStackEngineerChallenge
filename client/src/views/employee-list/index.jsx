import React from "react";
import ListItem from "./list-item";
import AddForm from './add-employee';
import Nav from '../../components/nav'

class EmployeeList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      users: []
    }

    this.getList = this.getList.bind(this)
  }

  componentDidMount() {
    this.getList()
  }

  async getList() {
    const getUrl = '/api/users'
    
    const response = await fetch(getUrl)
    const result = await response.json()
    if (result.errno === 0) {
      this.setState({
        users: result.data
      })
    }
  }

  render() {
    const { users } = this.state;
    if (!users) {
      return null
    }
    const filteredUsers = this.state.users.filter(user => user.role !== 0)
    const hasUser = filteredUsers.length > 0

    return (
      <>
        <Nav />
        <main className="employee-list">
          <section className="employee-list__add">
            <h2>Add Employee</h2>
            <AddForm onAdd={this.getList}></AddForm>
          </section>

          <section className="employee-list__content">
            <h2>Current Employees</h2>
            <ul className="list">
              {
                hasUser  
                  ? filteredUsers.map(list =>
                      (<ListItem list={list} key={list.id} onRefresh={this.getList} />))
                  : (<li>No record found.</li>)
              }
            </ul>
          </section>
        </main>
      </>
    )
  }
}

export default EmployeeList;
