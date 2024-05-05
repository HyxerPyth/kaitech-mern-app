const express = require('express');
const { CosmosClient } = require('@azure/cosmos');
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcrypt');



const endpoint = process.env.COSMOSDB_ENDPOINT;
const key = process.env.COSMOSDB_KEY;
const container_name = process.env.COSMOSDB_CONTAINER;
const database_id = process.env.COSMOSDB_DATABASE_ID;

const client = new CosmosClient({ endpoint: endpoint, key: key });
const database = client.database(database_id);
const container = database.container(container_name);

//  route to create a new user
router.post('/signup', async (req, res) => {
    try {

        // Extract user data from request body
        const { Email, PhoneNumber, PasswordHash } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(PasswordHash, 10);

        // Check if user already exists
        const { resources: existingUsers } = await container.items
            .query({
                query: "SELECT * FROM c WHERE c.Email = @Email OR c.PhoneNumber = @PhoneNumber",
                parameters: [{ name: "@Email", value: userData.Email }, { name: "@PhoneNumber", value: userData.PhoneNumber }]
            })
            .fetchAll();

        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create user in Cosmos DB
        await container.items.create(userData, {PasswordHash: hashedPassword});

        // User created successfully
        res.json({ status: 'ok', message: 'User created successfully' });
    } catch (error) {
        // Respond with error message if user creation fails
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
