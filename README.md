# angular-filter-panel
A filter panel for any data source, made with AngularJS

## Introduction

Tne filter panel is an Angular directive which you can include in any HTML page, bind it to a controller, and it will provide you with a very easy, very fast, and very useful tool to filter the data displayed on a grid (or whatever component your data is bound to). Let's get to the point!

## Requirements

+ [AngularJS](http://angularjs.org), obviously. 
+ [Underscore.js](http://underscorejs.org). The magic of the filter panel is actually possible thanks to the amazing Underscorejs. So don't forget to include it in your project!
+ [Bootstrap](http://getbootstrap.com/css/). The template of the filter panel is styled using Bootstrap but it's ok if you don't want to include it in your project. Simply keep in mind that, once rendered, the filter panel will probably look weird and quite ugly if you did not include Bootstrap.

## Instructions

First of all, let's assume you have a property in your Angular controller where you store your page's data source (an array of objects). In order to use the filter panel you should also have a "filtered" data source property. Your controller could look something like this:

```javascript
angular.module('app', [])
    .controller('appCtrl', function ($scope) {

        var items = [
            { Id:  1, Client: 'Client 01', Code: 'AAAAA', Enabled: false, Sport: 'Football',   Country: 'Japan'          },
            { Id:  2, Client: 'Client 02', Code: 'BBBBB', Enabled: true,  Sport: 'Basketball', Country: 'United Kingdom' },
            { Id:  3, Client: 'Client 03', Code: 'CCCCC', Enabled: false, Sport: 'Running',    Country: 'France'         },
            { Id:  4, Client: 'Client 04', Code: 'DDDDD', Enabled: false, Sport: 'Climbing',   Country: 'France'         },
            { Id:  5, Client: null,        Code: 'FFFFF', Enabled: false, Sport: 'Football',   Country: 'France'         },
            { Id:  6, Client: 'Client 06', Code: 'CCCCC', Enabled: true,  Sport: 'Basketball', Country: 'Russia'         },
            { Id:  7, Client: 'Client 07', Code: 'AAAAA', Enabled: false, Sport: 'Running',    Country: 'Germany'        },
            { Id:  8, Client: 'Client 08', Code: 'CCCCC', Enabled: true,  Sport: 'Football',   Country: 'Germany'        },
            { Id:  9, Client: 'Client 09', Code: 'BBBBB', Enabled: true,  Sport: 'Football',   Country: ''               },
            { Id: 10, Client: 'Client 10', Code: 'DDDDD', Enabled: true,  Sport: 'Football',   Country: 'United Kingdom' },
            { Id: 11, Client: 'Client 11', Code: 'CCCCC', Enabled: true,  Sport: 'Tennis',     Country: 'United Kingdom' },
            { Id: 12, Client: 'Client 12', Code: 'BBBBB', Enabled: true,  Sport: 'Running',    Country: 'United Kingdom' },
            { Id: 13, Client: 'Client 13', Code: 'FFFFF', Enabled: false, Sport: 'Basketball', Country: 'Russia'         },
            { Id: 14, Client: 'Client 14', Code: 'DDDDD', Enabled: false, Sport: 'Tennis',     Country: 'Germany'        },
            { Id: 15, Client: 'Client 15', Code: 'AAAAA', Enabled: false, Sport: 'Basketball', Country: 'Japan'          }
        ];

        $scope.dataSource = items;
        $scope.filteredDataSource = $scope.dataSource;
    });
```

[Obviously this array of objects would very probably be asynchronously populated by an AJAX request!]

It's very easy to include a filter panel in your HTML page. You must use the tag `<filter-panel></filter-panel>` and provide it with the following three attributes.

#### source
This is your data source. Don't worry, the filter panel won't tamper your data, it simply wants to play with it.

#### filtered-source
This is the filtered data source, and it's the one you should actually bind to your page's grid (or whatever component you are using to display the data).
The filter panel will store the result of filtering the original data source in this property. 

#### filter-props
These are the names of the properties in your data source objects that you want the data to be filtered by. Of course you could specify them all, but it makes sense to filter your data only by those properties which hold non-unique values.

```html
<div ng-controller="appCtrl">
    <filter-panel source="dataSource" filtered-source="filteredDataSource" filter-props="Code,Sport,Country,Enabled"></filter-panel>
    <hr>
    <table>
         <tbody>
            <tr ng-repeat="item in filteredDataSource">
                <td>{{item.Id}}</td>
                <td>{{item.Client}}</td>
                <td class="center">{{item.Code}}</td>
                <td>{{item.Sport}}</td>
                <td class="center"><input type="checkbox" ng-model="item.Enabled" /></td>
                <td class="center">{{item.Country}}</td>
            </tr>
        </tbody>
    </table>
</div>
```

Whenever your data source changes, the filter panel will process it, grouping the data by the specified properties and generating the filter groups. The available filter values will be displayed on the filter panel.

Once you select some filter values and click `APPLY`, the filter panel performs its magic and your data is instantly filtered. By clicking `CLEAR ALL` the filter panel will clear the selected filter values (you will still have to click `APPLY` again for the filtered data source to be updated as well).

## Try it

If you want to see or fiddle around with the code of this example, [here's](http://plnkr.co/edit/MUImLa8czoZeFn4Gc9dH?p=preview) a plunk for you.

## Style it

Assuming you know your way around CSS, it's very easy to customize the look of the filter panel. Feel free to edit the styles file `angular-filter-panel.css`.