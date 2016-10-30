(function (window) {
	var app = angular.module('todoApp', ['todoApp.service', 'todoApp.directive']);

	app.controller('todoController', ["$scope", "storageService", "$filter", "$location", function ($scope, storageService, $filter, $location) {

		//1. 查看服务
		$scope.todoList = storageService.get();

		//2. 添加便签
		//创建一个新的便签
		$scope.todo = "";
		//添加服务
		$scope.addTodo = function () {

			//判断添加值是否为空
			if ($scope.todo.length > 0) {

				storageService.add($scope.todo);

				$scope.todo = "";
			}
		};

		//3. 删除标签
		$scope.delTodo = function (todo) {

			storageService.del(todo);
		};

		//4. 修改标签
		//4.1 修改当前样式
		$scope.edtingTodo = {};
		//修改Todo
		$scope.editTodo = function (todo) {

			$scope.edtingTodo = todo;
		};
		//4.2失去焦点保存todo
		$scope.saveTodo = function () {

			$scope.edtingTodo = {};

			storageService.edit();
		}

		//5. 修改当前完成数的显示
		$scope.todoCount = 0;
		$scope.isShowCompleted = false;
		$scope.toggleAll = false;
		$scope.$watch('todoList', function (newVal) {

			//筛选当前的未完成项目
			$scope.todoCount = $filter('filter')($scope.todoList, {completed: false}).length;
			//当completed: true有超过1条数据才会显示Clear completed，如果没有则隐藏
			$scope.isShowCompleted = $filter('filter')($scope.todoList, {completed: true}).length > 0 ? true : false;
			//反选选项
			$scope.toggleAll = !$scope.todoCount;
		}, true);

		//6. 全选情况
		$scope.changeToggleAll = function () {

			storageService.changeToggleAll($scope.toggleAll);
		}
		//7. 删除已完成的Todo
		$scope.clearCompleted = function () {

			storageService.clearCompleted();
		}

		//8. 不同状态的切换
		$scope.completedStatus = {};

		$scope.changeStatus = function (selectStatus) {

			switch (selectStatus) {
				case'all':
					$scope.completedStatus = {};
					break;
				case'active':
					$scope.completedStatus = {completed: false};
					break;
				case'completed':
					$scope.completedStatus = {completed: true};
					break;
			}
		}
		//9. 切换锚点值来切换不同数据
		$scope.location = $location;

		$scope.$watch('location.path()', function (newVal) {

			switch (newVal.substring(1)) {
				case'active':
					$scope.completedStatus = {completed: false};
					break;
				case'completed':
					$scope.completedStatus = {completed: true};
					break;
				default:
					$scope.completedStatus = {};
					break;
			}
		})
	}]);
})(window);
