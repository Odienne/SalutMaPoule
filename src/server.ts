import './bootstrap.js';
import {buildServer} from "./app.js";

declare module 'fastify' {
    export interface FastifyInstance {
        authenticate: any;
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
