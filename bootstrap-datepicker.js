angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/datepicker/datepicker.html","<div class=\"form-group {{form.htmlClass}}\"\n     ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(),\'has-success\': form.disableSuccessState !== true && hasSuccess()}\">\n    <label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label>\n    <div ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\">\n    <span ng-if=\"form.fieldAddonLeft\"\n          class=\"input-group-addon\"\n          ng-bind-html=\"form.fieldAddonLeft\"></span>\n        <input ng-show=\"form.key\"\n               sf-changed=\"form\"\n               type=\"text\"\n               class=\"form-control {{form.fieldHtmlClass}}\"\n               schema-validate=\"form\"\n               ng-model=\"$$value$$\"\n               ng-disabled=\"form.readonly\"\n               shamsi-date=\"form.shamsiDate\"\n               options=\"{{form.options}}\"\n               name=\"{{form.key.slice(-1)[0]}}\"/>\n        <span ng-if=\"form.fieldAddonRight\"\n              class=\"input-group-addon\"\n              ng-bind-html=\"form.fieldAddonRight\"></span>\n    </div>\n    <span ng-if=\"form.feedback !== false\" class=\"form-control-feedback\"\n          ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\"\n          aria-hidden=\"true\">\n    </span>\n    <span ng-if=\"hasError() || hasSuccess()\" id=\"{{form.key.slice(-1)[0] + \'Status\'}}\\\" class=\"sr-only\">\n        <svg class=\"icon\" ng-show=\"hasError()\">\n            <use xlink:href=\"public/admin/assets/icons/icons.svg#info_outline\"></use>\n        </svg>\n    </span>\n    <div class=\"help-block\" ng-show=\"hasError()\" sf-message=\"form.description\"></div>\n</div>");}]);
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


angular.module('schemaForm').config(
  ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
    function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

      var datepicker = function (name, schema, options) {
        if (schema.type === 'string' && (schema.format === 'date' || schema.format === 'date-time')) {
          var f = schemaFormProvider.stdFormObj(name, schema, options);
          f.key = options.path;
          f.type = 'datepicker';
          options.lookup[sfPathProvider.stringify(options.path)] = f;
          return f;
        }
      };

      schemaFormProvider.defaults.string.unshift(datepicker);

      //Add to the bootstrap directive
      schemaFormDecoratorsProvider.addMapping(
        'bootstrapDecorator',
        'datepicker',
        'directives/decorators/bootstrap/datepicker/datepicker.html'
      );
      schemaFormDecoratorsProvider.createDirective(
        'datepicker',
        'directives/decorators/bootstrap/datepicker/datepicker.html'
      );
    }
  ]);
