import { helloWorld } from "hello-world";

export const handler = async event => {
    return helloWorld(event);
};