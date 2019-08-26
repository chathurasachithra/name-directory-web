import React, { Component } from 'react';
import SidebarLink from './SidebarLink';
import config from '../../../config/app.config';
import localStorage from '../../../libs/storageHelper';

const {  SUPER_ADMIN } = config.USER_TYPES;

class SidebarContent extends Component {
  constructor(props){
    super(props);

    this.state= {
      userType: SUPER_ADMIN
    }
    this.sesssion = localStorage.getFromStorage('loggedUser');
  }

  hideSidebar = () => {
    this.props.onClick();
  };

  render() {

    const { type: userType } = this.sesssion.user;
    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
        { userType == SUPER_ADMIN && <div className="sidebar__block--menu">
            <SidebarLink title="Dashboard" icon="license" route="/directory-admin/dashboard"
                         onClick={this.hideSidebar} />
            <SidebarLink title="Names" icon="database" route="/directory-admin/name-list"
                         onClick={this.hideSidebar} />
          </div>
        }
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
