export interface Env {
    DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    try {
        const query = "SELECT name FROM sqlite_master WHERE type='table'";

        // Execute the query
        const response = await context.env.DB.prepare(query).all();

        // Extracting the table names from the results
        const tableNames = response.results.map(table => table.name);

        // Check if table names are found
        if (tableNames.length === 0) {
            return new Response("No user tables found in the database", { status: 404 });
        }

        // Return the list of table names
        return new Response(JSON.stringify(tableNames), {
            headers: { 'content-type': 'application/json' },
        });
    } catch (error) {
        return new Response(`Error accessing D1 Database: ${error}`, { status: 500 });
    }
};
