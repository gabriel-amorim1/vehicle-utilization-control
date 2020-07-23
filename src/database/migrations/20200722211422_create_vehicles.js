exports.up = function(knex) {
    return knex.schema.createTable('vehicles', function (table) {
        table.increments('id').primary();
        table.string('license_plate', 7).notNullable().unique();
        table.string('color').notNullable();
        table.string('brand').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('vehicles');
};
