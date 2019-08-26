import React, { Component } from 'react';
import moment from 'moment';
import { Collapse, FormGroup, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import {Calendar} from "react-date-range";
import MaskedInput from 'react-maskedinput';

export default class DatePickerComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
    this.selectDate = this.selectDate.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  selectDate(date) {
    const dateString = moment(date).format('MM/DD/YYYY');
    this.props.handleChange(dateString);
    this.toggle();
  }

  handleDate(e) {
    const value = e.target.value;
    this.props.handleChange(value);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const { date, viewMode, minDate, maxDate } = this.props;
    let displayDate = null;
    if (moment(date).isValid()) {
      displayDate = date;
    }
    return (
      <Dropdown className="custom-date-picker" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle disabled={viewMode} className="form-control dropdown-toggle-btn"  onClick={this.toggle}>
          <FormGroup>
            <MaskedInput className="form-control"
                         type="text"
                         mask="11/11/1111"
                         disabled={viewMode}
                         placeholder="MM/DD/YYYY"
                         value={date}
                         onChange={this.handleDate}/>
          </FormGroup>
        </DropdownToggle>
        <DropdownMenu>
          {
            minDate && !maxDate &&
            <Calendar
              date={displayDate ? new Date(displayDate) : new Date()}
              minDate={ new Date() }
              onChange={this.selectDate}
            />
          }
          {
            !minDate && maxDate &&
            <Calendar
              date={displayDate ? new Date(displayDate) : new Date()}
              maxDate={ new Date() }
              onChange={this.selectDate}
            />
          }
        </DropdownMenu>
      </Dropdown>
    );
  }

}