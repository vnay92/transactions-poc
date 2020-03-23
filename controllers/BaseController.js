/*jshint esversion: 9 */
/*jslint node: true */
'use strict';

class BaseController {

    async getAll() {
        return await this.model.findAll();
    }

    async create(data) {
        return await this.model.create(data);
    }

    async getAllByKey(key, value) {
        let query = {};
        query[key] = value;

        return await this.model.findAll({
            where: query
        });
    }

    async getOneByKey(key, value) {
        let query = {};
        query[key] = value;

        return await this.model.findOne({
            where: query
        });
    }
}

module.exports = BaseController;
