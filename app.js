var app = angular.module('tictactoeApp', []);

app.config(function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'partials/tictactoe.html',
            controller: 'GameController'
        }).
        otherwise({
            redirectTo: '/'
        });
});

app.constant('grid_size', 6);

app.factory('game', function () {
    return new Game();
})