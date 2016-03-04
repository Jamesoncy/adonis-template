'use strict';

const Schema = use('Schema');

class User extends Schema {

    up() {
        this.create('user', function (table) {
            table.increments('id');
            table.string('username', 60).unique();
            table.string('password', 80);
            table.timestamps();
            table.timestamp('deleted_at')
        })
    }

    down() {
        this.drop('user');
    }
}

module.exports = User;