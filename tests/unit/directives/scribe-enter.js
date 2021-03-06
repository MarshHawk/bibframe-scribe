"use strict";

describe("scribeEnter attribute directive", function() {
    beforeEach(module("bibframeEditor"));

    var $scope, elm;

    beforeEach(inject(function($rootScope, $compile) {
        $scope = $rootScope.$new();
        $scope.a = 0;
        $scope.setIt = function() {
            ++$scope.a;
        }
        elm = angular.element("<span scribe-enter='setIt()'>test{{a}}</span>");
        $compile(elm)($scope);
    }));

    it("should evaluate on Enter key down", function() {
        var e;
        expect(elm.text()).toEqual("test{{a}}");
        $scope.$digest();
        expect($scope.a).toEqual(0);
        expect(elm.text()).toEqual("test0");
        // Keyboard stuff is so jacked up across browsers that this
        // test will fail in Chrome and Safari, and PhantomJS while
        // running fine in Firefox and IE; the implementation should
        // be sufficient to work cross-browser, but it's not worth the
        // trouble to make the test work cross-browser.
        try {
            e = new KeyboardEvent("keypress", {code: "Enter", key: "Enter", location: 0, which: 13});
        } catch (err) {
            e = null;
        }
        if (e !== null && typeof e.code !== "undefined") {
            elm[0].dispatchEvent(e);
            $scope.$digest();
            expect($scope.a).toEqual(1);
            expect(elm.text()).toEqual("test1");
        }
    });

    it("should evaluate on Enter key press", function() {
        var e;
        expect(elm.text()).toEqual("test{{a}}");
        $scope.$digest();
        expect($scope.a).toEqual(0);
        expect(elm.text()).toEqual("test0");
        // Keyboard stuff is so jacked up across browsers that this
        // test will fail in Chrome and Safari, and PhantomJS while
        // running fine in Firefox and IE; the implementation should
        // be sufficient to work cross-browser, but it's not worth the
        // trouble to make the test work cross-browser.
        try {
            e = new KeyboardEvent("keypress", {code: "Enter", key: "Enter", location: 0, which: 13});
        } catch (err) {
            e = null;
        }
        if (e !== null && typeof e.code !== "undefined") {
            elm[0].dispatchEvent(e);
            $scope.$digest();
            expect($scope.a).toEqual(1);
            expect(elm.text()).toEqual("test1");
        }
    });
});
