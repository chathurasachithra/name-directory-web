import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import { getNameList } from '../../redux/actions/nameActions';

export class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      names: [],
      category: {},
      params: {
        category: null,
        search: null,
        character: null,
      },
      alphabet: [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z'
      ]
    }
  }

  componentDidMount() {
    let category = this.props.match.params.category || '';
    let character = this.props.match.params.key || '';
    let search = '';
    if (category === 'search') {
      search = character;
      character = '';
      category = '';
    }
    const params = {
      category,
      search,
      character,
    };
    this.setState({ params });
    this.props.getNameList({ category, search, character });
  }

  componentWillReceiveProps(np){
    if (np.names.nameList) {
      const names = np.names.nameList.names;
      const category = np.names.nameList.categoryName;
      this.setState({ names, category });
    }
  }

  render () {

    const { alphabet, names, params, category } = this.state;
    let pageTitle = 'Islamic Names Listing';
    if (category && category.name) {
      pageTitle = category.name;
      if (params.character && params.character !== '') {
        pageTitle = `${category.name} Starting with ${params.character.toUpperCase()}`;
      }
    } else if (params.search && params.search !== '') {
      pageTitle = `Search Result For '${params.search}'`;
    }
    const paramList = new URLSearchParams(params).toString();
    const alphabetBoyLinks = alphabet.map(letter => {
      const active = (params.character && letter.toUpperCase() === params.character.toUpperCase()) ? 'active' : '';
      return <li key={letter}><a href={`/muslim-boys-names/${letter}`} className={active}
                    title={`Muslim Boys Names Starting with ${letter.toUpperCase()}`}>{letter.toUpperCase()}</a></li>;
    });
    const alphabetGirlLinks = alphabet.map(letter => {
      const active = (params.character && letter.toUpperCase() === params.character.toUpperCase()) ? 'active' : '';
      return <li key={letter}><a href={`/muslim-girls-names/${letter}`} className={active}
                    title={`Muslim Girls Names Starting with ${letter.toUpperCase()}`}>{letter.toUpperCase()}</a></li>;
    });

    const nameCards = names.map((name) => {
      return (
        <div  key={name._id} className="name-row row">
          <div className="name-row-name boys col-md-4">
            <b><a href={`/mean/${name.name}?${paramList}`}
                  title="Meaning of the Muslim name Ebi">{name.name}</a></b>
          </div>
          <div className="name-row-trns  col-md-3">
            {name.similar_names}
          </div>
          <div className="name-row-mean col-md-5">
            {name.meaning}
          </div>
        </div>
      )
    });

    return (
        <div className="row">
          <div className="col-md-12">
            <div className="home-content-box home-content-box-left">

              { (category && category.key && category.key === 'muslim-boys-names') &&
              <div className="home-alphabet home-alphabet-boys">
                <ul>
                  {alphabetBoyLinks}
                </ul>
              </div>
              }
              {(category && category.key && category.key === 'muslim-girls-names') &&
              <div className="home-alphabet home-alphabet-girls">
                <ul>
                  {alphabetGirlLinks}
                </ul>
              </div>
              }
              <div className="name-header">
                <h1>{pageTitle}</h1>
                <a href="/" title="Islamic Names">Islamic Names</a>
                { (category && category.name) &&
                  <p className={'display-block'}>
                    &nbsp;<i className="fa fa-angle-right"></i>&nbsp;
                    <a href={`/${category.key}`} title={category.name}>{category.name}</a>
                  </p>
                }
                {(category && category.name && params.character && params.character !== '') &&
                <p className={'display-block'}>
                 &nbsp;<i className="fa fa-angle-right"></i>&nbsp;
                  <a href={`/${category.key}/${params.character}`} title={`${category.name} Alphabet ${params.character.toUpperCase()}`}>Alphabet {params.character.toUpperCase()}</a>
                </p>
                }
              </div>
              { (names.length > 0) &&
                <div className="name_row_container">
                  <div className="names-detail-icon">
                    <div className="names-detail-icon-left">
                      <img src="/img/muslim-baby-sheikh.png" alt="sheikh" height="40"/>
                    </div>
                    <div className="names-detail-icon-right">
                      Click On Names For Details
                    </div>
                  </div>
                  {nameCards}
                </div>
              }
              { (!names.length) &&
              <div className="name_row_container">
                <div className="names-detail-icon-right">
                  No Names Found For This Filter
                </div>
              </div>
              }
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = {
  getNameList
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
