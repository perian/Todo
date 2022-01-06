import React, {Component} from "react";

import './item-add-form.css';

export default class ItemAddForm extends Component {
  render() {
    const {onAdd} = this.props;

    return (
      <div>
        <button 
          className="btn btn-add" 
          type="button" 
          
          onClick={onAdd}
          >Add Item</button>
      </div>
    );
  };
};