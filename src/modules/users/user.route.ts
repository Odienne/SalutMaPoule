import type {FastifyInstance} from "fastify";
import registerUserHandler from "./user.controller.js";
import {createUserResponseSchema, createUserSchema} from "./user.schema.js";

async function userRoutes(server: FastifyInstance) {
    server.post(
        '/',
        {
            schema: {
                body: createUserSchema,
                response: {
                    201: createUserResponseSchema,
                },
            },
        },
        registerUserHandler
    )
}

export default userRoutes;
