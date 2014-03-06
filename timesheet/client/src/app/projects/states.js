(function () {
  
  'use strict';

  var app = angular.module('app.projects', [
    'app.projects.controllers',
    'ui.router',
    'authorization.services'
  ]);

  app.config(function ($stateProvider, authorizationProvider) {

    $stateProvider
      .state('app.projects', {
        url: '/projects',
        controller: 'ProjectCtrl',
        templateUrl: 'assets/templates/app/projects/index.html',
        data: {
          section: 'Projects'
        }, 
        resolve: {
          authenticatedUser: authorizationProvider.requireAuthenticatedUser
        }
      })  

      .state('app.projects.detail', {
        url: '/detail/:_id',
        controller: 'ProjectDetailCtrl',
        templateUrl: 'assets/templates/app/projects/form.html',
        data: {
          section: 'Project Details',
          saveText: 'Update'
        },
        resolve : {
          project: [
            '$control', 
            '$stateParams',
            function ($control, $stateParams) {
              return $control.get('projects', $stateParams);
            }]
        }
      })

      .state('app.projects.create', {
        url: '/create',
        controller: 'ProjectCreateCtrl',
        templateUrl: 'assets/templates/app/projects/form.html',
        data: {
          section: 'Create Project',
          saveText: 'Create'
        }
      });
  });

}());
