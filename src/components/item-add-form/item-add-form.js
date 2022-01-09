import React, {Component} from "react";

import './item-add-form.css';

export default class ItemAddForm extends Component {
  state = {
    label: ''
  };

  onLabelChange = (evt) => {
    this.setState({
      label: evt.target.value
    })
  };

  onSubmit = (evt) => {
    evt.preventDefault();

    this.props.onItemAdd(this.state.label)
    this.setState({
      label: ''
    });
  }

  render() {
    const {label} = this.state

    return (
      <form className="item-add-form d-flex"
            onSubmit={this.onSubmit}>
        <input 
          className="item-control" 
          type="text" 
          value={label}
          placeholder="What needs to be done?"
          onChange={this.onLabelChange} />
        <button 
          className="btn btn-add" 
          >Add Item</button>
      </form>
    );
  };
};