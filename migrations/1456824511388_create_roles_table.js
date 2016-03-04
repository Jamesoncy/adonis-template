'use strict';

const Schema = use('Schema');

class Role extends Schema {

    up() {

        this.create('role', function (table) {
            table.increments('id');
            table.string('name', 60);
            table.string('display_name', 60);
            table.timestamps();
            table.timestamp('deleted_at');
        });

        this
            .raw("INSERT INTO role (name,display_name) VALUES ('ADMIN', 'admin'), ('ARTIST', 'artist'), ('GUEST', 'guest');");

    }

    down() {
        this.drop('role');
    }

}

module.exports = Role;
