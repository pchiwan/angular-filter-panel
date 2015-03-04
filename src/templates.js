angular.module('pchiwan.directives').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/filter-directive.html',
    "<div class=\"adp-filter col-md-3 col-xs-4\">\r" +
    "\n" +
    "\t<div class=\"row adp-filter-header\">\r" +
    "\n" +
    "\t\t<h4>{{group.title}}<h4>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "\t<div class=\"row adp-filter-content\">\r" +
    "\n" +
    "\t\t<div class=\"adp-filter-item\" ng-repeat=\"filterItem in group.source\">\r" +
    "\n" +
    "\t\t\t<input type=\"checkbox\" ng-model=\"filterItem.selected\">\r" +
    "\n" +
    "\t\t\t&nbsp;<span>{{filterItem.value}}&nbsp;({{filterItem.count}})</span>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('src/filter-panel-directive.html',
    "<div class=\"adp-filter-panel container-fluid\">\r" +
    "\n" +
    "\t<div class=\"row\">\r" +
    "\n" +
    "\t\t<adp-filter ng-repeat=\"group in fpCtrl.filterGroups\" title=\"group.title\"></adp-filter>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "\t<div class=\"adp-filter-panel-buttons row\">\r" +
    "\n" +
    "\t\t<button class=\"btn btn-default\" ng-click=\"fpCtrl.clearAll()\">Clear all</button>\r" +
    "\n" +
    "\t\t<button class=\"btn btn-primary\" ng-click=\"fpCtrl.apply()\">Apply</button>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>"
  );

}]);
