import React, { Component } from 'react';
import Todos from './components/todos';
import EditTodo from './components/EditTodo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TodoItems: [],
      text: '',
      priority: 'lite',
      enableEditMode: false,
      editedTodo: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const todoListing = {
      text: this.state.text,
      priority: this.state.priority,
      id: this.state.TodoItems.length
    };
    this.setState({ TodoItems: [...this.state.TodoItems, todoListing] });

    event.preventDefault();
  }
  handleDeleteTodo(id){
    let TodoItems = this.state.TodoItems
    let index = TodoItems.findIndex(x => x.id === id);
    TodoItems.splice(index, 1)
    this.setState({TodoItems: TodoItems})
  }
  handleEditTodo(id,text,priority){
    let TodoItems = this.state.TodoItems
    let index = TodoItems.findIndex(x => x.id === id);
    this.setState({editedTodo: TodoItems[index], enableEditMode: true})
  }
  handleUpdateTodo(updateTodo){

    console.log(updateTodo)
     let TodoItems = this.state.TodoItems
     let index = TodoItems.findIndex(x => x.id === updateTodo.id);
     console.log(index)
     TodoItems.splice(index,1)
     TodoItems.push(updateTodo)
     console.log(TodoItems)
     this.setState({TodoItems: TodoItems, enableEditMode:false})
  }
  render() {
    const isEdit = this.state.enableEditMode;
    return (
      <div className = "app">
        <div className = "container">
          <div className="page-header">
            <h1>Simple Todo List</h1>
          </div>
          <div className="row">
            <div className="col-md-4">

            <div className="card">
              <div className="card-header text-center">
                <h3>Add Todo Task</h3></div>
              <div className="card-block">
                <div className="card-text text-center">
                  <form onSubmit = {this.handleSubmit} >
                    <div className="form-group">
                      <label for="newTodo">Your Task: </label>
                        ​<textarea className='form-control' id="newTodo"  onChange= {this.handleChange} value = {this.state.text} rows="7" cols="35" name ="text" />
                    </div>
                    <div className="form-group">
                      <label for="priority">Priority Of Task: </label>
                      <select className="custom-select" value = {this.state.priority} onChange= {this.handleChange} placeholder="Select A Priority" name ="priority">
                        <option value="lite">Lite-Priority</option>
                        <option value="urgent">Urgent-Priority</option>
                        <option value="major">Major-Priority</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <input type="Submit" className="btn btn-success text-center" value="Submit" />
                    </div>
                  </form>
                </div>
                </div>
                </div>
            </div>



            <div className="col-md-8">

              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Todo List</h3>
                </div>
                <div className="panel-body">

                  {isEdit ? <EditTodo updateTodo = {this.handleUpdateTodo.bind(this)} editedTodo = {this.state.editedTodo}/> : ''}
                  {/* <div className="card-rows"> */}
                    <Todos onEdit = {this.handleEditTodo.bind(this)} onDelete= {this.handleDeleteTodo.bind(this)} todos={ this.state.TodoItems } />
                  {/* </div> */}
                </div>
                <div className="panel-footer">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
