'use strict';

import dashboardController from './dashboard.controller';

export default angular.module('app.dashboard', [])
  .controller(dashboardController)
  .config(function ($routeProvider) {
    $routeProvider.when('/dashboard', {
      templateUrl: 'app/states/dashboard/dashboard.html',
      controller: dashboardController,
      controllerAs: 'vm'
    });
  });