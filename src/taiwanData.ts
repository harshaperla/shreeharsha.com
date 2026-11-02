export interface TaiwanMediaItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  thumbnailUrl?: string;
  title: string;
  caption: string;
  duration?: string; // For videos, e.g. "0:10"
  aspect?: string;
}

export interface TaiwanPlace {
  id: string;
  name: string;
  chineseName: string;
  category: 'transit' | 'landmark' | 'nature' | 'heritage' | 'food' | 'scenic';
  categoryLabel: string;
  thumbnail: string;
  oneLiner: string;
  tags: string[];
  location: string;
  region: string;
  recommendedDuration: string;
  bestTime: string;
  transitEase: 'Easy (Direct MRT)' | 'Moderate (Bus / Transfer)' | 'Express (THSR / Train)' | 'Mountain (Scenic Rail / Bus)';
  
  overview: string[];
  specialties: {
    title: string;
    description: string;
  }[];
  howToGo: {
    metroOrTrain?: string;
    busDetails?: string;
    bookingAndTickets?: string;
    easyCardInfo?: string;
    tips: string[];
  };
  gallery: TaiwanMediaItem[];
}

export interface TaiwanHighlightSlide {
  id: string;
  type: 'photo' | 'video';
  title: string;
  subtitle: string;
  location: string;
  badge: string;
  imageUrl: string;
  videoDuration?: string;
  placeId: string;
}

export const TAIWAN_HIGHLIGHTS: TaiwanHighlightSlide[] = [
  {
    id: 'hl-taoyuan',
    type: 'photo',
    title: 'Taoyuan Airport: The High-Speed Gateway to Taiwan',
    subtitle: 'State-of-the-art terminal and purple Airport MRT express linking directly to Taipei Main Station',
    location: 'Dayuan District, Taoyuan City',
    badge: 'DAY 1 • ARRIVAL & TRANSIT',
    imageUrl: '/taiwan/taoyuan-airport.jpg',
    placeId: 'taoyuan-airport',
  },
  {
    id: 'hl-taipei-station',
    type: 'photo',
    title: 'Taipei Main Station: Monumental Checkered Atrium Hub',
    subtitle: 'Taiwan’s grand central transportation nexus combining palatial roofs with multi-line high-speed rail',
    location: 'Zhongzheng District, Taipei',
    badge: 'DAY 1 • TRANSIT NEXUS',
    imageUrl: '/taiwan/taipei-main-station.jpg',
    placeId: 'taipei-main-station',
  },
  {
    id: 'hl-ximending',
    type: 'photo',
    title: 'Ximending: Neon Alleys, Rainbow Crossing & Live Street Energy',
    subtitle: 'Taipei’s electric youth culture center pulsating with street dance performances, anime, and fashion',
    location: 'Wanhua District, Taipei',
    badge: 'DAY 1 • YOUTH CULTURE & FOOD',
    imageUrl: '/taiwan/ximending.jpg',
    placeId: 'ximending',
  },
  {
    id: 'hl-longshan',
    type: 'photo',
    title: 'Mengjia Longshan Temple: Incense Clouds & Dragon Pillars',
    subtitle: 'Founded in 1738, Taipei’s most sacred classical sanctuary surviving centuries of island history',
    location: 'Wanhua District, Taipei',
    badge: 'DAY 1 • HERITAGE SANCTUARY',
    imageUrl: '/taiwan/longshan-temple.jpg',
    placeId: 'longshan-temple',
  },
  {
    id: 'hl-guangzhou',
    type: 'photo',
    title: 'Guangzhou Street Night Market: Wanhua Retro Street Gastronomy',
    subtitle: 'Traditional wok-fried oyster omelets, charcoal pepper buns, and heritage retro carnival carts',
    location: 'Wanhua District, Taipei',
    badge: 'DAY 1 • NIGHT MARKET',
    imageUrl: '/taiwan/guangzhou-night-market.jpg',
    placeId: 'guangzhou-night-market',
  },
  {
    id: 'hl-jiufen',
    type: 'photo',
    title: 'Jiufen Old Street: Mountain Terraces Overlooking Pacific Waves',
    subtitle: 'Historic mountain gold-rush town with cascading stairways and panoramic coastal ocean lookouts',
    location: 'Ruifang District, New Taipei',
    badge: 'DAY 2 • MOUNTAIN VILLAGE',
    imageUrl: '/taiwan/jiufen-old-street.jpg',
    placeId: 'jiufen-old-street',
  },
  {
    id: 'hl-qingyun',
    type: 'photo',
    title: 'Jiufen Qingyun Temple: Multi-Tiered Mountain Sanctuary Over The Sea',
    subtitle: 'Majestic Taoist shrine with golden Taiji sanctuary commanding panoramic Pacific coastlines',
    location: 'Ruifang District, New Taipei',
    badge: 'DAY 2 • COASTAL MOUNTAIN TEMPLE',
    imageUrl: '/taiwan/jiufen-qingyun-temple.jpg',
    placeId: 'jiufen-qingyun-temple',
  },
  {
    id: 'hl-badouzi',
    type: 'photo',
    title: 'Badouzi Coastal Trail: Wangyou Valley & Keelung Islet Vistas',
    subtitle: 'Lush seaside boardwalk winding along cliff edges directly overlooking the deep Pacific Ocean',
    location: 'Zhongzheng District, Keelung City',
    badge: 'DAY 2 • PACIFIC COASTAL TRAIL',
    imageUrl: '/taiwan/badouzi-trail.jpg',
    placeId: 'badouzi-trail',
  },
  {
    id: 'hl-taipei-101',
    type: 'photo',
    title: 'Taipei 101 Observatory: 508m Megatall Icon & 660-Tonne Wind Damper',
    subtitle: 'Ultra-high-speed aerodynamic elevator, 89F panoramic night skyline, and the visible engineering marvel pendulum',
    location: 'Xinyi District, Taipei City',
    badge: 'DAY 3 • SKYSCRAPER & DAMPER',
    imageUrl: '/taiwan/taipei-101-night-exterior.jpg',
    placeId: 'taipei-101',
  },
  {
    id: 'hl-xinyi-district',
    type: 'photo',
    title: 'Xinyi District & Xiangti Avenue: Dazzling Skybridge Cityscape',
    subtitle: 'Illuminated tree-lined avenues, elevated pedestrian skywalks, and vibrant modern shopping architecture',
    location: 'Xinyi District, Taipei City',
    badge: 'DAY 3 • MODERN ARCHITECTURE & NIGHTLIFE',
    imageUrl: '/taiwan/xiangti-avenue-plaza.jpg',
    placeId: 'xinyi-district',
  },
];

