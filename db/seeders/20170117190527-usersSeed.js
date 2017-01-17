'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username: 'omar',
      password: '$2a$06$kogqY22J9AjsXszjnMrphuLmtyrj2Yu9X8KOZ7.EUok2z6Y1avMRa',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
  }
};
