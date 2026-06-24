import type {CreateUserInput, LoginInput} from "./user.schema.js";
import {hashPassword, verifyPassword} from "../../utils/hash.js";
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

export async function findUsers() {
    return userRepository.getUsers();
}

export async function loginUser(input: LoginInput) {
    const user = await userRepository.findByEmail(input.email);

    if (!user) {
        throw new Error('Invalid credentials');
    }

    const ok = verifyPassword({
        candidatePwd: input.password,
        salt: user.password_salt,
        hash: user.password_hash,
    });

    if (!ok) {
        throw new Error('Invalid credentials');
    }

    return user;
}
