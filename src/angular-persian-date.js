angular.module('schemaForm').directive('shamsiDate', ['$parse', datepicker]);

/** @ngInject */
function datepicker ($parse) {
  return {
    restrict: 'A',
    require: 'ngModel',
    replace: true,
    link: function (scope, element, attrs, ctrl) {
      var selectedDate = '';
      var options = {
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        yearRange: '-90:+10',
        dateFormat: 'yy/mm/dd',
        setDate: new Date(),
        isRTL: true,
        onSelect: function (dateString) {
          selectedDate = dateString;
          ctrl.$setViewValue(dateString);
        }
      };
      if (attrs.options) {
        var op = $parse(attrs.options)();
        delete op['onSelect'];
        options = angular.merge(options, op);
      }
      element.datepicker(options);
      ctrl.$formatters.push(function (modelValue) {
        return modelValue;
      });

      ctrl.$parsers.push(function (viewValue) {
        return viewValue;
      });
    }
  };
}

