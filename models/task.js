'use strict';

module.exports = function (sequelize, DataTypes) {
    const Task = sequelize.define('Task', {
        title: DataTypes.STRING,
        user_id: DataTypes.INTEGER
    }, {
        freezeTableName: true,
        underscored: true,
        tableName: 'task'
    });

    Task.associate = function (models) {
        Task.belongsTo(models.User, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Task;
};
