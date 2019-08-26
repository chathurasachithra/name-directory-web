import React, { Component } from 'react'
import './index.scss';
import {Link} from "react-router-dom";
import config from '../../../config/app.config';
import storageHelper from '../../../libs/storageHelper';
const icon = `${process.env.PUBLIC_URL}/img/logo.png`;

export default class Logo extends Component {
  render() {
    let redirectTo = '/directory-admin/dashboard';
    return (
      <div id="main-logo">
        <Link to={redirectTo}>
          <img src={icon} alt="" />
        </Link>
      </div>
    )
  }
}
