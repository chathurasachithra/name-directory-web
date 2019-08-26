import React, {Component, Fragment} from "react";
import {Scrollbars} from "react-custom-scrollbars";

export default class DashboardFacilityFilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facilities: [],
      isFilterDropdownVisible: false,
      isAllSelected: false,
      tempSelectedFilters: []
    };
  }
  
  componentDidMount() {
    this.setState({
      facilities: this.props.facilities,
    });
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.facilities) {
      this.setState({
        facilities: nextProps.facilities,
      });
    }
  }
  
  componentWillMount() {
    document.addEventListener('mousedown', this.handleOutsideClick, true);
  }
  
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick, true);
  }
  
  handleOutsideClick = (e) => {
    if (this.node && !this.node.contains(e.target)) {
      this.setState({
        isFilterDropdownVisible: false
      });
    }
  }

  handlePlaceholderText = () => {
    const { facilities: allFilters, tempSelectedFilters } = this.state;
    const { filterTypeText, filterTypeTextPlural } = this.props;
    const searchElement = this.refs.searchInput;

    let placeholderText = `Select ${filterTypeText}`;

    if (tempSelectedFilters.length === 1) {
      placeholderText = `${tempSelectedFilters.length} ${filterTypeText} Selected`;
    }

    if (tempSelectedFilters.length > 1) {
      placeholderText = `${tempSelectedFilters.length} ${filterTypeTextPlural} Selected`;
    }

    if (tempSelectedFilters.length === allFilters.length || tempSelectedFilters.length === 0) {
      placeholderText = `All ${filterTypeTextPlural} Selected`;
    }

    searchElement.placeholder = placeholderText;

  };
  
  handleSelectAll = () => {
    const {facilities, isAllSelected, tempSelectedFilters} = this.state;
    
    const selectedStates = isAllSelected
      ? []
      : facilities.map(facility => facility._id);
    
    this.setState(
      {
        isAllSelected: !isAllSelected,
        tempSelectedFilters: selectedStates
      });
  };
  
  handleStateChangeFocus = () => {
    const { isFilterDropdownVisible } = this.state;
    this.setState({
      isFilterDropdownVisible: !isFilterDropdownVisible
    });
  };
  
  handleApplyStatesFilter = () => {
    const { tempSelectedFilters } = this.state;
    this.setState({
      isFilterDropdownVisible: false
    });
    this.handlePlaceholderText();
    this.props.handleFilter(tempSelectedFilters);
  };
  
  handleSelectState = state => {
    const {isAllSelected, tempSelectedFilters, facilities} = this.state;
    const selectedIndex = tempSelectedFilters.indexOf(state);
    
    if (selectedIndex === -1) {
      tempSelectedFilters.push(state);
    } else {
      tempSelectedFilters.splice(selectedIndex, 1);
      
      if (isAllSelected) {
        this.handleSelectAll();
      }
    }
    if (facilities.length === tempSelectedFilters.length) {
      this.handleSelectAll();
    }
    
    this.setState({
      tempSelectedFilters
    });
  };
  
  isStateSelected = state => {
    const {tempSelectedFilters} = this.state;
    return tempSelectedFilters.includes(state);
  };
  
  render() {
    const {
      isFilterDropdownVisible,
      tempSelectedFilters,
      facilities,
      isAllSelected,
    } = this.state;

    const { filterTypeTextPlural } = this.props;
    
    const states = facilities.map(facility => {
      return (
        <div className="states-block" key={facility._id}>
          <input
            type="checkbox"
            className="checkbox-input"
            id={facility._id}
            checked={this.isStateSelected(facility._id)}
            onChange={() => {
              this.handleSelectState(facility._id);
            }}
          />
          <label htmlFor={facility._id} className="checkbox-label">
            {facility.displayName}
          </label>
        </div>
      );
    });
    
    return (
      <div className="custom-select-box-wrapper clearfix" ref={node => this.node = node}>
        <input
          type="text"
          className="form-control search-state"
          placeholder={`All ${filterTypeTextPlural} Selected`}
          ref="searchInput"
          onFocus={this.handleStateChangeFocus}
        />
        {isFilterDropdownVisible && facilities.length > 0 && (
          <div className="states-result">
            <Scrollbars style={{width: "100%", height: 175}}>
              <div className="blocks-wrapper">
                {(facilities.length === 1)?
                  null
                  :
                  <div className="states-block">
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      checked={isAllSelected}
                      id="select_all"
                      onChange={this.handleSelectAll}
                    />
                    <label
                      htmlFor="select_all"
                      className="checkbox-label select-all"
                    >
                      All
                    </label>
                  </div>
                }
                {states}
              </div>
            </Scrollbars>
            <div className="states-result-footer">
              <button
                className="btn btn-apply btn-sm"
                onClick={this.handleApplyStatesFilter}>
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
