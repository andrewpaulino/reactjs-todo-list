import React, { Component } from 'react';
import TodoItem from './todoItem';


class todos extends Component {
  deleteTodo(id){
    this.props.onDelete(id)
  }
 editTodo(id,todoText,todoPriority){
    this.props.onEdit(id,todoText,todoPriority)
  }

  render() {
    let todoItems;
    if (this.props.todos) {
      todoItems = this.props.todos.map(todo => {
        return (
          <TodoItem   onEdit = {this.editTodo.bind(this)} onDelete = {this.deleteTodo.bind(this)} key={ todo.id } todoItem={ todo } />
        );
      });
    }
    return (
      <div className='todos'>
        {todoItems}
      </div>
    );
  }
}
export default todos;
