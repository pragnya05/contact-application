 var app = angular.module("ContactsApp", ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', '$controllerProvider', '$provide', '$compileProvider',
            function ($stateProvider, $urlRouterProvider, $locationProvider ,  $httpProvider,   $controllerProvider,   $provide,   $compileProvider) {
                app._controller = app.controller;
                app._service = app.service;
                app._factory = app.factory;
                app._value = app.value;
                app._directive = app.directive;
                app.controller = function (name, constructor) {
                    $controllerProvider.register(name, constructor);
                    return (this);
                };
                app.service = function (name, constructor) {
                    $provide.service(name, constructor);
                    return (this);
                };
                app.factory = function (name, factory) {
                    $provide.factory(name, factory);
                    return (this);
                };
                app.value = function (name, value) {
                    $provide.value(name, value);
                    return (this);
                };
                app.directive = function (name, factory) {
                    $compileProvider.directive(name, factory);
                    return (this);
                };
                
                // Configure client-side routing
                $locationProvider.hashPrefix("!").html5Mode(true);
                $urlRouterProvider.otherwise("/");

                $stateProvider
                    .state('Home',{
                        url: '/index.html',
                        views: {
                            "mainContainer":{
                                templateUrl: "default.html"
                            }
                        }
                    })
                    .state('Add', {
                        url: '/add',
                        views: {
                            "mainContainer": {
                                templateUrl: "add.html"
                            }
                        }
                    })
                    .state('List', {
                        url: '/list',
                        views: {
                            "mainContainer": {
                                templateUrl: "edit.html"
                            }
                        }
                    })
                    .state('Edit',{
                        url: '/edit-{id}',
                        views: {
                            "mainContainer":{
                                templateUrl: "edit.html"
                            }
                        }
                    });
            }]);
            
    
    function registerWithAngular(containerSelector) {
        var container = $(containerSelector);
        var newScope = angular.element(container).scope();
        var compile = angular.element(container).injector().get('$compile');
        compile($(container).contents())(newScope);
    };


angular.module("ContactsApp").controller("MainController", 
    ['$rootScope', '$state', function ($rootScope, $state) {
    var self = this;
    self.siteName = 'Contacts App';
    self.init = function(){
        if($state.current.name == ""){
            $state.go("Home");
        }
    }
    // Update the pageTitle property when the state changes
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            self.pageTitle = self.siteName + ' - ' + toState.name;
    });

    
}]);