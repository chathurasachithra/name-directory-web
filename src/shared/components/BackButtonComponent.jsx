import React, { PureComponent } from 'react';
import EmailOutlineIcon from "mdi-react/ChevronLeftIcon";

export default class BackButtonComponent extends PureComponent {

  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className="back-btn-wrapper">
        <a href="/login">
          <div  className="back-btn-wrapper__back-btn">
          <EmailOutlineIcon />
          </div>
          <span className="back-btn-wrapper__label-text">Previous Screen</span>
        </a>
      </div>
    );
  }
}