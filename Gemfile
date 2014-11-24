source 'https://rubygems.org'

ruby "2.1.1"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails'
gem 'bcrypt'

# Use sqlite3 as the database for Active Record
gem 'pg'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.0'

# CSS libraries
gem 'twitter-bootstrap-rails'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# JavaScript libraries
gem 'jquery-rails'

gem 'angularjs-rails'
gem 'angular-ui-bootstrap-rails'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

group :development, :test do
  gem 'annotate'
  gem 'heroku_san'
  gem 'debase'
end

# For Heroku
group :production do
  gem 'unicorn'
  gem 'rails_12factor'
end