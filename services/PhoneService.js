const { Phone } = require('../models/Phone');

async function createPhone(input) {
  const phone = await Phone.create({
        firstName: 'Nahuel',
        phone: input
    }).then(Phone => {
        next(null, Phone);
    }).catch(err => {
        console.error(err);
    });
  return phone;
}

module.exports = createPhone