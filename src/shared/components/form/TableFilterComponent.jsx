import React, {Component} from "react";
import {Scrollbars} from "react-custom-scrollbars";

export default class TableFilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFilters: [],
      filteredList: [],
      isFilterDropdownVisible: false,
      tempSelectedFilters: []
    };
  }

  componentDidMount() {
    this.setState({
      allFilters: this.props.allFilters,
      filteredList: this.props.allFilters,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.allFilters) {
      this.setState({
        allFilters: nextProps.allFilters,
        filteredList: nextProps.allFilters,
      });
    }
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick, false);
  }

  handleOutsideClick = (e) => {
    if (this.node && !this.node.contains(e.target)) {
      this.setState({
        isFilterDropdownVisible: false
      });
    }
  }

  handleApplyStatesFilter = () => {
    const {allFilters, tempSelectedFilters} = this.state;
    this.props.action(tempSelectedFilters);

    this.setState({
      filteredList: allFilters
    });
  };

  handleSelectState = state => {
    const {tempSelectedFilters} = this.state;
    const selectedIndex = tempSelectedFilters.indexOf(state);

    if (selectedIndex === -1) {
      tempSelectedFilters.push(state);
    } else {
      tempSelectedFilters.splice(selectedIndex, 1);
    }
    this.setState({
      tempSelectedFilters
    });
    this.handleApplyStatesFilter();
  };

  handleStateChangeFocus = () => {
    this.setState({
      isFilterDropdownVisible: !this.state.isFilterDropdownVisible
    });
  };

  isStateSelected = state => {
    const {tempSelectedFilters} = this.state;
    return tempSelectedFilters.indexOf(state) === -1 ? false : true;
  };

  render() {
    const {
      isFilterDropdownVisible,
      filteredList,
    } = this.state;
    const {label} = this.props;
    const states = filteredList.map((value) => {
      const filterKey = Object.keys(value)[0];
      return (
        <div className="states-block" key={filterKey}>
          <input
            type="checkbox"
            className="checkbox-input"
            id={filterKey}
            checked={this.isStateSelected(filterKey)}
            onChange={() => {
              this.handleSelectState(filterKey);
            }}
          />
          <label htmlFor={filterKey} className="checkbox-label">
            {Object.values(value)}
          </label>
        </div>
      );
    });

    let minHeight;
    minHeight = ((filteredList.length) ? filteredList.length : 2) * 40;
    if (minHeight < 80) {
      minHeight = 80;
    }
    if (minHeight > 200) {
      minHeight = 200;
    }

    return (
      <div className="filter-select-box-wrapper clearfix" ref={node => this.node = node}>
        <p className="header-text">{label} </p>
        <span className="filter-icon" onClick={this.handleStateChangeFocus}></span>
        {isFilterDropdownVisible && filteredList.length > 0 && (
          <div className="states-result">
            <Scrollbars style={{width: "100%", minWidth: "200px", minHeight}}>
              <div className="blocks-wrapper">
                {states}
              </div>
            </Scrollbars>
          </div>
        )}
      </div>
    );
  }
}
