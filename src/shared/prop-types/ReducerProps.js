import PropTypes from 'prop-types';

const {
  string, shape, object
} = PropTypes;

export const SidebarProps = shape({
  show: PropTypes.bool,
  collapse: PropTypes.bool,
});

export const ThemeProps = shape({
  className: string,
});

export const HospitalProps = shape({
  data: object
});
