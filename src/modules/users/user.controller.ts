import {type FastifyReply} from "fastify";
import {type FastifyRequest} from "fastify";
import {createUser, findByEmail, findUsers} from "./user.service.js";
import type {CreateUserInput, LoginInput} from "./user.schema.js";
import {hashPassword, verifyPassword} from "../../utils/hash.js";
import {server} from "../../server.js";

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
        console.log(error)
        return reply.code(500).send(error);
    }
}

export async function loginHandler(request: FastifyRequest<{
    Body: LoginInput
}>, reply: FastifyReply) {
    const body = request.body;

    //find user by email, if not found, return 401
    const user = await findByEmail(body.email);
    console.log(user)
    if (!user) {
        return reply.code(401).send({error: 'Invalid email or password'});
    }

    //verify pwd and generate access token
    const correctPassword = verifyPassword({
        candidatePwd: body.password,
        salt: user.password_salt,
        hash: user.password_hash
    });

    console.log(body.password)
    console.log(user.password_hash)
    console.log(correctPassword)

    if (correctPassword) {
        const {password_hash, password_salt, ...rest} = user;

        console.log(rest)
        const accessToken = server.jwt.sign(
            {
                sub: user.id,
                email: user.email,
            },
            {
                expiresIn: '15m',
            }
        )
        console.log(accessToken)
        return {
            accessToken
        }
    }

    return reply.code(401).send({error: 'Unauthorized'});
}

export async function findUsersHandler(request: FastifyRequest, reply: FastifyReply) {
    const users = await findUsers();

    return reply.code(200).send({users});
}
