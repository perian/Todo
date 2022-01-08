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

  toggleProperty(array, id, property) {
    const idx = this.getElementIndex(array, id);
    
    const oldItem = array[idx];
    const newItem = {...oldItem, [property]: !oldItem[property]};

    return [
      ...array.slice(0, idx),
      newItem,
      ...array.slice(idx + 1)
    ];
  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });
  };

  render() {
    const {todoData} = this.state
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
  
        <TodoList 
          todos={todoData}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}
        />
        <ItemAddForm
          onItemAdd={this.addItem}
        />
      </div>
    );
  }
};
