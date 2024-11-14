const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");

const prisma = new PrismaClient();

async function addProfile() {
    try {
        const password = await hash("password", 10);

        const profileData = {
            username: "John3",
            email: "john@gmail.com",
            password: password,
        };

        // Insert Profile
        const createdProfile = await prisma.profile.create({
            data: profileData,
        });

        console.log("Inserted profile:", createdProfile);
    } catch (error) {
        console.error("Error inserting profile:", error);
    } finally {
        await prisma.$disconnect();
    }
}

async function addJournals() {
    try {
        countries = ["Japan", "Italy", "Spain", "France", "Australia", "Egypt"];

        for (const countryName of countries) {
            // Fetch the country's image from the Country model
            const country = await prisma.country.findUnique({
                where: { name: countryName },
                select: { image: true },
            });

            if (!country || !country.image) {
                throw new Error(`Country ${countryName} not found or has no image`);
            }

            const journalData = {
                // Connect to Country by name
                country: {
                    connect: {
                        name: countryName,
                    },
                },
                // Connect to Country by image
                countryByImage: {
                    connect: {
                        image: country.image,
                    },
                },
                // Connect to Profile by email
                profile: {
                    connect: {
                        email: "john@gmail.com",
                    },
                },
            };

            // Insert Journal
            const createdJournal = await prisma.journal.create({
                data: journalData,
            });

            console.log(`Journal created for country: ${countryName}`);
        }
    } catch (error) {
        console.error("Error inserting journals:", error);
    } finally {
        await prisma.$disconnect();
    }
}

async function addReviews() {
    try {
        // Retrieve the journal ID dynamically by profile email and country name
        countries = ["Japan", "Italy", "Spain", "France", "Australia", "Egypt"];
        journalIds = [];

        for (const countryName of countries) {
            const journal = await prisma.journal.findFirst({
                where: {
                    profile: { email: "john@gmail.com" },
                    country: { name: countryName },
                },
                select: { id: true },
            });

            if (!journal) {
                throw new Error(`No journal found for the specified profile and '${countryName}'.`);
            }

            const journalId = journal.id;
            console.log("Journal ID found:", journalId);

            journalIds.push(journalId);
        }

        for (const journalId of journalIds) {
            const reviewsData = [
                {
                    title: "Disappointing Experience with High Expectations",
                    date: `200${journalId}-01-20`,
                    rating: 2,
                    text: "I had high expectations based on everything I’d read, but the experience didn’t live up to the hype. The attractions were overcrowded, and many places seemed overly commercialized. It was hard to get an authentic feel of the culture.",
                    ispublic: true,
                    journal: {
                        connect: {
                            id: journalId,
                        },
                    },
                },
                {
                    title: "Beautiful country",
                    date: `200${journalId}-02-10`,
                    rating: 4,
                    text: "Second time here and this country has becomne more beautiful. The scenery is breathtaking and the food is delicious.",
                    ispublic: true,
                    journal: {
                        connect: {
                            id: journalId,
                        },
                    },
                },
                {
                    title: "Stunning Natural Beauty Everywhere",
                    date: `200${journalId}-03-30`,
                    rating: 5,
                    text: "The natural landscapes here are breathtaking! Whether it was the mountains, beaches, or forests, every scene felt like a postcard come to life. It’s a paradise for nature lovers, with endless trails and hidden spots to discover.",
                    ispublic: true,
                    journal: {
                        connect: {
                            id: journalId,
                        },
                    },
                },
                {
                    title: "Interesting country",
                    date: `200${journalId}-05-09`,
                    rating: 3,
                    text: "Fourth time in this country and well the country has become interesting. The culture is unique and the history is fascinating.",
                    ispublic: true,
                    journal: {
                        connect: {
                            id: journalId,
                        },
                    },
                },
                {
                    title: "A Mesmerizing Cultural Experience",
                    date: `200${journalId}-06-21`,
                    rating: 4,
                    text: "Visiting this country was a journey through vibrant culture and history. From the local cuisine to the historic landmarks, each moment was a reminder of the region's unique character. The locals were warm and welcoming, and I felt at home exploring every part.",
                    ispublic: true,
                    journal: {
                        connect: {
                            id: journalId,
                        },
                    },
                },
                {
                    title: "A Culinary Adventure",
                    date: `200${journalId}-08-13`,
                    rating: 5,
                    text: "This country’s food scene is extraordinary. From traditional dishes to modern culinary twists, each meal was an experience in itself. The local flavors, fresh ingredients, and diverse influences made dining a highlight of the trip.",
                    ispublic: true,
                    journal: {
                        connect: {
                            id: journalId,
                        },
                    },
                },
                {
                    title: "Rich in History and Tradition",
                    date: `200${journalId}-11-02`,
                    rating: 4,
                    text: "Exploring this country was like stepping back in time. The museums, historic buildings, and local traditions provided a deep insight into its rich history. Every location had a story to tell, and I learned so much about the region’s heritage.",
                    ispublic: true,
                    journal: {
                        connect: {
                            id: journalId,
                        },
                    },
                },
            ];

            // Insert Reviews
            const createdReviews = await prisma.review.createMany({
                data: reviewsData.map((review) => ({
                    title: review.title,
                    date: review.date,
                    rating: review.rating,
                    text: review.text,
                    ispublic: review.ispublic,
                    journalid: journalId,
                })),
                skipDuplicates: true,
            });

            console.log("Inserted reviews:", createdReviews);
        }
    } catch (error) {
        console.error("Error inserting reviews:", error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the functions in sequence
(async function () {
    await addProfile();
    await addJournals();
    await addReviews();
})();
