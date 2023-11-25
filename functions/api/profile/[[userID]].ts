export const onRequest: PagesFunction = async (context) => {
    const userID = context.params.userID;

    return new Response(`User ID: ${userID}`);
}