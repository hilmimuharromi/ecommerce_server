'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('CartItems', ['CartId'], {
      type: 'foreign key',
      name: 'FK-cartId-CartItems',
      references: {
        table: 'Carts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeConstraint('CartItems', 'FK-cartId-CartItems');
  }
};
