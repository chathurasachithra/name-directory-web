import React, { PureComponent } from 'react';
import {Card, CardBody, Col, FormGroup, Label} from 'reactstrap';
import TableComponent from './TableComponent';
import Pagination from '../../../shared/components/pagination/Pagination';
import  { connect } from 'react-redux';

import { getNames, removeName } from '../../../redux/actions/nameActions';
import SearchIcon from "mdi-react/SearchIcon";
import HeadingText from "../../../shared/components/form/HeadingText";
import { DebounceInput } from "../Common/DebounceInput";

class ManageNames extends PureComponent {
  constructor() {
    super();
    this.heads = [
      {
        key: 'name',
        name: 'Name',
        sortable: true,
        filterable: false,
        capitalize: true,
      },
      {
        key: 'meaning',
        name: 'Meaning',
        sortable: false,
        filterable: false,
        capitalize: true,
      },
      {
        key: 'views',
        name: 'View Count',
        sortable: false,
        filterable: false,
        capitalize: true,
      },
      {
        key: 'createdAt',
        name: 'Insert Date',
        sortable: false,
        filterable: false,
        capitalize: false,
      },
    ];

    this.state = {
      rows: [],
      refreshState: false,
      inputs: {
        search: '',
        sort: {
          field: 'name',
          order: 1
        },
        page: 1,
        limit: 20,
        offset: 0,
        total: 0,
      },
      confirmPopup: {
        showResponse: false,
        responseMessage: '',
        responseAlertType: '',
        responseType: '',
        responseTitle: '',
        pet: null,
        status: null,
        confirmType: null
      },
    };
  }

  componentDidMount(){
    const { inputs } = this.state;
    this.props.getNames(inputs);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.names.nameList) {
      this.setNameData(nextProps.names.nameList);
    }
    if (nextProps.names.nameRemoved) {
      const { inputs } = this.state;
      this.props.getNames(inputs);
    }
  };

  setNameData = (data) => {
    console.log(data);
    const { inputs } = this.state;
    inputs.total = data.total;
    this.setState({ inputs });
    this.createRows(data.names);
  };

  onSuccess = () => {
    const { confirmPopup, refreshState } = this.state;
    if (confirmPopup.confirmType === 'change_status') {
      this.props.toggleLoading(true);
      this.props.updatePetStatus({ status: confirmPopup.status, id: confirmPopup.pet.id });
    }
    confirmPopup.showResponse = false;
    this.setState({
      refreshState: !refreshState,
      confirmPopup
    })
  };

  closePopup = () => {
    const { confirmPopup, refreshState } = this.state;
    confirmPopup.showResponse = false;
    confirmPopup.confirmType = null;
    this.setState({ confirmPopup, refreshState: !refreshState });
  };

  createRows = (data) => {
    const rows = [];
    data.forEach(function(row) {
      rows.push({
        name:row.name,
        meaning:row.meaning,
        views: row.views,
        createdAt: row.createdAt || 'N/A',
        action: '',
        id: row._id,
      });
    });
    this.setState({ rows });
  };

  handleSearch = (e) => {
    let { inputs } = this.state;
    inputs.search = e.target.value;
    inputs.offset = 0;
    this.setState({ inputs }, () => {
      this.props.getNames(inputs);
    });
  };

  nextPage = () => {
    let { inputs } = this.state;
    inputs.offset = parseInt(inputs.offset + inputs.limit);
    this.setState({ inputs }, () => {
      this.props.getNames(inputs);
    });
  };

  prevPage = () => {
    let { inputs } = this.state;
    inputs.offset = parseInt(inputs.offset - inputs.limit);
    this.setState({ inputs }, () => {
      this.props.getNames(inputs);
    });
  };

  gotoPage = (i) => {
    let { inputs } = this.state;
    inputs.offset = parseInt(inputs.limit * i);
    this.setState({ inputs }, () => {
      this.props.getNames(inputs);
    });
  };

  handleGridSort = (field) => {
    let { inputs } = this.state;
    if (field === inputs.sort.field) {
      inputs.sort.order = (inputs.sort.order === 1) ? -1 : 1;
    } else {
      inputs.sort.field = field;
    }
    inputs.offset = 0;
    this.setState({ inputs }, () => {
      this.props.getNames(inputs);
    });
  };

  handleGridFilter = (header, value) => {
    let { inputs } = this.state;
    inputs.filters[header] = value;
    inputs.offset = 0;
    this.setState({ inputs }, () => {
      this.props.getNames(inputs);
    });
  };

  handlePageLimit = (perPage) => {
    let { inputs } = this.state;
    inputs.limit = perPage;
    inputs.offset = 0;
    this.setState({ inputs }, () => {
      this.props.getNames(inputs);
    });
  };

  delete = (selectedRow) => {
    this.props.removeName(selectedRow.id);
  }

  updateName = (selectedRow) => {
    this.props.history.push(`/directory-admin/update-name/${selectedRow.id}`);
  };

  render() {
    const { rows, confirmPopup, inputs } = this.state;
    return (
      <Col md={12} lg={12}  className="manage-patient-container admin-container">
        <Card>
          <CardBody>
            <HeadingText text="All Names" />
            <div className="row search form">
              <div className="col-sm-7">

                <div className="form__form-group">
                  <Label for="exampleSelect" className={'empty-label'}>&nbsp;</Label>
                  <div className="form__form-group-field custom-shadow custom-border-radius name-search">
                    <div className="form__form-group-icon form__form-group-icon--left form__form-group-search">
                      <SearchIcon />
                    </div>
                    <DebounceInput className="form__custom-field form__custom-field--icon-left"
                                   placeholder="Search by name"
                                   name="search"
                                   id="search"
                                   onChange={this.handleSearch}
                                   value={inputs.search}
                                   debounceTimeout={100}/>
                  </div>
                </div>
              </div>
              <div className="col-sm-5">
                <FormGroup>
                  <Label for="exampleSelect" className={'empty-label'}>&nbsp;</Label>
                  <a href={'/directory-admin/new-name'}>
                  <button className="btn btn-outline-primary pull-right top-panel-button"
                  > Add New Name</button></a>
                </FormGroup>
              </div>
            </div>
            <TableComponent sortField={inputs.sort.field} sortOrder={inputs.sort.order}
                                    heads={this.heads} rows={rows}
                                    viewProfile = {(field) => this.updateName(field)}
                                    delete = {(field) => this.delete(field)}
                                    handleGridSort={(field) => this.handleGridSort(field)}
                                    handleGridFilter={(header, field) => this.handleGridFilter(header, field)}
                                    handleActiveStatus={(status,id, joined, firstName) => this.handleActiveStatus(status,id, joined, firstName)} />
            <Pagination handlePageLimit={(limit) => this.handlePageLimit(limit)}
                        nextPage={this.nextPage}
                        prevPage={this.prevPage} gotoPage={(i) => this.gotoPage(i)} limit={inputs.limit}
                        offset={inputs.offset} total={inputs.total}/>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = {
  getNames, removeName
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageNames)

