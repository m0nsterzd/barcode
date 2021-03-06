// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
    'starter.controllers',
    'starter.services'
])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        //            if(window.cordova && window.cordova.plugins.Keyboard) {
        //                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        //            }
        //            if(window.StatusBar) {
        //                // org.apache.cordova.statusbar required
        //                StatusBar.styleDefault();
        //            }
        if (!!navigator.splashscreen) {
            navigator.splashscreen.hide();
        }

    });
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:
    .state('tab.lots', {
        url: '/lots',
        views: {
            'tab-lots': {
                templateUrl: 'templates/tab-lots.html',
                controller: 'LotsCtrl'
            }
        }
    })

    .state('tab.vehicle-lots', {
        url: '/vehicle-lots',
        views: {
            'tab-vehicle-lots': {
                templateUrl: 'templates/tab-vehicle-lots.html',
                controller: 'VehicleLotsCtrl'
            }
        }
    })

    .state('tab.lot_details', {
        url: '/lot_details',
        views: {
            'tab-lots': {
                templateUrl: 'templates/lot-details.html',
                controller: 'LotDetailsCtrl'
            }
        }
    })

    .state('tab.vehicle-lot-details', {
        url: '/vehicle-lot-details',
        views: {
            'tab-vehicle-lots': {
                templateUrl: 'templates/vehicle-lot-details.html',
                controller: 'VehicleLotDetailsCtrl'
            }
        }
    })

    .state('tab.scan', {
        url: '/scan',
        views: {
            'tab-scan': {
                templateUrl: 'templates/tab-scan.html',
                controller: 'ScanCtrl'
            }
        }
    })

    .state('tab.about', {
        url: '/about',
        views: {
            'tab-about': {
                templateUrl: 'templates/tab-about.html',
                controller: 'AboutCtrl'
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/scan');

}).factory('todoDb', function() {
    // PouchDB.destroy('kitftmobile', function(err, info) {
    //     console.log(err);
    //     console.log(info)
    // });




    var db = new PouchDB('kitftmobile');
    return db;
});
