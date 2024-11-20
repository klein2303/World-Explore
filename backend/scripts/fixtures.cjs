const { Pool } = require("pg");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

// Hvorfor får jeg null i kollonner jeg vet det er info på i databasen???????????

console.log("Script is starting...");

// Database connection parameters
// Pool for VM
// const pool = new Pool({
//     user: "postgres",
//     host: "it2810-10.idi.ntnu.no",
//     database: "worldexploredb",
//     password: "",
//     port: 5432,
// });

const pool = new Pool({
    user: "user",
    host: "localhost",
    database: "db",
    password: "1234",
    port: 5432,
});

const csvFilePath = path.join(__dirname, "../data/final_version_countries_data.csv"); // write in the csv file path when it exists

// Function to insert data into the database
async function insertData(row) {
    const insertText = `
        INSERT INTO "Country" (
            name, 
            continent, 
            capital, 
            largestcity, 
            currency, 
            language, 
            population, 
            landarea, 
            agriculturearea, 
            forestarea, 
            co2emission, 
            image
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `;

    // Parse CSV data and convert empty strings to null
    const name = row.name === "" ? null : row.name;
    const continent = row.continent === "" ? null : row.continent;
    const capital = row.capital === "" ? null : row.capital;
    const largestCity = row.largestcity === "" ? null : row.largestcity;
    const currency = row.currency === "" ? null : row.currency;
    const language = row.language === "" ? null : row.language;
    const population = row.population === "" ? null : parseFloat(row.population.replace(/,/g, ""));
    const landArea = row.landarea === "" ? null : parseFloat(row.landarea.replace(/,/g, ""));
    const agricultureArea = row.agriculturearea === "" ? null : row.agriculturearea;
    const forestArea = row.forestarea === "" ? null : row.forestarea;
    const co2Emission = row.co2emissions == "" ? null : parseFloat(row.co2emissions.toString().replace(/,/g, ""));
    const image = row.image === "" ? null : row.image;

    const values = [
        name,
        continent,
        capital,
        largestCity,
        currency,
        language,
        population,
        landArea,
        agricultureArea,
        forestArea,
        co2Emission,
        image,
    ];

    const client = await pool.connect();
    try {
        await client.query(insertText, values);
        console.log(`Inserted data for: ${name}`);
    } catch (error) {
        console.error(`Error inserting data for ${name}:`, error);
    } finally {
        client.release();
    }
}

async function importCsv() {
    const promises = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("data", (row) => {
            // Push the promise to insert data if valid
            promises.push(insertData(row));
        })
        .on("end", async () => {
            // Wait for all the insert operations to complete
            try {
                await Promise.all(promises);
                console.log("All data inserted successfully");
            } catch (error) {
                console.error("Error during inserts:", error);
            } finally {
                await pool.end();
            }
        });
}

importCsv().catch((error) => {
    console.error("Error in importCsv:", error);
});
