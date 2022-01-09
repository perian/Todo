import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
  render() {
    const {onSearchChange, term} = this.props;
    
    return (
      <input type="text"
             className="form-control search-input"
             value={term}
             placeholder="Type to search"
             onChange={(evt) => onSearchChange(evt.target.value)}
      />
    );
  }
};
