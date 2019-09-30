import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Topbar extends PureComponent {
  static propTypes = {
    changeMobileSidebarVisibility: PropTypes.func.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired,
  };

  constructor (props) {
    super(props);
    this.gotoListPage = this.gotoListPage.bind(this);
    this.state = {
      searchKey: '',
    }
  }

  onChangeFields = (e) => {
    const value = e.target.value;
    const searchKey = value;
    this.setState({
      searchKey
    });
  };

  gotoListPage = () => {
    const { searchKey } = this.state;
    console.log(this.props)
    this.props.gotoListPage(`/search/${searchKey}`);
  };

  render() {
    const { changeMobileSidebarVisibility, changeSidebarVisibility } = this.props;
    const { searchKey } = this.state;
    return (
      <div className="topbar name-directory-front-topbar">
        <div className="topbar__wrapper container">
          <div className="navbar-header">
            <a className="navbar-brand" href="/"><img src="/img/logo.png" alt=""/></a>
          </div>

          <div className="navbar-right">
            <ul className="nav navbar-nav">
              <li className="li-nav">
                <a className="menu-button" href="/muslim-boys-names/">Muslim Boys Names</a>
              </li>
              <li className="li-nav">
                <a className="menu-button menu-button-girl" href="/muslim-girls-names/">Muslim Girls Names</a>
              </li>
              <li className="li-nav">
                <div className="header-search-container">
                  <input type="text" placeholder="Search Name"
                         className="header-search"
                         value={searchKey}
                         onChange = {this.onChangeFields} name="search"/>
                    <button className="header-search-btn" type="button"
                            disabled={(searchKey==='')}
                            onClick={this.gotoListPage}>
                      <i className="fa fa-search"></i>
                    </button>
                </div>
              </li>

            </ul>
          </div>




        </div>
      </div>
    );
  }
}

export default Topbar;
