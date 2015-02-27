'use strict';

import 'angular';
import 'angular-route';

import dashboardModule from './states/dashboard/dashboard.module';
import dashboardController from './states/dashboard/dashboard.controller';

let app = angular.module('app', [
  'ngRoute',
  dashboardModule.name
]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
      templateUrl: 'app/partials/home.html'
    }
  );

  // take advantage of the html5 history api (note that this requires a server side configuration - see modRewrite)
  $locationProvider.html5Mode(true);
});


app.run(function ($templateCache) {
  $templateCache.put('header', '<div>This is your header</div>');
  $templateCache.put('footer', '<div>This is your footer</div>');
});

export default app;
