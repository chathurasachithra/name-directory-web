import React from 'react';
import Scrollbar from 'react-smooth-scrollbar';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SidebarContent from './SidebarContent';
import { SidebarProps } from '../../../shared/prop-types/ReducerProps';
import Profile from './profile';

const Sidebar = ({
  changeToDark, changeToLight, changeMobileSidebarVisibility, changeSidebarVisibility, sidebar,
}) => {
  const sidebarClass = classNames({
    sidebar: true,
    'sidebar--show': sidebar.show,
    'sidebar--collapse': sidebar.collapse,
  });

  const icon = sidebar.collapse? 'chevron-right-circle': 'chevron-left-circle';
  
  return (
    <div className={sidebarClass}>
      <button className="sidebar__back" onClick={changeMobileSidebarVisibility} />
      <Scrollbar className="sidebar__scroll scroll">
        <div className="sidebar__wrapper sidebar__wrapper--desktop">
          <div onClick={changeSidebarVisibility} className="sidebar__wrapper sidebar__wrapper--chevron"> <span className={`sidebar__link-icon lnr lnr-${icon}`} /></div>
          <div> 
          { sidebar.collapse || < Profile />  }
          </div>
          <SidebarContent
            onClick={() => {}}
            changeToDark={changeToDark}
            changeToLight={changeToLight}
          />
        </div>
        <div className="sidebar__wrapper sidebar__wrapper--mobile">
          <SidebarContent
            onClick={changeMobileSidebarVisibility}
            changeToDark={changeToDark}
            changeToLight={changeToLight}
          />
        </div>
      </Scrollbar>
    </div>
  );
};

Sidebar.propTypes = {
  sidebar: SidebarProps.isRequired,
  changeToDark: PropTypes.func.isRequired,
  changeToLight: PropTypes.func.isRequired,
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
};

export default Sidebar;
