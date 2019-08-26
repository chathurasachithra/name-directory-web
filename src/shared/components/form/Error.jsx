import React, { Component } from 'react'
import classNames from 'classnames';

export default class Error extends Component {

  render() {
    const { className, text } = this.props;

    const headingClass = classNames({
        'error error-label': true,
    });

    return (
      <label className={`${headingClass} ${className ? `error error--${className}` : ''}`}>
        {text}
      </label>
    )
  }
}
