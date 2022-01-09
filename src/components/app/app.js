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
    term: '',
    filter: 'filter-all',
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
  };

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
  };

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

  onSearchChange = (term) => {
    this.setState({ term });
  };  

  search = (array, term) => {
    if (term.length === 0) {
      return array
    };

    return array.filter((el) => 
                  el.label
                  .toLowerCase()
                  .indexOf(term.toLowerCase()) > -1);
  };

  filter(array, filter) {
    switch (filter) {
      case 'filter-all':
        return array;
      case 'filter-active':
        return array.filter((el) => !el.done);
      case 'filter-done':
        return array.filter((el) => el.done);
      default:
        return array;
    };
  };

  onFilterChange = (evt) => {
    this.setState({
      filter: evt.target.name
    })
  };

  render() {
    const {todoData, term, filter} = this.state;

    const visibleItems = this.filter(this.search(todoData, term), filter);

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel 
            term={term}
            onSearchChange={this.onSearchChange}
          />
          <ItemStatusFilter 
            onFilterChange={this.onFilterChange} 
            filter={filter}
          />
        </div>

        <TodoList 
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}
        />
        <ItemAddForm
          onItemAdd={this.addItem}
        />
      </div>
    );
  };
};
