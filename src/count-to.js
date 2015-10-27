var countTo = angular.module('countTo', [])
    .directive('countTo', ['$timeout', '$filter', function ($timeout, $filter) {
        return {
            replace: false,
            scope: true,
            link: function (scope, element, attrs) {

                var e = element[0];
                var num, refreshInterval, duration, steps, step, countTo, value, increment, filter;

                var calculate = function () {
                    refreshInterval = 30;
                    step = 0;
                    scope.timoutId = null;
                    countTo = parseFloat(attrs.countTo) || 0;
                    scope.value = parseInt(attrs.value, 10) || 0;
                    duration = (parseFloat(attrs.duration) * 1000) || 0;

                    filter = (function() {
                        var result = function (x) { return Math.round(x); },
                            filter,
                            filterParams = eval(attrs.countFilter);
                        if(filterParams instanceof Array && filterParams.length >= 1 && typeof filterParams[0] === 'string') {
                            filter = $filter(filterParams[0]);
                            filterParams = filterParams.splice(1, filterParams.length-1);
                            result = function (value) {
                                var params = [value];
                                Array.prototype.push.apply(params, filterParams);
                                return filter.apply(null, params);
                            };
                        }
                        return result;
                    })();

                    steps = Math.ceil(duration / refreshInterval);
                    increment = ((countTo - scope.value) / steps);
                    num = scope.value;
                }

                var tick = function () {
                    scope.timoutId = $timeout(function () {
                        num += increment;
                        step++;
                        if (step >= steps) {
                            $timeout.cancel(scope.timoutId);
                            num = countTo;
                            e.textContent = filter(countTo);
                        } else {
                            e.textContent = filter(num);
                            tick();
                        }
                    }, refreshInterval);

                }

                var start = function () {
                    if (scope.timoutId) {
                        $timeout.cancel(scope.timoutId);
                    }
                    calculate();
                    tick();
                }

                attrs.$observe('countTo', function (val) {
                    if (val) {
                        start();
                    }
                });

                attrs.$observe('value', function (val) {
                    start();
                });

                attrs.$observe('countFilter', function (val) {
                    start();
                });

                return true;
            }
        }

    }]);
