// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require angular
//= require angular-resource

// We need jQuery for odds and ends.
//= require jquery

//= require_self
//= require_tree .

var app = angular.module('JogLogger', ['ngResource']);

// Configure angular-resource to work properly with Rails.
app.config(function ($httpProvider) {
  var defaults = $httpProvider.defaults;
  defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
});