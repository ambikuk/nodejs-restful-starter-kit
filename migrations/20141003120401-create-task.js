'use strict';

module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface
            .createTable('task', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                title: Sequelize.STRING,
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                updated_at: Sequelize.DATE,
                user_id: {
                    type: Sequelize.INTEGER,
                    onDelete: 'CASCADE',
                    allowNull: false,
                    references: {
                        model: 'user',
                        key: 'id'
                    }
                }
            });
    },

    down(queryInterface, Sequelize) {
        return queryInterface
            .dropTable('task');
    }
};
