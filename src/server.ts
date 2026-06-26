import './bootstrap.js';
import {buildServer} from "./app.js";

declare module 'fastify' {
    export interface FastifyInstance {
        authenticate: any;
    }
}

declare module '@fastify/jwt' {
    interface FastifyJWT {
        payload: {
            sub: number;
            email: string;
        };
        user: {
            sub: number;
            email: string;
        };
    }
}

async function main() {
    const server = await buildServer();

    try {
        await server.listen({port: 3000, host: '0.0.0.0'});
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();
