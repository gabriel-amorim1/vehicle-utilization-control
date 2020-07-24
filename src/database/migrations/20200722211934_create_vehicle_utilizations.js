exports.up = function(knex) {
    return knex.schema.createTable('vehicle_utilizations', function (table) {
        table.increments('id').primary();

        table.timestamp('initial_data').notNullable();
        table.timestamp('final_data').notNullable().defaultTo("00/00/0000 00:00:00");
        table.text('reason').notNullable();

        table.string('driver_id').notNullable();
        table.foreign('driver_id').references('id').inTable('drivers');

        table.string('vehicle_id').notNullable();
        table.foreign('vehicle_id').references('id').inTable('vehicles');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('vehicle_utilizations');
};
