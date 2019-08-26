import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Table, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap';
import TableStatusFilterComponent from "../../../shared/components/form/TableFilterComponent";
import TableSearchableFilterComponent from "../../../shared/components/form/TableSearchableFilterComponent";

export default class TableComponent extends Component {
    static propTypes = {
        heads: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string,
            name: PropTypes.string,
            sortable: PropTypes.bool,
        })).isRequired,
        rows: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {};

    }

    handleStatusFilter = (list, key) => {
        this.props.handleGridFilter(key, list);
    };

    render() {
        const {rows, heads, sortField, sortOrder} = this.props;
        const headText = heads.map(head => head.key);
        const capitalizedText = heads.map((head) => {
            if (head.capitalize && head.capitalize === true) {
                return head.key;
            }
        });
        const tableRows = rows.map((row, key) => {

            const _row = Object.keys(row).map((value, key) => {
                if (headText.includes(value)) {
                    const capitalizeClass = (capitalizedText.includes(value)) ? 'text-capitalize' : '';
                    return (<td key={key} title={row[value]}
                                className={`status-col custom-no-over-flow-td ${capitalizeClass}`}>{row[value]}</td>);
                }
                return true;
            });
            return (
                <tr className="body-tr" key={key}>
                    {_row}
                    <td>
                        <UncontrolledDropdown>
                            <DropdownToggle>

                                <span className="lnr lnr-menu-circle six-layers"></span>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown__menu">
                                <DropdownItem tag="div">
                                    <a onClick={() => this.props.viewProfile(row)}>
                                        Edit Name
                                    </a>
                                </DropdownItem>
                                <DropdownItem tag="div">
                                    <a onClick={() => this.props.delete(row)}>
                                        Delete
                                    </a>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                    </td>
                </tr>
            );
        });
        const headers = heads.map((head, key) => {
            if (head) {
                const thisSortField = head.key;
                return ((head.sortable && !head.filterable) ?
                        <th key={key}>
                            {(sortField == head.key) ?
                                (sortOrder === 1) ?
                                    <a onClick={() => this.props.handleGridSort(thisSortField)}>
                                        <p className="header-text">{head.name}</p><span className="triangle-up"> </span></a>
                                    :
                                    <a onClick={() => this.props.handleGridSort(thisSortField)}><p
                                        className="header-text">{head.name}</p>
                                        <span className="triangle-down"> </span></a>
                                :
                                <a onClick={() => this.props.handleGridSort(thisSortField)}><p
                                    className="header-text">{head.name}</p><span className="diamond-narrow"></span></a>
                            }
                        </th>
                        :
                        (['status', 'speciesName', 'breedName', 'gender'].includes(head.key)) ?
                            <th key={key}>
                                {(head.key === 'breedName') ?
                                    <TableSearchableFilterComponent
                                        allFilters={head.filterValue}
                                        action={(list) => {
                                            this.handleStatusFilter(list, head.key)
                                        }}
                                        label={head.name}
                                    />
                                    :
                                    <TableStatusFilterComponent
                                      allFilters={head.filterValue}
                                      action={(list) => {
                                          this.handleStatusFilter(list, head.key)
                                      }}
                                      label={head.name}
                                    />
                                }
                            </th>
                            :
                            <th key={key}>
                                <p className="header-text">{head.name}</p>
                            </th>
                )
            }
            return true;
        });
        return (
            <div className="row">
                <div className="col-md-12">
                    <Table striped className="custom-table custom-data-table">
                        <thead>
                        <tr className="header-tr">
                            {headers}
                            <th className="text-center action"><p className="header-text action">Action</p></th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableRows}
                        </tbody>
                    </Table>
                    {
                        rows.length == 0 ?
                            <div className="no-data-message">No search results were found</div> : null
                    }
                </div>
            </div>
        );
    }
}
