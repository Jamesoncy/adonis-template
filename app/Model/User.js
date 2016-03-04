'use strict';

const Lucid = use("Lucid");

class User extends Lucid {
    static get table() {
        return 'user'
    }

    roles() {
        return this.belongsToMany('App/Model/Role', 'users_roles', 'user_id', 'role_id');
    }
}

module.exports = User;
