import React, { Component } from 'react';
import { Card, CardBody, Col, FormGroup, Row } from 'reactstrap';
import { connect } from 'react-redux';
import HeadingText from "../../../shared/components/form/HeadingText";
import { getStaticData, updateName, getName, clearNameRecord } from "../../../redux/actions/nameActions";
import { toggleLoading } from '../../../redux/actions/commonActions';
import Error from '../../../shared/components/form/Error';
import {reset, validate} from "../../../libs/validationHelper";

class ParentProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successResponse: null,
      errorResponse: null,
      categories: [],
      languages: [],
      refreshState: true,
      inputs: {
        name: '',
        meaning: '',
        similar_names: '',
        gender: '',
        categories: [],
      },
      languageArray: [],
      languageSet: {
        language_id: '',
        word: '',
      },
      error: false,
      errors: {
        name: {error: null, display: 'name'},
        meaning: {error: null, display: 'meaning'},
        similar_names: {error: null, display: 'similar names'},
        gender: {error: null, display: 'gender'},
        categories: {error: null, display: 'category'},
      },
    };
  };

  handleChange =(e) => {
    const property = e.target.name;
    const options = e.target.options;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    let { inputs, refreshState } = this.state;
    refreshState = !refreshState;
    inputs[property] = value;
    this.setState({
      inputs, refreshState
    });
  };

  remove = (id) => {
    let { languageArray, refreshState } = this.state;
    delete languageArray[id];
    languageArray = languageArray.filter(_ => true);
    refreshState = !refreshState;
    this.setState({
      refreshState, languageArray
    });
  };

  addToLanguageArray = () => {
    let { languageSet, languageArray, refreshState } = this.state;
    if (languageSet.language_id && languageSet.language_id!== '' && languageSet.word && languageSet.word !== '') {
      refreshState = !refreshState;
      const set = Object.assign({}, languageSet);
      languageArray.push(set);
      languageSet.language_id = '';
      languageSet.word = '';
      this.setState({
        languageSet, refreshState, languageArray
      });
    }
  };

  onChangeFields = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    let { inputs, refreshState } = this.state;
    refreshState = !refreshState;
    inputs[property] = value;
    this.setState({
      inputs, refreshState
    });
  };

  handleLanguageChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    let { languageSet, refreshState } = this.state;
    refreshState = !refreshState;
    languageSet[property] = value;
    this.setState({
      languageSet, refreshState
    });
  };

  validate = (inputs) => {
    const { refreshState } = this.state;
    let { errors } = this.state;
    errors = reset(errors);
    const validationPetRules = {
      required: ['name', 'meaning', 'similar_names', 'gender'],
    };
    const validationPetResponse = validate(validationPetRules, inputs, errors);
    errors = validationPetResponse.errors;
    const error = validationPetResponse.error;
    this.setState({ errors, error, successResponse: null, errorResponse: null, refreshState: !refreshState });
    return error;
  };

  updateName = () => {
    const { inputs, languageArray } = this.state;
    if (!this.validate(inputs)) {
      this.props.toggleLoading(true);
      const data = inputs;
      data.languages = languageArray;
      this.props.updateName(data, this.props.match.params.id);
    }
  };

  componentDidMount() {
    this.props.getName(this.props.match.params.id);
    this.props.getStaticData();
  };

  componentWillReceiveProps(np) {

    if (np.names.staticData) {
      const { categories, languages } = np.names.staticData;
      this.setState({ categories, languages });
    }

    if (np.names.name) {
      const { inputs } = this.state;
      const { name } = np.names;
      inputs.name = name.name;
      inputs.meaning = name.meaning;
      inputs.similar_names = name.similar_names;
      inputs.gender = name.gender;
      inputs.categories = name.categories;

      const languageArray = name.languages;
      this.setState({ inputs, languageArray });
      this.props.clearNameRecord();
    }

    if (np.names.nameUpdateResponse) {
      const message = 'Name updated successfully';
      this.setState({ successResponse: message, errorResponse: null});
      window.scrollTo(0, 0);
      setTimeout(() => {
        this.props.history.push(`/directory-admin/name-list`);
      }, 2000);
    }
    if (np.names.nameUpdateErrorResponse) {
      if (np.names.nameUpdateErrorResponse.errorMessage) {
        window.scrollTo(0, 0);
        this.setState({errorResponse: np.names.nameUpdateErrorResponse.errorMessage, successResponse: null});
      }
    }
  };

  handleRedirect = (data) => {
    this.props.history.push(data);
  }

  render() {
    const { inputs, errors, successResponse, errorResponse, languageSet } = this.state;
    let { categories, languages, languageArray } = this.state;
    categories = categories.map( (option) => (
      <option value={option._id}>{option.name}</option>
    ));
    languageArray = languageArray.map( (item) => {
      const selLanguage = item;
      let obj = languages.find(o => o._id === item.language_id);
      selLanguage.langName = (obj && obj.name) ? obj.name : 'N/A';
      return selLanguage;
    });
    const icon = `${process.env.PUBLIC_URL}/img/error_icon.png`;
    languages = languages.map( (option) => (
      <option value={option._id}>{option.name}</option>
    ));
    const languageCards = languageArray.map((selectedLanguage, key) => {
      return(
        <Row className={'grid-row'}>
          <div className="col-md-4">{selectedLanguage.langName}</div>
          <div className="col-md-4">{selectedLanguage.word}</div>
          <div className="col-md-4">
            <a className={'icon-remove-sm'}
               onClick={() => {this.remove(key)}}><img src={icon}/> </a>
          </div>
        </Row>
      );
    });
    const tabContent = (
      <div className="row">
        <div className="col-md-12">
          <Row>
            <Col sm="12">
              <div className="row content-holder">
                <div className="col-md-6">
                  <div className="form__form-group custom-form-group">
                    <span className="form__form-group-label">Name <span className={'required'}>*</span></span>
                    <div className="form__form-group-field">
                      <FormGroup>
                        <input
                          className="form-control"
                          name="name"
                          type="text"
                          placeholder={'Name'}
                          value={inputs.name}
                          onChange = {this.onChangeFields}
                        />
                        {errors.name.error && <Error text={errors.name.error}/>}
                      </FormGroup>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form__form-group custom-form-group">
                    <span className="form__form-group-label">Meaning  <span className={'required'}>*</span></span>
                    <div className="form__form-group-field">
                      <FormGroup>
                        <input
                          className="form-control"
                          name="meaning"
                          type="text"
                          value={inputs.meaning}
                          placeholder={'Meaning'}
                          onChange = {this.onChangeFields}
                        />
                        {errors.meaning.error && <Error text={errors.meaning.error}/>}
                      </FormGroup>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form__form-group custom-form-group">
                    <span className="form__form-group-label">Name Gender <span className={'required'}>*</span></span>
                    <div className="form__form-group-field">
                      <FormGroup>
                        <select name="gender" id="gender" value={inputs.gender}
                                className="form-control form-select"
                                onChange = {this.onChangeFields}>
                          <option value=''>Select</option>
                          <option value='male'>Male</option>
                          <option value='female'>Female</option>
                        </select>
                        {errors.gender.error && <Error text={errors.gender.error}/>}
                      </FormGroup>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form__form-group custom-form-group">
                    <span className="form__form-group-label">Similar Names  <span className={'required'}>*</span></span>
                    <div className="form__form-group-field">
                      <FormGroup>
                        <input
                          className="form-control"
                          name="similar_names"
                          type="text"
                          value={inputs.similar_names}
                          placeholder={'Similar Names'}
                          onChange = {this.onChangeFields}
                        />
                        {errors.similar_names.error && <Error text={errors.similar_names.error}/>}
                      </FormGroup>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form__form-group custom-form-group">
                    <span className="form__form-group-label">Categories</span>
                    <div className="form__form-group-field">
                      <FormGroup>
                        <select name="categories" id="categories" multiple={true}
                                value={inputs.categories}
                                className="form-control form-select multiple"
                                onChange = {this.handleChange} >
                          {categories}
                        </select>
                        {errors.categories.error && <Error text={errors.categories.error}/>}
                      </FormGroup>
                    </div>
                  </div>
                  <hr/>
                </div>

                <div className="col-md-4">
                  <div className="form__form-group custom-form-group">
                    <span className="form__form-group-label">Language</span>
                    <div className="form__form-group-field">
                      <FormGroup>
                        <select name="language_id" id="language_id" value={languageSet.language_id}
                                className="form-control form-select"
                                onChange = {this.handleLanguageChange} >
                          <option value={''}>Select</option>
                          {languages}
                        </select>
                      </FormGroup>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form__form-group custom-form-group">
                    <span className="form__form-group-label">Name in Language</span>
                    <div className="form__form-group-field">
                      <FormGroup>
                        <input
                          className="form-control"
                          name="word"
                          type="text"
                          value={languageSet.word}
                          placeholder={'Name'}
                          onChange = {this.handleLanguageChange}
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form__form-group custom-form-group">
                    <span className="form__form-group-label">&nbsp;</span>
                    <div className="form__form-group-field">
                      <FormGroup>
                        <button className={'btn btn-default-custom'}
                                onClick={this.addToLanguageArray}>Add</button>
                      </FormGroup>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  {languageCards}
                </div>
                <div className="col-md-12">&nbsp;</div>
              </div>
            </Col>
            <Col sm="12">
              <div className="row">
                <div className="col-md-6 offset-md-6 text-right">
                  <button className={'btn btn-save-update'}
                          onClick={this.updateName}>Update</button>
                  <a href="/directory-admin/name-list"><button className={`btn btn-clear`}>
                    Cancel
                  </button></a>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>);
    return (
      <div className="manage-patient">
        <Col md={12} lg={12}  className="manage-patient-container admin-container">
          <Card>
            <CardBody>
              {successResponse !== null &&
              <div className="alert alert-success fade show" role="alert">
                <div className="alert__content"><p>{successResponse}</p></div>
              </div>
              }
              {errorResponse !== null &&
              <div className="alert alert-danger fade show" role="alert">
                <div className="alert__content"><p>{errorResponse}</p></div>
              </div>
              }
              <HeadingText text={'Update Name'}/>
              <div className="content-wrapper">
                {tabContent}
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = {
  getStaticData, updateName, toggleLoading, getName, clearNameRecord
};

export default connect(mapStateToProps, mapDispatchToProps)(ParentProfile)
