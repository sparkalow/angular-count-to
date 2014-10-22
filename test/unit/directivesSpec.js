'use strict';

/* jasmine specs for directives go here */

describe('count-to directive', function () {
    var element;
    var scope;

    beforeEach(module('countTo'));

    it('should set the text to the count-to value when no duration is set', inject(function ($compile, $rootScope, $timeout ) {
        element = angular.element('<span count-to="10" duration=""></span>');
        scope = $rootScope.$new();
        $compile(element)(scope);
        $rootScope.$digest();
        $timeout(function(){
            expect(element.text()).toBe('10');
        }, 5000)
        $timeout.flush();

    }));

    it('should set the text to the count-to value when duration is reached', inject(function ($compile, $rootScope, $timeout ) {
        element = angular.element('<span count-to="10" duration="1"></span>');
        scope = $rootScope.$new();
        $compile(element)(scope);
        $rootScope.$digest();

        $timeout.flush();
        $timeout(function(){
            expect(element.text()).toBe('10');
        }, 3000)
    }));

    it('should set the text to the value initially', inject(function ($compile, $rootScope, $timeout ) {
        element = angular.element('<span count-to="10" duration="5" value="200"></span>');
        scope = $rootScope.$new();
        $compile(element)(scope);
        $rootScope.$digest();

        $timeout.flush();
        $timeout(function(){
            expect(element.text()).toBe('200');
        }, 0)

    }));

    it('should set the text as unformatted number by default', inject(function ($compile, $rootScope, $timeout ) {
        element = angular.element('<span count-to="2000" value="1000" duration="1"></span>');
        scope = $rootScope.$new();
        $compile(element)(scope);
        $rootScope.$digest();

        $timeout(function(){
            expect(element.text()).toBe('1029');
        }, 5000);
        $timeout.flush();

    }));

    it('should set the text as unformatted number if format-number is false', inject(function ($compile, $rootScope, $timeout ) {
        element = angular.element('<span count-to="2000" value="1000" duration="1" number-format="false"></span>');
        scope = $rootScope.$new();
        $compile(element)(scope);
        $rootScope.$digest();

        $timeout(function(){
            expect(element.text()).toBe('1029');
        }, 5000);
        $timeout.flush();

    }));

    it('should set the text as formatted number if format-number is true', inject(function ($compile, $rootScope, $timeout ) {
        element = angular.element('<span count-to="2000" value="1000" duration="1" number-format="true"></span>');
        scope = $rootScope.$new();
        $compile(element)(scope);
        $rootScope.$digest();

        $timeout(function(){
            expect(element.text()).toBe('1,029');
        }, 5000);
        $timeout.flush();

    }));

});
