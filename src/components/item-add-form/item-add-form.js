import React, { Component } from "react";

import "./item-add-form.css";

export default class ItemAddForm extends Component {
  
  render() {
    const {onAdd} = this.props;
    
    return (
      <button 
        className="btn btn-outline-secondary AdButton" 
        type="btn"
        onClick={onAdd}>
          Add Item
      </button>
    );
  }
};
