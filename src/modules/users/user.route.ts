import type {FastifyInstance} from "fastify";
import {registerUserHandler, loginHandler} from "./user.controller.js";
import {createUserResponseSchema, createUserSchema, loginSchema, loginResponseSchema} from "./user.schema.js";

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

    server.post('/login', {
        schema: {
            body: loginSchema,
            response: {
                200: loginResponseSchema,
            },
        },
    }, loginHandler)
}

export default userRoutes;
