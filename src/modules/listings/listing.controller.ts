import {type FastifyReply} from "fastify";
import {type FastifyRequest} from "fastify";
import {createListing, findListingById, findListings, findListingsOfUser} from "./listing.service.js";
import type {CreateListingInput} from "./listing.schema.js";

export async function createListingHandler(request: FastifyRequest<{Body: CreateListingInput}>, reply: FastifyReply) {
    const listing = await createListing(request.body);
    return reply.code(200).send({listing});
}

export async function findListingsOfUserHandler(request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
    const listings = await findListingsOfUser(Number(request.params.id));
    return reply.code(200).send({listings});
}

export async function findListingsHandler(request: FastifyRequest, reply: FastifyReply) {
    const listings = await findListings();
    return reply.code(200).send({listings});
}

export async function findListingHandler(request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
    const listing = await findListingById(Number(request.params.id));
    return reply.code(200).send({listing});
}
