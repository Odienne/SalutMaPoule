import dotenv from 'dotenv';
dotenv.config({path: '.env'});

import {createUser, getUsers} from "./users/user.repository.js";

const message: string = "Hello TypeScript";

console.log(message);

async function main() {
    // await createUser('adam@test.com');

    const users = await getUsers();

    console.log(users);
}

main();
