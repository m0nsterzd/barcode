angular.module('starter.controllers', [])

.controller('LotsCtrl', function($scope, todoDb, $rootScope) {

    $scope.lots = [];
    $scope.online = false;
    $scope.syncstatus = "Offline";
    $scope.toggleOnline = function() {
        $scope.online = !$scope.online;
        if ($scope.online) { // Read http://pouchdb.com/api.html#sync
            $scope.syncstatus = "Online";
            $scope.sync = todoDb.sync('http://192.168.100.220:5984/gavelmate', {
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

    // todoDb.query('receiving/get_all_lot_numbers', function(err, response) {
    //     console.log(err);
    //     console.log(response);
    //     if (typeof response != 'undefined') {
    //         var result = response.rows;
    //         for (var i = 0; i < result.length; i++) {
    //             $scope.lots.push(result[i].value);
    //         }
    //         console.log($rootScope.lots)
    //     }
    //     $scope.$apply(function() {
    //         $scope.lots = $scope.lots;
    //     });

    // });




})

.controller('ScanCtrl', function($scope, appServices) {
    $scope.message = '';
    $scope.click = function() {
        var promise = appServices.scanBarcode();
        promise.then(
            function(result) {
                if (result.error == false) {
                    var d = new Date();
                    $scope.message = '<table>' +
                        '<tbody>' +
                        '<tr><td>Timestamp:</td><td>&nbsp;</td><td>' + d.toUTCString() + '</td></tr>' +
                        '<tr><td>Text:</td><td>&nbsp;</td><td>' + result.result.text + '</td></tr>' +
                        '<tr><td>Format:</td><td>&nbsp;</td><td>' + result.result.format + '</td></tr>' +
                        '<tr><td>Text:</td><td>&nbsp;</td><td>' + result.result.cancelled + '</td></tr>' +
                        '</tbody>' +
                        '</table>';
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
            $scope.sync = todoDb.sync('http://192.168.100.220:5984/gavelmate', {
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
