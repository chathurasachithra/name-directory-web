import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import { getNameList, increaseCount } from '../../redux/actions/nameActions';

export class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      nameObject: {},
      namePreviousObject: {},
      nameNextObject: {},
      nameKey: null,
      languages: [],
      names: [],
      category: {},
      params: {
        category: '',
        search: '',
        character: '',
      },
      alphabet: [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z'
      ]
    }
  }

  componentDidMount() {
    let name = this.props.match.params.name || null;
    let searchParams = this.props.location.search;
    searchParams = new URLSearchParams(searchParams);
    let category = searchParams.get('category') || '';
    let character = searchParams.get('character') || '';
    let search = searchParams.get('search') || '';
    const params = {
      category,
      search,
      character,
    };
    this.setState({ params, name });
    this.props.getNameList({ category, search, character });
    this.props.increaseCount(name);
  }

  componentWillReceiveProps(np){
    if (np.names.nameList) {
      const { name } = this.state;
      let { nameKey, nameObject, namePreviousObject, nameNextObject, params } = this.state;
      const names = np.names.nameList.names;
      const category = np.names.nameList.categoryName;
      const languages = np.names.nameList.languages;
      const paramList = new URLSearchParams(params).toString();
      names.map((thisName, key) => {
        if (name.toLowerCase() === thisName.name.toLowerCase()) {
          nameObject = thisName;
          nameKey = key;
        }
      });
      if (names[nameKey-1]) {
        namePreviousObject = names[nameKey-1];
        namePreviousObject.url = `/mean/${namePreviousObject.name}?${paramList}`;
      }
      if (names[nameKey+1]) {
        nameNextObject = names[nameKey+1];
        nameNextObject.url = `/mean/${nameNextObject.name}?${paramList}`;
      }
      this.setState({ names, category, nameObject, nameKey, languages,
        namePreviousObject, nameNextObject });
    }
  }

  render () {

    const { params, nameObject, languages,
      namePreviousObject, nameNextObject } = this.state;
    const gender = (nameObject.gender) ? nameObject.gender : 'male';
    const genderClass = (nameObject.gender && nameObject.gender === 'male') ? 'boys' : 'girls';
    const genderName = (nameObject.gender && nameObject.gender === 'male') ? 'Boys' : 'Girls';
    let languageCards = '';
    const languageNames = [];
    if (nameObject.languages) {
      languageCards = nameObject.languages.map((language) => {
        languageNames.push(languages[language.language_id]);
        return (
          <p>Name In {languages[language.language_id]} : <b>{language.word}</b></p>
        )
      });
    }
    let girlsNameCategoryText = 'Muslim Girls Names';
    let girlsNameCategoryUrl = '/muslim-girls-names';
    let boysNameCategoryText = 'Muslim Boys Names';
    let boysNameCategoryUrl = '/muslim-boys-names';
    if (params.character && params.character !== '') {
      girlsNameCategoryText = `Muslim Girls Names With Alphabet ${params.character.toUpperCase()}`;
      girlsNameCategoryUrl = `/muslim-girls-names/${params.character.toLowerCase()}`;
      boysNameCategoryText = `Muslim Boys Names With Alphabet ${params.character.toUpperCase()}`;
      boysNameCategoryUrl = `/muslim-boys-names/${params.character.toLowerCase()}`;
    }

    return (
        <div className="row">
          <div className="col-md-12">
            <div className="home-content-box home-content-box-left">

              <div className="mean-left-column">
                <div className="mean-container">
                  {(gender === 'male') &&
                    <div className="mean-container-name boys">
                      <h1 className="boys"><i className="fa fa-mars"></i> {nameObject.name}</h1>
                    </div>
                  }
                  {(gender !== 'male') &&
                  <div className="mean-container-name girls">
                    <h1 className="girls"><i className="fa fa-venus"></i> {nameObject.name}</h1>
                  </div>
                  }

                </div>

                <div className="mean-navigation">
                  <div className="mean-navigation-body">

                    {(nameNextObject && nameNextObject.name) &&
                    <div className="mean-navigation-next">
                      <div className="float-right">
                        <a href={nameNextObject.url}>
                          <i className={`fa fa-caret-right ${genderClass}`}></i>
                        </a>
                      </div>
                      <div className="float-right">
                        <a href={nameNextObject.url}
                           title={`${nameNextObject.name} Islamic Name Meaning`}
                           className={`mean-navigation-name ${genderClass}`}>{nameNextObject.name}</a><br/>
                        <a href={nameNextObject.url}
                           className={`mn_sn_navigation_prevnxt ${genderClass}`}>Previous Name</a>
                      </div>
                    </div>
                    }

                    {(namePreviousObject && namePreviousObject.name) &&
                      <div className="mean-navigation-prev">
                        <div className="float-left">
                          <a href={namePreviousObject.url}>
                            <i className={`fa fa-caret-left ${genderClass}`}></i>
                          </a>
                        </div>
                        <div className="float-left">
                          <a href={namePreviousObject.url}
                             title={`${namePreviousObject.name} Islamic Name Meaning`}
                             className={`mean-navigation-name ${genderClass}`}>{namePreviousObject.name}</a><br/>
                          <a href={namePreviousObject.url}
                             className={`mn_sn_navigation_prevnxt ${genderClass}`}>Previous Name</a>
                        </div>
                      </div>
                    }

                  </div>
                  <div className="mean-body">
                    <p>{nameObject.name} is a name for {genderName}</p>
                    <div>
                      <p><strong>The meaning of {nameObject.name} is </strong> {nameObject.meaning}.</p>
                      <p className={'language-set'}>
                        {languageCards}
                      </p>
                      <br/>
                      Name Views : <b>{nameObject.views}</b><br/>
                    </div>
                    <br/>

                    <p>Share This Name On :</p>
                    <div class="addthis_inline_share_toolbox"></div>

                    <br/>

                    <div className={'mean-cat-box-container'}>
                      <div className={'mean-names-girl'}>
                        <a href={girlsNameCategoryUrl}>{girlsNameCategoryText}</a>
                      </div>
                      <div className={'mean-names-boy'}>
                        <a href={boysNameCategoryUrl}>{boysNameCategoryText}</a>
                      </div>
                    </div>

                    <hr/>

                    <b>Note : </b> If you think this name contains an error/not correct with spelling, meaning
                    of the name {`${(languageNames.length) ? 'or ' : ''} ${languageNames.join(', ')}`} writing please do not hesitate to drop us an
                    email
                  </div>
                </div>
              </div>
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
  getNameList, increaseCount
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
