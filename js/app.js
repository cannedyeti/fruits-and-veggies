/* setup your angular app here */

// debug stuff to show the app is loading and fruit / veggies are available
console.log('App Started');
console.log('Fruit count', fruits.length);
console.log('Veggie count', vegetables.length);

var middle = fruits.concat(vegetables);

// SHUFFLE FUNCTION
Array.prototype.shuffle = function() {
    var input = this;
    for (var i = input.length-1; i >=0; i--) {
    
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = input[randomIndex]; 
        
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}

// COMPARE FUNCTION
Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) { //To test values in nested arrays
            if (!this[i].compare(testArr[i])) return false;
        }
        else if (this[i] !== testArr[i]) return false;
    }
    return true;
}

// REMOVE FROM Array
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

var app = angular.module("fruitVeg", []);
app.controller("fVCtrl", ["$scope", function($scope){
    $scope.middle = middle.shuffle();
    $scope.fruits = [];
    $scope.veggies = [];
    $scope.wrongArray = [];
    $scope.winner = false;
    $scope.btnStyles = {
        primary: true,
        danger: false,
        success: false
    };


    console.log($scope.fruits)

    $scope.checkWin = function() {
        if ($scope.fruits.sort().compare(fruits.sort()) && $scope.veggies.sort().compare(vegetables.sort())) {
            $scope.btnStyles.success = true;
            $scope.btnStyles.primary = false;
            $scope.winner = true;
        } else {
            $scope.fruits.forEach(function(fruit) {
                if (!fruits.includes(fruit)) {
                    $scope.wrongArray.push(fruit);
                }
            })
            $scope.veggies.forEach(function(veg) {
                if (!vegetables.includes(veg)) {
                    $scope.wrongArray.push(veg);
                }
            })
        }
    }

    $scope.moveMiddle = function(array) {
        var arr = array;
        $scope.middle.push(array[this.$index]);
        arr.splice(this.$index, 1);
        if ($scope.wrongArray.includes(this.item)) {
            $scope.wrongArray.remove(this.item)
        }
    }

    $scope.moveFruits = function() {
        $scope.fruits.push($scope.middle[this.$index]);
        $scope.middle.splice(this.$index, 1);
        if ($scope.middle.length == 0) {
            $scope.checkWin();
        }
    }

    $scope.moveVeggies = function() {
        $scope.veggies.push($scope.middle[this.$index]);
        $scope.middle.splice(this.$index, 1);
        if ($scope.middle.length == 0) {
            $scope.checkWin();
        }
    }





}]);