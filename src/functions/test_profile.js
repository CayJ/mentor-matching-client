export async function onRequestGet(context) {
    // Extract the id parameter from the URL
    const { params } = context;
    const { id } = params;

    // Return a response with the id
    return new Response(`Profile ID: ${id}`, {
        headers: { 'content-type': 'text/plain' },
    });
}
