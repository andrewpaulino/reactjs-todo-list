 import React, { Component } from 'react';
 import todos from './todos';

 class EditTodo extends Component {
  constructor(props){
    super(props);
    this.state = {
      updatedTodo: null,
      todoText: '',
      todoPriority: '1',
    }
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
    const todoUpdate = {
      todoText: this.state.todoText,
      todoPriority: this.state.todoPriority,
      id: this.props.editedTodo.id
    };
    this.setState({ updatedTodo: todoUpdate },function(){
      console.log(this.state.updatedTodo)
      this.props.updateTodo(this.state.updatedTodo)
    });

    event.preventDefault();
  }



   render() {
     return (
       <div className='editTodo'>
         <form onSubmit={this.handleSubmit}>
           <div className="form-group">
             <label for="editText"> Edit Your Text: </label>
              ​<textarea id="edit-description" className='form-control' onChange= {this.handleChange} placeholder={this.props.editedTodo.todoText}value = {this.state.todoText}  rows="7" cols="35" name ="todoText" />

           </div>
           <div className="form-group">
             <label for="priority">Priority Of Task: </label>
             <select id="edit-priority"className="custom-select"value = {this.state.todoPriority} onChange= {this.handleChange} name ="todoPriority">
               <option value="1">Lite-Priority</option>
               <option value="2">Urgent-Priority</option>
               <option value="3">Major-Priority</option>
             </select>
           </div>
          <div className="form-group">
            <button type="Submit" className="btn btn-success text-center" value="Submit" > Save Changes</button>
            </div>
         </form>
       </div>

     );
   }
 }
 export default EditTodo;
