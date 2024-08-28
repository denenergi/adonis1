import { IBase } from "./base";

export interface ITodo extends IBase {
    name: string
    descriptions: string | null
    file: string | null
}

export interface ITodoCreated {
    name: string
    descriptions: string | null
    file: string | undefined
}