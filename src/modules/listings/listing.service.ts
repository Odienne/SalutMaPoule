import type {CreateListingInput} from "./listing.schema.js";
import * as listingRepository from "./listing.repository.js";

export async function createListing(input: CreateListingInput) {
    return listingRepository.create(input);
}

export async function findListings() {
    return listingRepository.getListings();
}
export async function findListingById(id: number) {
    return listingRepository.getById(id);
}

export async function findListingsOfUser(id: number) {
    return listingRepository.getListingOfUser(id);
}
