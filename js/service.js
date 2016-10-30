//创建Stroge服务
(function (angular) {
	//创建todoApp.service模块
	var app = angular.module('todoApp.service', []);
	//创建服务

	app.service('storageService', function ($window, $filter) {
		var Stroge = $window.localStorage;
		//因为window.localStorage的数据是json字符串
		//将json字符串转变成json数组
		var todoList = JSON.parse(Stroge.getItem('todoList') || '[]');

		//查看函数
		this.get = function () {

			return todoList;
		}

		//添加函数
		this.add = function (text) {

			//将传入的内容转化为对象
			todoList.push({text: text, completed: false});

			//保存数据
			this.save()
		};

		//保存函数
		this.save = function () {

			//将json数组转化为json字符串
			Stroge.setItem('todoList', JSON.stringify(todoList));
		};

		//删除函数
		this.del = function (todo) {

			//获取到说要删除元素的下标
			var index = todoList.indexOf(todo)
			//删除数组中的某一项
			todoList.splice(index, 1);
			//保存数据
			this.save();
		};

		this.edit = function (todo) {

			this.save();
		}

		//全选的切换
		this.changeToggleAll = function (toggleAll) {

			todoList.forEach(function (item) {

				item.completed = toggleAll;
			});
			this.save();
		}
		//清除已完成项
		this.clearCompleted = function () {

			//过滤数据
			var items = $filter('filter')(todoList, {completed: false});
			//这样的删除数据不会修改引用的地址
			todoList.splice(0, todoList.length);
			//合并
			angular.merge(todoList, items);

			this.save();
		}
	})


})(angular)
