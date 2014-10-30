angular.module('starter.controllers', [])

.controller('LotsCtrl', function($scope, todoDb, $rootScope, $location) {

    $scope.lots = [];
    $scope.online = false;
    $scope.syncstatus = "Offline";
    $rootScope.lot = '';
    $scope.toggleOnline = function() {
        $scope.online = !$scope.online;
        if ($scope.online) { // Read http://pouchdb.com/api.html#sync
            $scope.syncstatus = "Online";
            $scope.sync = todoDb.sync('http://clubit.graymata.com:5984/gavelmate', {
                    live: true
                })
                .on('error', function(err) {
                    console.log("Syncing stopped");

                    $scope.$apply(function() {
                        $scope.syncstatus = err.statusText;
                    });
                    console.log(err);
                });
        } else {
            $scope.sync.cancel();
            $scope.syncstatus = "Offline";
        }
    };

    todoDb.changes({
        // since: 'now',
        live: true,
        onChange: function(change) {
            todoDb.get(change.id, function(err, doc) {
                if (!change.deleted) {
                    if (doc && doc.type) {
                        if (doc.type === 'grv_item') {
                            $scope.$apply(function() {
                                $scope.lots.push(doc);
                            });
                        }
                    }
                }

            })

        }
    });

    $scope.lotSelect = function(lot) {
        // console.log(lot);
        $rootScope.lot = lot;
        $location.path('/tab/lot_details');
    }

    var barcode = 5000223420314;
    todoDb.query('receiving/get_lot_by_barcode', {
        key: barcode
    }, function(err, response) {
        var record = response.rows[0].value;
        console.log(record);

    });



})

.controller('VehicleLotsCtrl', function($scope, todoDb, $rootScope, $location) {

    $scope.lots = [];
    $scope.online = false;
    $scope.syncstatus = "Offline";
    $rootScope.vehiclelot = '';
    $scope.toggleOnline = function() {
        $scope.online = !$scope.online;
        if ($scope.online) { // Read http://pouchdb.com/api.html#sync
            $scope.syncstatus = "Online";
            $scope.sync = todoDb.sync('http://clubit.graymata.com:5984/gavelmate', {
                    live: true
                })
                .on('error', function(err) {
                    console.log("Syncing stopped");

                    $scope.$apply(function() {
                        $scope.syncstatus = err.statusText;
                    });
                    console.log(err);
                });
        } else {
            $scope.sync.cancel();
            $scope.syncstatus = "Offline";
        }
    };

    todoDb.changes({
        // since: 'now',
        live: true,
        onChange: function(change) {
            todoDb.get(change.id, function(err, doc) {
                if (!change.deleted) {
                    if (doc && doc.type) {
                        if (doc.type === 'grv_vehicle') {
                            $scope.$apply(function() {
                                $scope.lots.push(doc);
                            });
                        }
                    }
                }

            })

        }
    });

    $scope.lotSelect = function(lot) {
        // console.log(lot);
        $rootScope.vehiclelot = lot;
        $location.path('/tab/vehicle-lot-details');
    }



})

.controller('ScanCtrl', function($scope, appServices) {
    $scope.message = '';
    $scope.click = function() {
        var promise = appServices.scanBarcode();
        promise.then(
            function(result) {
                if (result.error == false) {
                    var d = new Date();
                    // $scope.message = '<table>' +
                    //     '<tbody>' +
                    //     '<tr><td>Lot No:</td><td>&nbsp;</td><td>' + result.result.lot_no + '</td></tr>' +
                    //     '</tbody>' +
                    //     '</table>';

                    $scope.message = ' <div class = "list">' +
                        '<div class = "item ng-binding">' +
                        '<strong> Lot# &nbsp; </strong>' + result.result.lot_no + '</div> <div class = "item ng-binding" >' +
                        '<strong> Location &nbsp; </strong>' + result.result.location + '</div> < div class = "item ng-binding" >' +
                        '<strong> Date &nbsp; </strong>' + result.result.date_created + '</div> < div class = "item ng-binding" >' +
                        '<strong> Make Model &nbsp; </strong>' + result.result.make_model + '</div> <div class = "item ng-binding" >' +
                        '<strong> Description &nbsp; </strong>' + result.result.description + '</div> <div class = "item ng-binding" >' +
                        '<strong> Requested Value &nbsp; </strong>' + result.result.requested_value + '</div> <div class = "item ng-binding" >' +
                        '<strong> Reserve Value &nbsp; </strong>' + result.result.reserve + '</div> <div class = "item ng-binding" >' +
                        '<strong> Assigned Value &nbsp; </strong>' + result.result.assigned_value + '</div> </div>'
                } else {
                    $scope.message = '<b>ERROR</b>: ' + result;
                }
            },
            function(result) {
                $scope.message = '' + result.error;
            },
            function(result) {
                $scope.message = '' + result.error;
            });
    }

    $scope.clear = function() {
        $scope.message = '';
    }
})

.controller('AboutCtrl', function($scope, todoDb, $rootScope) {
    $scope.online = false;
    $scope.syncstatus = "Offline";
    $scope.toggleOnline = function() {
        $scope.online = !$scope.online;
        if ($scope.online) { // Read http://pouchdb.com/api.html#sync
            $scope.syncstatus = "Online";
            $scope.sync = todoDb.sync('http://clubit.graymata.com:5984/gavelmate', {
                    live: true
                })
                .on('error', function(err) {
                    console.log("Syncing stopped");

                    $scope.$apply(function() {
                        $scope.syncstatus = err.statusText;
                    });
                    console.log(err);
                });
        } else {
            $scope.sync.cancel();
            $scope.syncstatus = "Offline";
        }
    };

})

.controller('LotDetailsCtrl', function($scope, todoDb, $rootScope) {


})

.controller('VehicleLotDetailsCtrl', function($scope, todoDb, $rootScope) {


})
