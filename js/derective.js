//todoApp获取焦点的自定义指令
(function (angular) {

	var app = angular.module('todoApp.directive', []);

	app.directive('todoFocus', function () {
		return {
			link: function (scope, ele, attr) {

				ele.on('dblclick', function () {

					angular.element(this).find('input').eq(1)[0].focus();
				})
			}
		}
	})
})(angular)
