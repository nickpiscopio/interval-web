# Interval

Install caddy
https://caddyserver.com/tutorial/beginner

### Mac
Download caddy
Navigate to unzipped filed

    mv ./caddy /usr/local/bin
 
### Linux 

    curl https://getcaddy.com | bash -s personal
    
Change directories to the root of interval-web
    
    ulimit -n 8192
    
Run caddy. (May need sudo)

    caddy -conf ./caddy.conf
    
Install npm

    curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
    sudo apt-get install -y nodejs

Versions
Node v10.4.1
NPM 6.2.0

    node -v
    npm -v
    
Change directories into the frontend
    
    npm install
    
The following needs to be changed before starting:
    
    vi src/app/constant/network.constant.ts
    public static readonly IP = 'interval.intencity.fit';
    npm start

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
