import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('users').del();

    // Inserts seed entries
    await knex('users').insert([
        { 
            id: 1, 
            name: 'user1',
            email: 'user1@email.com',
            password: 'pass1'
        },
        { 
            id: 2,     
            name: 'user2',
            email: 'user2@email.com',
            password: 'pass2'
        },
        { 
            id: 3, 
            name: 'user3',
            email: 'user3@email.com',
            password: 'pass3'
        }
    ]);
}
