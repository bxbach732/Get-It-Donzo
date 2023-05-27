import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('todos', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('description');
        table.timestamps(true, true);
        table.boolean('completed').defaultTo(false);
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('todos');
}

