import type {CreateUserInput} from "./user.schema.js";
import {hashPassword} from "../../utils/hash.js";
import * as userRepository from "./user.repository.js";

export async function createUser(input: CreateUserInput) {
    const {password, ...rest} = input;
    const {hash, salt} = hashPassword(password);

    const existing = await userRepository.findByEmail(input.email);
    if (existing) {
        throw new Error('User already exists');
    }

    return userRepository.create(
        {...rest, password: hash, salt}
    );
}

export async function findByEmail(email: string) {
    return userRepository.findByEmail(email);
}
