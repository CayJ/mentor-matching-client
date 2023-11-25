interface Env {
    KV: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    // Access the userID from the URL parameters
    const userID = context.params.userID;

    // Optionally, you can still get a value from KV using the userID
    // const value = await context.env.KV.get(userID);

    // Return a response with the userID
    return new Response(`User ID: ${userID}`);
}