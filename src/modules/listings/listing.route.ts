import type {FastifyInstance} from "fastify";
import {createListingResponseSchema, createListingSchema, deleteListingParamsSchema} from "./listing.schema.js";
import {
    createListingHandler,
    deleteListingHandler,
    findListingHandler,
    findListingsHandler, updateListingHandler
} from "./listing.controller.js";

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

    server.patch(
        '/:id',
        {
            preHandler: [server.authenticate],
            schema: {
                body: createListingSchema,
                response: {
                    200: createListingResponseSchema,
                },
            },
        },
        updateListingHandler
    )

    server.get('/', {
        preHandler: [server.authenticate],
    }, findListingsHandler)

    server.get('/:id', {
        preHandler: [server.authenticate],
    }, findListingHandler)

    server.delete('/:id', {
        schema: {
            params: deleteListingParamsSchema,
        },
        preHandler: [server.authenticate],
    }, deleteListingHandler)
}

export default listingRoutes;
