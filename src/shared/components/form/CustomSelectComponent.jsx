import React, {Component, Fragment} from "react";
import {Scrollbars} from "react-custom-scrollbars";

export default class CustomSelectComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFilters: [],
      filteredList: [],
      isFilterDropdownVisible: false,
      isAllSelected: false,
      searchValue: "",
      tempSelectedFilters: []
    };
  }

  componentDidMount() {
    this.setState({
      allFilters: this.props.allFilters,
      filteredList: this.props.allFilters
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.allFilters) {
      this.setState({
        allFilters: nextProps.allFilters,
        filteredList: nextProps.allFilters
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

  handleSelectAll = () => {
    const {allFilters, isAllSelected, tempSelectedFilters} = this.state;

    const selectedStates = isAllSelected
      ? []
      : allFilters.map(filter => filter.id);

    this.setState(
      {
        isAllSelected: !isAllSelected,
        tempSelectedFilters: selectedStates
      },
      () => {
        this.handlePlaceholderText();
        this.handleApplyStatesFilter();
      }
    );
  };

  handleStateChangeFocus = () => {
    this.setState({
      isFilterDropdownVisible: true
    });
  };

  handlePlaceholderText = () => {
    const {allFilters, tempSelectedFilters} = this.state;
    const { filterTypeText, filterTypeTextPlural } = this.props;
    const searchElement = this.refs.searchInput;

    let placeholderText = `Select ${filterTypeText}`;

    if (tempSelectedFilters.length === 1) {
      placeholderText = `${tempSelectedFilters.length} ${filterTypeText} Selected`;
    }

    if (tempSelectedFilters.length > 1) {
      placeholderText = `${tempSelectedFilters.length} ${filterTypeTextPlural} Selected`;
    }

    if (tempSelectedFilters.length === allFilters.length) {
      placeholderText = `All ${filterTypeTextPlural} Selected`;
    }

    searchElement.placeholder = placeholderText;

  };

  handleApplyStatesFilter = () => {
    const {allFilters, tempSelectedFilters} = this.state;
    this.handlePlaceholderText();
    this.props.action(tempSelectedFilters);

    this.setState({
      // isFilterDropdownVisible: false,
      // searchValue: "",
      filteredList: allFilters
    });
  };

  handleSelectState = state => {
    const {isAllSelected, tempSelectedFilters, allFilters} = this.state;
    const selectedIndex = tempSelectedFilters.indexOf(state);

    if (selectedIndex === -1) {
      tempSelectedFilters.push(state);
    } else {
      tempSelectedFilters.splice(selectedIndex, 1);

      if (isAllSelected) {
        this.handleSelectAll();
      }
    }
    if (allFilters.length === tempSelectedFilters.length) {
      this.handleSelectAll();
    }

    this.setState({
      tempSelectedFilters
    });
    this.handlePlaceholderText();
    this.handleApplyStatesFilter();
  };

  isStateSelected = state => {
    const {tempSelectedFilters} = this.state;
    return tempSelectedFilters.indexOf(state) === -1 ? false : true;
  };

  handleSearch = e => {
    return;
    const {filteredList, allFilters, searchValue} = this.state;
    const inputValue = e.target.value;
    let a = filteredList;
    // if (inputValue !== "" && !/^[a-zA-Z ]+$/.test(inputValue)) {
    //   return;
    // }

    if (inputValue !== null || inputValue !== "") {
      a = allFilters.filter(filter =>
        filter.name.toLowerCase().startsWith(inputValue.toLowerCase())
      );
    }

    this.setState({
      searchValue: e.target.value,
      filteredList: a
    });
  };

  render() {
    const {
      isFilterDropdownVisible,
      filteredList,
      isAllSelected,
      searchValue
    } = this.state;
    const { filterTypeText } = this.props;

    const states = filteredList.map(state => {
      return (
        <div className="states-block" key={state.id}>
          <input
            type="checkbox"
            className="checkbox-input"
            id={state.id}
            checked={this.isStateSelected(state.id)}
            onChange={() => {
              this.handleSelectState(state.id);
            }}
          />
          <label htmlFor={state.id} className="checkbox-label">
            {state.name}
          </label>
        </div>
      );
    });

    return (
      <div className="custom-select-box-wrapper clearfix" ref={node => this.node = node}>
        <input
          type="text"
          className="form-control search-state"
          placeholder={`Select ${filterTypeText}`}
          ref="searchInput"
          value={searchValue}
          onFocus={this.handleStateChangeFocus}
          onChange={e => {
            this.handleSearch(e);
          }}
        />
        {isFilterDropdownVisible && filteredList.length > 0 && (
          <div className="states-result">
            <Scrollbars style={{width: "100%", height: 185}}>
              <div className="blocks-wrapper">
                {(filteredList.length === 1)?
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
          </div>
        )}
      </div>
    );
  }
}
