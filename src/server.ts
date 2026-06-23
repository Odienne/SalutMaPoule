import dotenv from 'dotenv';

dotenv.config({path: '.env'});
import {
    serializerCompiler,
    validatorCompiler, type ZodTypeProvider,
} from 'fastify-type-provider-zod';

import Fastify from "fastify";
import userRoutes from "./modules/users/user.route.js";


const server = Fastify().withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.get('/healthcheck', async () => {
    return {status: "OK"};
});


async function main() {

    server.register(userRoutes, {prefix: 'api/users'});

    try {
        await server.listen({port: 3000, host: '0.0.0.0'});
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();
