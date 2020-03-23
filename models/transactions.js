/*jslint node: true*/
/*jshint esversion: 8*/
'use strict';

module.exports = function (sequelize, DataTypes) {
    const Transactions = sequelize.define('transactions', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.BIGINT,
        },
        transaction_id: {
            unique: true,
            allowNull: false,
            type: DataTypes.BIGINT,
        },
        amount: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        parent_id: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        }
    }, {
        underscored: true,
    });

    return Transactions;
};
