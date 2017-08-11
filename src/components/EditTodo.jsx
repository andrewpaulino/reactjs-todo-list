 import React, { Component } from 'react';
 import todos from './todos';

 class EditTodo extends Component {
  constructor(props){
    super(props);
    this.state = {
      updatedTodo: null,
      text: '',
      priority: 'lite',
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
      text: this.state.text,
      priority: this.state.priority,
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
              ​<textarea id="editText" className='form-control' onChange= {this.handleChange} placeholder={this.props.editedTodo.text}value = {this.state.text}  rows="7" cols="35" name ="text" />

           </div>
           <div className="form-group">
             <label for="priority">Priority Of Task: </label>
             <select className="custom-select"value = {this.state.priority} onChange= {this.handleChange} name ="priority">
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

     );
   }
 }
 export default EditTodo;
