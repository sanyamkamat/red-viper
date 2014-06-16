'use strict';

function GameController($scope, game, grid_size) {
    $scope.grid = new Array(grid_size);
    $scope.status_message = "";
    $scope.computer_first = false;
    $scope.game_over = false;
    $scope.grid_value = [3, 4, 5, 6, 7, 8, 9, 10]/*, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
        61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
        81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]*/;
    $scope.startGame = function (g_size) {
//        console.log(g_size);
        grid_size = g_size;
        $scope.grid = new Array(grid_size);
        $scope.status_message = "";
        $scope.game_over = false;
//        console.log("hi"+$scope.grid.length)
        game.start($scope.grid.length, $scope.computer_first);
        $scope.status_message = "game started";
    }

    $scope.makeMove = function (col, row) {
        var boardIndex, symbol, winner;
        boardIndex = (row * grid_size) + col;
        if (game.board && game.board.canMove(boardIndex) && !game.winner && !game.tie) {
            // make move
            game.move(boardIndex);
            console.log("Made move!\n")
            // check winner
            if (game.winner) {
                if (game.winner === game.board.X) $scope.status_message = "you lose!";
                if (game.winner === game.board.O) $scope.status_message = "you win!";
                $scope.game_over = true;
            }

            // check tie
            if (game.tie) {
                $scope.status_message = "tie! no one wins!";
                $scope.game_over = true;
            }
        }
    }

    $scope.getSquareSymbol = function (col, row) {
        var boardIndex = (row * grid_size) + col;
        return game.board ? game.board.renderSquare(boardIndex) : "";
    }

    $scope.isSquareInWinningCombo = function (col, row) {
        var boardIndex;
        if (game.board && game.winner && game.board.winning_combo) {
            boardIndex = (row * grid_size) + col;
            return game.board.winning_combo.indexOf(boardIndex) > -1;
        }
        return false;
    }
}
