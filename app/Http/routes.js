'use strict';

/*
 |--------------------------------------------------------------------------
 | Routes
 |--------------------------------------------------------------------------
 |
 | Routes helps you in defining http endpoints/urls which will be used
 | by outside world to interact with your application. Adonis has a
 | lean and rich router to support various options out of the box.
 |
 */
const Route = use('Route');

Route.get('/', 'HomeController.index');

Route.get('/backoffice/login', 'BackofficeController.getLoginForm');
Route.post('/backoffice/login', 'BackofficeController.login');
Route.get('/backoffice/logout', 'BackofficeController.logout');

Route.post('/backoffice/register', 'BackofficeController.register');

Route.group('secured', function () {

    Route.get('/backoffice', 'BackofficeController.dashboard')
    Route.get('/backoffice/add_user', 'BackofficeController.getAddUser');
    Route.post('/backoffice/add_user', 'BackofficeController.postAddUser');

}).middlewares(['auth']);