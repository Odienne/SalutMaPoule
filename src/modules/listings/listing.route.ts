import type {FastifyInstance} from "fastify";
import {createListingResponseSchema, createListingSchema} from "./listing.schema.js";
import {createListingHandler, findListingHandler, findListingsHandler} from "./listing.controller.js";

async function listingRoutes(server: FastifyInstance) {
    server.post(
        '/',
        {
            schema: {
                body: createListingSchema,
                response: {
                    201: createListingResponseSchema,
                },
            },
        },
        createListingHandler
    )

    server.get('/', {
        preHandler: [server.authenticate],
    }, findListingsHandler)

    server.get('/:id', {
        preHandler: [server.authenticate],
    }, findListingHandler)
}

export default listingRoutes;
