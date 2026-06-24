import {type FastifyReply} from "fastify";
import {type FastifyRequest} from "fastify";
import {createUser, findUsers, loginUser} from "./user.service.js";
import type {CreateUserInput, LoginInput} from "./user.schema.js";

export async function registerUserHandler(request: FastifyRequest<{
    Body: CreateUserInput
}>, reply: FastifyReply) {
    const body = request.body;
    try {
        const user = await createUser(body);
        return reply.status(201).send({
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
        });
    } catch (error) {
        return reply.code(400).send({
            error: 'User creation failed',
        });
    }
}

export async function loginHandler(
    request: FastifyRequest<{ Body: LoginInput }>,
    reply: FastifyReply
) {
    try {
        const user = await loginUser(request.body);

        const accessToken = request.server.jwt.sign({
            sub: user.id,
            email: user.email,
        });

        return reply.send({ accessToken });
    } catch(error) {
        return reply.code(401).send({ error: 'Invalid credentials' });
    }
}

export async function findUsersHandler(request: FastifyRequest, reply: FastifyReply) {
    const users = await findUsers();

    return reply.code(200).send({users});
}
