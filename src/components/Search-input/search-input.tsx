import React, { Component } from 'react'
import _debounce from 'lodash/debounce'

interface Props {
  getMovieName: any
}

class SearchInput extends Component<Props> {
  onLabelChange = (e: any) => {
    this.props.getMovieName(e.target.value)
  }

  debounce1 = _debounce(this.onLabelChange, 1000)

  render(): React.ReactNode {
    return (
      <div className="search-input-block">
        <input
          className="search-input"
          placeholder="Type to search..."
          onChange={this.debounce1}
          type="text"
        ></input>
      </div>
    )
  }
}

export default SearchInput
