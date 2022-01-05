import React, {Component} from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component {
  constructor () {
    super();

    this.state = {
      done: false,
      important: false
    };

    this.onLabelClick = () => {
      this.setState((state) => {
          return {
            done: !state.done
          }
      })
    };
    
    this.onImportantButtonClick = () => {
      this.setState((state) => {
        return {
          important: !state.important
        }
      })
    }
  };
  
  render() {
    const { label } = this.props;
    const { done, important } = this.state;
    const { onDeleted } = this.props;
    let className = `todo-list-item`;
    if (done) {
      className += ` done`;
    }

    if (important) {
      className += ` important`;
    }
       
    return (
      <span className={className}>
        <span
          className="todo-list-item-label"
          onClick={this.onLabelClick}>
          {label}
        </span>

        <button type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={this.onImportantButtonClick}>
          <i className="fa fa-exclamation" />
        </button>

        <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={onDeleted}>
          <i className="fa fa-trash-o" />
        </button>
     </span>
    );
  }
};

