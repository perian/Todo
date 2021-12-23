import React, {Component} from "react";
import "./todo-list-item.css";

export default class ToDoListItem extends Component {

  state = {
    done: false,
    important: false
  };

  onLabelClick = () => {
    this.setState((state) => {
      return {
        done: !state.done
      }
    })
  };

  onMarkImportant = () => {
    this.setState((state) => {
      return {
        important: !state.important
      };
    });
  };
  

  render() {
    const {label} = this.props;
    const {done, important} = this.state;
    const {onDeleted} = this.props;
    let classNames = 'todo-list-item';
    if (done) {
      classNames += ' done';
    }
    if (important) {
      classNames += ' important';
    }
    const style = {
      color: important ? 'steelblue' : 'black',
      fontWeight: important ? 'bold' : 'normal'
    };
  
    return (
      <span className={classNames}>
        <span
          className="todo-list-item-label"
          style={style}
          onClick={this.onLabelClick}>
        {label}
        </span>
        <button type="button"
          className="btn btn-outline-success btn-sm float-right"
            onClick={this.onMarkImportant}>
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
}

// Как понять нужно использовать функциональный компонент или компонент-класс? если компоненту нужно работать с внутренним состоянием то комп-класс

// в чем как разница вызывать функцию
// export default class ToDoListItem extends Component {
//   constructor() {
//     super()
//     this.onLabelClick = () => {
//       console.log(`done ${this.props.label}`)
//     }
//   }
//  
// ИЛИ
// 
// export default class ToDoListItem extends Component {
  // export default class ToDoListItem extends Component {
    //   this.onLabelClick = () => {
    //       console.log(`done ${this.props.label}`)
    //     }

