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

.controller('ScanCtrl', function($scope, appServices, $rootScope, $location) {
    $scope.message = '';
    $scope.click = function() {
        var promise = appServices.scanBarcode();
        promise.then(
            function(result) {
                if (result.error == false) {
                    var d = new Date();
                    console.log(result);
                    var barcode = parseInt(result.result.text);
                    todoDb.query('receiving/get_lot_by_barcode', {
                        key: barcode
                    }, function(err, response) {
                        alert(response);
                        if (typeof response != 'undefined') {
                            var result = response.rows[0];
                            $scope.$apply(function() {
                                $rootScope.vehiclelot = result.value;
                                $location.path('/tab/vehicle-lot-details');
                            });
                        }


                    });
                    // $scope.message = '<table>' +
                    //     '<tbody>' +
                    //     '<tr><td>Timestamp:</td><td>&nbsp;</td><td>' + d.toUTCString() + '</td></tr>' +
                    //     '<tr><td>Text:</td><td>&nbsp;</td><td>' + result.result.text + '</td></tr>' +
                    //     '<tr><td>Format:</td><td>&nbsp;</td><td>' + result.result.format + '</td></tr>' +
                    //     '<tr><td>Text:</td><td>&nbsp;</td><td>' + result.result.cancelled + '</td></tr>' +
                    //     '</tbody>' +
                    //     '</table>';


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
