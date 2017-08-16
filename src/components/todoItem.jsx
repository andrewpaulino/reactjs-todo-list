 import React, { Component } from 'react';

 class todoItem extends Component {
  deleteTodo(id){
      this.props.onDelete(id)
  }
  editTodo(id,todoText,todoPriority){
    this.props.onEdit(id,todoText,todoPriority)
  }



   render() {
    let todoTmp;
     if (this.props.todoItem.todoPriority == 1) {
       todoTmp = (
            <div className="card card-inverse card-success mb-3 text-center ">
            <div className="card-block">
                <li id="tmp"><h2><strong>{this.props.todoItem.todoText}</strong></h2> </li>
                <footer>  <a id="edit-link" href="#edit-link"onClick={this.editTodo.bind(this, this.props.todoItem.id, this.props.todoItem.todoPriority, this.props.todoItem.todoText)}><span className="glyphicon glyphicon-pencil"></span></a>
                   <a id="delete-link"href="#delete-link"onClick = {this.deleteTodo.bind(this,this.props.todoItem.id)}> <span className="glyphicon glyphicon-remove"></span></a>
              </footer>
            </div>
          </div>
      );
     }
     if (this.props.todoItem.todoPriority == 2) {
       todoTmp = (
            <div className="card card-inverse card-warning mb-3 text-center">
            <div className="card-block">
                <li id="tmp"><h2><strong>{this.props.todoItem.todoText} </strong></h2></li>
                <footer>  <a id="edit-link" href="#edit-link"onClick={this.editTodo.bind(this, this.props.todoItem.id, this.props.todoItem.todoPriority, this.props.todoItem.todoText)}><span className="glyphicon glyphicon-pencil"></span></a>
                   <a id="delete-link"href="#delete-link"onClick = {this.deleteTodo.bind(this,this.props.todoItem.id)}> <span className="glyphicon glyphicon-remove"></span></a>
              </footer>
            </div>
          </div>

         );
     }
     if (this.props.todoItem.todoPriority == 3) {
       todoTmp = (
         <div className="card card-inverse card-danger mb-3 text-center">
            <div className="card-block">
                <li id="tmp"><h2><strong>{this.props.todoItem.todoText}</strong></h2> </li>
                <footer>  <a id="edit-link" href="#edit-link"onClick={this.editTodo.bind(this, this.props.todoItem.id, this.props.todoItem.todoPriority, this.props.todoItem.todoText)}><span className="glyphicon glyphicon-pencil"></span></a>
                   <a id="delete-link"href="#delete-link"onClick = {this.deleteTodo.bind(this,this.props.todoItem.id)}> <span className="glyphicon glyphicon-remove"></span></a>
              </footer>
            </div>
          </div>

       );
     }
     return (
       <div className='Todo'>
          {todoTmp}
       </div>

     );
   }
 }
 export default todoItem;
