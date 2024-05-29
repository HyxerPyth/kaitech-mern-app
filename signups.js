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


router.post('/signup', async (req, res) => {

    try {

        const userData = req.body;


        // Hash the password
        const password = userData.PasswordHash;
        const hash = await bcrypt.hash(password, 15);

        // Check if user already exists
        const { resources: existingUsers } = await container.items
            .query({
                query: "SELECT * FROM c WHERE c.Email = @Email OR c.PhoneNumber = @PhoneNumber",
                parameters: [{ name: "@Email", value: userData.Email }, { name: "@PhoneNumber", value: userData.PhoneNumber }]
            })
            .fetchAll();

        // Check if user add +1 if not add it 

        if (!userData.PhoneNumber.includes('+1')) {
            userData.PhoneNumber = '+1' + userData.PhoneNumber;
        }
        else {
            userData.PhoneNumber = userData.PhoneNumber;
        }


        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        userData.PasswordHash = hash;
        // Create user in Cosmos DB
        await container.items.create(userData);
        

        res.json({ status: 'ok', message: 'User created successfully' });
    } catch (error) {
        // Respond with error message if user creation fails
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
