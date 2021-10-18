"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "John Doe",
          email: "ilham@gmail.com",
          password: "adawfsegse343",
          uuid: "eaf5c2e1-e931-49a2-8eea-e39311c41004",
          createdAt: "2021-10-15T14:51:30.709Z",
          updatedAt: "2021-10-15T14:51:30.709Z",
        },
        {
          name: "Jane Doe",
          email: "jane@gmail.com",
          password: "adawfsegseawdad343",
          uuid: "eaf5c2e1-e931-49a2-8eea-e39311c34532",
          createdAt: "2021-10-15T14:51:30.709Z",
          updatedAt: "2021-10-15T14:51:30.709Z",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
