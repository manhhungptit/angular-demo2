const app = angular.module('myApp', ['ngRoute', 'pascalprecht.translate']);

const DEFAULT_LANG = ['de', 'en'];

const translationEN = {
    USER: 'User',
    CAR: 'Car',
    TITLE_USER: 'This is user page',
    TITLE_CAR: 'This is car page',
    SELECT_LANG: 'Select language'
}

const translationDE = {
    USER: 'Benutzer',
    CAR: 'Auto',
    TITLE_USER: 'Dies ist eine Benutzerseite',
    TITLE_CAR: 'Dies ist Autoseite',
    SELECT_LANG: 'Sprache auswählen'
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

app.controller('mainController', ['$scope', '$location', '$translate', '$routeParams', '$location',
    function ($scope, $location, $translate, $routeParams, $location) {
        let self = this;

        if (redirectUrl && redirectUrl != '/') {
            $location.path(redirectUrl);
        }

        $scope.DEFAULT_LANG = [
            {"name": "English", "code": "en"},
            {"name": "Germany", "code": "de"}
        ];

        $scope.selectedLanguage = 'en';

        self.changeLanguage = function (language) {
            if (DEFAULT_LANG.indexOf(language) >= 0) {
                // $translate.use(language)
                $scope.selectedLanguage = language;
                if ($routeParams.lang) {
                    let url = $location.url();
                    url = url.replace($routeParams.lang, language);
                    $location.path(url);
                }
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
