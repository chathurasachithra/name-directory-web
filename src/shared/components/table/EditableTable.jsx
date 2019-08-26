/* eslint-disable consistent-return */
import React, { PureComponent } from 'react';
import ReactDataGrid from 'react-data-grid';
import PropTypes from 'prop-types';

export default class EditableTable extends PureComponent {
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
        const rows = this.props.rows;
        this.state = { rows };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.rows){
            const rows = nextProps.rows;
            this.setState({ rows });
        }
    }

    rowGetter = i => {
        return this.state.rows[i];
    }

    render() {

        return (
            <div className="table custom-class-wrapper">
                <ReactDataGrid
                    onGridSort={this.props.handleGridSort}
                    columns={this.props.heads}
                    rowGetter={this.rowGetter}
                    rowsCount={this.state.rows.length}
                    rowHeight={44}
                    minColumnWidth={100}
                    getCellActions={this.props.getCellActions}
                />
            </div>
        );
    }
}