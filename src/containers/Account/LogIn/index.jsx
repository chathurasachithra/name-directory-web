import React, { Component } from 'react';
import LogInForm from './components/LogInForm';
import connect from "react-redux/es/connect/connect";
import { login } from '../../../redux/actions/userActions';
import localStorage from '../../../libs/storageHelper';
const icon = `${process.env.PUBLIC_URL}/img/logo.png`;

export class Login extends Component {
  constructor (props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    const user = localStorage.getFromStorage('loggedUser');
    if(user) {
      this.props.history.push('/directory-admin/dashboard');
    }
  }

  componentWillReceiveProps(np){
    if (np.user.loginData) {
      const userData = np.user.loginData;
      localStorage.addToStorage('loggedUser', userData);
      np.history.push('/directory-admin/dashboard');
    } else if (np.user.loginErrorData) {
      this.setState({ user: np.user})
    } else {
      this.setState({ user: {}});
    }
  }

  login(state){
    const value = {
      email:state.username,
      password:state.password,
    };
    this.props.login(value);
  }

  render () {
    return (
      <div className="account user-flow">
        <div className="account__wrapper">
          <div className="account__card">
            <div className="account__card--inner">
              <div className="account__head">
                <h2 className="account__title">
                  <span className="account__logo">
                  <img src={icon} alt="" />
                </span>
                </h2>
              </div>
              <h3 className="account__form-heading subheading">
                Admin Login
              </h3>
              <LogInForm handleSubmit={this.login} user={this.state.user} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