export const TAIWAN_PLACES: TaiwanPlace[] = [
  // ==========================================
  // DAY 1 PLACES
  // ==========================================
  {
    id: 'taoyuan-airport',
    name: 'Taiwan Taoyuan International Airport (TPE)',
    chineseName: '臺灣桃園國際機場',
    category: 'transit',
    categoryLabel: 'Transit & Arrival',
    thumbnail: '/taiwan/taoyuan-airport.jpg',
    oneLiner: 'Modern high-tech gateway to Taiwan with purple Airport MRT express connecting to Taipei Main Station in 35 minutes.',
    tags: ['Taoyuan', 'Airport MRT', 'Transit', 'Arrival'],
    location: 'Dayuan District, Taoyuan City',
    region: 'Northern Gateway',
    recommendedDuration: '1 - 1.5 Hours',
    bestTime: 'Arrival / Departure (Express Trains every 15 min)',
    transitEase: 'Express (THSR / Train)',
    overview: [
      'Serving as Taiwan’s principal international aeronautical gateway, Taiwan Taoyuan International Airport (TPE) delivers a seamless introduction to the island’s world-class public infrastructure and welcoming hospitality.',
      'The Taoyuan Airport MRT (Taoyuan Metro Purple Line) provides high-speed, direct rail transit between Terminal 1, Terminal 2, and central Taipei Main Station in just 35 minutes on the Express service.',
      'Upon clearing customs, travelers can pick up their contactless EasyCard (悠遊卡), activate 4G/5G mobile connectivity, and access multi-language automated ticket kiosks right at the station concourse.'
    ],
    specialties: [
      {
        title: 'Airport MRT Express (Purple Line)',
        description: 'Dedicated high-speed commuter train gliding along elevated concrete viaducts and forest hills directly into downtown Taipei in 35 minutes.'
      },
      {
        title: 'Arrival Hall EasyCard & SIM Counters',
        description: 'Instant pickup counters for Taiwan’s ubiquitous contactless EasyCard, accepted on all metros, city buses, railways, and convenience stores.'
      },
      {
        title: 'Autonomous Service Robots & Smart Guidance',
        description: 'Interactive autonomous robotic assistance kiosks guiding passengers through arrivals, luggage claims, and down to the metro platforms.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Take the Taoyuan Airport MRT Express Train (Purple Line) from Terminal 1 (Station A12) or Terminal 2 (Station A13) directly to Taipei Main Station (Station A1).',
      bookingAndTickets: 'Tap your physical EasyCard directly at the gates (NT$150) or purchase single-journey tokens at automated kiosks.',
      easyCardInfo: 'EasyCard is available for purchase at arrival concourse counters and 7-Eleven / FamilyMart shops located within both terminals.',
      tips: [
        'Always ensure you board the purple Express Train (35 minutes) rather than the blue Commuter Train (50 minutes, stops at all local stations).',
        'Free high-speed Wi-Fi and USB charging ports are available on all Airport MRT train cars.',
        'Luggage racks with safety bars are located right inside every passenger car entrance.'
      ]
    },
    gallery: [
      {
        id: 'ty-m1',
        type: 'photo',
        url: '/taiwan/taoyuan-airport.jpg',
        title: 'Taoyuan Airport Terminal 2 & Metro Concourse',
        caption: 'Modern passenger concourse with direct escalators leading down to the Airport MRT station platforms.'
      },
      {
        id: 'ty-m2',
        type: 'photo',
        url: '/taiwan/taoyuan-airport-robot.jpg',
        title: 'Autonomous Airport Guide Robot',
        caption: 'Smart robotic customer service kiosk navigating Terminal 2 to assist international passengers heading to the Metro.'
      },
      {
        id: 'ty-m3',
        type: 'photo',
        url: '/taiwan/taoyuan-airport-walkway.jpg',
        title: 'Airport MRT Color-Coded Directional Wayfinding',
        caption: 'Clear floor transit markers guiding travelers directly to the Purple Line Express MRT.'
      },
      {
        id: 'ty-v1',
        type: 'video',
        url: '/taiwan/taoyuan-airport-robot.mp4',
        title: 'Airport Robot Service Guide in Motion',
        caption: 'Real video footage of the autonomous service robot navigating the airport arrivals hall.',
        duration: '0:08',
        thumbnailUrl: '/taiwan/taoyuan-airport-robot.jpg'
      }
    ]
  },
  {
    id: 'taipei-main-station',
    name: 'Taipei Main Station',
    chineseName: '台北車站',
    category: 'transit',
    categoryLabel: 'Transit & Architecture',
    thumbnail: '/taiwan/taipei-main-station.jpg',
    oneLiner: 'The monumental heart of Taiwan’s rail network, featuring a colossal black-and-white checkered indoor atrium and multi-tier underground railway hub.',
    tags: ['Taipei Center', 'Transit Hub', 'TRA Rail', 'Airport MRT'],
    location: 'Zhongzheng District, Taipei City',
    region: 'Taipei Central',
    recommendedDuration: '1 - 2 Hours',
    bestTime: 'Afternoon / Transit interchange hours',
    transitEase: 'Easy (Direct MRT)',
    overview: [
      'Taipei Main Station is Taiwan’s central multimodal transportation nexus, uniting Taiwan High Speed Rail (THSR), Taiwan Railways (TRA), Taipei MRT Red and Blue Lines, Airport MRT, and metropolitan bus terminals into a single mega-complex.',
      'The ground-level Main Concourse is famed for its monumental palatial roof structure, skylit ceiling, and iconic black-and-white checkered floor where commuters, students, and travelers sit to socialize, rest, and observe the kinetic flow of the city.',
      'Beneath the grand hall lies a multi-level subterranean labyrinth of shopping streets, rail platforms, bakeries, and food alleys connecting directly into the Breeze Center and Taipei City Mall.'
    ],
    specialties: [
      {
        title: 'Monumental Checkered Atrium Hall',
        description: 'A striking architectural public gathering space underneath classical Chinese palatial hip-and-gable roof trusses and giant digital departure boards.'
      },
      {
        title: 'Legendary Taiwan Railway Bento (台鐵便當)',
        description: 'Famous freshly boxed meals featuring deep-marinated pork chops, soy-braised eggs, and tofu over seasoned rice, beloved by generations of train travelers.'
      },
      {
        title: 'Subterranean Metro Malls & Food Courts',
        description: 'Miles of interconnected air-conditioned underground shopping corridors loaded with street food, electronic shops, and souvenir outlets.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Direct terminal on Taipei MRT Red Line (R10) and Blue Line (BL12), connected via underground pedway to Taoyuan Airport MRT (A1).',
      easyCardInfo: 'Tap EasyCard across all MRT turnstiles and TRA local commuter rail gates.',
      tips: [
        'Follow the color-coded floor signage: Red for Tamsui-Xinyi Line, Blue for Bannan Line, and Purple for Airport MRT.',
        'Pick up a classic Railway Bento box near the south station exit for an essential Taiwanese cultural dining experience.',
        'Free luggage lockers are available throughout the underground concourses.'
      ]
    },
    gallery: [
      {
        id: 'tms-m1',
        type: 'photo',
        url: '/taiwan/taipei-main-station.jpg',
        title: 'Taipei Main Station Grand Concourse Arrival',
        caption: 'The colorful "Welcome to Taipei (歡迎來到臺北)" entrance gateway connecting MRT lines and underground markets.'
      },
      {
        id: 'tms-v1',
        type: 'video',
        url: '/taiwan/taipei-main-station.mp4',
        title: 'Taipei Main Station Concourse Walk',
        caption: 'Navigating the underground pedestrian walkways and high-speed transit interchange.',
        duration: '0:10',
        thumbnailUrl: '/taiwan/taipei-main-station.jpg'
      }
    ]
  },
  {
    id: 'ximending',
    name: 'Ximending Pedestrian Area & Red House',
    chineseName: '西門町徒步區與西門紅樓',
    category: 'landmark',
    categoryLabel: 'Culture & Nightlife',
    thumbnail: '/taiwan/ximending.jpg',
    oneLiner: 'The kinetic youth culture epicenter of Taipei, pulsating with neon billboards, street performers, rainbow crossings, and historic Japanese-era brick architecture.',
    tags: ['Ximending', 'Street Food', 'Red House', 'Nightlife', 'Youth Culture'],
    location: 'Wanhua District, Taipei City',
    region: 'Taipei West',
    recommendedDuration: '2 - 3 Hours',
    bestTime: 'Late afternoon to vibrant night (5:00 PM – 10:30 PM)',
    transitEase: 'Easy (Direct MRT)',
    overview: [
      'Often heralded as the "Harajuku of Taipei," Ximending is a pedestrian cultural epicenter where subcultures, anime, fashion boutiques, street performers, and legendary culinary institutions collide.',
      'At its threshold stands the historic Red House (西門紅樓), an octagonal red-brick market building erected in 1908 during the Japanese colonial era, today converted into an incubator for local indie designers, craft markets, and outdoor terrace cafes.',
      'Directly outside Exit 6, the famous "Rainbow Crossing" painted across the street serves as an international symbol of inclusivity, set against glowing multi-story LED billboards and endless queues for local street delicacies.'
    ],
    specialties: [
      {
        title: 'Ay-Chung Flour-Rice Noodles (阿宗麵線)',
        description: 'Slurping silky steamed thin noodles in thick bonito broth topped with tender braised pork intestines while standing street-side with chopsticks.'
      },
      {
        title: 'The Historic Octagonal Red House (1908)',
        description: 'Distinctive eight-sided brick landmark housing creative artisan workshops, indie design boutiques, and an open-air weekend craft market.'
      },
      {
        title: 'Rainbow Six Crossing & Live Street Performers',
        description: 'Vibrant street-painted rainbow installation outside MRT Exit 6, surrounded by live dance troupes, multimedia video screens, and glowing neon.'
      },
      {
        title: 'Street Gastronomy & Bubble Tea Alley',
        description: 'Hot star large fried chicken cutlets, brown sugar boba milk, grilled mochi skewers, and mango shaved ice stalls.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Take the Taipei MRT Blue (Bannan) or Green (Songshan-Xindian) Line directly to Ximen Station (BL11 / G12). Exit 6 opens directly into the pedestrian zone.',
      easyCardInfo: 'EasyCard accepted at MRT and nearby YouBike stations.',
      tips: [
        'Add a spoonful of garlic puree, chili oil, and black vinegar to Ay-Chung noodles for the authentic local taste.',
        'Ximending is pedestrian-only on weekday evenings and all weekend—making it completely car-free and easy to explore on foot.',
        'Visit the Red House craft bazaar on Friday and Saturday evenings for handmade Taiwanese souvenirs.'
      ]
    },
    gallery: [
      {
        id: 'xm-m1',
        type: 'photo',
        url: '/taiwan/ximending.jpg',
        title: 'Ximending Rainbow TAIPEI Crossing & Live Performance',
        caption: 'Dancers performing on the iconic street-painted Rainbow TAIPEI crossing in front of H&M in Ximending.'
      },
      {
        id: 'xm-m2',
        type: 'photo',
        url: '/taiwan/ximending-street-1.jpg',
        title: 'Neon Billboards & Vibrant Shopping District',
        caption: 'Lively pedestrian streets packed with fashion stores, neon signs, and weekend crowds.'
      },
      {
        id: 'xm-m3',
        type: 'photo',
        url: '/taiwan/ximending-street-2.jpg',
        title: 'Ximending Evening Street Life',
        caption: 'Dusk falling over Ximen walking district with street gastronomy stalls and shops.'
      },
      {
        id: 'xm-m4',
        type: 'photo',
        url: '/taiwan/ximending-arcade.jpg',
        title: 'Gachapon & Claw Arcade Culture',
        caption: 'Vibrant amusement arcades and capsule toy machines popular throughout Ximending alleys.'
      },
      {
        id: 'xm-v1',
        type: 'video',
        url: '/taiwan/ximending-vibe.mp4',
        title: 'Ximending Street Dance & Night Energy',
        caption: 'Live video of dance troupes and street performers energizing the Rainbow crossing crowd.',
        duration: '0:10',
        thumbnailUrl: '/taiwan/ximending.jpg'
      }
    ]
  },
  {
    id: 'longshan-temple',
    name: 'Mengjia Longshan Temple',
    chineseName: '艋舺龍山寺',
    category: 'heritage',
    categoryLabel: 'Heritage & Spirituality',
    thumbnail: '/taiwan/longshan-temple.jpg',
    oneLiner: 'Founded in 1738, Taipei’s most sacred classical temple featuring intricately carved copper dragon pillars, gold-leaf altars, and swirling incense.',
    tags: ['Longshan Temple', 'Heritage', 'Qing Dynasty', 'Wanhua', 'Temple'],
    location: 'Wanhua District, Taipei City',
    region: 'Old Taipei (Wanhua / Bangka)',
    recommendedDuration: '1 - 1.5 Hours',
    bestTime: 'Late afternoon to dusk when lanterns glow and evening prayers echo',
    transitEase: 'Easy (Direct MRT)',
    overview: [
      'Built in 1738 by settlers from Fujian, Mengjia Longshan Temple is an architectural masterpiece of classical Southern Chinese temple design and a spiritual anchor for the people of Taipei.',
      'Having survived earthquakes, fires, and wartime bombardment, the temple harmoniously venerates Buddhist figures (led by Guanyin, Goddess of Mercy), Taoist immortals, and sea deities such as Mazu and Guan Yu.',
      'The temple courtyard features Taiwan’s only pair of cast-copper dragon pillars, intricate swallowtail roof ridges decorated with colourful ceramic glass mosaic (Jiannian), and deeply devoted worshippers chanting amid aromatic joss-stick smoke.'
    ],
    specialties: [
      {
        title: 'Cast Bronze Dragon Pillars',
        description: 'Exquisite dynamic dragon pillars carved in relief with four claws grasping pearls, flanking the front hall entrance.'
      },
      {
        title: 'Flying Swallowtail Roof Ridges (Jiannian Mosaic)',
        description: 'Curved porcelain and colored glass shards meticulously crafted into dragons, phoenixes, and legendary folklore warriors.'
      },
      {
        title: 'Bwa Bwei (Moon Block) Divination',
        description: 'Devotees tossing crescent-shaped wooden divination blocks on the flagstone floor to consult deities on important life decisions.'
      },
      {
        title: 'Spiritual Synchronism',
        description: 'Over 100 Buddhist, Taoist, and folk deities honored under one roof, reflecting Taiwan’s rich multi-layered religious tapestry.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Take Taipei MRT Blue (Bannan Line) to Longshan Temple Station (BL10), Exit 1. Walk 2 minutes through the temple plaza.',
      tips: [
        'Follow traditional temple etiquette: enter through the right-hand Dragon Gate and exit through the left-hand Tiger Gate.',
        'Admission is completely free; quiet, respectful attire is appreciated.',
        'Located adjacent to Guangzhou Street Night Market and Bopiliao Historic Block for a seamless evening itinerary.'
      ]
    },
    gallery: [
      {
        id: 'ls-m1',
        type: 'photo',
        url: '/taiwan/longshan-temple.jpg',
        title: 'Mengjia Longshan Temple Courtyard at Dusk',
        caption: 'Worshippers gathered in the central granite courtyard surrounded by glowing paper lanterns and ornate temple roofs.'
      },
      {
        id: 'ls-m2',
        type: 'photo',
        url: '/taiwan/longshan-temple-offering.jpg',
        title: 'Sacred Floral & Fruit Altar Offerings',
        caption: 'Elaborate traditional temple offerings laid out before the gilded shrine of Guanyin and Mazu.'
      },
      {
        id: 'ls-m3',
        type: 'photo',
        url: '/taiwan/longshan-temple-carvings.jpg',
        title: 'Bronze Dragon Pillars & Granite Reliefs',
        caption: 'Intricate Qing-era carved copper dragon columns and swallowtail roof ridges.'
      },
      {
        id: 'ls-m4',
        type: 'photo',
        url: '/taiwan/longshan-temple-courtyard.jpg',
        title: 'Inner Sanctuary Courtyard & Prayer Censers',
        caption: 'Incense clouds gently wafting across the classical wooden pavilions and gold-leaf shrines.'
      },
      {
        id: 'ls-v1',
        type: 'video',
        url: '/taiwan/longshan-temple.mp4',
        title: 'Evening Prayers & Chanting at Longshan Temple',
        caption: 'Atmospheric video of temple chimes, rising incense, and peaceful devotees at dusk.',
        duration: '0:10',
        thumbnailUrl: '/taiwan/longshan-temple.jpg'
      }
    ]
  },
  {
    id: 'guangzhou-night-market',
    name: 'Guangzhou Street Tourist Night Market',
    chineseName: '廣州街觀光夜市 (艋舺夜市)',
    category: 'food',
    categoryLabel: 'Street Food & Night Market',
    thumbnail: '/taiwan/guangzhou-night-market.jpg',
    oneLiner: 'Authentic, retro Taipei night market right next to Longshan Temple, packed with heritage street stalls, sizzling oyster omelets, and traditional Wanhua bites.',
    tags: ['Night Market', 'Guangzhou Street', 'Wanhua', 'Street Food', 'Local Culture'],
    location: 'Wanhua District, Taipei City',
    region: 'Old Taipei (Wanhua)',
    recommendedDuration: '1.5 - 2 Hours',
    bestTime: 'Evening (6:30 PM – 10:30 PM)',
    transitEase: 'Easy (Direct MRT)',
    overview: [
      'Stretching along Guangzhou Street just outside the gates of Longshan Temple, Guangzhou Street Night Market (also known as Bangka Night Market) offers one of the most raw, historic, and authentic night market atmospheres in Taipei.',
      'Unlike heavily commercialized tourist night markets, Guangzhou Street retains the nostalgic culinary roots of Wanhua—Taipei’s oldest commercial district. Sizzling cast-iron pans, clay ovens, and steaming stockpots fill the air with irresistible aromas.',
      'Interconnected with the historic red-pillared Huaxi Street Tourist Night Market and Wuzhou Street, visitors can sample decades-old heritage recipes including crispy oyster omelets, charcoal-baked pepper pork buns, Taiwanese sausages, and chilled wild lemon aiyu jelly.'
    ],
    specialties: [
      {
        title: 'Crispy Taiwanese Oyster Omelet (蚵仔煎)',
        description: 'Fresh coastal oysters pan-fried with leafy greens, egg, and sweet potato starch for a chewy, crispy crust, finished with sweet-savory red sauce.'
      },
      {
        title: 'Charcoal Clay-Oven Pepper Buns (胡椒餅)',
        description: 'Crisp layered pastry dough stuffed with coarsely ground black pepper pork and spring onions, baked on the interior clay walls of a roaring charcoal kiln.'
      },
      {
        title: 'Retro Night Market Carnival Games',
        description: 'Nostalgic mid-century marble pinball machines, balloon dart boards, and ring toss games that local families have enjoyed for generations.'
      },
      {
        title: 'Herbal Soups & Chilled Wild Aiyu Jelly (愛玉冰)',
        description: 'Refreshing hand-rubbed jelly made from indigenous Taiwanese creeping fig seeds served with crushed ice, freshly squeezed lemon juice, and honey.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Take Taipei MRT Blue (Bannan Line) to Longshan Temple Station (BL10), Exit 1. Walk 2 minutes north along Xiyuan Road to Guangzhou Street.',
      tips: [
        'Combine with your visit to Longshan Temple: visit the temple at twilight, then walk straight across into the night market for dinner.',
        'Carry local cash (NT$); small street stalls and carnival games generally do not accept cards.',
        'Don’t miss wandering down adjacent Huaxi Street with its traditional Chinese red lantern arcade.'
      ]
    },
    gallery: [
      {
        id: 'gz-m1',
        type: 'photo',
        url: '/taiwan/guangzhou-night-market.jpg',
        title: 'Huaxi & Guangzhou Street Night Market Grand Archway',
        caption: 'The monumental traditional Chinese entrance gate: "Taipei Huaxi St. Tourist Night Market" brilliantly lit at night.'
      },
      {
        id: 'gz-m2',
        type: 'photo',
        url: '/taiwan/guangzhou-market-stalls.jpg',
        title: 'Bustling Street Gastronomy & Food Carts',
        caption: 'Vendors serving sizzling oyster omelets, pepper buns, and fresh fruit juices along Guangzhou Street.'
      },
      {
        id: 'gz-v1',
        type: 'video',
        url: '/taiwan/guangzhou-night-market.mp4',
        title: 'Night Market Sounds & Sizzling Woks',
        caption: 'Walkthrough video capturing the sizzling street stalls and vibrant atmosphere.',
        duration: '0:08',
        thumbnailUrl: '/taiwan/guangzhou-night-market.jpg'
      }
    ]
  },

  // ==========================================
  // DAY 2 PLACES
  // ==========================================
  {
    id: 'jiufen-old-street',
    name: 'Jiufen Old Street & A-Mei Teahouse',
    chineseName: '九份老街與阿妹茶樓',
    category: 'heritage',
    categoryLabel: 'Mountain Village & Heritage',
    thumbnail: '/taiwan/jiufen-old-street.jpg',
    oneLiner: 'Legendary misty mountain gold-rush town with cascading stone staircases, glowing crimson lanterns, and historic teahouses overlooking the Pacific Ocean.',
    tags: ['Jiufen', 'A-Mei Teahouse', 'Taro Balls', 'Mountain Mist', 'Ruifang'],
    location: 'Ruifang District, New Taipei City',
    region: 'Northeast Coastal Mountains',
    recommendedDuration: '2.5 - 3.5 Hours',
    bestTime: 'Late afternoon to sunset (4:00 PM – 7:30 PM when red lanterns illuminate)',
    transitEase: 'Mountain (Scenic Rail / Bus)',
    overview: [
      'Clinging steeply to the verdant slopes of Mount Keelung overlooking the Pacific Ocean, Jiufen is a historic gold-mining town that feels suspended in time, famed for inspiring dreamlike cinematic mountain aesthetics.',
      'Covered flagstone pedestrian alleys—Jishan Street and Shuqi Road—wind past artisan teahouses, handmade calligraphy workshops, traditional wood-beamed storefronts, and panoramic ocean lookouts.',
      'The multi-tiered wooden facade of A-Mei Teahouse (阿妹茶樓) glows brilliantly with strings of crimson lanterns as the coastal mist rolls in from the sea, creating an unforgettable atmosphere for traditional Taiwanese Oolong tea tasting.'
    ],
    specialties: [
      {
        title: 'Handmade Chewy Taro & Sweet Potato Balls (九份芋圓)',
        description: 'Freshly kneaded taro, sweet potato, and green tea mochi balls served either steaming hot or over sweet crushed ice with red beans at Grandma Lai’s.'
      },
      {
        title: 'A-Mei Teahouse Gongfu Tea Ceremony',
        description: 'Sipping fragrant high-mountain Oolong tea brewed in clay Yixing teapots while enjoying panoramic views of Keelung Bay and coastal sea mist.'
      },
      {
        title: 'Shuqi Road Lantern Stairway',
        description: 'The iconic vertical stone staircase framed by hanging crimson lanterns, rustic wooden eaves, and atmospheric mountain fog.'
      },
      {
        title: 'Taiwanese Peanut Ice Cream Rolls & Red Yeast Meat Buns',
        description: 'Unique local delicacies wrapped in delicate crepes with shaved peanut brittle, cilantro, and creamy taro ice cream scoops.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Take the TRA railway train from Taipei Main Station to Ruifang Station (approx. 45 min). From Ruifang station square, transfer to Keelung Bus 788, 965, or 1062 up the mountain to Jiufen Old Street (15 min).',
      easyCardInfo: 'EasyCard accepted for both the TRA train journey to Ruifang and the connecting mountain buses.',
      tips: [
        'Pack an umbrella or light windbreaker: Jiufen’s elevated microclimate frequently welcomes ethereal coastal sea mist and gentle rain.',
        'Wear supportive walking shoes for the steep stone steps along Shuqi Road.',
        'Sunset and dusk provide the most photogenic contrast between the blue ocean and glowing red paper lanterns.'
      ]
    },
    gallery: [
      {
        id: 'jf-m1',
        type: 'photo',
        url: '/taiwan/jiufen-old-street.jpg',
        title: 'Jiufen Mountain Panorama Over The Pacific Ocean',
        caption: 'Breathtaking hilltop vista from Jiufen looking out over coastal headlands, deep blue sea, and Keelung Bay.'
      },
      {
        id: 'jf-m2',
        type: 'photo',
        url: '/taiwan/jiufen-stairs.jpg',
        title: 'Historic Stone Mountain Steps & Shrines',
        caption: 'Ancient stone staircases and moss-covered stone pillars winding up the mountain slope.'
      },
      {
        id: 'jf-m3',
        type: 'photo',
        url: '/taiwan/jiufen-alley.jpg',
        title: 'Jiufen Traditional Village Alleyway',
        caption: 'Quaint mountain pathways lined with stone walls and ocean lookout balconies.'
      },
      {
        id: 'jf-v1',
        type: 'video',
        url: '/taiwan/jiufen-mountain-drive.mp4',
        title: 'Scenic Coastal Route 303 to Jiufen',
        caption: 'Driving along the winding coastal mountain highway with views of emerald hills and Pacific waters.',
        duration: '0:05',
        thumbnailUrl: '/taiwan/jiufen-old-street.jpg'
      }
    ]
  },
  {
    id: 'jiufen-qingyun-temple',
    name: 'Jiufen Qingyun Temple',
    chineseName: '九份青雲殿 (神農大帝廟)',
    category: 'heritage',
    categoryLabel: 'Temple & Coastal Vistas',
    thumbnail: '/taiwan/jiufen-qingyun-temple.jpg',
    oneLiner: 'Monumental multi-tiered Taoist mountain sanctuary in Ruifang dedicated to Emperor Shennong, commanding panoramic sea-to-mountain views.',
    tags: ['Qingyun Temple', 'Shennong Emperor', 'Ruifang', 'Coastal Views', 'Mountain Sanctuary'],
    location: 'Ruifang District, New Taipei City',
    region: 'Northeast Coastal Foothills',
    recommendedDuration: '1 - 1.5 Hours',
    bestTime: 'Morning or Golden Hour for majestic mountain and coastal photography',
    transitEase: 'Mountain (Scenic Rail / Bus)',
    overview: [
      'Perched dramatically upon the tranquil coastal foothills below Jiufen and Jinguashi, Qingyun Temple (青雲殿) is one of northern Taiwan’s most magnificent yet peaceful sacred mountain complexes.',
      'Dedicated to Shennong Dadi (神農大帝)—the mythical Divine Emperor and patron deity of herbal medicine, agriculture, and health—the temple features soaring multi-level orange glazed-tile roofs, carved stone balustrades, and sweeping terraces.',
      'From the temple’s grand upper esplanade, visitors are rewarded with an uninterrupted, breathtaking 180-degree panorama: rolling emerald mountain ridges cascading down into the deep blue contours of the Pacific Ocean and coastal bays.'
    ],
    specialties: [
      {
        title: 'Grand Multi-Tiered Mountain Architecture',
        description: 'Spectacular tiered roof eaves crowned with flying ceramic dragons and phoenixes rising majestically against the forest slopes.'
      },
      {
        title: 'Grand Sanctuary Taiji Yin-Yang Medallion',
        description: 'A striking circular Taiji floor emblem surrounded by towering red lacquer pillars and intricate golden wood reliefs.'
      },
      {
        title: 'Panoramic Pacific & Valley Vistas',
        description: 'Expansive open terrace lookouts framing the winding coastal roads, deep valleys, and the vast Pacific horizon below.'
      },
      {
        title: 'Serene Spiritual Sanctuary',
        description: 'A deeply peaceful, uncrowded mountain retreat with tranquil chanting, ornate incense burners, and carved granite staircases.'
      }
    ],
    howToGo: {
      metroOrTrain: 'From Ruifang Station or Jiufen Old Street, easily reached via a short 10-minute taxi ride or local Ruifang district buses traversing the scenic mountain road.',
      tips: [
        'Walk up to the highest outdoor terrace for the best wide-angle landscape photograph framing the temple’s ornate roof eaves against the blue sea.',
        'Combine easily with Jiufen Old Street and northern coastal exploration on Day 2.',
        'A wonderful peaceful counterpoint to the busy shopping alleys of Jiufen.'
      ]
    },
    gallery: [
      {
        id: 'qy-m1',
        type: 'photo',
        url: '/taiwan/jiufen-qingyun-temple.jpg',
        title: 'Qingyun Temple Grand Hall & Taiji Yin-Yang Floor',
        caption: 'Spectacular temple sanctuary featuring the large circular Taiji medallion, carved red lacquer columns, and golden wooden reliefs.'
      },
      {
        id: 'qy-m2',
        type: 'photo',
        url: '/taiwan/jiufen-qingyun-hall.jpg',
        title: 'Majestic Multi-Tiered Temple Sanctuary',
        caption: 'Inner prayer hall with intricate golden altars dedicated to Emperor Shennong.'
      },
      {
        id: 'qy-m3',
        type: 'photo',
        url: '/taiwan/jiufen-qingyun-details.jpg',
        title: 'Temple Balconies & Mountain Panoramas',
        caption: 'Stone balustrades and flying dragon roof ridges commanding uninterrupted views of the Pacific coast.'
      },
      {
        id: 'qy-v1',
        type: 'video',
        url: '/taiwan/jiufen-qingyun-temple.mp4',
        title: 'Mountain Serenity & Taoist Chimes at Qingyun Temple',
        caption: 'Peaceful video capturing the resonant temple chimes and majestic mountain backdrop.',
        duration: '0:10',
        thumbnailUrl: '/taiwan/jiufen-qingyun-temple.jpg'
      }
    ]
  },
  {
    id: 'badouzi-trail',
    name: 'Badouzi Coastal Trail & Wangyou Valley',
    chineseName: '八斗子海濱步道與望幽谷',
    category: 'nature',
    categoryLabel: 'Nature & Coastal Trail',
    thumbnail: '/taiwan/badouzi-trail.jpg',
    oneLiner: 'Dramatic coastal boardwalk winding along emerald cliff ridges with panoramic Pacific Ocean views and Keelung Islet on the horizon.',
    tags: ['Badouzi Trail', 'Wangyou Valley', 'Coastal Boardwalk', 'Pacific Ocean', 'Keelung'],
    location: 'Zhongzheng District, Keelung City',
    region: 'Keelung Coastal Peninsula',
    recommendedDuration: '2 - 3 Hours',
    bestTime: 'Morning or clear afternoon (deep blue waters and refreshing ocean breeze)',
    transitEase: 'Moderate (Bus / Transfer)',
    overview: [
      'Located on the scenic Badouzi Peninsula in Keelung, Wangyou Valley (望幽谷 - "Forget Your Sorrows Valley") is one of Taiwan’s most breathtaking seaside coastal nature trails.',
      'The meticulously built wooden boardwalk hugs the undulating green grassy ridges, ascending to clifftop pavilions that plunge sharply into the azure waters of the Pacific Ocean below.',
      'Facing outward toward the horizon, the volcanic silhouette of Keelung Islet (基隆嶼) rises dramatically from the waves, offering an unforgettable landscape accompaniment throughout the hike.',
      'The trail connects to Badouzi Fishing Harbor and the charming Badouzi Railway Station, where the train tracks run immediately adjacent to the breaking ocean waves.'
    ],
    specialties: [
      {
        title: 'Wangyou Valley Ocean Boardwalk',
        description: 'Winding wooden stairs traversing lush V-shaped green valleys down to rugged wave-cut rocky coastal platforms.'
      },
      {
        title: 'Unobstructed Keelung Islet Panorama',
        description: 'Direct views of Keelung Islet floating like a pyramid across the cobalt Pacific waters under expansive skies.'
      },
      {
        title: 'Coastal Geological Formations',
        description: 'Marine terraces, sea caves, and intertidal sandstone reefs teeming with coastal marine life.'
      },
      {
        title: 'Tropical Coastal Forest Path',
        description: 'Serene walking pathways shaded by vibrant fan palm groves leading directly onto the coastal ridges.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Take the TRA train from Taipei or Ruifang to Badouzi Station via the scenic Shen’ao Line; or take Keelung Bus 108 or 791 from Keelung Railway Station directly to Wangyougu trailhead.',
      easyCardInfo: 'Tap EasyCard for both the TRA railway connection and local Keelung coastal buses.',
      tips: [
        'The wooden boardwalk has staircases but is well-paved and accessible for hikers of moderate fitness.',
        'Carry drinking water and sun protection, as the open coastal ridge offers wide-open sea vistas with little shade.',
        'Stop by the adjacent Badouzi Fishing Port for fresh seafood dining after completing the coastal hike.'
      ]
    },
    gallery: [
      {
        id: 'bd-m1',
        type: 'photo',
        url: '/taiwan/badouzi-trail.jpg',
        title: 'Badouzi Coastal Trail & Pacific Ocean Cliffs',
        caption: 'The dramatic stone trail curving along towering coastal bluffs with panoramic ocean waves and rugged reefs below.'
      },
      {
        id: 'bd-m2',
        type: 'photo',
        url: '/taiwan/badouzi-trail-palms.jpg',
        title: 'Tropical Coastal Forest Path',
        caption: 'Shaded trail section surrounded by lush Taiwanese fan palms leading toward Wangyou Valley.'
      },
      {
        id: 'bd-m3',
        type: 'photo',
        url: '/taiwan/badouzi-sunset.jpg',
        title: 'Golden Hour Over Badouzi Ridge',
        caption: 'Warm evening sunlight illuminating the sea cliffs and expansive coastal horizon.'
      },
      {
        id: 'bd-v1',
        type: 'video',
        url: '/taiwan/badouzi-coastal-waves.mp4',
        title: 'Pacific Waves Crashing on Badouzi Cliffs',
        caption: 'Video of the turquoise ocean waves breaking against the volcanic sea cliffs of Wangyou Valley.',
        duration: '0:10',
        thumbnailUrl: '/taiwan/badouzi-trail.jpg'
      }
    ]
  },

  // ==========================================
  // DAY 3 PLACES
  // ==========================================
  {
    id: 'taipei-101',
    name: 'Taipei 101 Observatory & Tuned Mass Damper',
    chineseName: '台北101觀景台與風阻尼球',
    category: 'landmark',
    categoryLabel: 'Architectural Icon & Engineering',
    thumbnail: '/taiwan/taipei-101-night-exterior.jpg',
    oneLiner: 'Taiwan’s 508-meter bamboo-stepped megatall skyscraper, featuring the Guinness world-record 819 m/min pressurized elevator and a visible 660-tonne golden wind damper.',
    tags: ['Taipei 101', 'Observatory', 'Wind Damper', 'Engineering Marvel', 'Xinyi'],
    location: 'Xinyi District, Taipei City',
    region: 'Taipei East (Xinyi)',
    recommendedDuration: '2 - 2.5 Hours',
    bestTime: 'Evening / Golden Hour into night for illuminated skyline and cloudscapes',
    transitEase: 'Easy (Direct MRT)',
    overview: [
      'Soaring 508 meters above the Taipei Basin, Taipei 101 is an internationally renowned icon of modern Taiwanese engineering, culture, and sustainable architecture. Designed by C.Y. Lee & Partners, its tiered silhouette evokes a segmented stalk of blooming bamboo or a traditional multi-tier Chinese pagoda, symbolizing eternal resilience and perpetual upward growth.',
      'Visitors board the Guinness World Record pressurized aerodynamic double-deck elevators, which blast passengers from the 5th floor shopping mall to the 89th floor indoor observatory in just 37 seconds at a blistering speed of 819 meters per minute (over 60 km/h) under an enchanting constellation-lit ceiling.',
      'Between the 87th and 91st floors hangs the building’s crowning engineering marvel: a monumental 660-metric-ton golden steel Tuned Mass Damper (風阻尼球). Suspended by eight thick braided steel cables and visible to the public, this colossal pendulum sways dynamically to counteract typhoons and seismic vibrations, ensuring structural equilibrium and visitor comfort high above the clouds.'
    ],
    specialties: [
      {
        title: '660-Metric-Ton Tuned Mass Damper (風阻尼球)',
        description: 'The world’s largest and heaviest publicly visible tuned mass damper sphere, engineered with 41 circular steel plates welded together to absorb up to 40% of tower sway during typhoons and earthquakes.'
      },
      {
        title: 'Guinness World Record Pressurized Elevator (819 m/min)',
        description: 'Aerodynamic rocket-fast elevators ascending 84 floors in 37 seconds, complete with automated atmospheric pressure regulation and starry celestial ceiling displays.'
      },
      {
        title: '89F Indoor & Outdoor Observation Deck',
        description: 'Floor-to-ceiling panoramic glass walls commanding 360-degree views across the illuminated neon grid of Taipei, surrounding mountain basins, and the Keelung River.'
      },
      {
        title: 'Seasonal Installations & High-Altitude Garden',
        description: 'Curated artistic floral gardens, illuminated crescent moon lounges, and interactive multi-media projections high above the city.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Take Taipei MRT Red (Tamsui-Xinyi Line) directly to Taipei 101/World Trade Center Station (R03), Exit 4 opens right into the Taipei 101 Mall basement.',
      bookingAndTickets: 'Observatory ticketing counter and elevator boarding entrance are located on the 5th floor of the Taipei 101 Mall. Advance online booking is recommended for sunset hours.',
      easyCardInfo: 'Tap your EasyCard or Taipei FunPASS directly on the MRT Red Line to arrive effortlessly at station R03.',
      tips: [
        'Visit around 6:30 PM to catch the dramatic transition from twilight dusk to the blazing night skyline lights of Taipei.',
        'Don\'t miss walking down the stairs between the 89th and 88th floors to stand directly in front of the massive golden damper ball.',
        'Audio guide devices and multilingual interactive panoramic screens are available throughout the observation deck.'
      ]
    },
    gallery: [
      {
        id: 't101-m1',
        type: 'photo',
        url: '/taiwan/taipei-101-night-exterior.jpg',
        title: 'Taipei 101 Towering Night Silhouette',
        caption: 'Looking up at the illuminated bamboo-segmented pagoda architecture of Taipei 101 rising into the night clouds.'
      },
      {
        id: 't101-m2',
        type: 'photo',
        url: '/taiwan/taipei-101-damper-ball.jpg',
        title: '660-Tonne Tuned Mass Damper Sphere',
        caption: 'The immense golden steel pendulum suspended between the 87th and 91st floors to safeguard the tower against typhoons.'
      },
      {
        id: 't101-m3',
        type: 'photo',
        url: '/taiwan/taipei-101-damper-specs.jpg',
        title: 'Wind Damper Engineering Wall',
        caption: 'Interactive specifications wall detailing the 5.5-meter diameter, 660-ton mass, and 40% sway reduction capabilities.'
      },
      {
        id: 't101-m4',
        type: 'photo',
        url: '/taiwan/taipei-101-rain-tower.jpg',
        title: 'Taipei 101 Piercing Monsoon Clouds',
        caption: 'Atmospheric night shot of the illuminated crown and Chinese character LED displays glowing through rain mist.'
      },
      {
        id: 't101-m5',
        type: 'photo',
        url: '/taiwan/taipei-101-observatory-interior.jpg',
        title: '89F Observatory Traditional Garden Pavilion',
        caption: 'The tranquil "Zhuangyuan Jidi" classical pavilion installation on the 89th floor observation deck overlooking the city.'
      },
      {
        id: 't101-m6',
        type: 'photo',
        url: '/taiwan/taipei-101-moon-installation.jpg',
        title: 'Illuminated Crescent Moon Observation Lounge',
        caption: 'Artistic illuminated moon sculpture surrounded by starlight fairy drops inside the 89F panoramic hall.'
      },
      {
        id: 't101-v1',
        type: 'video',
        url: '/taiwan/taipei-101-elevator.mp4',
        title: 'Guinness Record Elevator Ascent (819 m/min)',
        caption: 'Real video inside the pressurized aerodynamic elevator rocketing to the 89th floor in 37 seconds.',
        duration: '0:30',
        thumbnailUrl: '/taiwan/taipei-101-elevator-thumb.jpg'
      },
      {
        id: 't101-v2',
        type: 'video',
        url: '/taiwan/taipei-101-damper.mp4',
        title: 'Tuned Mass Damper Ball Up-Close',
        caption: 'Video capturing the massive suspended golden sphere and Damper Baby mascot at 380 meters elevation.',
        duration: '0:20',
        thumbnailUrl: '/taiwan/taipei-101-damper-thumb.jpg'
      }
    ]
  },
  {
    id: 'xinyi-district',
    name: 'Xinyi Shopping District & Xiangti Avenue Plaza',
    chineseName: '信義商圈與香緹大道廣場',
    category: 'landmark',
    categoryLabel: 'Urban Architecture & Nightlife',
    thumbnail: '/taiwan/xiangti-avenue-plaza.jpg',
    oneLiner: 'The dazzling modern heart of Taipei, connected by elevated pedestrian skybridges, illuminated tree-lined avenues, luxury malls, and vibrant evening street energy.',
    tags: ['Xinyi District', 'Xiangti Avenue', 'Skybridge Walk', 'Shopping', 'Nightlife', 'Taipei 101'],
    location: 'Xinyi District, Taipei City',
    region: 'Taipei East (Xinyi)',
    recommendedDuration: '1.5 - 2 Hours',
    bestTime: 'Night (7:00 PM – 10:30 PM) when all fairy lights and neon facades illuminate',
    transitEase: 'Easy (Direct MRT)',
    overview: [
      'Often celebrated as the "Manhattan of Taipei," the Xinyi Commercial District (信義商圈) is Taiwan\'s premier epicenter of international commerce, luxury fashion, modern architecture, and kinetic nightlife.',
      'What sets Xinyi apart from conventional metropolitan business districts is its visionary second-story pedestrian skybridge network. Travelers can stroll seamlessly between Taipei 101, ATT 4 FUN, Shin Kong Mitsukoshi, and Breeze Nan Shan entirely above street traffic, enjoying open-air lookouts onto glowing neon billboards and bustling avenues below.',
      'At the district’s core lies Xiangti Avenue Plaza (香緹大道廣場)—a pedestrian-only promenade lined with majestic trees adorned with year-round fairy lights. Here, open-air cafes, street musicians, pop-up artisan installations, and upscale department stores create an unforgettable urban evening ambiance.'
    ],
    specialties: [
      {
        title: 'Second-Story Elevated Skybridge Network',
        description: 'Miles of continuous covered and open-air pedestrian bridges linking multiple mega-malls, allowing visitors to walk above street level without waiting at traffic intersections.'
      },
      {
        title: 'Xiangti Avenue Plaza Fairy-Light Promenade',
        description: 'Vibrant tree-lined central walking boulevard illuminated with thousands of fairy lights, hosting live buskers, street acrobats, and outdoor pop-ups.'
      },
      {
        title: 'World-Class Gastronomy & Rooftop Lounges',
        description: 'From Michelin-starred Taiwanese dumplings at Din Tai Fung to high-altitude cocktail terraces and late-night artisan tea salons.'
      },
      {
        title: 'Architectural Skyline Panoramas',
        description: 'Unmatched ground-level and skybridge vantage points framing the full illuminated vertical stature of Taipei 101 alongside modern glass towers.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Take Taipei MRT Blue (Bannan Line) to Taipei City Hall Station (BL18), Exit 3; or Red Line to Taipei 101/World Trade Center Station (R03). Both stations connect directly into the Xinyi skybridge walkways.',
      easyCardInfo: 'EasyCard and Taipei FunPASS accepted across all metro stations and YouBike docking stations bordering the pedestrian plazas.',
      tips: [
        'Walk along the second-floor skybridge connecting ATT 4 FUN and Shin Kong Mitsukoshi for the most photogenic night view of Taipei 101 towering above.',
        'Visit on weekend evenings when Xiangti Avenue comes alive with talented local acoustic musicians and street magicians.',
        'A wonderful evening pairing right after descending from the Taipei 101 Observatory.'
      ]
    },
    gallery: [
      {
        id: 'xy-m1',
        type: 'photo',
        url: '/taiwan/xiangti-avenue-plaza.jpg',
        title: 'Xiangti Avenue Plaza Fairy-Light Promenade',
        caption: 'The glittering tree-lined pedestrian avenue between Shin Kong Mitsukoshi department stores illuminated with fairy lights.'
      },
      {
        id: 'xy-m2',
        type: 'photo',
        url: '/taiwan/xinyi-skybridge-night.jpg',
        title: 'Elevated Skybridge Overlooking Xinyi Nightlife',
        caption: 'Standing on the pedestrian skywalk framing illuminated skyscrapers and glowing neon billboards in Xinyi.'
      },
      {
        id: 'xy-m3',
        type: 'photo',
        url: '/taiwan/xinyi-mitsukoshi-night.jpg',
        title: 'Shin Kong Mitsukoshi Luxury Arcade',
        caption: 'Modern department store corridors and covered shopping colonnades buzzing with evening shoppers.'
      },
      {
        id: 'xy-v1',
        type: 'video',
        url: '/taiwan/xiangti-avenue-walk.mp4',
        title: 'Xiangti Avenue Skybridge Walk Video',
        caption: 'Walking along the elevated open-air skybridge surrounded by glowing trees and modern city lights.',
        duration: '0:15',
        thumbnailUrl: '/taiwan/xiangti-avenue-walk-thumb.jpg'
      }
    ]
  }
];

export interface TaiwanObservation {
  id: string;
  category: 'culture' | 'transit' | 'convenience' | 'civic' | 'food';
  categoryLabel: string;
  title: string;
  chineseTitle?: string;
  story: string;
  imageUrl?: string;
  imageCaption?: string;
  iconName: 'Flame' | 'Sparkles' | 'Train' | 'Store' | 'Utensils' | 'Music' | 'ShieldCheck' | 'Umbrella' | 'Smile' | 'Receipt';
  moments: string[];
  personalReflection: string;
  // Aliases for compatibility
  summary: string;
  details: string[];
  etiquetteTip: string;
}

export type TaiwanFact = TaiwanObservation;

export const TAIWAN_OBSERVATIONS: TaiwanObservation[] = [
  {
    id: 'obs-paper-burning',
    category: 'culture',
    categoryLabel: 'Spiritual Culture & Rituals',
    title: 'Sidewalk Furnaces: Sending Gold Currency to Ancestors',
    chineseTitle: '燒金紙 (Shāo Jīnzhǐ)',
    imageUrl: '/taiwan/joss-paper-burning.jpg',
    imageCaption: 'Stainless-steel furnace smoking on the sidewalk as locals fold and burn gold joss paper currency for ancestors.',
    story: 'Walking down the sidewalks of Wanhua and narrow alleys off Taipei Main Station, I was stopped in my tracks by the smell of burning paper and woodsmoke. Right outside modern storefronts and tea shops, locals had placed circular stainless-steel barrel furnaces directly on the pavement. Shopkeepers, grandmothers, and young workers in sneakers were standing by the curb, rhythmically folding thick stacks of gold and silver foil ghost paper (joss money) and feeding them into the fire one by one. It wasn\'t an isolated temple ceremony—it was an everyday community duty. On the 1st and 15th days of the lunar month, the city\'s sidewalks turn into an open-air conduit sending financial blessings to ancestors and the local Earth God (Tudi Gong).',
    iconName: 'Flame',
    moments: [
      'Locals giving each sheet a gentle crease before tossing it into the furnace so oxygen circulates and it combusts without heavy smoke.',
      'High-tech computer repair shops with neon signs operating normally while a traditional steel fire barrel smoked peacefully on their front curb.',
      'Larger temples using specialized eco-furnaces with localized negative-pressure air filtration to catch particulates while preserving ancient spiritual duty.'
    ],
    personalReflection: 'What struck me was the complete lack of cognitive dissonance. In the heart of an ultra-modern Asian tech capital, feeding stacks of gold paper currency to the spirit realm is as natural and honored as answering an email.',
    summary: 'Sidewalk stainless-steel furnaces burning gold and silver joss paper currency for ancestors and Earth Gods on the 1st and 15th of the lunar month.',
    details: [
      'Locals giving each sheet a gentle crease before tossing it into the furnace so oxygen circulates and it combusts cleanly.',
      'High-tech computer repair shops with neon signs operating normally while a traditional steel fire barrel smoked peacefully on their front curb.',
      'Larger temples using specialized eco-furnaces with localized negative-pressure air filtration to catch particulates.'
    ],
    etiquetteTip: 'Do not step over burning furnaces on sidewalks or touch offerings; walk respectfully around the smoke.'
  },
  {
    id: 'obs-temple-snacks',
    category: 'culture',
    categoryLabel: 'Spiritual Culture & Rituals',
    title: 'Oreos, HeySong Soda & Green Kuai Kuai for the Gods',
    chineseTitle: '拜拜零食：神明的現代下午茶',
    imageUrl: '/taiwan/temple-kuai-kuai-altar.jpg',
    imageCaption: 'Green Kuai Kuai coconut puffs, Oreo biscuits, and cold sodas stacked on temple altars as modern offerings.',
    story: 'Inside Longshan Temple and the elevated mountain hall of Qingyun Temple, I anticipated the traditional offering tables stacked with pomelos, apples, and yellow chrysanthemums. But as I walked up close to the altars, I broke into a smile: stacked neatly on the round red plastic offering plates were six-packs of HeySong Sarsaparilla, family-size boxes of Oreo cookies, chilled bottled green teas, Doritos, and bright green bags of coconut Kuai Kuai corn puffs! Worshippers bow devoutly with smoldering sandalwood incense in hand, then place their favorite convenience store snacks right at the feet of Guanyin and the Shennong Emperor.',
    iconName: 'Sparkles',
    moments: [
      'The legendary green "Kuai Kuai" (乖乖) packs: since "Kuai Kuai" means "be good" or "listen obediently", people offer green packs to gods, and famously place them on top of factory machines, office computers, and ATM servers across Taiwan so they run smoothly without errors.',
      'Families praying together, leaving the packaged treats on the altar during their prayers, and then packing them into tote bags to take home as blessed snacks for their children.',
      'Zero formality barriers: you offer the deities whatever brings you joy in your real daily life.'
    ],
    personalReflection: 'I loved how warm, down-to-earth, and affectionate this felt. The gods here aren\'t treated as aloof or stern judges; worshippers bring them afternoon tea and favorite treats like beloved grandparents visiting for the weekend.',
    summary: 'Altars laden with Oreo biscuits, canned cold sodas, bubble tea, and green coconut Kuai Kuai puffs alongside traditional incense.',
    details: [
      'The green "Kuai Kuai" (乖乖) talisman: offered to gods and placed on computers across Taiwan so systems "behave" without crashing.',
      'Families taking the blessed snack packages home after worship to share good luck with children.',
      'Deities are treated with familiar warmth, receiving real everyday treats rather than distant formal offerings.'
    ],
    etiquetteTip: 'Notice the green Kuai Kuai bags resting on office servers and temple altars; only the green coconut flavor is used because green signals "system running normal".'
  },
  {
    id: 'obs-escalator',
    category: 'transit',
    categoryLabel: 'Transit & Metro Observations',
    title: 'The Right-Side Escalator Pact: Silent Commuter Choreography',
    chineseTitle: '電梯靠右站立',
    imageUrl: '/taiwan/mrt-escalator-etiquette.jpg',
    imageCaption: 'Taipei MRT commuters standing in single file strictly on the right side of escalators, leaving the left open.',
    story: 'My very first morning navigating the underground transfer labyrinth at Taipei Main Station, I was captivated by the escalators. Without a single station guard barking orders or a loudspeaker reminder, hundreds of bustling commuters instinctively stepped strictly onto the right side of every moving stairway. A flawless, silent single-file line formed naturally, leaving the entire left lane open like a high-speed express overtaking corridor for those walking up in a hurry.',
    iconName: 'Train',
    moments: [
      'Even at the height of morning rush hour with thousands pouring through the turnstiles, the left side remained completely unobstructed.',
      'If a traveler with bulky luggage stood on the left by mistake, no one yelled or sighed; someone would just offer a soft "Bù hǎoyìsi" with a gentle head tilt, and the person immediately tucked in.',
      'Transit authorities have actually posted notices saying riders can stand on both sides to balance wear, but the civic custom is so deep in commuters\' muscle memory that everyone keeps the lane open anyway.'
    ],
    personalReflection: 'It was my first glimpse of Taiwan\'s spontaneous collective consideration: individuals instinctively giving up half of their space so that strangers in a rush can move freely.',
    summary: 'Commuters standing strictly on the right side of every moving escalator, keeping the left lane open for walkers.',
    details: [
      'Flawless single-file lines forming naturally at every station escalator without station staff intervention.',
      'Gentle social correction: standing on the left prompts polite soft-spoken reminders.',
      'Deeply ingrained in civic muscle memory despite official balance advisories.'
    ],
    etiquetteTip: 'Step onto the right side immediately upon boarding escalators, keeping bags in front of you.'
  },
  {
    id: 'obs-yellow-line',
    category: 'transit',
    categoryLabel: 'Transit & Metro Observations',
    title: 'The Sacred Yellow Line: A Subway So Clean You Could Sleep On It',
    chineseTitle: '捷運黃線禁食區',
    imageUrl: '/taiwan/taoyuan-airport-walkway.jpg',
    imageCaption: 'Spotless metro walkways and clear yellow floor boundaries where eating and drinking are strictly forbidden.',
    story: 'Right at the entrance gates of every Taipei MRT station, a bold, thick yellow stripe is painted across the granite floor. The moment your foot crosses that line, all food, drinks, chewing gum, and even taking a sip of plain drinking water become strictly illegal. I watched commuters downing the last gulp of their iced tea two feet before the line, slipping the cup into a carry sleeve, and tapping through with entirely clean hands.',
    iconName: 'Train',
    moments: [
      'Over days of riding lines from Taoyuan to Danshui, I did not spot a single stray cup, grease stain, sticky drip, or stray wrapper on any station floor or train seat.',
      'The complete absence of subway odor: no fried food smells, no coffee spills, and no sticky handrails.',
      'Enforced by strict statutory fines (NT$1,500 – NT$7,500), but sustained primarily by shared civic pride.'
    ],
    personalReflection: 'It proved to me that public transit doesn\'t have to be grimy or neglected. The collective discipline produces what is hands-down the cleanest, most comfortable subway network I have ridden anywhere.',
    summary: 'Strict prohibition of food, drinks, chewing gum, and water the instant you cross the yellow line at MRT stations.',
    details: [
      'Zero tolerance enforced by fines, leading to pristine, odorless stations and train cars.',
      'Commuters carrying cups in fabric drink sleeves with straws capped.',
      'Universal civic compliance without visible police enforcement.'
    ],
    etiquetteTip: 'Finish or pack away all water bottles and drinks deep into your daypack before passing turnstiles.'
  },
  {
    id: 'obs-convenience-hub',
    category: 'convenience',
    categoryLabel: 'Everyday Convenience',
    title: '7-Eleven & FamilyMart: The Real Neighborhood Living Rooms',
    chineseTitle: '便利商店萬能生活圈',
    imageUrl: '/taiwan/7eleven-tea-eggs.jpg',
    imageCaption: 'Simmering pots of herbal tea eggs infused with black tea and spices at the 7-Eleven counter.',
    story: 'Within 24 hours of landing, I realized that convenience stores in Taiwan belong in a completely different category than what we know elsewhere. With two or three stores on virtually every block, they function as neighborhood community centers. The moment the sliding door chimes, you are greeted by the comforting aroma of black tea and star anise wafting from cauldrons of simmering herbal tea eggs (茶葉蛋), alongside roasted sweet potatoes and hot oden broths.',
    iconName: 'Store',
    moments: [
      'Seeing neighborhood residents sitting at counter tables charging phones, schoolkids doing homework, and elderly friends chatting over NT$35 Americanos.',
      'The all-in-one "ibon" and "FamiPort" multi-function kiosks: in five minutes you can pay residential electricity bills, buy high-speed rail tickets, print color photos straight from your phone, and ship parcels across the country.',
      'Open 24/7/365, brightly illuminated, providing an omnipresent safety net and welcoming warmth on any dark street.'
    ],
    personalReflection: 'You never feel alone or stranded in Taiwan. No matter what hour it is or what neighborhood you find yourself in, there is a warm, glowing refuge two minutes away.',
    summary: '24/7 convenience store hubs serving as community living rooms, post offices, dining rooms, and bill-payment centers.',
    details: [
      'Simmering tea eggs, roasted sweet potatoes, and hot oden counters welcoming customers.',
      'Sit-down dining counters equipped with power outlets, Wi-Fi, and clean public restrooms.',
      'Over 13,000 stores nationwide creating an omnipresent neighborhood safety net.'
    ],
    etiquetteTip: 'Hold onto your paper receipts—every store receipt is an official national lottery ticket.'
  },
  {
    id: 'obs-musical-garbage',
    category: 'civic',
    categoryLabel: 'Neighborhood Life & Habits',
    title: 'Beethoven\'s Für Elise: The Neighborhood Nightly Trash Ritual',
    chineseTitle: '音樂垃圾車與鄰里相聚',
    imageUrl: '/taiwan/musical-garbage-truck.jpg',
    imageCaption: 'A bright yellow garbage truck playing Für Elise as apartment neighbors assemble with sorted recycling bags.',
    story: 'One evening around 7:15 PM while walking through a quiet residential neighborhood, I began hearing a familiar chime echoing down the street: a high-pitched, cheerful rendition of Beethoven\'s "Für Elise" playing through a loudspeaker. Suddenly, front gates clicked open all along the lane. Apartment dwellers of all ages stepped out onto the sidewalk carrying blue official government trash bags, compost pails, and flattened cardboard boxes, waiting for the bright yellow garbage truck to pull up.',
    iconName: 'Music',
    moments: [
      'Neighbors chatting and trading evening greetings while waiting in an orderly roadside line.',
      'Tossing bags directly into the truck compactor yourself: there are no roadside dumpsters sitting out in Taiwan, which eliminates street odors and rodent issues entirely.',
      'Rigorous sorting: a second truck trails behind specifically taking separated plastics, glass, paper, and food scraps for pig feed or composting.'
    ],
    personalReflection: 'By taking away static street dumpsters and turning collection into a musical, synchronized neighborhood ritual, Taiwan transformed waste disposal from an unsightly problem into a civic social event.',
    summary: 'Classical music chiming through streets twice daily as neighbors gather to hand-deliver sorted recycling.',
    details: [
      'No permanent street dumpsters, eliminating odors and keeping sidewalks immaculate.',
      'Residents purchasing official municipal color-coded bags to fund recycling infrastructure.',
      'An evening communal ritual where apartment neighbors meet and chat on the street.'
    ],
    etiquetteTip: 'Keep a small pouch in your daypack for personal wrappers, as public street bins are rare.'
  },
  {
    id: 'obs-funpass',
    category: 'transit',
    categoryLabel: 'Transit & Day Passes',
    title: 'Taipei FunPASS 1-Day: The Unlimited Transit Passport',
    chineseTitle: '台北交通暢遊一日券 (Taipei FunPASS)',
    imageUrl: '/taiwan/taipei-funpass-1day.jpg',
    imageCaption: 'My physical Taipei FunPASS 1-Day Transportation Pass featuring Jiufen tea kettle and crimson lantern artwork.',
    story: 'When setting out for a packed day hopping between Taipei\'s rapid subway lines and regional buses, the physical Taipei FunPASS 1-Day Transportation Pass (交通暢遊 一日券) was an absolute game-changer. The card itself is a keepsake piece of art—illustrated with a copper tea kettle, quaint stone mountain steps, and crimson lanterns reminiscent of Jiufen. From the moment I first tapped it at the MRT turnstile, it unlocked unlimited rides across the entire Taipei MRT network, New Taipei City buses, and five dedicated Taiwan Tourist Shuttle routes. I didn\'t have to calculate individual zone fares, count coins, or monitor my balance; I just tapped, explored, and hopped from station to station with total freedom.',
    iconName: 'Train',
    moments: [
      'Artistic keepsake design: unlike plain generic plastic transit tokens, the physical card features hand-painted tea culture and mountain village motifs.',
      'Comprehensive coverage: valid for unlimited rides on all Taipei MRT subway lines, city buses, and 5 key tourist shuttle routes (including routes to Jiufen, Pingxi, and northern coastlines) for the entire calendar day.',
      'Effortless tap-and-go: no transaction friction or reloading required at kiosks—simply tap the reader at metro turnstiles or bus fare boxes and glide through.'
    ],
    personalReflection: 'Having an unlimited day pass fundamentally changes how you explore a city. Instead of hesitating about whether a spontaneous two-stop detour is "worth the fare", you just jump on the next train and follow your curiosity.',
    summary: 'Unlimited 1-day travel across Taipei MRT, city buses, and 5 scenic tourist shuttle routes on a beautifully illustrated physical card.',
    details: [
      'Valid for unlimited rides on Taipei MRT, Taipei City buses, and New Taipei City buses on the day of first tap.',
      'Includes 5 Taiwan Tourist Shuttle routes servicing mountain villages and coastal heritage areas.',
      'Beautifully illustrated physical collectible card with Jiufen tea and red lantern artwork.'
    ],
    etiquetteTip: 'The 1-Day Pass is activated upon your very first tap and remains valid until the last scheduled train of that calendar day.'
  },
  {
    id: 'obs-easycard',
    category: 'convenience',
    categoryLabel: 'Everyday Convenience',
    title: 'The Ubiquitous EasyCard: Taiwan’s Contactless Lifeline',
    chineseTitle: '一卡在手的悠遊生活 (Yōuyóu Kǎ)',
    imageUrl: '/taiwan/taiwan-easycard-wachifield.jpg',
    imageCaption: 'My collectible Wachifield Dayan Cat edition Taiwan EasyCard with contactless smart transit chip.',
    story: 'While the FunPASS was my unlimited key for intensive transit days, the standard EasyCard (悠遊卡 - Yōuyóu Kǎ) is the true cashless lifeblood of Taiwan. I loaded NT$500 onto it at the airport, and it practically replaced cash for the entire journey. It isn\'t just a transit card—it is accepted across TRA regional railways, Taipei and Kaohsiung metros, High Speed Rail unreserved cars, YouBike street bicycle docks, and virtually every 7-Eleven, FamilyMart, and night market fruit stand on the island.',
    iconName: 'Receipt',
    moments: [
      'Locals tapping novelty EasyCards shaped like miniature 3D bubble tea cups, pocket-sized instant ramen bowls, and cartoon lucky charms dangling from keychains.',
      'Built-in transfer discounts: transferring between the MRT and a municipal city bus within 60 minutes automatically discounts the fare.',
      'Zero lag at the gates: you just graze the card against the sensor without breaking stride, while also using it to buy chilled tea eggs at 7-Eleven.'
    ],
    personalReflection: 'It is the gold standard of public transit and micro-payment integration. Combined with the 1-Day FunPASS for heavy sightseeing days, traveling across Taiwan feels completely frictionless.',
    summary: 'A unified contactless RFID smart card powering subways, bullet trains, YouBikes, and night markets.',
    details: [
      'Universal acceptance across Taipei and Kaohsiung metro, regional railways, and mountain buses.',
      'Creative novelty cards shaped like mini boba cups and lucky amulets.',
      'Automatic transfer discounts between subway lines and metropolitan buses.'
    ],
    etiquetteTip: 'Keep both: use the 1-Day FunPASS for high-density transit days, and your EasyCard for YouBikes, regional trains, and convenience store bites.'
  },
  {
    id: 'obs-boba-science',
    category: 'food',
    categoryLabel: 'Culinary Culture',
    title: 'The Exact Science of Boba: Tailoring Sweetness & Ice',
    chineseTitle: '手搖飲的客製哲學',
    imageUrl: '/taiwan/boba-customization.jpg',
    imageCaption: 'A tea shop menu chart displaying sweetness (100% to 0%) and ice levels next to freshly sealed drinks.',
    story: 'Ordering tea in Taiwan is a serious personal customization ritual. The first time I stepped up to a neighborhood tea counter, the barista looked at me with pen poised, ready to record my exact specifications: Sweetness (100% Regular, 70% Less, 50% Half, 30% Micro, or 0% Sugar-Free) and Ice Level (Regular, Less Ice, No Ice, or Warm). It\'s not a generic drink poured from a pitcher; it\'s tailored on the spot like a chemist\'s formulation.',
    iconName: 'Utensils',
    moments: [
      'Locals almost universally ordering "Micro Sugar" (微糖, 30%) with roasted Alishan high-mountain oolong, so the subtle floral tea aroma isn\'t overwhelmed by syrup.',
      'The hypnotic sound of the mechanical shaker arms vigorously blending the tea with ice, followed by the heat-sealer stamping the plastic lid with a soft hiss.',
      'Nationwide green incentive: pulling out your own reusable tumbler earns an immediate NT$5 discount on every drink.'
    ],
    personalReflection: 'It elevates everyday street drinks into an artisanal craft where everyone has their own finely tuned formula.',
    summary: 'Precision handcrafted tea ordering customized by exact percentage of sweetness and temperature of ice.',
    details: [
      'Five standard sweetness levels and four temperature/ice choices on every menu.',
      'Freshly brewed whole-leaf tea bases rather than instant powders or concentrates.',
      'Instant NT$5 discount at every shop when bringing your own reusable tumbler.'
    ],
    etiquetteTip: 'Try "Micro Sugar" (30%) and "Less Ice" for the ideal balance of tea fragrance and chewy boba texture.'
  },
  {
    id: 'obs-bu-haoyisi',
    category: 'civic',
    categoryLabel: 'Social Habits & Warmth',
    title: 'The Island\'s Magic Phrase: "Bù Hǎoyìsi"',
    chineseTitle: '不好意思的日常溫柔',
    imageUrl: '/taiwan/ximending.jpg',
    imageCaption: 'Bustling pedestrian streets where "Bù Hǎoyìsi" is exchanged with gentle head tilts to keep interactions serene.',
    story: 'If there is one phrase that defines the auditory landscape of Taiwan, it is "Bù Hǎoyìsi" (不好意思). I heard it dozens of times every single day—on crowded trains, at restaurant counters, in elevator doorways, and on street crossings. It is impossible to translate with a single English word because it simultaneously expresses "excuse me", "pardon me", "sorry to trouble you", and "thank you for your kindness".',
    iconName: 'Smile',
    moments: [
      'Commuters murmuring it softly with a gentle head nod as they slide past you to reach a train door.',
      'Waiters saying it before setting a plate down on your table, expressing respect for interrupting your conversation.',
      'How instantly it softens the social atmosphere: the moment someone says "Bù hǎoyìsi", any potential tension vanishes.'
    ],
    personalReflection: 'It embodies Taiwan\'s profound collective empathy. People are constantly, gently signaling that they are trying not to inconvenience anyone around them.',
    summary: 'The versatile cultural phrase expressing modesty, respect, consideration, and social warmth.',
    details: [
      'Used universally to excuse oneself, initiate a question, or acknowledge kindness.',
      'Accompanied by a gentle head nod that immediately dissolves interpersonal friction.',
      'Reflects an island culture deeply attentive to the comfort of others.'
    ],
    etiquetteTip: 'A soft "Bù hǎoyìsi" with a slight nod opens doors and elicits instant local smiles.'
  },
  {
    id: 'obs-trust-paradox',
    category: 'civic',
    categoryLabel: 'Social Habits & Warmth',
    title: 'The Trust Paradox: Laptops on Unattended Tables',
    chineseTitle: '令人安心的社會信任',
    imageUrl: '/taiwan/ximending-street-1.jpg',
    imageCaption: 'Lively, secure open cafe streets where belongings are left untouched while owners step away.',
    story: 'While sitting in a busy coffee shop near Ximending, I watched a college student get up, leave her MacBook, smartphone, and leather purse sitting in plain view on an open table, and walk away to the restroom for ten minutes. Nobody glanced twice, and nobody touched her things. Later, in food courts and night markets, I saw people leave phones and umbrella handles on empty tables to "chope" (reserve) their spot while ordering food.',
    iconName: 'ShieldCheck',
    moments: [
      'Walking through dimly lit alleys in Wanhua late at night with zero sense of threat, vigilance, or anxiety.',
      'Stories from expats of dropping transit cards or wallets on buses and finding them intact at the terminal lost-and-found station the next afternoon.',
      'High personal accountability: public trust is maintained because everyone feels ownership over the community space.'
    ],
    personalReflection: 'Experiencing a true high-trust society in person is deeply liberating. It reminds you how much mental energy we normally spend on defensive caution elsewhere.',
    summary: 'Extraordinary public safety where phones and laptops are routinely left unattended to hold cafe seats.',
    details: [
      'Consistently ranked among the top 3 safest places globally with minimal street crime.',
      'High return rates for lost wallets, phones, and transit cards handed into police.',
      'Solo travelers walking suburban alleyways at midnight with total peace of mind.'
    ],
    etiquetteTip: 'Enjoy the liberating community peace while maintaining ordinary sensible traveler awareness.'
  },
  {
    id: 'obs-qilou',
    category: 'convenience',
    categoryLabel: 'Urban Architecture',
    title: 'Qilou Colonnades: The Rainproof Sidewalk Architecture',
    chineseTitle: '避雨防曬的騎樓建築',
    imageUrl: '/taiwan/ximending-arcade.jpg',
    imageCaption: 'The continuous sheltered Qilou colonnade sidewalks allowing dry walking under monsoon showers.',
    story: 'During an afternoon walk through Old Taipei, the skies suddenly opened up with a torrential subtropical downpour. To my surprise, hardly anyone stopped to open an umbrella. Everyone simply stepped under the "Qilou" (騎樓)—the continuous covered colonnade sidewalks carved into the ground floor of street buildings—and kept walking smoothly along the block without getting a drop of rain on their shoulders.',
    iconName: 'Umbrella',
    moments: [
      'Scooters parked in neat parallel rows just outside the pillar lines, leaving the covered walkway clear for pedestrians.',
      'Small noodle stalls, steaming soup pots, and fruit vendors operating comfortably under the dry stone eaves.',
      'In summer, the same colonnades provide deep shade and shelter from the blazing tropical sun.'
    ],
    personalReflection: 'Architecture shaped entirely by geography and climate: simple, practical urban design that turns stormy weather from a nuisance into a cozy street walk.',
    summary: 'Continuous recessed sidewalk arcades providing shelter from torrential rains and subtropical summer sun.',
    details: [
      'Overhanging second stories forming continuous sheltered colonnades along entire blocks.',
      'Sidewalks staying dry and walkable during heavy monsoon rain squalls.',
      'Vibrant evening social arteries lined with tea shops and parked motor scooters.'
    ],
    etiquetteTip: 'When sudden afternoon squalls strike, step under the nearest Qilou arcade to walk dry.'
  },
  {
    id: 'obs-receipt-lottery',
    category: 'convenience',
    categoryLabel: 'Everyday Convenience',
    title: 'The Receipt Jackpot: Turning Taxes into Nationwide Fun',
    chineseTitle: '發票對獎：全民的對獎樂趣',
    imageUrl: '/taiwan/receipt-lottery.jpg',
    imageCaption: 'Uniform Invoice receipts with bold 8-digit government lottery numbers alongside charity donation drop-boxes.',
    story: 'After buying a bottle of cold green tea at a family grocery, the cashier handed me a paper receipt with a bold 8-digit number printed prominently across the top. A local friend laughed and told me not to toss it: every store receipt in Taiwan doubles as a ticket in the government\'s bi-monthly Uniform Invoice Lottery, with cash jackpots reaching up to NT$10,000,000 (~$310,000 USD).',
    iconName: 'Receipt',
    moments: [
      'Clear acrylic donation boxes sitting by cash registers everywhere where customers happily drop their receipts so charities can claim the winnings.',
      'The 25th of every odd month: people gathering with stacks of accumulated receipts or scanning them with smartphone apps to see if they won NT$200, NT$40,000, or the grand prize.',
      'Created back in 1951 to incentivize customers to demand official receipts, curbing tax evasion by turning tax compliance into a nationwide game.'
    ],
    personalReflection: 'A stroke of sheer behavioral-design genius: transforming what is normally discarded paper trash into a nationwide thrill and an engine for charity donations.',
    summary: 'Official government sales receipts doubling as bi-monthly lottery tickets with prizes up to NT$10,000,000.',
    details: [
      'Bi-monthly televised drawings on the 25th of every odd month.',
      'Clear acrylic receipt drop-boxes at store exits funding local charitable foundations.',
      'Brilliant behavioral economics incentivizing customer tax invoice compliance.'
    ],
    etiquetteTip: 'Tourists can also win! Check numbers via the Taiwan Receipt Lottery app or donate them at cash register boxes.'
  }
];

export const TAIWAN_FACTS = TAIWAN_OBSERVATIONS;


