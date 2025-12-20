export interface Review {
    id: string;
    author: string;
    rating: number;
    text: string;
    service: string;
    date: string;
    platform: 'Google' | 'Yelp' | 'Direct';
}

export const STATIC_REVIEWS: Review[] = [
    {
        id: '1',
        author: "James M.",
        rating: 5,
        text: "Absolutely stunning work on my Porsche 911. The ceramic coating makes it look wetter than when I bought it.",
        service: "Ceramic Coating",
        date: "2023-11-15",
        platform: "Google"
    },
    {
        id: '2',
        author: "Sarah L.",
        rating: 5,
        text: "Saved my interior after a coffee spill. You honestly can't tell it ever happened.",
        service: "Interior Deep Clean",
        date: "2023-12-02",
        platform: "Direct"
    },
    {
        id: '3',
        author: "Robert T.",
        rating: 5,
        text: "Regular valet service keeps my truck looking brand new despite the construction sites I visit.",
        service: "Valet Service",
        date: "2023-10-28",
        platform: "Google"
    }
];
