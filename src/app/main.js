'use strict';

import 'angular';
import 'angular-route';

let app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/partials/home.html'
    },
    $routeProvider.when('/dashboard', {
        templateUrl: 'app/partials/dashboard.html',
        controller: DashboardController,
        controllerAs: 'vm'
    }));

  // take advantage of the html5 history api (note that this requires a server side configuration - see modRewrite)
  $locationProvider.html5Mode(true);
});


function DashboardController() {
    console.log('Setting up the dashboard controller...');
    this.currentTime = new Date();
}

app.run(function($templateCache) {
    $templateCache.put('header', '<div>This is your header</div>');
    $templateCache.put('footer', '<div>This is your footer</div>');
});

export default app;
