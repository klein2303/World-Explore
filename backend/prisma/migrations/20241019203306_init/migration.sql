-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "continent" TEXT,
    "capital" TEXT,
    "currency" TEXT,
    "language" TEXT,
    "population" DOUBLE PRECISION,
    "image" TEXT,
    "agriculturearea" TEXT,
    "co2emission" DOUBLE PRECISION,
    "forestarea" TEXT,
    "landarea" DOUBLE PRECISION,
    "largestcity" TEXT,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journal" (
    "id" SERIAL NOT NULL,
    "countryid" INTEGER,

    CONSTRAINT "Journal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "date" TEXT,
    "rating" INTEGER,
    "text" TEXT,
    "ispublic" BOOLEAN,
    "journalid" INTEGER,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_countryid_fkey" FOREIGN KEY ("countryid") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_journalid_fkey" FOREIGN KEY ("journalid") REFERENCES "Journal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
