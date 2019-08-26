import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingScreen from 'react-loading-screen';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false
    }

  }

  componentDidMount(){
    
  }
  componentWillReceiveProps(np) {
    this.setState({loading: np.common.loading})
  }

  render() {

    const {loading} = this.state;

    return (
      <div className="loading">
        <LoadingScreen
          loading={loading}
          bgColor="#1a24407a"
          spinnerColor='#9ee5f8'
          textColor='#9ee5f8'
          /> 
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchToProps = {
 
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading)