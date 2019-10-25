import React from "react";
import ListItem from "./list-item";
import AddForm from './add-form';

class EmployeeList extends React.Component {
  constructor() {
    super();
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
      return null;
    }

    return (
      <main className="employee-list">
        <section>
          <h2>Add Employee</h2>
          <AddForm onAdd={this.getList}></AddForm>
        </section>

        <section>
          <h2>Current Employees</h2>
          <ul>
            {
              this.state.users.map(list =>
                (<ListItem list={list} key={list.id} onRefresh={this.getList} />))
            }
          </ul>
        </section>
      </main>
    )
  }
}

export default EmployeeList;
