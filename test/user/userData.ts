import { UserInterface } from "src/app/domain/entities/user";

export const validUser = {
    id:"1",
    createdAt:new Date(),
    updatedAt: new Date(),
    email:"teste@gmail.com",
    password:"Teste123",
    name:"Fernando Felipe"
} as UserInterface


export const invalidUserWithEmailInvalid = {
    id:"2",
    createdAt:new Date(),
    updatedAt: new Date(),
    email:"testegmail.com",
    password:"Teste123",
    name:"Fernando Felipe"
} as UserInterface

export const invalidUserWithPasswordLenInvalid = {
    id:"3",
    createdAt:new Date(),
    updatedAt: new Date(),
    email:"teste@gmail.com",
    password:"Teste12",
    name:"Fernando Felipe"
} as UserInterface

export const invalidUserWithPasswordUpperCaseInvalid = {
    id:"4",
    createdAt:new Date(),
    updatedAt: new Date(),
    email:"teste@gmail.com",
    password:"teste123",
    name:"Fernando Felipe"
} as UserInterface