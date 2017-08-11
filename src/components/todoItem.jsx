 import React, { Component } from 'react';

 class todoItem extends Component {
  deleteTodo(id){
      this.props.onDelete(id)
  }
  editTodo(id,text,priority){
    this.props.onEdit(id,text,priority)
  }



   render() {
    let todoTmp;
     if (this.props.todoItem.priority == 'lite') {
       todoTmp = (
            <div className="card card-inverse card-success mb-3 text-center ">
            <div className="card-block">
                <p id="tmp"><h2><strong>{this.props.todoItem.text}</strong></h2> </p>
                <footer>  <a href="#"onClick={this.editTodo.bind(this, this.props.todoItem.id, this.props.todoItem.priority, this.props.todoItem.text)}><span className="glyphicon glyphicon-pencil"></span></a>
                   <a href="#"onClick = {this.deleteTodo.bind(this,this.props.todoItem.id)}> <span className="glyphicon glyphicon-remove"></span></a>
              </footer>
            </div>
          </div>
      );
     }
     if (this.props.todoItem.priority == 'urgent') {
       todoTmp = (
            <div className="card card-inverse card-warning mb-3 text-center">
            <div className="card-block">
                <p id="tmp"><h2><strong>{this.props.todoItem.text} </strong></h2></p>
                <footer>  <a href="#"onClick={this.editTodo.bind(this, this.props.todoItem.id, this.props.todoItem.priority, this.props.todoItem.text)}><span className="glyphicon glyphicon-pencil"></span></a>
                   <a href="#"onClick = {this.deleteTodo.bind(this,this.props.todoItem.id)}> <span className="glyphicon glyphicon-remove"></span></a>
              </footer>
            </div>
          </div>

         );
     }
     if (this.props.todoItem.priority == 'major') {
       todoTmp = (
         <div className="card card-inverse card-danger mb-3 text-center">
            <div className="card-block">
                <p id="tmp"><h2><strong>{this.props.todoItem.text}</strong></h2> </p>
                <footer>  <a href="#"onClick={this.editTodo.bind(this, this.props.todoItem.id, this.props.todoItem.priority, this.props.todoItem.text)}><span className="glyphicon glyphicon-pencil"></span></a>
                   <a href="#"onClick = {this.deleteTodo.bind(this,this.props.todoItem.id)}> <span className="glyphicon glyphicon-remove"></span></a>
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
