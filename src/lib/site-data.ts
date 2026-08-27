import ghats from "@/assets/ghats.jpg";
import coastal from "@/assets/coastal.jpg";
import hills from "@/assets/hills.jpg";
import fort from "@/assets/fort.jpg";
import waterfall from "@/assets/waterfall.jpg";
import trekWomen from "@/assets/trek-women.jpg";
import beachCamp from "@/assets/beach-camp.jpg";

export const CONTACT = {
  brand: "BharatPravas",
  tagline: "Offbeat. Authentic. Yours.",
  phone: "9270772205",
  phoneDisplay: "+91 92707 72205",
  email: "xplorevo@gmail.com",
  whatsapp: "919763262025",
  whatsappDisplay: "+91 97632 62025",
  hours: "Mon – Sun: 8:00 AM – 8:00 PM",
};

export const whatsappLink = (msg = "Hi BharatPravas! I'd like to know more about your trips.") =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;

export type Destination = {
  slug: string;
  name: string;
  sub: string;
  trips: string;
  image: string;
  blurb: string;
};

export const destinations: Destination[] = [
  {
    slug: "western-ghats",
    name: "Western Ghats",
    sub: "Trekking • Nature",
    trips: "18+ Trips",
    image: ghats,
    blurb:
      "Ridge walks, cloud forests and sunrise summits across the Sahyadri range — the heart of Maharashtra trekking.",
  },
  {
    slug: "coastal-maharashtra",
    name: "Coastal Maharashtra",
    sub: "Beaches • Forts",
    trips: "15+ Trips",
    image: coastal,
    blurb:
      "Konkan sunsets, sea forts, quiet fishing villages and beach camps with local seafood feasts.",
  },
  {
    slug: "hill-stations",
    name: "Hill Stations",
    sub: "Scenic • Relaxing",
    trips: "12+ Trips",
    image: hills,
    blurb: "Slow weekends in misty ghats — viewpoints, plantation walks and cosy homestays.",
  },
  {
    slug: "heritage-forts",
    name: "Heritage & Forts",
    sub: "History • Culture",
    trips: "20+ Trips",
    image: fort,
    blurb: "Maratha strongholds, rock-cut caves and stories told by local historians on-site.",
  },
  {
    slug: "waterfalls",
    name: "Waterfalls",
    sub: "Monsoon Magic",
    trips: "16+ Trips",
    image: waterfall,
    blurb: "Monsoon-only escapes to roaring falls, rappelling spots and green valleys.",
  },
];

export type Trip = {
  slug: string;
  title: string;
  badge: string;
  category: string;
  dates: string;
  price: number;
  seats: number;
  duration: string;
  difficulty: string;
  region: string;
  image: string;
  summary: string;
  highlights: string[];
  itinerary: { day: string; text: string }[];
  includes: string[];
};

export const trips: Trip[] = [
  {
    slug: "kalsubai-summit-trek",
    title: "Kalsubai Summit Trek",
    badge: "WOMEN-ONLY",
    category: "Women-Only",
    dates: "24 – 25 May 2026",
    price: 2499,
    seats: 8,
    duration: "2 Days / 1 Night",
    difficulty: "Moderate",
    region: "Western Ghats",
    image: ghats,
    summary:
      "Stand on the highest peak in Maharashtra at sunrise with an all-women group and certified female trek leaders.",
    highlights: [
      "Sunrise from the 1,646 m summit",
      "Certified women trek leaders",
      "Village homestay with home-cooked food",
      "Max 12 travelers per batch",
    ],
    itinerary: [
      { day: "Day 1", text: "Pickup from Mumbai/Pune, drive to Bari village, orientation and night stay." },
      { day: "Day 2", text: "Pre-dawn ascent, summit sunrise, descent, breakfast and drive back." },
    ],
    includes: ["Transport", "Stay", "2 meals", "Trek leader", "First-aid & permits"],
  },
  {
    slug: "harishchandragad-trek",
    title: "Harishchandragad Trek",
    badge: "WEEKEND TREK",
    category: "Weekend Escape",
    dates: "31 May – 1 Jun 2026",
    price: 2199,
    seats: 6,
    duration: "2 Days / 1 Night",
    difficulty: "Challenging",
    region: "Western Ghats",
    image: waterfall,
    summary:
      "Konkan Kada cliffs, ancient caves and a starry night on one of the most iconic forts in the Sahyadris.",
    highlights: [
      "Sunset at Konkan Kada",
      "Cave stay experience",
      "Milky Way photography session",
      "Local Malshej cuisine",
    ],
    itinerary: [
      { day: "Day 1", text: "Drive to Khireshwar, trek to plateau, explore temple complex, sunset at Konkan Kada." },
      { day: "Day 2", text: "Sunrise at Taramati, descend via Pachnai, lunch and return." },
    ],
    includes: ["Transport", "Cave/tent stay", "3 meals", "Trek leader", "Safety gear"],
  },
  {
    slug: "alibaug-beach-camping",
    title: "Alibaug Beach Camping",
    badge: "WOMEN-ONLY",
    category: "Women-Only",
    dates: "7 – 8 Jun 2026",
    price: 2999,
    seats: 10,
    duration: "2 Days / 1 Night",
    difficulty: "Easy",
    region: "Coastal Maharashtra",
    image: beachCamp,
    summary: "Bonfire, beach games and a sea-fort walk — a soft-adventure coastal weekend for women travelers.",
    highlights: ["Beachfront tents", "Bonfire & music night", "Kolaba Fort low-tide walk", "Konkan seafood thali"],
    itinerary: [
      { day: "Day 1", text: "Ferry to Alibaug, camp setup, beach games, bonfire dinner." },
      { day: "Day 2", text: "Sunrise walk, Kolaba Fort, breakfast and return ferry." },
    ],
    includes: ["Ferry & transfers", "Tent stay", "3 meals", "Activities", "Trip captain"],
  },
  {
    slug: "rajmachi-monsoon-trek",
    title: "Rajmachi Monsoon Trek",
    badge: "MONSOON SPECIAL",
    category: "Monsoon Special",
    dates: "14 – 15 Jun 2026",
    price: 2399,
    seats: 12,
    duration: "2 Days / 1 Night",
    difficulty: "Moderate",
    region: "Western Ghats",
    image: hills,
    summary: "Walk the green Rajmachi trail in full monsoon — waterfalls, fireflies and twin forts.",
    highlights: ["Kondhane caves detour", "Waterfall bath stops", "Twin forts Shrivardhan & Manaranjan", "Village dinner"],
    itinerary: [
      { day: "Day 1", text: "Karjat base, 15 km trail walk, village homestay, hot bhajiyas and chai." },
      { day: "Day 2", text: "Fort exploration, descent to Lonavala, lunch and return." },
    ],
    includes: ["Transport", "Homestay", "3 meals", "Guide", "Permits"],
  },
  {
    slug: "kaas-plateau-bloom",
    title: "Kaas Plateau Flower Bloom",
    badge: "SEASONAL",
    category: "Weekend Escape",
    dates: "6 – 7 Sep 2026",
    price: 3299,
    seats: 14,
    duration: "2 Days / 1 Night",
    difficulty: "Easy",
    region: "Hill Stations",
    image: hills,
    summary: "A UNESCO valley of flowers weekend with Thoseghar falls and Sajjangad heritage.",
    highlights: ["Kaas Pathar bloom", "Thoseghar waterfalls", "Satara food trail", "Nature photography walk"],
    itinerary: [
      { day: "Day 1", text: "Drive to Satara, Thoseghar falls, lakeside evening." },
      { day: "Day 2", text: "Sunrise at Kaas Plateau, guided bloom walk, return." },
    ],
    includes: ["Transport", "Hotel stay", "3 meals", "Entry permits", "Naturalist"],
  },
  {
    slug: "sinhagad-heritage-walk",
    title: "Sinhagad Heritage Walk",
    badge: "DAY TRIP",
    category: "Heritage",
    dates: "21 Jun 2026",
    price: 999,
    seats: 16,
    duration: "1 Day",
    difficulty: "Easy",
    region: "Heritage & Forts",
    image: fort,
    summary: "A storytelling day-hike through the fort of the lion, ending with pithla-bhakri at the top.",
    highlights: ["Historian-led storytelling", "Sunrise climb", "Local pithla-bhakri", "Beginner friendly"],
    itinerary: [{ day: "Day 1", text: "Pune pickup at 5 AM, climb, guided fort walk, breakfast, return by 2 PM." }],
    includes: ["Transport", "Breakfast", "Guide", "First-aid"],
  },
];

