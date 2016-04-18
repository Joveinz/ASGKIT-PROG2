angular.module("standardDeviationCalculator", []).controller("standardDeviationCalculatorCtrl", ['$scope',
    function($scope) {
		//Variables for data
		
		$scope.dataFileArray = [];
		$scope.files = 0;
		
		//Variables for mean and average
		
		$scope.meanResult;
		$scope.standardDeviationResult;


		// Variables for regression parameters b1 and b2
		
		$scope.b1;
		$scope.b0;
		
		$scope.b1Results = 0;
		$scope.b0Results = 0;
		
		// vars for corelation coefficient
		
		$scope.rResults = 0;
		$scope.r2Results = 0;
		
		// vars for Yk
		
		$scope.YkResults = 0;
		
		//Upload File Function
		
		$scope.showContent = function($fileContent){
			if ($scope.dataFileArray.length > 1){
				alert("Please only upload two files!");
			} else {
				$scope.content = $fileContent;
				$scope.dataFileArray.push($scope.content.split("\n"));
				for (var i = 0; i < $scope.dataFileArray.length; i++){
					for(var b = 0; b < $scope.dataFileArray[i].length; b++){
						$scope.dataFileArray[i][b] = parseFloat($scope.dataFileArray[i][b]);
					}
				}
				$scope.files = $scope.dataFileArray.length;
				console.log($scope.dataFileArray);
			}
		};
		
		// Calculate Standard Deviation
		$scope.calculateSd = function(){
			
			//decleration of variables
			
			var mean = 0;
			var standardDeviation = 0;
		
			mean = getMean($scope.dataFileArray[0]);
			getStandardDeviation();
			$scope.meanResult = mean.toFixed(2);
			$scope.standardDeviationResult = standardDeviation.toFixed(2);
			
			function getStandardDeviation(){
				//decleration of variables in this scope
				var variance = 0;
				var tempArray = [];
				
				getMeanSubtract($scope.dataFileArray[0]);
				tempArray = squareArray(tempArray);
				
				
				variance = (getSum(tempArray) / (tempArray.length - 1)); //this calculates the variance
				standardDeviation = Math.sqrt(variance); //this calculates the final standard deviation
				
				
				//this function subtracts the mean from each element in the integer array 
				function getMeanSubtract(array) {
					for(i = 0; i < array.length; i++){
						tempArray.push(array[i] - mean);
					}
				};
			};
		};
		
		// This function calculates regression parameters
		$scope.calculateRegression = function(){
			if($scope.dataFileArray.length > 1){
				
				
				var x = $scope.dataFileArray[0];
				var y = $scope.dataFileArray[1]; // Simply for testing purposes -- will get user input when finished
				
				var meanX = getMean(x); 
				var meanY = getMean(y);
				var meanXY = getMean(multiplyArrays(x, y));
				
				getRegression();
				
				// This equation calculates b1
				function getRegression(){
				
					// let's calculate each bracket
				
					var bracket1 = meanX * meanY;
					var calcTop = bracket1 - meanXY;
					
					var bracket2 = Math.pow(meanX,2);
					var bracket3 = getMean(squareArray(x))
					var calcBottom = bracket2 - bracket3;
					
					$scope.b1 = calcTop/calcBottom;
					$scope.b0 = meanY - ($scope.b1 * meanX);
					
					$scope.b1Results = $scope.b1.toFixed(4);
					$scope.b0Results = $scope.b0.toFixed(4); // rounds to 4 decimal places for accuracy
				};
				
				
			} else {
				alert("Please upload at least two files");
			}
		};
		
		// This function calculates the Correlation Coefficient
		$scope.calculateCorrelation = function(){
			if($scope.dataFileArray.length > 1){
				var x = $scope.dataFileArray[0];
				var y = $scope.dataFileArray[1];
				
				var n = x.length; // must write code to check if the two arrays are exactly the same length - again, this is temporary
				var xy = multiplyArrays(x,y);
				
				var sumX = getSum(x);
				var sumY = getSum(y);
				var sumXY = getSum(xy);
				
				var xSquared = squareArray(x);
				var ySquared = squareArray(y);
				
				var xSquaredSum = getSum(xSquared); // this is the sum of the squared x elements
				var ySquaredSum = getSum(ySquared);
				
				var sumXSquared = Math.pow(sumX, 2); // this is the sum of X to the power of 2
				var sumYSquared = Math.pow(sumY, 2);
				
				getCoefficient();
				
				function getCoefficient(){
					
					var r = 0;
					var r2 = 0;
					
					// let's calculate each bracket
					var bracket1 = n*sumXY;
					var bracket2 = sumX*sumY;
					var calcTop = bracket1 - bracket2; // calcTop is the top line of the equation
					
					var bracket3 = (n*xSquaredSum)-sumXSquared;
					var bracket4 = (n*ySquaredSum)-sumYSquared;
					var calcBottom = Math.sqrt(bracket3*bracket4);
					
					r = calcTop/calcBottom;
					r2 = Math.pow(r, 2);
					
					$scope.rResults = r.toFixed(4);
					$scope.r2Results = r2.toFixed(4);
				};
				
				
				
			} else {
				alert("Please upload at least two files");
			}
		};
		
		// this function calculates Yk given user input of Xk
		$scope.calculateYk = function(){
				if($scope.dataFileArray.length > 1){
				$scope.calculateRegression();
				var getXk = prompt("Please enter a numerical value for Xk", "here");
				var xk = parseFloat(getXk);
				var yk = ($scope.b0 + ($scope.b1 * xk));
				$scope.YkResults = parseFloat(yk).toFixed(4);
			} else {
				alert("Please upload at least two files");
			}
		};
		
		
		// Most used functions
		
		// This function takes two given arrays and multiplies each value together
		function multiplyArrays(array1, array2){
			var multipliedArray = [];
			for (var i = 0; i < array1.length; i++){
				multipliedArray[i] = (array1[i] * array2[i]);
			}
			return multipliedArray;
		};
		
		// this function returns the mean of an integer array
		function getMean(array){
			var sum = getSum(array);
			return (sum / array.length);
		};
		
		//this function returns the sum of an integer array
		function getSum(array){
			var sum = 0;
			for(i = 0; i < array.length; i++){
				sum += array[i];
			}
			return sum;
		};
		
		// This functions squares all elements in an integer array
		function squareArray(array){
			var squaredArray = [];
			for(i = 0; i < array.length; i++){
				squaredArray.push(Math.pow(array[i],2));
			}
			return squaredArray;
		};
		
    }
  ]);
  
  
  angular.module("standardDeviationCalculator").directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
                
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});