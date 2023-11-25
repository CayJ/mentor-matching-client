export interface Env {
    DB: D1Database;
}
export const onRequest: PagesFunction<Env> = async ( context ) => {
    let userID  = context.params.userID;

    if (!context.env.DB) {
        return new Response("DB binding is undefined", { status: 500 });
    }

    console.log('Environment:', context.env);

    // Check if userID is provided
    if (!userID) {
        return new Response("User ID not provided", { status: 400 });
    }

    // If userID is an array, take the first element
    if (Array.isArray(userID)) {
        userID = userID[0];
    }

    // Further processing, like converting to an integer if necessary
    const userIDInt = parseInt(userID, 10);

    if (isNaN(userIDInt)) {
        return new Response("Invalid User ID", { status: 400 });
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