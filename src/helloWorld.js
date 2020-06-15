export default async ({ name, success }) => {
    if (success) {
        return {
            hello: `Hello ${name}`,
        }
    } else {
        throw new Error('Trigger failure destination: ' + name);
    }
};