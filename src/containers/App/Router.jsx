import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from '../Layout/index';
import LayoutFront from '../LayoutFront/index';
import Footer from '../LayoutFront/footer';
import MainWrapper from './MainWrapper';
import localStorage from '../../libs/storageHelper';
import LogIn from '../Account/LogIn/index';
import Home from '../Home/index';
import List from '../ListPage/index';
import Meaning from '../Meaning/index';
import Dashboard from '../dashboard/Dashboard';
import ManageNames from '../Web/ManageNames';
import CreateName from '../Web/CreateName';
import UpdateName from '../Web/UpdateName';

let user = localStorage.getFromStorage('loggedUser');

const Auth = {
  authenticate() {
    user = localStorage.getFromStorage('loggedUser');
    return !!user;
  },
};

/**
 * Super admin and admin routes
 *
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */
function PrivateRoute({ component: Component, ...rest }) {
  return (
    Auth.authenticate() ?
      <Fragment>
        <Layout />
        <div className="container__wrap">
          <Route {...rest} render={props => ( <Component {...props} />) }/>
        </div>
      </Fragment>
      : (<Redirect to={{pathname: "/directory-admin/login"}}/>)
  );
}

/**
 * Web routs
 *
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */
function WebRoute({ component: Component, ...rest }) {
  return (
      <Fragment>
        <LayoutFront/>
          <div className="container">
            <Route {...rest} render={props => ( <Component {...props} />) }/>
          </div>
        <Footer />
      </Fragment>
  );
}

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>


        <Route exact path="/directory-admin/" component={LogIn} />
        <Route exact path="/directory-admin/login" component={LogIn} />

        <PrivateRoute path="/directory-admin/name-list" component={ManageNames}/>
        <PrivateRoute path="/directory-admin/new-name" component={CreateName}/>
        <PrivateRoute path="/directory-admin/update-name/:id" component={UpdateName}/>

        {/*admin app routes*/}
        <PrivateRoute path="/directory-admin/dashboard" component={Dashboard} />

        <WebRoute exact path="/" component={Home} />
        <WebRoute exact path="/home" component={Home} />
        <WebRoute exact path="/mean/:name" component={Meaning} />
        <WebRoute exact path="/:category" component={List} />
        <WebRoute exact path="/:category/:key" component={List} />

      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
