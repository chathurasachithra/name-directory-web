import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from "reactstrap";
import {connect} from "react-redux";

class dashboard extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }
  
  componentWillMount() {
  }
  
  componentDidUpdate(nextProps){
  }
  
  componentWillReceiveProps(nextProps) {
  }
  
  render() {
    
    return (
      <Col md={12} lg={12} className="matrix-dashboard">
        <Card>
          <CardBody>
            <div className="total-average">
              <div className="row">
                <Col key="total-user-1" md={3} lg={3} className="total-user-3">
                  <div className="total-wrapper">
                    <h5 className="heading">Dashboard for Statistics </h5>
                    <div className="row">
                    </div>
                  </div>
                </Col>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(dashboard)
