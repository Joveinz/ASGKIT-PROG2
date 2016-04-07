angular.module("standardDeviationCalculator", []).controller("standardDeviationCalculatorCtrl", ['$scope',
    function($scope) {
		$scope.dataFileArray = [];
		$scope.data = [10,20,50];
		$scope.mean = 0;
		$scope.standardDeviation = 0;
		$scope.meanSubtract = [];
		$scope.meanSq = [];
		
		
		//Upload File Function
		
		$scope.showContent = function($fileContent){
			$scope.content = $fileContent;
			$scope.dataFileArray.push($scope.content.split("\n"));
			console.log($scope.dataFileArray);
		};
		
		
		$scope.calculate = function(){
			$scope.getMean();
			$scope.getStandardDeviation();
			document.getElementById("message").innerHTML = "done!";
			document.getElementById("mean").innerHTML = Math.round($scope.mean * 100)/100;
			document.getElementById("sd").innerHTML = Math.round($scope.standardDeviation * 100)/100;
		};
		
		$scope.getMean = function(){
			var sum = 0;
			for(i = 0; i < $scope.data.length; i++){
				sum += $scope.data[i];
			}
			$scope.mean = (sum / $scope.data.length);
		};
		
		$scope.getStandardDeviation = function(){
			var newTableMean = 0;
			$scope.getMeanSubtract();
			$scope.getMeanSq();
			var sum = $scope.getMeanSqSum();
			newTableMean = (sum / ($scope.meanSq.length - 1)); //this calculates the variance
			$scope.standardDeviation = Math.sqrt(newTableMean); //this calculates the final standard deviation
		};

		$scope.getMeanSubtract = function() {
			for(i = 0; i < $scope.data.length; i++){
				$scope.meanSubtract.push($scope.data[i] - $scope.mean);
			}
		};
		
		$scope.getMeanSq = function(){
			for(i = 0; i < $scope.meanSubtract.length; i++){
				$scope.meanSq.push(Math.pow($scope.meanSubtract[i],2));
			}
		};
		
		$scope.getMeanSqSum = function(){
			var sum = 0;
			for(i = 0; i < $scope.meanSq.length; i++){
				sum += $scope.meanSq[i];
			}
			return sum;
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
  
  

