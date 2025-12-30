export const trekData = [
  {
    id: 1,
    title: "Everest Base Camp Trek",
    description: "The ultimate Himalayan adventure to the base of the world's highest peak",
    duration: 14,
    difficulty: "Challenging",
    region: "Khumbu Region",
    price: 1805, // Approximately $1,805 USD
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    title: "Annapurna Circuit",
    description: "Classic tea-house trek through diverse landscapes and cultures",
    duration: 12,
    difficulty: "Moderate",
    region: "Annapurna Region",
    price: 1353, // Approximately $1,353 USD
    badge: "Most Popular",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    title: "Langtang Valley Trek",
    description: "Pristine valley with stunning mountain views and Tamang culture",
    duration: 8,
    difficulty: "Moderate",
    region: "Langtang Region",
    price: 902,  
    badge: "Hidden Gem",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

export const featuredTrek = {
  title: "Annapurna Circuit",
  duration: 12,
  difficulty: "Moderate",
  price: 1353, 
  image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3"
};

// Provide a backward-compatible export name expected by components
export const treksData = trekData;