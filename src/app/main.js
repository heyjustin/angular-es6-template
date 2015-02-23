'use strict';

var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/partials/home.html'
    });
});

app.run(function($templateCache) {
    $templateCache.put('header', '<div>This is your header</div>');
    $templateCache.put('footer', '<div>This is your footer</div>');
});
