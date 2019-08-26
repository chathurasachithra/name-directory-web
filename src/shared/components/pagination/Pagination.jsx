/* eslint-disable */
import React, {PureComponent} from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
import config from '../../../config/app.config';

export default class PaginationComponent extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            min: config.DEFAULT_PAGINATION_LENGTH
        };
    }

    render() {
        const {offset, limit, total} = this.props;

        let pages = [];
        if (total > 0) {
            for (let i = 0; i < (total / limit); i++) {
                pages.push(<PaginationItem className="pagination__item" key={i}
                                           active={(offset !== 0) ? (parseInt(offset / limit) === i) : (i == offset)}>
                    <PaginationLink className="pagination__link" type="button" onClick={() => this.props.gotoPage(i)}>
                        {i + 1}
                    </PaginationLink>
                </PaginationItem>);
            }
        }

        return (
            <div className="pagination__wrap">
                {!(total > limit) ? '' :
                    <Pagination className="pagination">
                        <PaginationItem className="pagination__item" disabled={offset === 0}>
                            <PaginationLink
                                className="pagination__link pagination__link--arrow"
                                type="button"
                                onClick={() => this.props.prevPage()}>
                                <ChevronLeftIcon className="pagination__link-icon"/>
                            </PaginationLink>
                        </PaginationItem>
                        {pages}
                        <PaginationItem className="pagination__item" disabled={parseInt((total - offset)) <= limit}>
                            <PaginationLink
                                className="pagination__link pagination__link--arrow"
                                type="button"
                                onClick={() => this.props.nextPage()}>
                                <ChevronRightIcon className="pagination__link-icon"/>
                            </PaginationLink>
                        </PaginationItem>
                    </Pagination>
                }
                {!(total > this.state.min) ? '' :
                    <div className="perpage-wrapper">
                        <select className="form-control"
                                onChange={(event) => this.props.handlePageLimit(event.target.value)} value={limit}>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        <p>Per page</p>
                    </div>
                }
                <div className="pagination-info">
                  <span>Showing {parseInt(offset + 1)}
                      &nbsp; to {(parseInt(offset + limit) < total) ? parseInt(offset + limit) : total} of {total}
                  </span>
                </div>
            </div>
        );
    }
}

/* eslint-enable */

// todo: rework it
