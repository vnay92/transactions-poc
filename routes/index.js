/*jshint esversion: 9 */
/*jslint node: true */
'use strict';

const path = require('path');
const { readdirSync } = require('fs');
const filesUtil = require('util/FilesUtil');

let applicationRouters = [];
const registerRoutesInDirectory = (directory) => {
    const contents = readdirSync(directory, {
        withFileTypes: true
    });

    const routePath = directory.replace('routes/', '/');

    contents.map((file) => {
        if (file.isDirectory()) {
            return;
        }

        if (path.extname(file.name) !== '.js') {
            return;
        }

        // Get the file name of the route
        let fileName = file.name.split('.js')[0];
        if (fileName == 'index') {
            return;
        }

        applicationRouters.push({
            routerName: `${routePath}${fileName}Router`,
            path: `${routePath}/${fileName}`,
            value: require(path.join(directory, file.name))
        });
    });
};

const routeFolders = filesUtil.getDirectoriesRecursive('routes');
routeFolders.map((folder) => {
    registerRoutesInDirectory(folder);
});

module.exports = applicationRouters;
