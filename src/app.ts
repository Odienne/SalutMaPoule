import {
    serializerCompiler,
    validatorCompiler, type ZodTypeProvider,
} from 'fastify-type-provider-zod';

import Fastify, {type FastifyReply, type FastifyRequest} from "fastify";
import userRoutes from "./modules/users/user.route.js";
import jwt from "@fastify/jwt";



export async function buildServer() {
    const server = Fastify()
        .withTypeProvider<ZodTypeProvider>();

    server.register(jwt, {
        secret: process.env.JWT_SECRET!,
    });

    server.decorate(
        'authenticate',
        async (
            request: FastifyRequest,
            reply: FastifyReply
        ) => {
            try {
                await request.jwtVerify();
            } catch {
                return reply.status(401).send({
                    error: 'Unauthorized',
                });
            }
        }
    );

    server.setValidatorCompiler(validatorCompiler);
    server.setSerializerCompiler(serializerCompiler);

    server.get('/healthcheck', async () => {
        return { status: 'OK' };
    });

    server.register(userRoutes, {
        prefix: '/api/users',
    });

    return server;
}
