import React from "react";
import ToDoListItem from "../todo-list-item";
import "./todo-list.css";

const ToDoList = ({ todos, onDeleted }) => {

  const elements = todos.map((item) => {
    const {id, ...itemProps} = item;

    return (
      <li key={item.id} className="list-group-item ">
        <ToDoListItem 
        onDeleted={() => {onDeleted(id)}} // почему не работает onDeleted={onDeleted(id)}
        {... itemProps}/>
      </li>
    )
  });

  return (
    <ul className="list-group todo-list">
      {elements}
    </ul>
  );
}

export default ToDoList;