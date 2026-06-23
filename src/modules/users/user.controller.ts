import type {FastifyReply, FastifyRequest} from "fastify";
import {createUser} from "./user.service.js";
import type {CreateUserInput} from "./user.schema.js";

async function registerUserHandler(request: FastifyRequest<{
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
        console.log(error)
        return reply.code(500).send(error);
    }
}

export default registerUserHandler;
