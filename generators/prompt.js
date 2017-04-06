'use strict';
var Util = require('../lib/util');
var Frameworks = Util.Frameworks;

module.exports = function prompt(name, generator) {

    var validate = function (propName) {
        return !!propName;
    };

    var apiPath = [{
        name: 'apiPath',
        message: 'Path (or URL) to swagger document:',
        required: true,
        when: function () {
            return !generator.apiPath;
        },
        default: generator.apiPath,
        validate: validate
    }];

    // var framework = [{
    //     name: 'framework',
    //     message: 'Framework:',
    //     default: 'hapi'
    // }];

    var app = [
        {
            name: 'appName',
            message: 'What would you like to call this project:',
            default: generator.appName, // Default to current folder name
            validate: validate
        },
        {
            name: 'creatorName',
            message: 'Your name:',
            validate: validate
        },
        {
            name: 'email',
            message: 'Your email:',
            validate: validate
        }
    ];

    var propmts = {
        data : function () {
            return apiPath;
        },
        handler: function () {
            return apiPath.concat('hapi');
        },
        test: function () {
            return apiPath.concat('hapi');
        },
        app: function () {
            return apiPath.concat('hapi').concat(app);
        }
    };

    return propmts[name]();
};
