export interface Env {
    // If you set another name in wrangler.toml as the value for 'binding',
    // replace "DB" with the variable name you defined.
    DB: D1Database;
}
export const onRequest: PagesFunction<Env> = async (context) => {
    const userID = context.params.userID;

    // Check if userID is provided
    if (!userID) {
        return new Response("User ID not provided", { status: 400 });
    }

    try {
        // Prepare the SQL query to fetch user data by ID
        const query = "SELECT * FROM Users WHERE ID = ?"; // Adjust the table and column names as needed
        const userData = await context.env.DB.prepare(query)
            .bind(userID)
            .first(); // Use 'get' for a single row, 'all' for multiple rows

        // Check if user data is found
        if (!userData) {
            return new Response("User not found", { status: 404 });
        }

        // Return the user data
        return new Response(JSON.stringify(userData), {
            headers: { 'content-type': 'application/json' },
        });
    } catch (error) {
        // Handle any errors during database access
        return new Response(`Error accessing D1 Database: ${error}`, { status: 500 });
    }
}