import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const SidebarLinkCustomIcon = ({
  title, icon, newLink, route, onClick, link,
}) => {
  let sidebarEntry;
  const internal = SidebarEntryInternal(icon, title, newLink);

  if (link) {
    sidebarEntry = <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
    >{ internal }</a>;
  } else {
    sidebarEntry = <NavLink
        to={route}
        onClick={onClick}
        activeClassName="sidebar__link-active"
    >{ internal }</NavLink>;
  }

  return sidebarEntry;
};

const SidebarEntryInternal = (icon, title, newLink) => (
    <li className="sidebar__link custom_sidebar_link">
      {icon ? <span className={`icons8-${icon}`}/> : ''}
      <p className="sidebar__link-title">
        {title}
        {newLink
            ? <Badge className="sidebar__link-badge"><span>New</span></Badge>
            : ''}
      </p>
    </li>
);

SidebarLinkCustomIcon.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  newLink: PropTypes.bool,
  route: PropTypes.string,
  onClick: PropTypes.func,
};

SidebarLinkCustomIcon.defaultProps = {
  icon: '',
  newLink: false,
  route: '/',
  onClick: () => {},
};

export default SidebarLinkCustomIcon;
