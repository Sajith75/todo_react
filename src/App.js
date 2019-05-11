import React, { Component } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';
import axios from 'axios';

class App extends Component {
  state = {
    todos: [],
    newTaskData:{
      name: '',
      description:''
    },

    editTaskData:{
      id: '',
      name: '',
      description:''
    },

    newTaskModal: false,
    editTaskModal: false

  }

  componentDidMount() {
    this._refreshTasks();
  }

  toggleNewTaskModal() {
    this.setState({
      newTaskModal: ! this.state.newTaskModal
    });
  }

  toggleEditTaskModal() {
    this.setState({
      editTaskModal: ! this.state.editTaskModal
    });
  }

  addTask(){
    axios.post('http://localhost:8383/api/v2/todolist/task', this.state.newTaskData).then((response) =>{
      let { todos } = this.state;

      todos.push(response.data)

      this.setState({ todos, newTaskModal: false, newTaskData: {
        name: '',
        description: ''
      }})
    });
  }

  updateTask(){
    let { id, name, description} = this.state.editTaskData;

    axios.put('http://localhost:8383/api/v2/todolist/' + this.state.editTaskData.id, { id, name, description }).then((response) => {
      console.log(response.data);
      this._refreshTasks();

      this.setState({
        editTaskModal: false, editTaskData: { id: '', name: '', description: '' }
      });
    });
  }

  deleteTask(id){
    axios.delete('http://localhost:8383/api/v2/todolist/' + id).then((response) => {
      this._refreshTasks();
    });
  }

  _refreshTasks(){
    axios.get('http://localhost:8383/api/v2/todolist/list').then((response) => {
      this.setState({
        todos: response.data
      })
      console.log(this.state.todos)
    });
  }

  editTask(id, name, description){
    this.setState({
      editTaskData: { id, name, description }, editTaskModal: ! this.state.editTaskModal
    });
  }

  render(){
    let todos = this.state.todos.map((todolist) => {
      return (
        <tr key={todolist.id}>
            <td>{todolist.id}</td>
            <td>{todolist.name}</td>
            <td>{todolist.description}</td>
            <td>
              <Button color="success" size="sm" className="mr-2" onClick={this.editTask.bind(this, todolist.id, todolist.name, todolist.description)} >Edit</Button>
              <Button color="danger" size="sm" onClick={this.deleteTask.bind(this, todolist.id)}>Delete</Button>
            </td>
          </tr>
      )
    });

    return (
      <div className="App container">

      <h2>To-Do App</h2>

      <Button className="my-3" color="primary" onClick={this.toggleNewTaskModal.bind(this)}>Add Task</Button>
      <Modal isOpen={this.state.newTaskModal} toggle={this.toggleNewTaskModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewTaskModal.bind(this)}>Add a new Task</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" value={this.state.newTaskData.name} onChange={(e) =>{
              let { newTaskData } = this.state;

              newTaskData.name = e.target.value;

              this.setState({ newTaskData });
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input id="description" value={this.state.newTaskData.description} onChange={(e) =>{
              let { newTaskData } = this.state;

              newTaskData.description = e.target.value;

              this.setState({ newTaskData });
            }}/>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addTask.bind(this)}>Add Task</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewTaskModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editTaskModal} toggle={this.toggleEditTaskModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditTaskModal.bind(this)}>Edit Task</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" value={this.state.editTaskData.name} onChange={(e) =>{
              let { editTaskData } = this.state;

              editTaskData.name = e.target.value;

              this.setState({ editTaskData });
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input id="description" value={this.state.editTaskData.description} onChange={(e) =>{
              let { editTaskData } = this.state;

              editTaskData.description = e.target.value;

              this.setState({ editTaskData });
            }}/>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateTask.bind(this)}>Update Task</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditTaskModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>


      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Task name</th>
            <th>Task description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {todos}
        </tbody>
      </Table>
      </div>
    );
  }
}

export default App;
