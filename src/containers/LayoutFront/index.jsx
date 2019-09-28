import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Topbar from './topbar/Topbar';

class Layout extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  gotoListPage = (url) => {
    window.location.href = url;
  };

  render() {
    const layoutClass = classNames({
      layout: true,
    });

    return (
      <div className={`${layoutClass} name-directory-header`}>
        <Topbar
          changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
          gotoListPage={this.gotoListPage}
          changeSidebarVisibility={this.changeSidebarVisibility}
        />
      </div>
    );
  }
}

export default withRouter(connect(state => ({
}))(Layout));
