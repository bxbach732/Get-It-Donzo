import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('users').del();
    await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1')

    // Inserts seed entries
    await knex('users').insert([
        { 
            name: 'user1',
            email: 'user1@email.com',
            password: 'pass1'
        },
        { 
            name: 'user2',
            email: 'user2@email.com',
            password: 'pass2'
        },
        { 
            name: 'user3',
            email: 'user3@email.com',
            password: 'pass3'
        }
    ]);
};
