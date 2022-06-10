const storeOption = (session) => {
  const MySQLStore = require('express-mysql-session')(session);
  const option = {
    secret: '',
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
      host: '',
      user: '',
      password: '',
      database: ''
    })
  };
  return option;
}

module.exports = storeOption;