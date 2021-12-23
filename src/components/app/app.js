import React, {Component} from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ToDoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form"

import "./app.css"

export default class App extends Component {
  state = {
    todoData: [
      { label: 'Drink Coffee', important: false, id: 1 },
      { label: 'Make Awesome App', important: true, id: 2 },
      { label: 'Have a lunch', important: false, id: 3 }
    ]
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

  addItem = () => {
    this.setState(({todoData}) => {
      const el4 = { label: 'Life for buritto', important: false, id: todoData.length + 1 };
      
      const newArray = todoData;
      newArray.push(el4);
      
      return {
        todoData: newArray
      }
    }); 
  };
  
  render() {
    return (
      <div className="todo-app">
        <AppHeader todo={1} done={3}/>
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <ToDoList 
          todos={this.state.todoData}
          onDeleted={this.deleteItem} />
        <ItemAddForm 
          todos={this.state.todoData}
          onAdd={this.addItem} />
      </div>
    );
  };
};

