import type {CreateListingInput} from "./listing.schema.js";
import * as listingRepository from "./listing.repository.js";

export async function createListing(input: CreateListingInput) {
    return listingRepository.create(input);
}

export async function updateListing(userId: number, id: number, input: CreateListingInput) {
    const listing = await listingRepository.getById(id);

    if (!listing) {
        throw new Error("Could not find list with id " + id, {cause: 404});
    }
    if (userId != listing.owner_id) {
        throw new Error("You are not allowed to update this listing", {cause: 403});
    }

    return listingRepository.update(id, input);
}

export async function findListings() {
    return listingRepository.getListings();
}

export async function findListingById(id: number) {
    return listingRepository.getById(id);
}

export async function deleteListing(userId: number, id: number) {
    const listing = await listingRepository.getById(id);

    if (!listing) {
        throw new Error("Could not find list with id " + id, {cause: 404});
    }
    if (userId != listing.owner_id) {
        throw new Error("You are not allowed to delete this listing", {cause: 403});
    }

    return listingRepository.deleteListing(id);
}

export async function findListingsOfUser(id: number) {
    return listingRepository.getListingOfUser(id);
}
