define(['./storage'], function(Storage) {

	// do neccesary configurations for the underscore template pattern
	_.templateSettings = {
		interpolate : /\{\{(.+?)\}\}/g
	};
	
	//if user has saved the language preference before, lets use that to configure requirejs i18n
	var userLang;
	if (userLang = Storage.retreive("user-language")) {
		require.config({
			locale : userLang
		});
	}

	/**
	Localizer is used to handle the localization aspects by providing the functions 
	required for setting a different language and resetting the user language settings to the defaults.
 	@namespace Boiler.Helpers
 	@module BoilerCoreClasses
	@class Localizer
	@static    
	**/
	var Localizer = function() {
	};
	
	
	/**
	Apply localization to the given text. The text should contain tags such as {{nls.your_tag_name}} that will be
	replaced by the 'your_tag_name' property in the nlsObject. 
	@method localize
	@static
	@param text {String}  string that need to be localized. Tags should be in the form {{nls.your_tag_name}}
	@param nlsObject {Object}  contains localization properties
	@return {String} localized text
	**/
	Localizer.localize = function(text, nlsObject) {
		var compiled = _.template(text);
		return compiled({
			nls : nlsObject
		});
	};
	
	
	/**
	Sets the language to the provided locale. This will store the locale information in LocalStore
	and do a page refresh. Please note this will result in a location.refresh() call.
	@method setLanguage
	@static 
	@param locale {String} locale string to which locale should be set
	**/
	Localizer.setLanguage = function(locale) {
		Storage.persist("user-language", locale);
		location.reload(); 
	};
	
	
	/**
	Reset the locally stored language settings. This will let to pich browser 
	locale to be in effect the next time user access the application

	@method clearLanguage
	@static
	**/
	Localizer.clearLanguage = function() {
		Storage.remove("user-language");
		location.reload(); 
	};

	return Localizer;

});
