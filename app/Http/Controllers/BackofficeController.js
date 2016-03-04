'use strict';

const User = use('App/Model/User');
const Role = use('App/Model/Role');
const userService = use('App/Services/UserService');
const encUserSessionKey = use('Encryption').encrypt('user');

class BackofficeController {

    * dashboard(request, response) {

        const user = yield userService.getLoggedInUser(request);

        const view = yield response.view('backoffice/dashboard', {
            user: user,
            roles: user.roles
        });
        response.send(view);
    }

    * getAddUser(request, response) {
        var view = yield response.view('backoffice/add_user');
        response.send(view);
    }

    * register(request, response) {

        //TODO form validation
        const username = request.input('username');
        const password = request.input('password');

        var user = yield userService.register(username, password);
        if (user) {
            return response.redirect('/backoffice');
        }
        else {
            //TODO flash messages

        }
    }

    * getLoginForm(request, response, next) {
        var view = yield response.view('backoffice/login');
        response.send(view);
    }

    * login(request, response) {

        //TODO form validation
        const username = request.input('username');
        const password = request.input('password');

        var user = yield userService.login(username, password);

        if (user) {
            yield request.session.put(encUserSessionKey, user.id);
            return response.redirect('/backoffice');
        }
        return response.redirect('/backoffice/login');
    }

    * logout(request, response) {
        yield userService.logout(request.session);
        return response.redirect('/');
    }

}

module.exports = BackofficeController;
