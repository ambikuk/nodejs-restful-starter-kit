'use strict';

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        email: DataTypes.STRING,
        password_hash: DataTypes.STRING,
        last_login: DataTypes.INTEGER
    }, {
        freezeTableName: true,
        underscored: true,
        tableName: 'user'
    });

    User.associate = function (models) {
        User.hasMany(models.Task);
    };

    return User;
};
