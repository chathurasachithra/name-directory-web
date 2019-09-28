import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";

export class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: {},
      searchKey: '',
      alphabet: [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z'
      ]
    }
  }

  onChangeFields = (e) => {
    const value = e.target.value;
    const searchKey = value;
    this.setState({
      searchKey
    });
  };

  gotoListPage = () => {
    const { searchKey } = this.state;
    this.props.history.push(`/search/${searchKey}`);
  };



  componentDidMount() {
  }

  componentWillReceiveProps(np){
  }

  render () {
    const { alphabet, searchKey } = this.state;
    const alphabetBoyLinks = alphabet.map(letter => {
      return <li><a href={`/muslim-boys-names/${letter}`}
                    title={`Muslim Boys Names Starting with ${letter.toUpperCase()}`}>{letter.toUpperCase()}</a></li>;
    });
    const alphabetGirlLinks = alphabet.map(letter => {
      return <li><a href={`/muslim-girls-names/${letter}`}
                    title={`Muslim Girls Names Starting with ${letter.toUpperCase()}`}>{letter.toUpperCase()}</a></li>;
    });

    return (
        <div className="row">
          <div className="col-md-8">
            <div className="home-content-box home-content-box-left">
              <h1>Muslim Names and Islamic Names</h1>

              <div className="home-alphabet home-alphabet-boys">
                <ul>
                  <li><a href="/muslim-boys-names/"
                         title="Muslim Boys Names" className={'main-alphabet-key'}>Muslim
                    Boys Names</a></li>
                  {alphabetBoyLinks}
                </ul>
              </div>

              <div className="home-alphabet home-alphabet-girls">
                <ul>
                  <li><a href="/muslim-girls-names/"
                         className={'main-alphabet-key'}
                         title="Muslim Girls Names"
                         >Muslim Girls Names</a></li>
                  {alphabetGirlLinks}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4">
              <div className="home-content-box name_search_container">
                <div>
                  <img src="/img/muslim-baby-sheikh.png"/>
                </div>

                <h3>Search Muslim Names</h3>
                Search <b>Muslim Names</b> &amp; <b>Islamic Names</b> for English Meanings Insallah!

                <form method="post">
                  <div className="seach_field">
                    <input type="text" name="name" className="name_search_input"
                           value={searchKey}
                           onChange = {this.onChangeFields}
                           placeholder="Search Muslim Name Here..."/>
                      <input type="button"
                             disabled={(searchKey==='')}
                             onClick={this.gotoListPage}
                             className="name_search_button" value="Search"/>
                  </div>
                  <div className="clearfix"></div>

                </form>


                <div className="clearfix"></div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
