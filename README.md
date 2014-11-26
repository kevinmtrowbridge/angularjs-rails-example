== README

# Example Rails + Angular Js (ngResource) + Boostrap app.

November 26th, 2014

I created this while exploring a quick way to build a client-side app in AngularJs, while using Rails as a
RESTful API backend.

I consulted many other sample apps while creating this one, so in the spirit of open source
(and also because GitHub is a great place to store things like this), I share with the internet.

# Learn AngularJS links

## Learning

https://www.youtube.com/watch?v=i9MHigUZKEM
http://stackoverflow.com/questions/14333857/how-to-master-angularjs
http://fdietz.github.io/recipes-with-angular-js
https://docs.angularjs.org/guide
http://stackoverflow.com/questions/14994391/thinking-in-angularjs-if-i-have-a-jquery-background
http://www.slatestudio.com/blog/p/better-programming-with-ruby-on-rails-and-angularjs

## Other example apps

https://github.com/angular-app/angular-app
https://github.com/IgorMinar/foodme

## Thoughts on Phonegap / Cordoba

The dream for me is to build mobile apps using this method.  While researching I found several likely routes for
achieving this.  Instead of using Bootstrap to style the UI, you'd use:
 
* ~11k Github stars: "Iconic Framework"
* ~1.1k stars: "mobile-angular-ui"
* "bootflat"

The way Iconic is presented is very integrated with Cordoba, but I believe, it's basically a UI framework (mostly css)
layered on top of AngularJS: just like Bootstrap is in this app.  So, if you were to swap out Bootstrap for any one of
the above UI frameworks, you could accomplish the single sourced HTML5 mobile / desktop / webapp dream. 

# TODO

There are a number of issues logged in Github: https://github.com/kevinmtrowbridge/angularjs-rails-example/issues

# Example app challenge

This was the 'prompt' (improv programming!) which I followed when creating the app:

<cite>
  Write an application that tracks jogging times of users
  
  * User must be able to create an account and log in.
  * When logged in, user can see, edit and delete times entered.
  * Each time entry when entered has a date, distance, and time.
  * When displayed, each time entry has an average speed.
  * Filter by dates from-to.
  * Report on average speed & distance per week.
  * REST API. Make it possible to perform all user actions via the API, including authentication.
  * All actions need to be done client side using AJAX, refreshing the page is not acceptable.
  * Bonus: unit tests!
</cite>