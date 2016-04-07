angular.module("standardDeviationCalculator", []).controller("standardDeviationCalculatorCtrl", ['$scope',
    function($scope) {
		//Variables for data
		
		$scope.dataFileArray = [];
		$scope.fileChoice = 0;
		
		
		//Variables for calculating mean and average
		
		$scope.mean = 0;
		$scope.standardDeviation = 0;
		$scope.meanSubtract = [];
		$scope.meanSq = [];
		
		
		// Variables for calculating the regression parameters b1 and b2
		
		$scope.b1 = 0;
		$scope.b0 = 0;
		
		// testing variables
		
		$scope.meanX = 0;
		$scope.meanY = 0;
		$scope.meanXY = 0;
		
		
		
		
		//Upload File Function
		
		$scope.showContent = function($fileContent){
			$scope.content = $fileContent;
			$scope.dataFileArray.push($scope.content.split("\n"));
			for (var i = 0; i < $scope.dataFileArray.length; i++){
				for(var b = 0; b < $scope.dataFileArray[i].length; b++){
					$scope.dataFileArray[i][b] = parseFloat($scope.dataFileArray[i][b]);
				}
			}
			console.log($scope.dataFileArray);
		};
		
		// Calculate Standard Deviation
		$scope.calculateSd = function(){
			$scope.mean = $scope.getMean($scope.dataFileArray[0]);
			$scope.getStandardDeviation();
			document.getElementById("message").innerHTML = "done!";
			document.getElementById("mean").innerHTML = $scope.mean.toFixed(2);
			document.getElementById("sd").innerHTML = $scope.standardDeviation.toFixed(2);
		};
		

		
		
		$scope.getStandardDeviation = function(){
			var newTableMean = 0;
			$scope.getMeanSubtract($scope.dataFileArray[0]);
			$scope.meanSq = $scope.squareArray($scope.meanSubtract);
			newTableMean = ($scope.getMeanSqSum() / ($scope.meanSq.length - 1)); //this calculates the variance
			$scope.standardDeviation = Math.sqrt(newTableMean); //this calculates the final standard deviation
		};

		
		$scope.getMeanSubtract = function(array) {
			for(i = 0; i < array.length; i++){
				$scope.meanSubtract.push(array[i] - $scope.mean);
			}
		};
		
		
		
		$scope.getMeanSqSum = function(){
			var sum = 0;
			for(i = 0; i < $scope.meanSq.length; i++){
				sum += $scope.meanSq[i];
			}
			return sum;
		};
		
		// This function calculates regression parameters
		$scope.calculateRegression = function(){
			if($scope.dataFileArray.length > 1){
				
				var x = $scope.dataFileArray[0];
				var y = $scope.dataFileArray[1];
				
				$scope.meanX = $scope.getMean(x);
				$scope.meanY = $scope.getMean(y);
				$scope.meanXY = $scope.getMean($scope.multiplyArrays(x, y));
				
				// This equation calculates b1
				$scope.b1 = (($scope.meanX * $scope.meanY) - $scope.meanXY)/(Math.pow($scope.meanX,2) - $scope.getMean($scope.squareArray(x)));
				
				$scope.b0 = $scope.meanY - ($scope.b1 * $scope.meanX);
				
				//$scope.calculateB1();
				//$scope.calculateB0();	
				
			} else {
				alert("Please upload at least two files");
			}
		};
		
		
		$scope.calculateB1 = function(){
			//return $scope.meanX * $scope.meanY
		};
		
		
		$scope.calculateB0 = function(){};
		
		// Most used functions
		
		// This function takes two given arrays and multiplies each value together
		$scope.multiplyArrays = function(array1, array2){
			var multipliedArray = [];
			for (var i = 0; i < array1.length; i++){
				multipliedArray[i] = (array1[i] * array2[i]);
			}
			return multipliedArray;
		};
		
		// this function returns the mean of an integer array
		$scope.getMean = function(array){
			var sum = 0;
			for(i = 0; i < array.length; i++){
				sum += array[i];
			}
			return (sum / array.length);
		};
		
		// This functions squares all elements in an integer array
		$scope.squareArray = function(array){
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
  
  

