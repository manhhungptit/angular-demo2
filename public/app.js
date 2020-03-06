const app = angular.module('myApp', ['ngRoute', 'pascalprecht.translate']);

const DEFAULT_LANG = ['de', 'en'];

const translationEN = {
    TITLE_USER: 'This is user page',
    TITLE_CAR: 'This is car page'
}

const translationDE = {
    TITLE_USER: 'Dies ist eine Benutzerseite',
    TITLE_CAR: 'Dies ist Autoseite'
}

app.config(['$routeProvider', '$locationProvider', '$translateProvider',
    function ($routeProvider, $locationProvider, $translateProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $routeProvider.when('/user/:lang', {
            templateUrl: '../public/pages/user.html',
            controller: 'userController'
        }).when('/car/:lang', {
            templateUrl: '../public/pages/car.html',
            controller: 'carController'
        })

        $translateProvider.translations('en', translationEN);
        $translateProvider.translations('de', translationDE);
        $translateProvider.fallbackLanguage('en');
        $translateProvider.preferredLanguage('en');
    }])

app.controller('mainController', ['$scope', '$location', '$translate',
    function ($scope, $location, $translate) {
        let self = this;

        if (redirectUrl && redirectUrl != '/') {
            $location.path(redirectUrl);
        }

        $scope.DEFAULT_LANG = [
            {"name": "English", "code": "en"},
            {"name": "Germany", "code": "de"}
        ];

        self.changeLanguage = function (language) {
            if (DEFAULT_LANG.indexOf(language) >= 0) {
                $translate.use(language)
            }
        }

        self.onLanguageChange = function () {
            self.changeLanguage($scope.selectLang.code);
        }
    }])

app.controller('userController', ['$scope', '$routeParams', '$translate',
    function ($scope, $routeParams, $translate) {
        $scope.title = 'This is user page';
        const lang = $routeParams.lang;
        changeLanguage(lang, $translate);
    }])

app.controller('carController', ['$scope', '$routeParams', '$translate',
    function ($scope, $routeParams, $translate) {
        $scope.title = 'This is car page';
        const lang = $routeParams.lang;
        changeLanguage(lang, $translate);
    }])

function changeLanguage(language, translator) {
    if (DEFAULT_LANG.indexOf(language) >= 0) {
        translator.use(language)
    }
}
