import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Topbar from './topbar/Topbar';

class Layout extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    const layoutClass = classNames({
      layout: true,
    });

    return (
        <div className="footer-bottom ng-isolate-scope front-footer" footer="">
          <footer id="footer">
            <div className="container">
            <div className="row">

              <div className="col-sm-6 col-xs-12 footer-set">

                <a className="navbar-brand" href="/"><img src="/img/logo.png" alt=""/></a>
                <p className="footer-text"> Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  It has survived not only five centuries, but also the leap into electronic typesetting,
                  remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
              <div className="col-sm-6 col-xs-12 footer-set">
                <ul className="list-unstyled">

                  <li><a href="/muslim-boys-names/"><i className="fa fa-caret-right"></i> Muslim Boys Names</a></li>
                  <li><a href="/muslim-girls-names/"><i className="fa fa-caret-right"></i> Muslim Girls Names</a></li>
                  <li><a href="/names-of-prophet-mohammad-saw/"><i className="fa fa-caret-right"></i> Names of Prophet Mohammad saw</a></li>
                  <li><a href="/female-sahabi-names/"><i className="fa fa-caret-right"></i> Female Sahabi Names</a></li>
                  <li><a href="/male-sahabi-names/"><i className="fa fa-caret-right"></i> Male Sahabi Names</a></li>
                  <li><a href="/prophets-of-islam/"><i className="fa fa-caret-right"></i> Prophets of Islam</a></li>
                </ul>
              </div>
            </div>
            </div>
            <div className="clearfix"></div>
            <div className="btmFooter">
              <div className="container">
                <div className="text-center">
                  <p>© 2019 muslimnames.com | <a href="mailto:info@loremipsum.info">Contact Us</a></p>
                </div>
              </div>
            </div>
          </footer>
        </div>
    );
  }
}

export default withRouter(connect(state => ({
}))(Layout));
