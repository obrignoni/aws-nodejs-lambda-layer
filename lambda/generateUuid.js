import { v4 as uuid } from 'uuid';

export const handler = async event => {
    return {
        uuid: uuid(),
    };
};