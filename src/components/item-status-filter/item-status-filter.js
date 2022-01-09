import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  buttons = [
    {name: 'filter-all', label: 'All'},
    {name: 'filter-active', label: 'Active'},
    {name: 'filter-done', label: 'Done'}
  ];

  render() {
    const {filter, onFilterChange} = this.props;

    const Buttons = this.buttons.map(({name, label}) => {
      const isActive = filter === name;
      
      let className = isActive ? 'btn-info' : 'btn-outline-secondary';

      return (
        <button className={`btn ${className}`}
                type="button"
                name={name}
                key={name}>
                {label}
        </button>
      );
    });

    return (
      <div className="btn-group"
           onClick={(evt) => onFilterChange(evt)}>

        {Buttons}
      </div>
    );
  };
};
