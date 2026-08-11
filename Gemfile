source "https://rubygems.org"

ruby "~> 3.4.4"

gem "rails", "~> 8.1.0"
gem "pg", "~> 1.5"
gem "puma", ">= 8.0.2"
gem "jbuilder"
gem "bootsnap", require: false
gem "vite_rails"
gem "tzinfo-data", platforms: %i[mingw mswin x64_mingw jruby]

group :development, :test do
  gem "debug", platforms: %i[mri mingw mswin x64_mingw], require: "debug/prelude"
  gem "bundler-audit", require: false
  gem "brakeman", require: false
end

group :development do
  gem "web-console"
  gem "bundler-audit", require: false
end
