/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = [];

  // Just creates a diagonal of rooks
  for (var i = 0; i < n; i++) {
    // create empty row
    var row = [];
    for (var col = 0; col < n; col++) {
      row.push(0);
    }
    // Set rook location
    row[i] = 1;
    solution.push(row);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution[0]));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var factorial = function(n) {
    if (n > 0) {
      return n * factorial(n - 1);
    } else {
      return 1;
    }
  };

  var solutionCount = factorial(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({ n: n });

  // build empty starting matrix
  var emptyMatrix = [];
  var emptyRow = [];
  for (var i = 0; i < n; i++) {
    emptyRow.push(0);
  }
  for (var i = 0; i < n; i++) {
    emptyMatrix.push(emptyRow);
  }

  var buildTree = function(n, row, tree) {
    tree = tree || new Tree(emptyMatrix);

    if ( row < n ) {
      for (var nextQueenColumnIndex = 0; nextQueenColumnIndex < n; nextQueenColumnIndex++) {
        // Build new matrix to be added as a child
        var newMatrix = [];
        for (var i = 0; i < n; i++) {
          var newRow = tree.matrix[i].slice();
          newMatrix.push(newRow);
        }
        newMatrix[row][nextQueenColumnIndex] = 1;

        tree.children.push(new Tree(newMatrix));
      }
      
      for (var i = 0; i < tree.children.length; i++) {
        var child = tree.children[i];
        buildTree(n, row + 1, child);
      }   
    }

    return tree;
  }; 

  // Simple tree class for holding boards
  var Tree = function(matrix) {
    this.matrix = matrix;
    this.children = [];
  };
    
  var test = buildTree(n, 0);

  // loop through all spaces on board
  // var queens = 0;

  // var innerRecurse = function (board) {
  //   for (var row = 0; row < n; row++) {
  //     for (var col = 0; col < n; col++) {
        
  //       // check to see if spot is occupied
  //       if (board.attributes[row][col] === 1) {
  //         continue;
  //       }
        
  //       // add queen
  //       board.attributes[row][col] = 1;
  //       queens++;

  //       //check to see if valid board once add a queen
  //       if (board.hasAnyRowConflicts() || 
  //           board.hasAnyColConflicts() || 
  //           board.hasAnyMajorDiagonalConflicts() || 
  //           board.hasAnyMinorDiagonalConflicts() ) {
  //         // invalid board, so remove queen
  //         board.attributes[row][col] = 0;
  //         queens--;
  //         return;
  //       }

  //       // placed n queens on board
  //       if (queens === n) {
  //        var matrix = [];
  //        for (var row in board.attributes) {
  //          if (row < n) {
  //            matrix.push(board.attributes[row]);
  //          }
  //        }
  //        console.log('Single solution for ' + n + ' queens:', JSON.stringify(matrix));
  //        return matrix;
  //       }

  //       // repeat on changed board
  //       innerRecurse(board);
  //     }
  //   }
  // };

  // innerRecurse(solution);
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
