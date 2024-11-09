const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addProfile() {
    try {
        const profileData = {
            username: "John3",
            email: "john@gmail.com",
            password: "password",
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
        countries = ["Japan", "Italy", "Spain", "France", "Australia"];

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
        countries = ["Japan", "Italy", "Spain", "France", "Australia"];
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
                    title: "Great country",
                    date: "2021.08.01-2021.08.07",
                    rating: 5,
                    text: "I had a great time in this country. The people are friendly and the food is great.",
                    ispublic: true,
                    journal: {
                        connect: {
                            id: journalId,
                        },
                    },
                },
                {
                    title: "Beautiful country",
                    date: "2022.08.01-2022.08.07",
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
                    title: "Interesting country",
                    date: "2023.08.01-2023.08.07",
                    rating: 3,
                    text: "Third time in this country and well the country has become interesting. The culture is unique and the history is fascinating.",
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
