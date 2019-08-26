import React, { Component } from 'react'
import classNames from 'classnames';

export default class HeadingText extends Component {

  render() {
    const { className, text } = this.props;

    const headingClass = classNames({
        'heading-text': true,
    });

    return (
      <label className={`${headingClass} ${className ? ` heading-text--${className}` : ''}`}>
        {text}
      </label>
    )
  }
}
