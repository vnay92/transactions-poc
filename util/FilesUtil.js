/*jshint esversion: 9 */
/*jslint node: true */
'use strict';

const fs = require('fs');
const path = require('path');

const flatten = (lists) => {
    return lists.reduce((a, b) => a.concat(b), []);
};

const getDirectories = (srcpath) => {
    return fs.readdirSync(srcpath)
        .map(file => path.join(srcpath, file))
        .filter(path => fs.statSync(path).isDirectory());
};

const getDirectoriesRecursive = (srcpath) => {
    return [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))];
};

module.exports = {
    getDirectories,
    getDirectoriesRecursive,
};
