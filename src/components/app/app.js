import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    done: false,
    important: false,
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ]
  };

  getElementIndex = (array, id) => {
    return array.findIndex((el) => el.id === id)
  };

  
  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = this.getElementIndex(todoData, id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    }); 
  };

  createTodoItem(label) {
    return {
      label: label,
      done: false,
      important: false,
      id: this.maxId++
    }
  }

  addItem = (label) => {
    const newItem = this.createTodoItem(label)

    this.setState(({todoData}) => {
      const newArray = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArray
      }
    });
  };

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      const idx = this.getElementIndex(todoData, id);


      const oldItem = todoData[idx];
      const newItem = {...oldItem, important: !oldItem.important};

      const newArray = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      }
    });
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      const idx = this.getElementIndex(todoData, id);


      const oldItem = todoData[idx];
      const newItem = {...oldItem, done: !oldItem.done};

      const newArray = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      }
    });
  };

  render() {
    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
  
        <TodoList 
          todos={this.state.todoData}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}
        />
        <ItemAddForm
          onAdd={() => this.addItem('a')}
        />
      </div>
    );
  }
};
