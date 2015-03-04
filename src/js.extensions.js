'use strict;'

String.prototype.capitalizeFirstLetter = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.format = function () {
	var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match;
    });	
};

String.prototype.splitWord = function () {
	return this.split(/(?=[A-Z])/).join(' ');
};