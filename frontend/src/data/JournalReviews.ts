import { JournalType } from "../types/JournalType";

export const journalEntries: JournalType[] = [
    {
      country: "Norway",
      reviews: [
        {
          id: 1,
          title: "Beautiful Fjords",
          dato: "2024-09-01",
          rating: 5,
          text: "Norway's fjords are a must-see! The scenery is breathtaking and peaceful.",
          public: true,
        },
        {
          id: 2,
          title: "Cold but Worth It",
          dato: "2023-12-15",
          rating: 4,
          text: "Winter in Norway is magical, but the cold can be intense. Great for skiing!",
          public: true,
        },
      ],
    },
    {
      country: "Japan",
      reviews: [
        {
          id: 3,
          title: "Cherry Blossom Festival",
          dato: "2024-04-05",
          rating: 5,
          text: "Attending the cherry blossom festival was one of the most serene experiences ever.",
          public: true,
        },
        {
          id: 4,
          title: "Amazing Sushi",
          dato: "2023-11-10",
          rating: 4,
          text: "The sushi in Japan is unparalleled! Highly recommend visiting Tsukiji Market.",
          public: false,
        },
      ],
    },
    {
      country: "Italy",
      reviews: [
        {
          id: 5,
          title: "Historical Rome",
          dato: "2024-06-20",
          rating: 5,
          text: "Rome is like stepping into a history book. The Colosseum and Vatican are must-sees.",
          public: true,
        },
        {
          id: 6,
          title: "Beautiful Tuscany",
          dato: "2023-09-14",
          rating: 4,
          text: "Tuscany's countryside is beautiful, but tourist spots can get crowded in summer.",
          public: true,
        },
      ],
    },
    {
      country: "Australia",
      reviews: [
        {
          id: 7,
          title: "Great Barrier Reef",
          dato: "2024-02-15",
          rating: 5,
          text: "Diving in the Great Barrier Reef is a once-in-a-lifetime experience.",
          public: true,
        },
        {
          id: 8,
          title: "Outback Adventure",
          dato: "2023-08-12",
          rating: 4,
          text: "The Australian Outback is vast and impressive, though the heat can be challenging.",
          public: true,
        },
      ],
    },
    {
      country: "France",
      reviews: [
        {
          id: 9,
          title: "Parisian Dream",
          dato: "2024-05-01",
          rating: 5,
          text: "Paris is everything you imagine. The Eiffel Tower at sunset is breathtaking.",
          public: true,
        },
        {
          id: 10,
          title: "French Riviera",
          dato: "2023-07-22",
          rating: 4,
          text: "The French Riviera is luxurious, but expensive during the summer season.",
          public: false,
        },
      ],
    },
  ];
  