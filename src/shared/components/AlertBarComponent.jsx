import React, { PureComponent } from 'react';

export default class AlertBarComponent extends PureComponent {

  constructor(props) {
    super(props);
  }

  render(){
    const { type, message } = this.props;
    return(
      <div className={`alert-bar ${type}`}>
        <p className={`alert-bar__text ${type}`}>
          { message }
        </p>
      </div>
    );
  }
}