angular.module('starter.services', [])

.service('appServices', function appServices($q, todoDb) {
    // Wrap the barcode scanner in a service so that it can be shared easily.
    this.scanBarcode = function() {
        // The plugin operates asynchronously so a promise
        // must be used to display the results correctly.
        var deferred = $q.defer();
        try {
            cordova.plugins.barcodeScanner.scan(
                function(result) { // success
                    var barcode = parseInt(result.text);
                    todoDb.query('receiving/get_lot_by_barcode', {
                        key: barcode
                    }, function(err, response) {
                        var record = response.rows[0].value;
                        deferred.resolve({
                            'error': false,
                            'result': record
                        });

                    });

                },
                function(error) { // failure
                    deferred.resolve({
                        'error': true,
                        'result': error.toString()
                    });
                }
            );
        } catch (exc) {
            deferred.resolve({
                'error': true,
                'result': 'exception: ' + exc.toString()
            });
        }
        return deferred.promise;
    };
});
