import dotenv from 'dotenv';

dotenv.config({path: '.env'});
import {
    serializerCompiler,
    validatorCompiler, type ZodTypeProvider,
} from 'fastify-type-provider-zod';

import Fastify, {type FastifyReply, type FastifyRequest} from "fastify";
import userRoutes from "./modules/users/user.route.js";
import jwt from "fastify-jwt";

export const server = Fastify().withTypeProvider<ZodTypeProvider>();

server.register(jwt, {
    secret: "enfinencdi"
})

server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify(request.headers.authorization);
        } catch (error) {
            reply.status(401).send({error: 'Unauthorized'});
        }
    }
);

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
