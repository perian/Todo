import React, {Component} from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ToDoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form"

import "./app.css"

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: ''
  };
  
  createTodoItem(text) {
    return {
      label: text,
      done: false,
      important: false,
      id: this.maxId++
    }
  };

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      // {todoData} является состоянием которое меняется при удалении элемента массива
      // находим нужный элемент в массиве
      const idx = todoData.findIndex((el) => el.id === id);

      // изменяя массив мы не должны менять state, по этому используем splice
      // он не меняет исходный массив, а возвращает новый
      // вырезаем все до и после нашего элемента и обьединяем в новый массив.
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      }
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({todoData}) => {
      const newArray = [...todoData, newItem];
      
      return {
        todoData: newArray
      }
    }); 
  };

  toggleProperty = (arr, id, propertyName) => {
    const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];
      
      const newItem = {...oldItem, [propertyName]: !oldItem[propertyName]}

      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
      ];
  };
  
  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label
                  .toLowerCase()
                  .indexOf(term.toLowerCase()) > -1;
    });
  };

  onSearchChange = (term) => {
    this.setState({term});
  }

  render() {
    const { todoData, term } = this.state;
    const visibleItems = this.search(todoData, term);
    const doneCount = todoData.filter((el) => el.label).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader todo={todoCount} done={doneCount}/>
        <div className="top-panel d-flex">
          <SearchPanel 
          onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter />
        </div>
        <ToDoList 
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}/>
        <ItemAddForm 
          todos={todoData}
          onAdd={this.addItem} />
      </div>
    );
  };
};
