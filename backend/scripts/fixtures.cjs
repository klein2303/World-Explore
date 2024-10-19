// import { Pool } from 'pg';
// import fs from 'fs';
// import path from 'path';
// import { parse } from 'fast-csv';

// console.log('Script is starting...');

// // Database connection parameters
// const pool = new Pool({
//     user: 'user',
//     host: 'localhost',
//     database: 'db',
//     password: '1234',
//     port: 5432,
// });

// const csvFilePath = path.join(__dirname, '../data/countries_data_mock.csv'); // write in the csv file path when it exists
// const table_name = 'country';

// // Define the type for the CSV row
// interface CsvRow {
//     name : string;
//     continent : string;
//     capital : string;
//     largestCity : string;
//     currency : string;
//     language : string;
//     population : number;
//     landArea : number;
//     agricultureArea : string;
//     forestArea : string;
//     co2Emission : number;
//     image : string;
// }

// // Function to insert data into the database
// async function insertData(row: CsvRow): Promise<void> {
//     const insertText = `
//         INSERT INTO ${table_name} (
//             name, 
//             continent, 
//             capital, 
//             largestCity, 
//             currency, 
//             language, 
//             population, 
//             landArea, 
//             agricultureArea, 
//             forestArea, 
//             co2Emission, 
//             image
//             Journal
//         ) 
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
//         ON CONFLICT (name) DO NOTHING
//     `;

//     // Parse CSV data and convert empty strings to null
//     const name = row.name === '' ? null : row.name;
//     const continent = row.continent === '' ? null : row.continent;
//     const capital = row.capital === '' ? null : row.capital;
//     const largestCity = row.largestCity === '' ? null : row.largestCity;
//     const currency = row.currency === '' ? null : row.currency;
//     const language = row.language === '' ? null : row.language;
//     const population = row.population == null ? null : parseFloat(row.population.toString());
//     const landArea = row.landArea == null ? null : parseFloat(row.landArea.toString());
//     const agricultureArea = row.agricultureArea === '' ? null : row.agricultureArea;
//     const forestArea = row.forestArea === '' ? null : row.forestArea;
//     const co2Emission = row.co2Emission == null ? null : parseFloat(row.co2Emission.toString());
//     const image = row.image === '' ? null : row.image;
//     const Journal = null;

//     const values = [
//         name,
//         continent,
//         capital,
//         largestCity,
//         currency,
//         language,
//         population,
//         landArea,
//         agricultureArea,
//         forestArea,
//         co2Emission,
//         image,
//         Journal
//     ];

//     const client = await pool.connect();
//     try {
//         await client.query(insertText, values);
//         console.log(`Inserted data for: ${name}`);
//     } catch (error) {
//         console.error(`Error inserting data for ${name}:`, error);
//     } finally {
//         client.release();
//     }
// }

// async function importCsv(): Promise<void> {
//     const promises: Promise<void>[] = [];
  
//     fs.createReadStream(csvFilePath)
//       .pipe(parse({ headers: true }))
//       .on('data', (row: CsvRow) => {
//         // Push the promise to insert data if valid
//         promises.push(insertData(row));
//       })
//       .on('end', async () => {
//         // Wait for all the insert operations to complete
//         try {
//           await Promise.all(promises);
//           console.log('All data inserted successfully');
//         } catch (error) {
//           console.error('Error during inserts:', error);
//         } finally {
//           await pool.end();
//         }
//       });
//   }
  
//   importCsv().catch((error) => {
//     console.error('Error in importCsv:', error);
//   });

const { Pool } = require('pg');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

console.log('Script is starting...');

// Database connection parameters
const pool = new Pool({
    user: 'user',
    host: 'localhost',
    database: 'db',
    password: '1234',
    port: 5432,
});

const csvFilePath = path.join(__dirname, '../data/countries_data_mock.csv'); // write in the csv file path when it exists
const table_name = 'Country';

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
    const name = row.name === '' ? null : row.name;
    const continent = row.continent === '' ? null : row.continent;
    const capital = row.capital === '' ? null : row.capital;
    const largestCity = row.largestCity === '' ? null : row.largestCity;
    const currency = row.currency === '' ? null : row.currency;
    const language = row.language === '' ? null : row.language;
    const population = row.population == null ? null : parseFloat(row.population.toString());
    const landArea = row.landArea == null ? null : parseFloat(row.landArea.toString());
    const agricultureArea = row.agricultureArea === '' ? null : row.agricultureArea;
    const forestArea = row.forestArea === '' ? null : row.forestArea;
    const co2Emission = row.co2Emission == null ? null : parseFloat(row.co2Emission.toString());
    const image = row.image === '' ? null : row.image;

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
        image
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
      .on('data', (row) => {
        // Push the promise to insert data if valid
        promises.push(insertData(row));
      })
      .on('end', async () => {
        // Wait for all the insert operations to complete
        try {
          await Promise.all(promises);
          console.log('All data inserted successfully');
        } catch (error) {
          console.error('Error during inserts:', error);
        } finally {
          await pool.end();
        }
      });
}
  
importCsv().catch((error) => {
    console.error('Error in importCsv:', error);
});
