import { UserInterface } from "src/app/domain/entities/user";

export const validUser = {
    createdAt:new Date(),
    updateAt: new Date(),
    email:"teste@gmail.com",
    password:"Teste123",
    name:"Fernando Felipe"
} as UserInterface

export const invalidUserWithEmailInvalid = {
    createdAt:new Date(),
    updateAt: new Date(),
    email:"testegmail.com",
    password:"Teste123",
    name:"Fernando Felipe"
} as UserInterface

export const invalidUserWithPasswordLenInvalid = {
    createdAt:new Date(),
    updateAt: new Date(),
    email:"teste@gmail.com",
    password:"Teste12",
    name:"Fernando Felipe"
} as UserInterface

export const invalidUserWithPasswordUpperCaseInvalid = {
    createdAt:new Date(),
    updateAt: new Date(),
    email:"teste@gmail.com",
    password:"teste123",
    name:"Fernando Felipe"
} as UserInterface