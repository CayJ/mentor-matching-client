export interface Env {
    DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    // Example of using `request` to get method
    const { method } = context.request;

    // Example of using `params`
    const commentID = context.params.id; // Assuming a route parameter `id`

    try {
        // Example database query (adjust based on your actual DB schema)
        if (method === "GET" && commentID) {
            const query = "SELECT * FROM comments WHERE id = ?";
            const comment = await context.env.DB.prepare(query)
                .bind(commentID)
                .first(); // Assuming `first` method exists

            if (!comment) {
                return new Response("Comment not found", { status: 404 });
            }

            return new Response(JSON.stringify(comment), {
                headers: { 'content-type': 'application/json' },
            });
        }

        // Handle other methods or return a default response
        return new Response("Invalid request", { status: 400 });

    } catch (error) {
        return new Response(`Error: ${error}`, { status: 500 });
    }
};
