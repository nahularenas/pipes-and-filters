const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Phone = sequelize.define('phone', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});

Phone.sync().then(() => {
    console.log('Phone table created');
    Phone.create({
      firstName: 'Nahuel',
      phone: 095835838
    }).then(phone => {
      console.log(phone.toJSON());
    }).catch(err => {
      console.error(err);
    });
  }).catch(err => {
    console.error('Unable to create Phone table:', err);
  });

module.exports = Phone;