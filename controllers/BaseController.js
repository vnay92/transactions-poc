/*jshint esversion: 9 */
/*jslint node: true */
'use strict';

class BaseController {
    async getAll() {
        return await this.model.findAll();
    }
}

module.exports = BaseController;