export const reviews = [
  {
    name: "Priya S.",
    from: "Pune • Kalsubai Trek",
    text: "The Kalsubai trek was absolutely amazing! BharatPravas team made it safe, fun and memorable.",
  },
  {
    name: "Sneha R.",
    from: "Mumbai • Alibaug Camping",
    text: "Loved the beach camping experience! Super well-organized and the women leaders were fantastic.",
  },
  {
    name: "Ananya M.",
    from: "Nashik • Harishchandragad",
    text: "The best weekend getaway I've ever had. Great people, great views & great memories!",
  },
  {
    name: "Rhea K.",
    from: "Thane • Rajmachi Trek",
    text: "Fireflies, waterfalls and the warmest group ever. I've already booked my next trip.",
  },
];

export const faqs = [
  {
    q: "Are the women-only tours led by women?",
    a: "Yes. Every women-only departure is led by certified female trek leaders, with verified female-friendly stays and 24x7 support.",
  },
  {
    q: "How big are the groups?",
    a: "We cap our groups at 12–16 travelers so everyone gets attention, better stays and a genuinely local experience.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Free cancellation up to 10 days before departure (minus payment gateway charges). 50% refund up to 5 days prior.",
  },
  {
    q: "Do you organise custom or corporate trips?",
    a: "Absolutely. Share your dates, group size and budget on the Plan My Trip form and we'll craft an itinerary in 24 hours.",
  },
  {
    q: "Is the trek beginner friendly?",
    a: "Most of our weekend treks are graded Easy to Moderate. Each trip page lists the difficulty and fitness needed.",
  },
];

export const blogs = [
  {
    slug: "monsoon-treks-maharashtra",
    title: "10 Monsoon Treks in Maharashtra You Shouldn't Miss",
    excerpt: "From Rajmachi to Harishchandragad — the green trails that come alive between June and September.",
    date: "12 Jun 2026",
    read: "6 min read",
    image: waterfall,
  },
  {
    slug: "solo-women-travel-safety",
    title: "Solo Women Travel in India: A Practical Safety Guide",
    excerpt: "Real checklists from our female trek leaders on stays, transport, gear and gut instinct.",
    date: "28 May 2026",
    read: "8 min read",
    image: trekWomen,
  },
  {
    slug: "konkan-food-trail",
    title: "The Konkan Food Trail: Eating Your Way Down the Coast",
    excerpt: "Sol kadhi, kombdi vade and the beach shacks worth planning a whole weekend around.",
    date: "4 May 2026",
    read: "5 min read",
    image: coastal,
  },
];

export const moments = [ghats, trekWomen, fort, beachCamp, coastal, waterfall, hills];

export const heroStats = [
  { value: "5+", label: "Years of Experience" },
  { value: "10,000+", label: "Happy Travelers" },
  { value: "250+", label: "Curated Trips" },
  { value: "100%", label: "Safety Record" },
];
