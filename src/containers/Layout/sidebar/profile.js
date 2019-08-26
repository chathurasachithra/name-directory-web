import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserProfile, logout } from '../../../redux/actions/userActions';
import { toggleLoading } from '../../../redux/actions/commonActions';
import localStorage from '../../../libs/storageHelper';

class profile extends Component {
  constructor(props) {
    super(props);
      this.state ={
        profile: null
      }
    this.sesssion = localStorage.getFromStorage('loggedUser');
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.props.getUserProfile(this.sesssion.user._id);
    this.props.toggleLoading(true);
  }

  componentWillReceiveProps(np) {
    this.setState({ profile: np.user.profile}, () => {

    })
    
  }

  componentDidUpdate(np){
    if(np.common.loading) {
      this.props.toggleLoading(false);
    }
    
  }

  logout(e) {
    e.preventDefault();
    localStorage.removeFromStorage('loggedUser');
    const redirectLocation = 'login'
    window.location = redirectLocation;
  }

  render() {

    let firstName = '';
    let title = '';
    if(this.state.profile) {
      firstName = this.state.profile.firstName;
      title = 'Super Admin';
    }
    return (
      <div className="sidebar__profile">
          <div className="sidebar__profile--name">Welcome, {firstName}</div>
        <div className="sidebar__profile--post"> {title}</div>
        <button className="btn btn-primary logout_btn" onClick={this.logout}>Logout</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchToProps = {
  getUserProfile,
  logout,
  toggleLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(profile)