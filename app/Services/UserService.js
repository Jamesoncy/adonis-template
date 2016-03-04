'use strict';

const co = use('co');
const User = use('App/Model/User');
const Role = use('App/Model/Role');
const Hash = use('Hash');
const encUserSessionKey = use('Encryption').encrypt('user');

module.exports = {

    USER_ROLES: [
        'ADMIN',
        'ARTIST',
        'GUEST'
    ],

    register: function * (username, password, userRole) {

        const givenUser = yield User.where('username', username).first();

        if (givenUser) {
            throw 'the username is already taken!';
        }

        const role = yield Role.where({name: userRole}).first();

        if (!role) {
            throw 'the passed role is not acceptable! You have to chose one of those: ' + JSON.stringify(this.USER_ROLES);
        }

        const user = new User();
        user.username = username;
        user.password = yield Hash.make(password);

        var id = yield user.create();

        var new_user = yield User.find(id);

        yield new_user.roles().attach(role.id);

        yield new_user.update();

        const correctUser = yield this.login(username, password);

        if (!correctUser) {
            return null;
        }
        else {
            return new_user;
        }

    },

    login: function * (username, password) {

        const user = yield User.where('username', username).first();

        if (!user) {
            return null;
        }
        else {
            const correct = yield Hash.verify(password, user.password);
            if (correct) {
                return user;
            }
            else {
                return null;
            }
        }

    },
    authenticate: function * (request, response, next) {

        const user = yield this.getLoggedInUser(request);

        if (user) {
            yield next;
        }
        else {
            response.statusCode = 401;
            const view = yield response.view('401');
            response.send(view);
        }
    },

    getLoggedInUser: function * (request) {
        const userId = yield request.session.get(encUserSessionKey);

        if (!userId) {
            console.log('couldn\'t find a user in the session!');
            return null;
        } else {
            const user = yield User.find(userId);

            if (user) {
                const wrapped_roles = yield user.roles().fetch();
                user.roles = wrapped_roles.__wrapped__;
                return user;
            }
            else {
                return null;
            }
        }
    },

    logout: function * (session) {
        return yield session.forget(encUserSessionKey);
    }
};