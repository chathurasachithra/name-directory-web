import React, {Component} from "react";
import {Scrollbars} from "react-custom-scrollbars";

export default class TableSearchableFilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFilters: [],
      filteredList: [],
      isFilterDropdownVisible: false,
      tempSelectedFilters: [],
      searchValue: "",
    };
  }

  componentDidMount() {
    this.setState({
      allFilters: this.props.allFilters,
      filteredList: this.props.allFilters,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { allFilters, searchValue } = this.state;
    if (nextProps.allFilters && !allFilters.length) {
      let filteredList = nextProps.allFilters;
      if (searchValue) {
        const dataList = Object.assign({}, ...filteredList);
        const filterData = [];
        Object.keys(dataList).forEach(function(key) {
          if (dataList[key].toLowerCase().startsWith(searchValue.toLowerCase())) {
            const object = {};
            object[key] = dataList[key];
            filterData.push(object);
          }
        });
        filteredList = filterData;
      }
      this.setState({
        allFilters: nextProps.allFilters,
        filteredList,
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
    const { tempSelectedFilters } = this.state;
    this.props.action(tempSelectedFilters);
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

  handleSearch = e => {
    const { allFilters } = this.state;
    let { filteredList, searchValue } = this.state;
    searchValue = e.target.value;
    const dataList = Object.assign({}, ...allFilters);
    if (searchValue) {
      const filterData = [];
      Object.keys(dataList).forEach(function(key) {
        if (dataList[key].toLowerCase().startsWith(searchValue.toLowerCase())) {
          const object = {};
          object[key] = dataList[key];
          filterData.push(object);
        }
      });
      filteredList = filterData;
    } else {
      const filterData = [];
      Object.keys(dataList).forEach(function(key) {
        const object = {};
        object[key] = dataList[key];
        filterData.push(object);
      });
      filteredList = filterData;
    }
    this.setState({
      searchValue,
      filteredList,
    });
  };

  render() {
    const {
      isFilterDropdownVisible,
      filteredList,
      searchValue,
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
    if (minHeight < 120) {
      minHeight = 120;
    }
    if (minHeight > 200) {
      minHeight = 200;
    }

    return (
      <div className="filter-select-box-wrapper clearfix" ref={node => this.node = node}>
        <p className="header-text">{label} </p>
        <span className="filter-icon" onClick={this.handleStateChangeFocus}></span>
        {isFilterDropdownVisible && (
          <div className="states-result">
            <Scrollbars style={{width: "100%", minWidth: "200px", minHeight}}>
              <div className="blocks-wrapper">


                <div className="states-block">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    ref="searchInput"
                    value={searchValue}
                    onChange={e => {
                      this.handleSearch(e);
                    }}
                  />
                </div>



                {states}
              </div>
            </Scrollbars>
          </div>
        )}
      </div>
    );
  }
}
