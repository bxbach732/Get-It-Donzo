import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('todos').del();

    // Inserts seed entries
    await knex('todos').insert([
        { 
            id: 1, 
            user_id: 1,
            title: 'user#1 task 1',
            description: '1st task of user 1'
        },
        { 
            id: 2, 
            user_id: 1,
            title: 'user#1 task 2',
            description: '2nd task of user 1'
        },
        { 
            id: 3, 
            user_id: 2,
            title: 'user#2 task 1',
            description: '1st task of user 2'
        },
        { 
            id: 4, 
            user_id: 2,
            title: 'user#2 task 2',
            description: '2nd task of use 2'
        },
        { 
            id: 5, 
            user_id: 3,
            title: 'user#3 task 1',
            description: '1st task of user 3'
        },
        { 
            id: 6, 
            user_id: 3,
            title: 'user#3 task 2',
            description: '2nd task of user 3'
        }
    ]);
}
