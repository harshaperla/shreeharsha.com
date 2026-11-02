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
  }
];

export interface TaiwanFact {
  id: string;
  category: 'transit' | 'convenience' | 'food' | 'civic';
  categoryLabel: string;
  title: string;
  chineseTitle?: string;
  summary: string;
  iconName: 'Train' | 'Store' | 'Utensils' | 'Music' | 'ShieldCheck' | 'Umbrella' | 'Smile' | 'Receipt';
  details: string[];
  etiquetteTip: string;
}

export const TAIWAN_FACTS: TaiwanFact[] = [
  {
    id: 'fact-escalator',
    category: 'transit',
    categoryLabel: 'MRT & Transit Etiquette',
    title: 'Escalator Rule: Stand on the Right, Walk on the Left',
    chineseTitle: '電梯靠右站立',
    summary: 'Across all metro and railway stations, commuters stand strictly on the right side of escalators, keeping the left lane open for walkers.',
    iconName: 'Train',
    details: [
      'Even during packed morning and evening rush hours, single-file lines naturally form at the base of every escalator with total civil courtesy.',
      'While transit authorities officially promote standing on both sides for passenger throughput, the etiquette is so deeply ingrained in Taiwanese civic muscle memory that locals intuitively maintain the custom.',
      'Standing stationary on the left side during a rush will quickly earn you a gentle, polite "不好意思" (Bù hǎoyìsi) or light tap on the shoulder.'
    ],
    etiquetteTip: 'Always step onto the right side immediately. If carrying luggage or a backpack, keep it directly in front of you on the same step to leave the left side clear.'
  },
  {
    id: 'fact-yellow-line',
    category: 'transit',
    categoryLabel: 'MRT & Transit Etiquette',
    title: 'The Yellow Line: Zero Food, Drinks, or Chewing Gum',
    chineseTitle: '捷運黃線禁食區',
    summary: 'The moment your foot crosses the bright yellow line at any MRT station, eating, drinking water, and chewing gum are strictly prohibited by law.',
    iconName: 'Train',
    details: [
      'Violations are enforced with strict fines ranging from NT$1,500 to NT$7,500 (~$50 to $250 USD).',
      'This uncompromising rule is why Taipei MRT is celebrated internationally as one of the cleanest, safest, and most odorless subway networks in the world—no sticky floors, no spilled cups, and no pests.',
      'Even taking a quick sip of plain water or holding an open bubble tea cup can prompt friendly reminders from station staff or fellow riders.'
    ],
    etiquetteTip: 'Finish or pack away all snacks, water bottles, and boba cups deep into your bag before tapping your EasyCard through the turnstile gates.'
  },
  {
    id: 'fact-convenience',
    category: 'convenience',
    categoryLabel: 'Everyday Convenience',
    title: '7-Eleven & FamilyMart: The Ultimate Life Support Hubs',
    chineseTitle: '便利商店萬能生活圈',
    summary: 'With over 13,000 stores island-wide, Taiwan has one of the world’s highest densities of 24/7 convenience stores that do far more than sell snacks.',
    iconName: 'Store',
    details: [
      'A single store allows you to pay utility bills and taxes, pick up and ship e-commerce parcels, call a taxi, print documents from your smartphone, buy high-speed rail tickets, and recharge transit cards.',
      'Every store features sit-down dining counters, clean restrooms, simmering cauldrons of herbal tea eggs (茶葉蛋), hot roasted sweet potatoes, and fresh oden broth.',
      'Open 24/7/365 in every neighborhood, they serve as brightly illuminated safe havens and essential social infrastructure.'
    ],
    etiquetteTip: 'Do not throw away your receipts! Every Taiwanese receipt is an official government lottery ticket with cash prizes up to NT$10M (see Invoice Lottery).'
  },
  {
    id: 'fact-garbage-trucks',
    category: 'civic',
    categoryLabel: 'Civic Culture & Ecology',
    title: 'The Musical Garbage Trucks & Zero-Waste Civic Ritual',
    chineseTitle: '音樂垃圾車與資源回收',
    summary: 'There are virtually no public street trash cans in Taiwan, yet cities are exceptionally clean thanks to a daily musical recycling ritual.',
    iconName: 'Music',
    details: [
      'To prevent littering and vermin, street bins were phased out. Citizens carry their personal trash home or discard small items at convenience store sorting stations.',
      'Twice daily, bright yellow collection trucks play Beethoven’s "Für Elise" or Tekla Bądarzewska’s "Maiden’s Prayer" through loudspeakers as they drive through neighborhoods.',
      'When the classical music chimes, whole apartment blocks spill out onto sidewalks holding color-coded official waste bags, compost pails, and recyclables to chat with neighbors.'
    ],
    etiquetteTip: 'Keep a small plastic bag in your daypack to hold fruit peels or tissue until you return to your hotel or find a convenience store recycling bin.'
  },
  {
    id: 'fact-easycard',
    category: 'convenience',
    categoryLabel: 'Everyday Convenience',
    title: 'The Universal EasyCard (悠遊卡 - Yōuyóu Kǎ)',
    chineseTitle: '一卡在手的悠遊生活',
    summary: 'A single contactless RFID smart card that effortlessly unifies Taiwan’s entire transit, bike-share, and retail payment ecosystems.',
    iconName: 'Receipt',
    details: [
      'Accepted across Taipei & Kaohsiung MRT, TRA regional railways, THSR bullet trains (non-reserved cars), metropolitan city buses, and coastal ferries.',
      'Seamlessly unlocks YouBike street bicycles, pays for parking garages, taxis, vending machines, zoo entries, and purchases at supermarkets and night market stalls.',
      'You can find creative novelty EasyCards shaped like miniature bubble tea cups, instant noodle bowls, and lucky amulets that beep at the gates.'
    ],
    etiquetteTip: 'Keep at least NT$200 loaded on your card. Tapping between the MRT and city buses within one hour yields automatic transit transfer discounts.'
  },
  {
    id: 'fact-boba-culture',
    category: 'food',
    categoryLabel: 'Food & Night Market Culture',
    title: 'Boba Customization: Precision Handcrafted Tea Rituals',
    chineseTitle: '手搖飲客製化哲學',
    summary: 'Invented in Taiwan in the 1980s, ordering fresh made-to-order tea is an exact, highly personalized cultural science.',
    iconName: 'Utensils',
    details: [
      'Every order is customized across Sweetness (甜度): Regular 100%, Less 70%, Half 50%, Micro 30%, or Sugar-Free 0%; and Ice Level (冰塊): Regular, Less Ice, No Ice, Room Temp, or Hot.',
      'Toppings span far beyond tapioca pearls: grass jelly (仙草), coconut nata de coco, egg pudding, taro balls, and salted cheese foam.',
      'Under nationwide environmental policy, bringing your own reusable cup earns an instant NT$5 discount at every beverage stand.'
    ],
    etiquetteTip: 'If you prefer natural tea aroma without excessive sweetness, "Half Sugar" (半糖, 50%) or "Micro Sugar" (微糖, 30%) is the local sweet spot.'
  },
  {
    id: 'fact-bu-haoyisi',
    category: 'civic',
    categoryLabel: 'Civic Culture & Etiquette',
    title: 'The Magic Phrase: "Bù Hǎoyìsi" (不好意思)',
    chineseTitle: '台灣的社交潤滑劑：不好意思',
    summary: 'The most commonly spoken phrase on the island, expressing modesty, respect, consideration, and social harmony.',
    iconName: 'Smile',
    details: [
      'It translates simultaneously as "excuse me", "pardon me", "sorry to bother you", and "thank you for your trouble".',
      'Locals use it to step through a crowded train door, flag down a restaurant server, apologize for a minor inconvenience, or acknowledge a kind gesture.',
      'It embodies Taiwan’s soft-spoken empathy and collective desire to put others at ease.'
    ],
    etiquetteTip: 'Using "Bù hǎoyìsi" paired with a slight head nod will instantly dissolve any awkward social barrier and elicit warm local smiles.'
  },
  {
    id: 'fact-safety-trust',
    category: 'civic',
    categoryLabel: 'Civic Culture & Etiquette',
    title: 'The Trust Paradox: Table "Chope" Culture & Public Safety',
    chineseTitle: '令人安心的社會信任',
    summary: 'Taiwan consistently ranks among the top 3 safest societies globally, fostering an extraordinary level of everyday trust.',
    iconName: 'ShieldCheck',
    details: [
      'In crowded cafes and night market food courts, patrons routinely leave smartphones, wallets, or laptops unattended on tables to reserve a seat while ordering.',
      'Lost items—including phones, bags, and transit cards containing hundreds of dollars—turned into police or metro lost-and-found stations are returned intact over 90% of the time.',
      'Solo travelers, particularly women, frequently note the reassuring feeling of safety walking through quiet suburban alleyways late at night.'
    ],
    etiquetteTip: 'While standard situational awareness is always prudent, you will immediately feel the liberating sense of community peace in public spaces.'
  },
  {
    id: 'fact-qilou',
    category: 'convenience',
    categoryLabel: 'Urban Design & Weather',
    title: 'Qilou: The Recessed Covered Sidewalk Arcades',
    chineseTitle: '避雨防曬的騎樓建築',
    summary: 'Urban architecture featuring continuous covered colonnade walkways built into the ground floor of street buildings.',
    iconName: 'Umbrella',
    details: [
      'Designed specifically for Taiwan’s subtropical monsoon climate: sudden torrential downpours and blazing summer heat.',
      'Allows pedestrians to traverse entire neighborhoods without opening an umbrella or getting drenched by passing rain squalls.',
      'At night, these covered arcades become sheltered social arteries lined with noodle stalls, fruit vendors, and parked motor scooters.'
    ],
    etiquetteTip: 'When sudden afternoon rain strikes, simply duck into the nearest Qilou covered walkway and continue walking smoothly along the block.'
  },
  {
    id: 'fact-receipt-lottery',
    category: 'convenience',
    categoryLabel: 'Everyday Convenience',
    title: 'The Uniform Invoice Lottery: Cash Prizes on Every Receipt',
    chineseTitle: '發票對獎：全民對獎樂趣',
    summary: 'Every official sales receipt issued in Taiwan doubles as a government lottery ticket with bi-monthly prizes up to NT$10,000,000.',
    iconName: 'Receipt',
    details: [
      'Introduced in 1951 to encourage businesses to declare revenues and incentivize customers to demand official tax receipts.',
      'Drawings take place on the 25th of every odd-numbered month (January, March, May, etc.) on live television.',
      'Clear acrylic donation boxes sit next to cash registers everywhere so customers can donate their receipts directly to local charities.'
    ],
    etiquetteTip: 'Tourists can also win! Check your receipt numbers using the Taiwan Lottery app; prizes can be redeemed at banks and convenience stores.'
  }
];

