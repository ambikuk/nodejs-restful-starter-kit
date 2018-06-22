'use strict';

module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface
            .createTable('user', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                email: Sequelize.STRING,
                password_hash: Sequelize.STRING,
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                updated_at: Sequelize.DATE,
                last_login: Sequelize.DATE
            });
    },

    down(queryInterface, Sequelize) {
        return queryInterface
            .dropTable('user');
    }
};
