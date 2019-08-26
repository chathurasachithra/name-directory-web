const constants = {
  PASSWORD_PATTERN: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$',
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive'
  },
  userRole: {
    superAdmin: 'super_admin',
  }
};

module.exports = constants;