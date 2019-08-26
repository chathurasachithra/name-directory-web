import React, { Component } from 'react';
import EyeIcon from 'mdi-react/EyeOffOutlineIcon';
import Error from "../../../../shared/components/form/Error";
import ResponseMessages from '../../../../constants/responseMessages';

export default class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      errorUserName: '',
      errorPassword: null,
      username: '',
      password: '',
      commonError: null
    };

    this.showPassword = this.showPassword.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validate = this.validate.bind(this);
    this.login = this.login.bind(this);
  }

  componentWillReceiveProps(np){

    if(np.user.loginErrorData){
      const error = np.user.loginErrorData.data;
      let errorMsg = null;

      switch (error) {
        case 'Invalid password':
          errorMsg = ResponseMessages.ERRORS.INVALID_CREDENTIALS;
          break;
        case 'not found':
          errorMsg = ResponseMessages.ERRORS.CANNOT_FIND_EMAIL;
          break;
        default:
          errorMsg = ResponseMessages.ERRORS.LOGIN_SYSTEM_ERROR;
          break;
      }

      this.setState({
        commonError: errorMsg
      });
    }
  }

  showPassword(e) {
    e.preventDefault();
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  validate() {
    const { formType } = this.props;
    const { username, password } = this.state;
    let errorUserName = null;
    let errorPassword = null;
    let error = false;
    const emailRegEx = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
    const usernameRegEx = new RegExp(/^[a-zA-Z0-9]+$/);

    if (!username) {
      errorUserName = ResponseMessages.ERRORS.EMPTY_EMAIL;
      error = true
    } else if (!emailRegEx.test(username)) {
      errorUserName = ResponseMessages.ERRORS.INVALID_EMAIL;
      error = true
    } else if (!usernameRegEx.test(username) && !emailRegEx.test(username)){
      errorUserName = ResponseMessages.ERRORS.INVALID_EMAIL_OR_USERNAME;
      error = true;
    }

    if(!password) { errorPassword = ResponseMessages.ERRORS.PASSWORD_EMPTY; error = true }

    this.setState({errorUserName, errorPassword, commonError: null});
    return error;
  }

  login(e) {
    e.preventDefault();
    if(!this.validate()){
      const { username, password } = this.state;
      this.props.handleSubmit(this.state);
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const { errorPassword, errorUserName, commonError } = this.state;

    return (
      <form className="form">
        <div className="form__form-group">
          <div className="form__form-group-field">
            <input
              name="username"
              component="input"
              type="text"
              onChange={this.onChange}
              placeholder="Email"
              className="form__custom-field"
            />
          </div>
          {errorUserName && <Error text={errorUserName}/>}
        </div>
        <div className="form__form-group">
          <div className="form__form-group-field">
            <input
              name="password"
              component="input"
              type={this.state.showPassword ? 'text' : 'password'}
              placeholder="Password"
              onChange={this.onChange}
              className="form__custom-field"
            />
            <button
              className={`form__form-group-button form__form-group-icon--right${this.state.showPassword ? ' active' : ''}`}
              onClick={e => this.showPassword(e)} type="button"
            ><EyeIcon />
            </button>
          </div>
          {errorPassword && <Error text={errorPassword}/>}
        </div>
        {commonError && <Error text={commonError}/>}
        <div className="account__btns">
          <button className="btn btn-primary logout_btn account__btn" onClick={this.login}>Login</button>
        </div>
      </form>
    );
  }
}


