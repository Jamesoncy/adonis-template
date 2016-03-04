'use strict';

const Schema = use('Schema');

class UsersRoles extends Schema {

    up() {
        this.create('users_roles', function (table) {
            table.increments('id');
            table.integer('user_id').unsigned().references('id').inTable('user');
            table.integer('role_id').unsigned().references('id').inTable('role');
        })
    };

    down() {
        this.drop('users_roles')
    }

}

module
    .exports = UsersRoles;
