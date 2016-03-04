'use strict';

const Lucid = use("Lucid");

class Role extends Lucid {
    static get table() {
        return 'role'
    }

    users() {
        return this.belongsToMany('App/Model/User', 'users_roles', 'role_id', 'user_id')
    }

    static get softDeletes() {
        return false
    }
}

module.exports = Role;
