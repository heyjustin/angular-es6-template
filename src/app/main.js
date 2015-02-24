'use strict';

var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/partials/home.html'
    },
    $routeProvider.when('/dashboard', {
        templateUrl: 'app/partials/dashboard.html',
        controller: DashboardController,
        controllerAs: 'vm'
    }));
});


function DashboardController() {
    console.log('Setting up the dashboard controller...');
    this.currentTime = new Date();
}

app.run(function($templateCache) {
    $templateCache.put('header', '<div>This is your header</div>');
    $templateCache.put('footer', '<div>This is your footer</div>');
});
