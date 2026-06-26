import {type FastifyReply} from "fastify";
import {type FastifyRequest} from "fastify";
import {
    createListing,
    deleteListing,
    findListingById,
    findListings,
    findListingsOfUser,
    updateListing
} from "./listing.service.js";
import {type CreateListingInput, type CreateListingResponse} from "./listing.schema.js";

export async function createListingHandler(request: FastifyRequest<{ Body: CreateListingInput }>, reply: FastifyReply) {
    const data = request.body;

    try {
        const listing = await createListing(data);
        return reply.code(201).send(listing as CreateListingResponse);
    } catch {
        return reply.code(400).send({
            error: 'Listing creation failed',
        });
    }

}

export async function updateListingHandler(request: FastifyRequest<{
    Params: { id: number },
    Body: CreateListingInput
}>, reply: FastifyReply) {
    const data = request.body;
    const id = request.params.id;
    const user = request.user;

    try {
        const listing = await updateListing(user.sub, id, data);
        return reply.code(200).send(listing as CreateListingResponse);
    } catch (error: any) {
        if (error.cause === 404) {
            return reply.code(404).send({
                error: 'Listing not found',
            });
        }
        if (error.cause === 403) {
            return reply.code(403).send({
                error: 'You are not allowed to update this listing',
            });
        }

        return reply.code(400).send({
            error: 'Listing update failed',
        });
    }
}

export async function findListingsOfUserHandler(request: FastifyRequest<{
    Params: { id: number }
}>, reply: FastifyReply) {
    const listings = await findListingsOfUser(Number(request.params.id));
    return reply.code(200).send({listings});
}

export async function findListingsHandler(request: FastifyRequest, reply: FastifyReply) {
    const listings = await findListings();
    return reply.code(200).send({listings});
}

export async function findListingHandler(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    const listing = await findListingById(Number(request.params.id));

    if (!listing) {
        return reply.code(404).send({error: 'Listing not found'});
    }

    return reply.code(200).send({listing});
}

export async function deleteListingHandler(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    try {
        const id = request.params.id;
        const user = request.user;
        const deletedListing = await deleteListing(user.sub, id);

        if (!deletedListing) {
            return reply.code(404).send({error: 'Listing not found'});
        }

        return reply.code(204).send();
    } catch (error: any) {
        if (error.cause === 404) {
            return reply.code(404).send({
                error: 'Listing not found',
            });
        }
        if (error.cause === 403) {
            return reply.code(403).send({
                error: 'You are not allowed to update this listing',
            });
        }

        return reply.code(400).send({
            error: 'Listing deletion failed',
        });
    }
}
