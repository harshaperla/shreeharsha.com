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
      id: 'hl-qingyun',
      type: 'photo',
      title: 'Jiufen Qingyun Temple: Multi-Tiered Mountain Sanctuary Over The Sea',
      subtitle: 'Majestic Taoist shrine with golden Taiji sanctuary commanding panoramic Pacific coastlines',
      location: 'Ruifang District, New Taipei',
      badge: 'DAY 2 • COASTAL MOUNTAIN TEMPLE',
      imageUrl: '/taiwan/curated/day2_02_jiufen_qingyun_temple_photo_42.jpg',
      placeId: 'jiufen-qingyun-temple',
    },
  {
      id: 'hl-badouzi',
      type: 'photo',
      title: 'Badouzi Coastal Trail: Wangyou Valley & Keelung Islet Vistas',
      subtitle: 'Lush seaside boardwalk winding along cliff edges directly overlooking the deep Pacific Ocean',
      location: 'Zhongzheng District, Keelung City',
      badge: 'DAY 2 • PACIFIC COASTAL TRAIL',
      imageUrl: '/taiwan/curated/day2_03_badouzi_coastal_trail_photo_05.jpg',
      placeId: 'badouzi-trail',
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
      imageUrl: '/taiwan/curated/day2_01_jiufen_old_street_photo_09.jpg',
      placeId: 'jiufen-old-street',
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
  {
    id: 'hl-thsr',
    type: 'video',
    title: 'Taiwan High Speed Rail: 300 km/h Bullet Train to Kaohsiung',
    subtitle: 'Sleek aerodynamic 700T bullet train racing across Taiwan in 90 minutes with zero vibration',
    location: 'Taipei to Kaohsiung Corridor',
    badge: 'DAY 4 • BULLET TRAIN TRANSIT',
    imageUrl: '/taiwan/thsr-speedometer-300kmh.jpg',
    videoDuration: '0:05',
    placeId: 'thsr-bullet-train',
  },
  {
    id: 'hl-foguangshan',
    type: 'photo',
    title: 'Fo Guang Shan Buddha Museum: 108m Bronze Colossus & Eight Pagodas',
    subtitle: 'Monumental seated Buddha presiding over the symmetrical Great Pathway and sacred monastic halls',
    location: 'Dashu District, Kaohsiung',
    badge: 'DAY 4 • SACRED BUDDHIST MONUMENT',
    imageUrl: '/taiwan/curated/day4_01_fo_guang_shan_photo_04.jpg',
    placeId: 'fo-guang-shan',
  },
  {
    id: 'hl-pier2',
    type: 'photo',
    title: 'Pier-2 Art Center: Sugar Warehouses, Giant Statues & Waterfront Light Rail',
    subtitle: 'Sprawling creative hub revitalizing Kaohsiung harbor with industrial sculptures and modern street art',
    location: 'Yancheng District, Kaohsiung',
    badge: 'DAY 4 • CREATIVE HARBOR DISTRICT',
    imageUrl: '/taiwan/pier2-art-center.jpg',
    placeId: 'pier2-art-center',
  },
  {
    id: 'hl-cijin',
    type: 'photo',
    title: 'Cijin Island: Coastal Fortress & Taiwan Strait Sunset',
    subtitle: 'Barrier island reachable by scenic harbor ferry boasting Qing-era Cihou Fort cliff viewpoints',
    location: 'Cijin District, Kaohsiung',
    badge: 'DAY 4 • COASTAL ISLAND & FORTRESS',
    imageUrl: '/taiwan/cijin-island-ferry.jpg',
    placeId: 'cijin-island',
  },
  {
    id: 'hl-alishan-station',
    type: 'photo',
    title: 'Alishan Forest Railway: Century-Old Timber Rail & Mountain Station',
    subtitle: 'Historic narrow-gauge alpine timber line and curved wooden station floating 2,216m above sea level',
    location: 'Alishan Township, Chiayi County',
    badge: 'DAY 5 • ALPINE TIMBER RAILWAY',
    imageUrl: '/taiwan/alishan-mountain-station.jpg',
    placeId: 'alishan-forest-railway',
  },
  {
    id: 'hl-alishan-giant-trees',
    type: 'video',
    title: 'Alishan Giant Tree Plank Trail: 2,000-Year Sacred Cypress Woods',
    subtitle: 'Boardwalk through primeval alpine forests shrouded in mountain mist and colossal ancient trees',
    location: 'Alishan National Scenic Area, Chiayi',
    badge: 'DAY 5 • SACRED CYPRESS FOREST',
    imageUrl: '/taiwan/alishan-sacred-giant-trees.jpg',
    videoDuration: '0:07',
    placeId: 'alishan-giant-trees',
  },
  {
    id: 'hl-xiaoyoukeng',
    type: 'photo',
    title: 'Xiaoyoukeng Geothermal Fumaroles: Sulfur Crystals & Volcanic Vents',
    subtitle: 'Active post-volcanic crater on Mount Qixing venting roaring steam and crystalline sulfur deposits',
    location: 'Yangmingshan National Park, Taipei',
    badge: 'DAY 6 • ACTIVE VOLCANIC FUMAROLES',
    imageUrl: '/taiwan/xiaoyoukeng-sulfur-fumaroles.jpg',
    placeId: 'xiaoyoukeng-fumaroles',
  },
  {
    id: 'hl-qingtiangang',
    type: 'video',
    title: 'Qingtiangang Grassland: Lava Plateau Meadows & Water Buffaloes',
    subtitle: 'Rolling highland volcanic pastures grazed by wild water buffaloes wrapped in mountain fog',
    location: 'Yangmingshan National Park, Taipei',
    badge: 'DAY 6 • VOLCANIC LAVA PLATEAU',
    imageUrl: '/taiwan/qingtiangang-highland-meadows.jpg',
    videoDuration: '0:06',
    placeId: 'qingtiangang-grassland',
  },
  {
    id: 'hl-beitou-thermal',
    type: 'photo',
    title: 'Xinbeitou Thermal Valley: Emerald Jade Sulfur Lake in Steaming Mist',
    subtitle: 'Enigmatic 90°C green sulfur lake perpetually cloaked in ethereal thermal steam plumes',
    location: 'Beitou District, Taipei City',
    badge: 'DAY 7 • EMERALD GEOTHERMAL LAKE',
    imageUrl: '/taiwan/beitou-thermal-valley-lake.jpg',
    placeId: 'beitou-thermal-valley',
  },
  {
    id: 'hl-beitou-sulfur',
    type: 'video',
    title: 'Beitou Sulfur Valley: Volcanic Caldera & Billowing Steam Vents',
    subtitle: 'Dramatic amphitheater of bubbling thermal springs and steaming sulfur vents with wooden walkways',
    location: 'Beitou District, Taipei City',
    badge: 'DAY 7 • VOLCANIC CALDERA BASIN',
    imageUrl: '/taiwan/beitou-sulfur-valley-geothermal.jpg',
    videoDuration: '0:03',
    placeId: 'beitou-sulfur-valley',
  },
  {
    id: 'hl-shilin-night-market',
    type: 'video',
    title: 'Shilin Night Market: Taipei’s Grandest Food Labyrinth & Carnival Arcades',
    subtitle: 'Bustling night market alleys packed with hot star chicken, flame beef cubes, and retro carnival arcades',
    location: 'Shilin District, Taipei City',
    badge: 'DAY 7 • PREMIER NIGHT BAZAAR',
    imageUrl: '/taiwan/shilin-night-market-arcade.jpg',
    videoDuration: '0:06',
    placeId: 'shilin-night-market',
  }
];

export const TAIWAN_PLACES: TaiwanPlace[] = [
  {
      id: 'jiufen-qingyun-temple',
      name: 'Jiufen Qingyun Temple',
      chineseName: '九份青雲殿 (神農大帝廟)',
      category: 'heritage',
      categoryLabel: 'Temple & Coastal Vistas',
      thumbnail: '/taiwan/curated/day2_02_jiufen_qingyun_temple_photo_42.jpg',
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
          id: 'cur-qy-42',
          type: 'photo',
          url: '/taiwan/curated/day2_02_jiufen_qingyun_temple_photo_42.jpg',
          title: "Jiufen Qingyun Temple Grand Sanctuary Over the Sea",
          caption: "Multi-tiered Taoist mountain sanctuary commanding sweeping, unobstructed vistas over the Pacific coast."
        },
        {
          id: 'cur-qy-04',
          type: 'photo',
          url: '/taiwan/curated/day2_02_jiufen_qingyun_temple_photo_04.jpg',
          title: "Golden Taiji Dragon Pillars & Carvings",
          caption: "Exquisitely sculpted stone dragon pillars framing the entrance to the main temple pavilion."
        },
        {
          id: 'cur-qy-09',
          type: 'photo',
          url: '/taiwan/curated/day2_02_jiufen_qingyun_temple_photo_09.jpg',
          title: "Temple Roof Ridge & Flying Dragons",
          caption: "Vibrant ceramic mosaic (Jiannian) ornamentation with mythical dragons guarding the temple gables."
        },
        {
          id: 'cur-qy-13',
          type: 'photo',
          url: '/taiwan/curated/day2_02_jiufen_qingyun_temple_photo_13.jpg',
          title: "Incense Burner & Sacred Altar Hall",
          caption: "Centuries of devotion visible in the ornate bronze censers and gold-gilded Taoist deities."
        },
        {
          id: 'cur-qy-23',
          type: 'photo',
          url: '/taiwan/curated/day2_02_jiufen_qingyun_temple_photo_23.jpg',
          title: "Temple Terrace Mountain & Bay Panorama",
          caption: "Breathtaking coastal lookout from the upper courtyard overlooking Ruifang and the northern coastline."
        },
        {
          id: 'cur-qy-26',
          type: 'photo',
          url: '/taiwan/curated/day2_02_jiufen_qingyun_temple_photo_26.jpg',
          title: "Traditional Stone Lions & Guardian Sculptures",
          caption: "Hand-carved green granite guardian lions watching over the sacred stone stairway."
        },
        {
          id: 'cur-qy-30',
          type: 'photo',
          url: '/taiwan/curated/day2_02_jiufen_qingyun_temple_photo_30.jpg',
          title: "Sacred Courtyard & Coastal Breeze",
          caption: "Peaceful mountain breezes carrying incense smoke across the scenic temple verandas."
        },
        {
          id: 'cur-qy-31',
          type: 'photo',
          url: '/taiwan/curated/day2_02_jiufen_qingyun_temple_photo_31.jpg',
          title: "Intricate Ceiling Octagon & Caisson Dome",
          caption: "Master craftsmanship displayed in the complex wooden bracket interlocking ceiling."
        },
        {
          id: 'cur-qy-33',
          type: 'photo',
          url: '/taiwan/curated/day2_02_jiufen_qingyun_temple_photo_33.jpg',
          title: "Sacred Deities & Golden Lanterns",
          caption: "Glow of hanging red prayer lanterns illuminating the revered temple sanctum."
        },
        {
          id: 'cur-qy-43',
          type: 'photo',
          url: '/taiwan/curated/day2_02_jiufen_qingyun_temple_photo_43.jpg',
          title: "Upper Tier Observation Deck",
          caption: "Panoramic perspective showing the tiered temple roof lines against the Pacific Ocean horizon."
        },
        {
          id: 'cur-qy-44',
          type: 'photo',
          url: '/taiwan/curated/day2_02_jiufen_qingyun_temple_photo_44.jpg',
          title: "Mountain Mist Over Ocean Cliffs",
          caption: "Dramatic afternoon cloud shadows rolling across the coastal ridges behind the temple."
        },
        {
          id: 'cur-qy-47',
          type: 'photo',
          url: '/taiwan/curated/day2_02_jiufen_qingyun_temple_photo_47.jpg',
          title: "Temple Archway & Stone Inscriptions",
          caption: "Engraved couplets honoring heaven and earth overlooking the emerald valleys."
        },
        {
          id: 'cur-qy-48',
          type: 'photo',
          url: '/taiwan/curated/day2_02_jiufen_qingyun_temple_photo_48.jpg',
          title: "Jiannian Mosaic Artistry",
          caption: "Close-up of the delicate porcelain cutting and pasting technique adorning temple roof eaves."
        },
        {
          id: 'cur-qy-50',
          type: 'photo',
          url: '/taiwan/curated/day2_02_jiufen_qingyun_temple_photo_50.jpg',
          title: "Mountain Highway Winding Below",
          caption: "Serpentine curves of the Ruifang coastal highway visible from the temple ramparts."
        },
        {
          id: 'cur-qy-52',
          type: 'photo',
          url: '/taiwan/curated/day2_02_jiufen_qingyun_temple_photo_52.jpg',
          title: "Qingyun Sanctuary Bell & Drum Towers",
          caption: "Symmetrical belfry towers standing tall against the coastal sky."
        },
        {
          id: 'cur-qy-55',
          type: 'photo',
          url: '/taiwan/curated/day2_02_jiufen_qingyun_temple_photo_55.jpg',
          title: "Quiet Mountain Refuge Atmosphere",
          caption: "Serene spiritual atmosphere away from the crowded tourist streets of central Jiufen."
        },
        {
          id: 'cur-qy-57',
          type: 'photo',
          url: '/taiwan/curated/day2_02_jiufen_qingyun_temple_photo_57.jpg',
          title: "Farewell Vista of Coastal Ruifang",
          caption: "Golden hour light illuminating the sacred rooftops and the distant ocean headlands."
        },
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
      thumbnail: '/taiwan/curated/day2_03_badouzi_coastal_trail_photo_05.jpg',
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
          id: 'cur-bd-05',
          type: 'photo',
          url: '/taiwan/curated/day2_03_badouzi_coastal_trail_photo_05.jpg',
          title: "Wangyou Valley Seaside Boardwalk & Emerald Slopes",
          caption: "Wooden pathway meandering between lush green coastal hills and the azure Pacific Ocean."
        },
        {
          id: 'cur-bd-36',
          type: 'photo',
          url: '/taiwan/curated/day2_03_badouzi_coastal_trail_photo_36.jpg',
          title: "Keelung Islet Horizon View",
          caption: "Volcanic Keelung Islet rising majestically out of the sea on the northern horizon."
        },
        {
          id: 'cur-bd-45',
          type: 'photo',
          url: '/taiwan/curated/day2_03_badouzi_coastal_trail_photo_45.jpg',
          title: "Rocky Shoreline & Sea Erosion Terraces",
          caption: "Centuries of wave action carving intricate patterns into the sedimentary coastal rocks."
        },
        {
          id: 'cur-bd-47',
          type: 'photo',
          url: '/taiwan/curated/day2_03_badouzi_coastal_trail_photo_47.jpg',
          title: "Coastal Ridge Hiking Trail",
          caption: "Stairs climbing along the ridgeline offering 360-degree views of sea and sky."
        },
        {
          id: 'cur-bd-49',
          type: 'photo',
          url: '/taiwan/curated/day2_03_badouzi_coastal_trail_photo_49.jpg',
          title: "Wangyou Valley Grassy Basin",
          caption: "The famous 'Valley of Forgetting Sorrows' nestled peacefully between steep coastal hills."
        },
        {
          id: 'cur-bd-51',
          type: 'photo',
          url: '/taiwan/curated/day2_03_badouzi_coastal_trail_photo_51.jpg',
          title: "Pacific Waves Crashing on Reefs",
          caption: "Crisp sea spray and white foam breaking over coastal reefs beneath the trail."
        },
        {
          id: 'cur-bd-55',
          type: 'photo',
          url: '/taiwan/curated/day2_03_badouzi_coastal_trail_photo_55.jpg',
          title: "Hilltop Viewing Gazebo & Promenade",
          caption: "Rest pavilion overlooking fishing boats and open ocean waters."
        },
        {
          id: 'cur-bd-57',
          type: 'photo',
          url: '/taiwan/curated/day2_03_badouzi_coastal_trail_photo_57.jpg',
          title: "Coastal Flora & Mountain Wildflowers",
          caption: "Hardy maritime shrubs and grasses thriving in the saline Pacific breeze."
        },
        {
          id: 'cur-bd-58',
          type: 'photo',
          url: '/taiwan/curated/day2_03_badouzi_coastal_trail_photo_58.jpg',
          title: "Sunset Glow over Badouzi Coastline",
          caption: "Warm golden rays bathing the coastal cliffs and ocean as dusk settles over Keelung."
        },
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
          id: 'cur-t101-06',
          type: 'photo',
          url: '/taiwan/curated/day3_02_taipei_101_exterior_photo_06.jpg',
          title: "Taipei 101 Bamboo Pagoda Silhouette",
          caption: "Iconic upward view of the 508-meter megatall engineering marvel rising above Xinyi District."
        },
        {
          id: 'cur-t101-v02',
          type: 'video',
          url: '/taiwan/curated/day3_02_taipei_101_exterior_video_02.mp4',
          duration: '0:06',
          thumbnailUrl: '/taiwan/curated/day3_02_taipei_101_exterior_photo_06.jpg',
          title: "Taipei 101 Tower & Skyline Motion",
          caption: "Video perspective of the tower's soaring segmented architecture and plaza energy."
        },
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
  {
      id: 'jiufen-old-street',
      name: 'Jiufen Old Street & A-Mei Teahouse',
      chineseName: '九份老街與阿妹茶樓',
      category: 'heritage',
      categoryLabel: 'Mountain Village & Heritage',
      thumbnail: '/taiwan/curated/day2_01_jiufen_old_street_photo_09.jpg',
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
          id: 'cur-jf-09',
          type: 'photo',
          url: '/taiwan/curated/day2_01_jiufen_old_street_photo_09.jpg',
          title: "Jiufen Mountain Terrace & Coastal Vista",
          caption: "Featured Cover: Panoramic hilltop vista from Jiufen Old Street commanding panoramic views over the verdant mountains and deep blue Pacific Ocean."
        },
        {
          id: 'cur-jf-01',
          type: 'photo',
          url: '/taiwan/curated/day2_01_jiufen_old_street_photo_01.jpg',
          title: "Traditional Peanut Ice Cream Roll (\u82b1\u751f\u6372\u51b0\u6dc7\u6dcb)",
          caption: "Freshly shaved peanut brittle, sweet creamy ice cream, and fresh cilantro wrapped in a delicate handmade spring roll wrapper on Jiufen Old Street."
        },
        {
          id: 'cur-jf-13',
          type: 'photo',
          url: '/taiwan/curated/day2_01_jiufen_old_street_photo_13.jpg',
          title: "Jiufen Historic Hillside Alleys",
          caption: "Atmospheric stone pathways winding through traditional tea shops, souvenir stalls, and hillside timber architecture."
        },
        {
          id: 'cur-jf-14',
          type: 'photo',
          url: '/taiwan/curated/day2_01_jiufen_old_street_photo_14.jpg',
          title: "Jishan Street Market Stalls",
          caption: "Bustling covered market alley filled with local street food specialties, handmade taro balls, and fragrant Taiwanese teas."
        },
        {
          id: 'cur-jf-15',
          type: 'photo',
          url: '/taiwan/curated/day2_01_jiufen_old_street_photo_15.jpg',
          title: "Cascading Teahouses of Mt. Jilong",
          caption: "Multi-tiered wooden teahouses perched along the mountain slope with red lanterns and sea views."
        },
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
          id: 'cur-xy-02',
          type: 'photo',
          url: '/taiwan/curated/day3_06_xiangti_avenue_plaza_photo_02.jpg',
          title: "Xiangti Avenue Plaza Neon Atmosphere",
          caption: "Vibrant pedestrian plaza connecting Mitsukoshi department stores with live street performances."
        },
        {
          id: 'cur-xy-03',
          type: 'photo',
          url: '/taiwan/curated/day3_06_xiangti_avenue_plaza_photo_03.jpg',
          title: "Tree-Lined Evening Promenade",
          caption: "Canopy of illuminated trees and glowing architectural facades in Taipei's premier shopping quarter."
        },
        {
          id: 'cur-xy-11',
          type: 'photo',
          url: '/taiwan/curated/day3_06_xiangti_avenue_plaza_photo_11.jpg',
          title: "Elevated Skybridge System",
          caption: "Modern covered walkway network allowing seamless transit between skyscrapers without touching street level."
        },
        {
          id: 'cur-xy-13',
          type: 'photo',
          url: '/taiwan/curated/day3_06_xiangti_avenue_plaza_photo_13.jpg',
          title: "Bustling Nightlife & Urban Energy",
          caption: "Cosmopolitan crowds enjoying open-air dining, artisan pop-ups, and contemporary architecture."
        },
        {
          id: 'cur-xy-v02',
          type: 'video',
          url: '/taiwan/curated/day3_05_xinyi_skybridge_district_video_02.mp4',
          duration: '0:07',
          thumbnailUrl: '/taiwan/curated/day3_06_xiangti_avenue_plaza_photo_02.jpg',
          title: "Xinyi Skybridge Evening Walk",
          caption: "Gliding through the elevated skywalk system with views of neon-lit boulevards below."
        },
        {
          id: 'cur-xy-v08',
          type: 'video',
          url: '/taiwan/curated/day3_05_xinyi_skybridge_district_video_08.mp4',
          duration: '0:08',
          thumbnailUrl: '/taiwan/curated/day3_06_xiangti_avenue_plaza_photo_03.jpg',
          title: "Night Lights of Commercial District",
          caption: "Vibrant urban motion and city lights radiating around Taipei 101 mall."
        },
        {
          id: 'cur-xy-v04',
          type: 'video',
          url: '/taiwan/curated/day3_06_xiangti_avenue_plaza_video_04.mp4',
          duration: '0:12',
          thumbnailUrl: '/taiwan/curated/day3_06_xiangti_avenue_plaza_photo_11.jpg',
          title: "Live Street Dance & Busking Energy",
          caption: "Dynamic youth dance performances and crowd cheers at Xiangti Avenue Plaza."
        },
        {
          id: 'cur-xy-v06',
          type: 'video',
          url: '/taiwan/curated/day3_06_xiangti_avenue_plaza_video_06.mp4',
          duration: '0:06',
          thumbnailUrl: '/taiwan/curated/day3_06_xiangti_avenue_plaza_photo_13.jpg',
          title: "Plaza Promenade Motion",
          caption: "Walking through the illuminated heart of Taipei's modern entertainment corridor."
        },
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
    },
  // ================= DAY 4 =================
  {
    id: 'thsr-bullet-train',
    name: 'Taiwan High-Speed Rail (THSR) 700T',
    chineseName: '台灣高鐵 (台北至左營)',
    category: 'transit',
    categoryLabel: 'High-Speed Rail Transit',
    thumbnail: '/taiwan/thsr-bullet-train-cabin.jpg',
    oneLiner: 'Sleek Japanese Shinkansen-derived 700T bullet train racing across Taiwan’s western plain at 300 km/h from Taipei to Kaohsiung in just 90 minutes.',
    tags: ['Day 4', 'Transit', 'THSR', 'Bullet Train', '300 km/h', 'Transit & Rail'],
    location: 'Taipei Main Station to Kaohsiung Zuoying Station',
    region: 'Western Taiwan Corridor',
    recommendedDuration: '1.5 - 2 hours',
    bestTime: 'Morning departures for full-day southern exploration',
    transitEase: 'Express (THSR / Train)',
    overview: [
      'The Taiwan High Speed Rail (THSR) revolutionized travel across the island. Covering 350 kilometers between Taipei in the north and Zuoying (Kaohsiung) in the south in as little as 90 minutes, it compresses an entire cross-country journey into a whisper-quiet, ultra-smooth glide.',
      'Modeled on Japan’s legendary Series 700 Shinkansen, the aerodynamic orange-and-white 700T trainsets cruise comfortably at 300 km/h past central Taiwan’s agricultural heartlands, tea farms, and subtropical mountain ridges.',
      'Onboard amenities include generous legroom, swivel airline-style seating, power outlets, silent carriages, and delicious THSR bento boxes (高鐵便當) sold by attendants pushing beverage carts through the aisles.'
    ],
    specialties: [
      {
        title: '300 km/h Cruising Speed',
        description: 'Digital in-cabin speedometer displays speeds hitting 298–300 km/h with virtually no vibration or sway.'
      },
      {
        title: 'THSR High-Speed Bento Boxes',
        description: 'Freshly prepared specialty lunchboxes featuring pork chops, roasted chicken, or vegetarian seasonal greens.'
      },
      {
        title: 'Punctuality & Engineering Perfection',
        description: 'Average delay per train across the system is under 15 seconds, setting a world benchmark for rail reliability.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Board directly at Taipei Main Station (B2 level THSR gates) or Nangang Station. Arrives at Zuoying Station in Kaohsiung.',
      busDetails: 'Direct transfers to Kaohsiung Red Line MRT and local tourist buses are right inside Zuoying Station.',
      bookingAndTickets: 'Tickets can be booked online via THSR T Express mobile app, 7-Eleven ibon kiosks, or ticket counters. Early bird discounts up to 35% off.',
      easyCardInfo: 'Co-branded credit card EasyCards with auto-reload can tap directly for non-reserved cars (Cars 10–12). Standard EasyCard requires buying a ticket first.',
      tips: [
        'Reserve seats on Express trains (train numbers 1xx or 2xx) which make only 2–3 stops and complete the trip in 94 minutes.',
        'Seats A and E are window seats with expansive countryside vistas.',
        'Zuoying Station has luggage lockers and luggage delivery services directly to hotels.'
      ]
    },
    gallery: [
      {
        id: 'thsr-m1',
        type: 'photo',
        url: '/taiwan/thsr-bullet-train-cabin.jpg',
        title: 'Comfortable 700T Bullet Train Cabin',
        caption: 'Clean, spacious interior seating with wide legroom and overhead luggage racks cruising smoothly.'
      },
      {
        id: 'thsr-m2',
        type: 'photo',
        url: '/taiwan/thsr-speedometer-300kmh.jpg',
        title: 'Digital Display Reaching 300 km/h',
        caption: 'The carriage speedometer confirming the 300 km/h cruising velocity through the central plains.'
      },
      {
        id: 'thsr-m3',
        type: 'photo',
        url: '/taiwan/thsr-station-platform.jpg',
        title: 'THSR 700T on the Station Platform',
        caption: 'Sleek aerodynamic nose of the 700T trainset ready for boarding at the subterranean platform.'
      },
      {
        id: 'thsr-v1',
        type: 'video',
        url: '/taiwan/thsr-high-speed-ride.mp4',
        title: 'High-Speed Rail 300 km/h Ride Video',
        caption: 'Gliding effortlessly past countryside scenery at full 300 km/h cruising speed.',
        duration: '0:05',
        thumbnailUrl: '/taiwan/thsr-high-speed-thumb.jpg'
      }
    ]
  },
  {
    id: 'fo-guang-shan',
    name: 'Fo Guang Shan Buddha Museum',
    chineseName: '佛光山佛陀紀念館',
    category: 'heritage',
    categoryLabel: 'Sacred Sanctuary & Colossal Buddha',
    thumbnail: '/taiwan/curated/day4_01_fo_guang_shan_photo_04.jpg',
    oneLiner: 'Monumental 108-meter seated bronze Buddha framed by eight soaring pagodas, Bodhi Square, and sacred Buddhist relics in Kaohsiung.',
    tags: ['Day 4', 'Kaohsiung', 'Buddhism', 'Bronze Buddha', 'Eight Pagodas', 'Historic & Temples'],
    location: 'Dashu District, Kaohsiung City',
    region: 'Southern Taiwan',
    recommendedDuration: '3 - 4 hours',
    bestTime: 'Morning or late afternoon for clear lighting over the Great Pathway',
    transitEase: 'Express (THSR / Train)',
    overview: [
      'Arriving at Fo Guang Shan Buddha Museum is an awe-inspiring sensory experience. The scale of the complex is breathtaking: an expansive central boulevard named the Great Pathway to Buddhahood stretches directly towards a monumental 108-meter bronze Buddha seated serenely against the southern Taiwanese sky.',
      'Flanking both sides of the central esplanade stand eight stately Chinese-style pagodas, each representing fundamental Buddhist concepts and housing educational galleries, traditional calligraphy tea houses, and tranquil contemplation chambers.',
      'Walking past Bodhi Square and entering the Main Pagoda beneath the giant Buddha reveals sacred galleries displaying Buddhist art treasures, ancient tooth relics, and serene multi-lingual prayer halls welcoming visitors from every corner of the world.'
    ],
    specialties: [
      {
        title: 'The 108-Meter Bronze Great Buddha',
        description: 'World’s tallest seated bronze Buddha statue, cast using over 1,800 tonnes of metal, radiating calm above the mountain horizon.'
      },
      {
        title: 'Eight Stately Pagodas & Great Pathway',
        description: 'Perfect symmetrical axial design creating stunning geometric perspectives framed by lush gardens and lotus ponds.'
      },
      {
        title: 'Buddhist Vegetarian Culinary Hall',
        description: 'Renowned organic vegetarian buffet and tea ceremony spaces serving refined local Taiwanese monastic dishes.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Take THSR to Zuoying Station (Kaohsiung). From Zuoying Station Exit 1/Bus Platform 2, board the direct E02 Harvard Express Bus (哈佛快線).',
      busDetails: 'The E02 Harvard Express bus takes approximately 35-45 minutes directly to Fo Guang Shan Buddha Museum main gate.',
      bookingAndTickets: 'EasyCard and iPASS accepted on both THSR station buses and city buses. Museum entry is completely free of charge.',
      easyCardInfo: 'Tap in and tap out on the E02 bus. Balance should be at least NT$100.',
      tips: [
        'Dress respectfully with covered shoulders and knees for temple halls.',
        'Allow at least 3 hours to stroll the grounds and visit the underground exhibits.',
        'Electric shuttles are available inside the grounds for visitors needing mobility assistance.'
      ]
    },
    gallery: [
        {
          id: 'cur-fgs-04',
          type: 'photo',
          url: '/taiwan/curated/day4_01_fo_guang_shan_photo_04.jpg',
          title: "Fo Guang Shan Great Pathway & Giant Bronze Buddha",
          caption: "Featured Cover: Symmetrical promenade flanked by eight monumental Chinese pagodas leading toward the 108m bronze Buddha statue."
        },
        {
          id: 'cur-fgs-13',
          type: 'photo',
          url: '/taiwan/curated/day4_01_fo_guang_shan_photo_13.jpg',
          title: "Eight Pagodas of Wisdom & Moral Teachings",
          caption: "Majestic multi-tiered pagodas representing the Eightfold Path of Buddhist philosophy."
        },
        {
          id: 'cur-fgs-19',
          type: 'photo',
          url: '/taiwan/curated/day4_01_fo_guang_shan_photo_19.jpg',
          title: "Bodhi Square & Ceremonial Promenade",
          caption: "Expansive stone plaza with statues of the 18 Arhats and classical monastic architecture."
        },
        {
          id: 'cur-fgs-26',
          type: 'photo',
          url: '/taiwan/curated/day4_01_fo_guang_shan_photo_26.jpg',
          title: "Main Shrine Stupas & Sacred Relic Halls",
          caption: "Grand ceremonial stupas standing at the foot of the monumental Buddha colossus."
        },
        {
          id: 'cur-fgs-v02',
          type: 'video',
          url: '/taiwan/curated/day4_01_fo_guang_shan_video_02.mp4',
          duration: '0:10',
          thumbnailUrl: '/taiwan/curated/day4_01_fo_guang_shan_photo_04.jpg',
          title: "Great Pathway Panoramic Walk",
          caption: "Video stroll through the serene monastic grounds under clear southern Taiwan skies."
        },
      {
        id: 'fgs-m1',
        type: 'photo',
        url: '/taiwan/foguangshan-buddha.jpg',
        title: 'The Great Seated Bronze Buddha',
        caption: 'Looking up at the 108m bronze seated Buddha presiding over the Bodhi Square under the southern sky.'
      },
      {
        id: 'fgs-m2',
        type: 'photo',
        url: '/taiwan/foguangshan-pagodas.jpg',
        title: 'Eight Symmetrical Pagodas Along the Axis',
        caption: 'The stately pagodas flanking the Great Pathway to Buddhahood in dramatic architectural symmetry.'
      },
      {
        id: 'fgs-m3',
        type: 'photo',
        url: '/taiwan/foguangshan-great-pathway.jpg',
        title: 'The Great Pathway to Buddhahood',
        caption: 'Walking down the grand open-air marble promenade leading towards the main sanctuary.'
      },
      {
        id: 'fgs-m4',
        type: 'photo',
        url: '/taiwan/foguangshan-bodhi-square.jpg',
        title: 'Bodhi Square & Arhat Statues',
        caption: 'Carved stone statues of the Eighteen Arhats lining the wide plaza with the main stupa behind.'
      },
      {
        id: 'fgs-m5',
        type: 'photo',
        url: '/taiwan/foguangshan-temple-architecture.jpg',
        title: 'Traditional Temple Roofs & Eaves',
        caption: 'Intricate golden glazed tile roofs and eaves reflecting classical Tang and Song monastic architecture.'
      }
    ]
  },
  {
    id: 'pier2-art-center',
    name: 'Pier-2 Art Center & Kaohsiung Harbor',
    chineseName: '駁二藝術特區與高雄港',
    category: 'landmark',
    categoryLabel: 'Harbor Arts & Creative District',
    thumbnail: '/taiwan/pier2-art-center.jpg',
    oneLiner: 'Vibrant revitalized sugar and harbor warehouses showcasing massive ironworker statues, vivid wall murals, and the modern waterfront light rail.',
    tags: ['Day 4', 'Kaohsiung', 'Pier-2', 'Street Art', 'Light Rail', 'Harbor', 'Landmark & Youth District'],
    location: 'Yancheng District, Kaohsiung City',
    region: 'Southern Taiwan',
    recommendedDuration: '2 - 3 hours',
    bestTime: 'Late afternoon through evening sunset',
    transitEase: 'Easy (Direct MRT)',
    overview: [
      'Pier-2 Art Center is Kaohsiung’s most triumphant urban revitalization project. Formerly abandoned 1970s harbor warehouses built to store sugar and maritime freight have been transformed into a sprawling seaside arts, design, and live performance sanctuary.',
      'The open-air grounds are alive with giant colorful industrial worker statues, whimsical iron sculptures, vibrant multi-story building murals, and the green lawn where the Kaohsiung Circular Light Rail glides silently past.',
      'Just steps away, the Great Harbor Bridge (Dagang Bridge) rotates horizontally across the water to let boats pass, offering sweeping views of the Kaohsiung Music Center and the sparkling modern skyline of Kaohsiung Port.'
    ],
    specialties: [
      {
        title: 'Industrial Worker & Fisherwoman Statues',
        description: 'Iconic fiberglass statues painted in hundreds of unique community and artist themes throughout the park.'
      },
      {
        title: 'Great Harbor Rotating Bridge',
        description: 'Asia’s longest rotating pedestrian swing bridge spanning 110 meters, swinging 90 degrees daily at 3 PM.'
      },
      {
        title: 'Kaohsiung Circular Light Rail',
        description: 'Sleek catenary-free green light rail gliding directly through the art park lawn and along the wharf.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Take Kaohsiung MRT Orange Line to Yanchengpu Station (O2) Exit 1 (5-minute walk), or take the Circular Light Rail directly to Dayi Pier-2 Station (C12) or Penglai Pier-2 Station (C13).',
      busDetails: 'Buses 0 South, 11, 33, 50, and 214 stop near the harbor warehouses.',
      bookingAndTickets: 'Free entry to all outdoor art installations and warehouses. Special contemporary art exhibits have separate low-cost admission.',
      easyCardInfo: 'EasyCard and iPASS are fully supported across the Kaohsiung MRT and Light Rail.',
      tips: [
        'Catch the Dagang Bridge rotation ceremony daily at 3:00 PM (and 7:00 PM on Fri/Sat/Sun).',
        'Rent a YouBike or ride the Light Rail along the waterfront towards the Kaohsiung Music Center.',
        'Evenings bring gentle sea breezes, live street buskers, and outdoor beer bars.'
      ]
    },
    gallery: [
        {
          id: 'cur-p2-06',
          type: 'photo',
          url: '/taiwan/curated/day4_02_pier2_art_center_photo_06.jpg',
          title: "Historic Sugar Warehouses & Modern Murals",
          caption: "Kaohsiung harbor warehouses transformed into creative workshops, design galleries, and craft boutiques."
        },
        {
          id: 'cur-p2-39',
          type: 'photo',
          url: '/taiwan/curated/day4_02_pier2_art_center_photo_39.jpg',
          title: "Industrial Sculptures & Harbor Waterfront",
          caption: "Iconic worker and fisherman giant statues overlooking the modern light rail tracks and harbor breeze."
        },
      {
        id: 'p2-m1',
        type: 'photo',
        url: '/taiwan/pier2-art-center.jpg',
        title: 'Pier-2 Warehouse District Entrance',
        caption: 'Historic red-brick sugar warehouses adorned with contemporary signage and outdoor sculptures.'
      },
      {
        id: 'p2-m2',
        type: 'photo',
        url: '/taiwan/pier2-warehouse-murals.jpg',
        title: 'Vibrant Multi-Story Murals',
        caption: 'Massive street art murals covering former maritime storage buildings with imaginative nautical motifs.'
      },
      {
        id: 'p2-m3',
        type: 'photo',
        url: '/taiwan/pier2-giant-sculptures.jpg',
        title: 'Giant Industrial Worker Sculpture',
        caption: 'Monumental stylized worker sculpture celebrating Kaohsiung’s deep industrial and dockworker heritage.'
      },
      {
        id: 'p2-m4',
        type: 'photo',
        url: '/taiwan/kaohsiung-harbor-lightrail.jpg',
        title: 'Light Rail Gliding by Kaohsiung Harbor',
        caption: 'The Kaohsiung Circular Light Rail traveling silently across the lush lawn tracks fronting the harbor.'
      }
    ]
  },
  {
    id: 'cijin-island',
    name: 'Cijin Island & Cihou Fort',
    chineseName: '旗津島與旗後砲台',
    category: 'nature',
    categoryLabel: 'Coastal Island & Ocean Fortress',
    thumbnail: '/taiwan/cijin-island-ferry.jpg',
    oneLiner: 'Sun-drenched barrier island reachable by a short 5-minute ferry, boasting historical Qing-dynasty fort viewpoints over the Taiwan Strait and seafood lanes.',
    tags: ['Day 4', 'Kaohsiung', 'Cijin', 'Ferry', 'Fortress', 'Taiwan Strait', 'Coastal Trail & Ocean Views'],
    location: 'Cijin District, Kaohsiung City',
    region: 'Southern Taiwan',
    recommendedDuration: '2 - 3 hours',
    bestTime: 'Golden hour and sunset over the sea',
    transitEase: 'Moderate (Bus / Transfer)',
    overview: [
      'Just a brisk five-minute ferry ride across the harbor from Gushan Ferry Pier lies Cijin Island, a slender sandbar island protecting Kaohsiung Harbor from the churning waters of the Taiwan Strait.',
      'Stepping off the ferry immediately transports you into a breezy coastal holiday atmosphere. Visitors can rent electric quad-cycles or stroll up to Cihou Fort, a red-brick military fortification constructed in 1875 by Qing-dynasty general Shen Baozhen to defend southern Taiwan.',
      'Perched high on the cliff, the open cannon ramparts deliver panoramic 360-degree vistas: looking north towards Sizihwan and Mount Shoushan, east over Kaohsiung’s container docks, and west directly into the endless expanse of the sunset-lit Taiwan Strait.'
    ],
    specialties: [
      {
        title: 'Qing-Dynasty Cihou Fort',
        description: 'Historic red-brick fort ramparts with auspicious Chinese character brickwork and panoramic clifftop lookouts.'
      },
      {
        title: 'Gushan-Cijin Harbor Ferry',
        description: 'Frequent 5-minute ferry linking Kaohsiung mainland to Cijin, carrying both pedestrians and streams of mopeds.'
      },
      {
        title: 'Cijin Old Street Seafood Market',
        description: 'Lively thoroughfare packed with ocean-fresh grilled squid on skewers, sashimi, and sweet shaved ice stalls.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Take Kaohsiung MRT Orange Line to Sizihwan Station (O1) Exit 1, walk 5 minutes to Gushan Ferry Pier.',
      busDetails: 'Board the Gushan-Cijin Ferry (operates continuously every few minutes from 5 AM to 2 AM).',
      bookingAndTickets: 'Ferry fare is NT$30 (NT$20 with EasyCard or iPASS). Tap directly at the turnstiles.',
      easyCardInfo: 'EasyCard and iPASS work instantly on the ferry turnstiles with zero wait.',
      tips: [
        'Walk through the Starry Sky Tunnel (a former military tunnel carved through Cihou Mountain) to reach the ocean boardwalk.',
        'Sunset from the Cihou Fort ramparts is one of the top photo spots in all of Taiwan.',
        'Be sure to try the fresh charcoal-grilled giant squid brushed with sweet savory sauce on Cijin Old Street.'
      ]
    },
    gallery: [
        {
          id: 'cur-cj-01',
          type: 'photo',
          url: '/taiwan/curated/day4_03_cijin_island_photo_01.jpg',
          title: "Seasonal Fresh Fruits Over Shaved Ice (\u6c34\u679c\u632b\u51b0)",
          caption: "Generous bowl of fresh tropical fruits piled high over sweet shaved ice\u2014a beloved local specialty by Cijin harbor."
        },
        {
          id: 'cur-cj-02',
          type: 'photo',
          url: '/taiwan/curated/day4_03_cijin_island_photo_02.jpg',
          title: "Cijin Old Street Food Promenade",
          caption: "Lively pedestrian strip brimming with charcoal grilled squid, fresh seafood catches, and cold fruit drinks."
        },
        {
          id: 'cur-cj-10',
          type: 'photo',
          url: '/taiwan/curated/day4_03_cijin_island_photo_10.jpg',
          title: "Cihou Fort Historic Ramparts",
          caption: "19th-century coastal fortress gates commanding sweeping vistas over Kaohsiung harbor channel."
        },
        {
          id: 'cur-cj-12',
          type: 'photo',
          url: '/taiwan/curated/day4_03_cijin_island_photo_12.jpg',
          title: "Cijin Beach & Coastal Horizon",
          caption: "Black sand ocean shoreline where cargo ships and ferries crisscross the Taiwan Strait."
        },
      {
        id: 'cj-m1',
        type: 'photo',
        url: '/taiwan/cijin-island-ferry.jpg',
        title: 'Gushan to Cijin Harbor Ferry',
        caption: 'Crossing the blue waters of Kaohsiung Harbor with views of cargo ships and lighthouse hills.'
      },
      {
        id: 'cj-m2',
        type: 'photo',
        url: '/taiwan/cijin-coastal-scenery.jpg',
        title: 'Cijin Rocky Coastal Shoreline',
        caption: 'Dramatic sea rocks and breaking waves along the perimeter walking trail of Cijin Island.'
      },
      {
        id: 'cj-m3',
        type: 'photo',
        url: '/taiwan/cihou-fort-lookout.jpg',
        title: 'Cihou Fort Historic Ramparts',
        caption: 'Standing atop the 1875 red-brick coastal fort looking out over the Kaohsiung harbor entrance.'
      },
      {
        id: 'cj-m4',
        type: 'photo',
        url: '/taiwan/cijin-sunset-walk.jpg',
        title: 'Sunset Over the Taiwan Strait',
        caption: 'Warm golden sunlight washing over the palm-lined seawall as fishing vessels return to port.'
      }
    ]
  },

  // ================= DAY 5 =================
  {
    id: 'alishan-forest-railway',
    name: 'Alishan Forest Railway & Mountain Station',
    chineseName: '阿里山森林鐵路與阿里山車站',
    category: 'transit',
    categoryLabel: 'Alpine Heritage Railway',
    thumbnail: '/taiwan/alishan-mountain-station.jpg',
    oneLiner: 'Century-old zigzag mountain narrow-gauge logging railway terminating at the grand all-cypress Alishan station floating 2,216 meters above sea level.',
    tags: ['Day 5', 'Alishan', 'Alpine Rail', 'Wooden Architecture', 'Transit & Rail', 'Chiayi'],
    location: 'Alishan Township, Chiayi County',
    region: 'Central Mountain Range',
    recommendedDuration: '2 hours',
    bestTime: 'Early morning to catch morning alpine trains and mist',
    transitEase: 'Mountain (Scenic Rail / Bus)',
    overview: [
      'Constructed in 1912 by the Japanese to transport precious giant red cypress logs down from the peaks, the Alishan Forest Railway is one of only three remaining high-altitude zig-zag mountain railways in the world.',
      'Climbing from 30 meters at Chiayi up to 2,216 meters at Alishan Station, the 762mm narrow-gauge trains negotiate 50 tunnels, 77 wooden trestle bridges, and four horseshoe switchbacks as the surrounding vegetation shifts from tropical betel palms to subalpine cedar forests.',
      'Alishan Station itself is Taiwan’s largest all-wooden station structure. Its soaring curved cypress beams and open-air viewing deck command breathless vistas across rolling ridges and the morning sea of clouds.'
    ],
    specialties: [
      {
        title: 'Alishan Station Timber Architecture',
        description: 'Massive indigenous Formosan cypress roof pillars and curved eaves filling the station with fragrant cedar aromas.'
      },
      {
        title: 'Z-Shaped Switchback Climbing',
        description: 'Locomotives push rather than pull the carriages, reversing direction at switchbacks to climb the sheer mountain gradients.'
      },
      {
        title: 'Alpine Railway Bento Box',
        description: 'Hearty high-mountain railway bento featuring braised chicken leg, local bamboo shoots, and wild Alishan wasabi.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Take THSR to Chiayi Station, then board Taiwan Tourist Shuttle Bus 7329 direct to Alishan (2.5 hrs). Alternatively, take TRA train to Chiayi Station and board Forest Railway trains to Fenchihu.',
      busDetails: 'Inside Alishan National Scenic Area, branch line trains run from Alishan Station to Chaoping, Sacred Tree, and Chushan.',
      bookingAndTickets: 'Forest Railway tickets can be reserved online 14 days in advance via the official AFR website. Scenic Area entry ticket is NT$300 (NT$150 if arriving by public bus).',
      easyCardInfo: 'EasyCard is accepted on Taiwan Tourist Shuttle buses from Chiayi. Train tickets within the park can also be bought at station counters.',
      tips: [
        'High altitude temperatures are 10–15°C cooler than the lowlands; pack a warm fleece or windbreaker.',
        'Catch the morning branch train to Sacred Tree Station (神木站) and hike back down the giant tree plank trail.',
        'Try local Alishan high mountain oolong tea harvested from slopes blanketed in mountain clouds.'
      ]
    },
    gallery: [
        {
          id: 'cur-afr-02',
          type: 'photo',
          url: '/taiwan/curated/day5_00_alishan_highway_photo_02.jpg',
          title: "Alishan Mountain Highway Ascent",
          caption: "Climbing high into the alpine clouds through emerald tea terraces and mountain villages."
        },
        {
          id: 'cur-afr-08',
          type: 'photo',
          url: '/taiwan/curated/day5_00_alishan_highway_photo_08.jpg',
          title: "Alishan Sea of Clouds (\u96f2\u6d77)",
          caption: "Spectacular cloud ocean blanketing the deep valleys of Chiayi County below the peaks."
        },
        {
          id: 'cur-afr-15',
          type: 'photo',
          url: '/taiwan/curated/day5_01_alishan_station_photo_15.jpg',
          title: "Alishan Mountain Station Wooden Concourse",
          caption: "Grand curved timber station platform constructed from native cypress wood at 2,216 meters elevation."
        },
      {
        id: 'ali-m1',
        type: 'photo',
        url: '/taiwan/alishan-mountain-station.jpg',
        title: 'Alishan Mountain Station Wooden Terminal',
        caption: 'The grand curved all-cypress wooden mountain station with scenic platform lookouts over the peaks.'
      },
      {
        id: 'ali-m2',
        type: 'photo',
        url: '/taiwan/alishan-forest-railway.jpg',
        title: 'Narrow-Gauge Mountain Timber Track',
        caption: 'Historic 762mm narrow-gauge tracks winding through dense cedar and cypress pine forests.'
      },
      {
        id: 'ali-m3',
        type: 'photo',
        url: '/taiwan/alishan-curved-wooden-platform.jpg',
        title: 'Curved Wooden Boarding Platform',
        caption: 'Graceful curved architecture built entirely of native Taiwanese timber blending into the misty mountains.'
      },
      {
        id: 'ali-m4',
        type: 'photo',
        url: '/taiwan/alishan-red-locomotive.jpg',
        title: 'Classic Red Mountain Locomotive',
        caption: 'Iconic red diesel locomotive engineered specifically to climb steep mountain switchbacks.'
      }
    ]
  },
  {
    id: 'alishan-giant-trees',
    name: 'Alishan Giant Tree Plank Trail & Sacred Cypress Forest',
    chineseName: '阿里山巨木群棧道與神木森林',
    category: 'nature',
    categoryLabel: 'Millennium Cypress Forest & Alpine Trails',
    thumbnail: '/taiwan/curated/day5_03_alishan_forest_photo_07.jpg',
    oneLiner: 'Enchanting wooden boardwalk winding through primeval misty forests of colossal Formosan red cypress trees up to 2,000 years old.',
    tags: ['Day 5', 'Alishan', 'Sacred Trees', 'Ancient Cypress', 'Alpine Forest', 'Coastal Trail & Ocean Views'],
    location: 'Alishan National Scenic Area, Chiayi County',
    region: 'Central Mountain Range',
    recommendedDuration: '3 - 4 hours',
    bestTime: 'Morning when sunlight filters through mountain clouds and mist',
    transitEase: 'Mountain (Scenic Rail / Bus)',
    overview: [
      'Walking into the Alishan Giant Tree Plank Trail feels like entering an ancient cathedral of nature. Spanning across steep mountain ravines, elevated wooden boardwalks meander quietly through groves of colossal Formosan red cypress (Chamaecyparis formosensis) and Taiwan yellow cypress trees.',
      'Over 36 designated giant sacred trees along the trail have survived for between 800 and 2,300 years, their colossal trunk circumferences exceeding 10 to 13 meters. Mountain mist drifts silently between the canopies, diffusing rays of golden sunlight into celestial beams.',
      'Along the trail, hikers discover the ruins of the original Alishan Sacred Tree, the Three Generations Tree (where three successive tree trunks grew from one fallen stump), and Shouzhen Temple, surrounded by tranquil alpine streams and bird song.'
    ],
    specialties: [
      {
        title: 'Millennium Formosan Red Cypress',
        description: 'Colossal living relics of prehistory, towering over 45 meters with trunks requiring up to 10 adults with outstretched arms to encircle.'
      },
      {
        title: 'Elevated Ecology Boardwalk',
        description: 'Raised wooden platform trails that protect delicate subterranean tree root networks from foot traffic erosion.'
      },
      {
        title: 'Sea of Clouds & Alpine Mist',
        description: 'Microclimates generating sudden blankets of ethereal cloud sea (Yun Hai) rolling across the mountain basin.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Take the Alishan Forest Railway branch line from Alishan Station to Sacred Tree Station (神木車站, 7-minute scenic train ride).',
      busDetails: 'The trailhead begins directly at Sacred Tree Station and loops past Ciyun Temple to Chaoping Station.',
      bookingAndTickets: 'Branch line train tickets are NT$100 each way, purchasable at Alishan Station ticket counters.',
      easyCardInfo: 'Physical paper commemorative tickets are issued for branch railway lines.',
      tips: [
        'Take the downhill walk from Chaoping to Sacred Tree Station if you prefer an easy descent.',
        'The wooden boardwalks can be slick when wet from mountain mist; wear shoes with good rubber traction.',
        'Breathe deeply: the concentration of cypress phytoncides (forest terpenes) here is among the highest in East Asia.'
      ]
    },
    gallery: [
        {
          id: 'cur-agt-07',
          type: 'photo',
          url: '/taiwan/curated/day5_03_alishan_forest_photo_07.jpg',
          title: "Three-Generation Sacred Tree (\u4e09\u4ee3\u6728)",
          caption: "Legendary forest marvel where three successive generations of ancient Taiwan red cypress grow atop the fallen trunks of ancestors."
        },
        {
          id: 'cur-agt-02',
          type: 'photo',
          url: '/taiwan/curated/day5_03_alishan_forest_photo_02.jpg',
          title: "Giant Tree Plank Trail Boardwalk",
          caption: "Elevated wooden walkway winding gently among millennia-old cypress trees in the alpine mist."
        },
        {
          id: 'cur-agt-09',
          type: 'photo',
          url: '/taiwan/curated/day5_03_alishan_forest_photo_09.jpg',
          title: "Towering Cypress Canopy in Morning Light",
          caption: "Massive straight-trunked forest giants reaching over 45 meters high into the mountain canopy."
        },
        {
          id: 'cur-agt-10',
          type: 'photo',
          url: '/taiwan/curated/day5_03_alishan_forest_photo_10.jpg',
          title: "Ancient Root Systems & Forest Ecology",
          caption: "Sprawling moss-draped root structures supporting Taiwan's most precious ancient forest."
        },
        {
          id: 'cur-agt-19',
          type: 'photo',
          url: '/taiwan/curated/day5_03_alishan_forest_photo_19.jpg',
          title: "Historic Alishan Sacred Shrine Trail",
          caption: "Peaceful mountain walking path flanked by lush ferns and sacred timber pillars."
        },
      {
        id: 'ali-gt-m1',
        type: 'photo',
        url: '/taiwan/alishan-sacred-giant-trees.jpg',
        title: 'Colossal Millennium Formosan Cypress',
        caption: 'Standing beneath giant ancient cypress trees soaring over 40 meters into the alpine cloud canopy.'
      },
      {
        id: 'ali-gt-m2',
        type: 'photo',
        url: '/taiwan/alishan-elevated-boardwalk.jpg',
        title: 'Elevated Wooden Plank Trail',
        caption: 'Elevated cypress plank walkway protecting fragile root networks while guiding hikers through primeval woods.'
      },
      {
        id: 'ali-gt-m3',
        type: 'photo',
        url: '/taiwan/alishan-misty-cypress-woods.jpg',
        title: 'Misty Ancient Cypress Forest',
        caption: 'Dense mountain fog drifting through century-old trunks creating an ethereal, otherworldly atmosphere.'
      },
      {
        id: 'ali-gt-m4',
        type: 'photo',
        url: '/taiwan/alishan-cypress-roots.jpg',
        title: 'Ancient Gnarled Root Formations',
        caption: 'Intricate root formations clinging to mossy rocks and rich alpine soil along the sacred tree trail.'
      },
      {
        id: 'ali-gt-m5',
        type: 'photo',
        url: '/taiwan/alishan-mountain-temple.jpg',
        title: 'Shouzhen Temple in the Mountains',
        caption: 'The highest temple in Taiwan (altitude 2,150m) providing spiritual solace to mountain pilgrims.'
      },
      {
        id: 'ali-gt-v1',
        type: 'video',
        url: '/taiwan/alishan-giant-trees-walk.mp4',
        title: 'Walking Through the Sacred Cypress Woods Video',
        caption: 'Strolling peacefully along the elevated wooden boardwalk beneath the massive ancient cypress trees.',
        duration: '0:07',
        thumbnailUrl: '/taiwan/alishan-giant-trees-thumb.jpg'
      }
    ]
  },

  // ================= DAY 6 =================
  {
    id: 'xiaoyoukeng-fumaroles',
    name: 'Xiaoyoukeng Geothermal Fumaroles',
    chineseName: '小油坑硫磺地熱噴氣孔',
    category: 'nature',
    categoryLabel: 'Active Volcanic Fumaroles',
    thumbnail: '/taiwan/xiaoyoukeng-sulfur-fumaroles.jpg',
    oneLiner: 'Roaring post-volcanic geological crater on Mount Qixing venting plumes of thick sulfur steam and crystalline yellow mineral encrustations.',
    tags: ['Day 6', 'Yangmingshan', 'Volcano', 'Sulfur Fumaroles', 'Mt Qixing', 'Coastal Trail & Ocean Views'],
    location: 'Beitou District / Yangmingshan National Park, Taipei',
    region: 'Northern Volcanic Ridge',
    recommendedDuration: '1 - 2 hours',
    bestTime: 'Morning when thermal steam billows starkly against clear mountain air',
    transitEase: 'Moderate (Bus / Transfer)',
    overview: [
      'Xiaoyoukeng sits dramatically at 805 meters elevation on the northwestern flank of Mount Qixing, the highest dormant volcano in the Tatun Volcano Group. It represents Taiwan’s most striking post-volcanic landscape.',
      'A massive horseshoe-shaped collapse amphitheater reveals bare, sulfur-bleached rock faces where superheated subterranean steam rushes out with an audible hiss. The air is rich with mineral sulfur aromas, and bright yellow sulfur crystals form along the active vents.',
      'Wooden observation walkways lead visitors right to the edge of the steaming fumaroles and boiling geothermal mud puddles, while a scenic stone trail ascends straight up through lush arrow bamboo groves towards Mount Qixing Main Peak.'
    ],
    specialties: [
      {
        title: 'Active Post-Volcanic Fumaroles',
        description: 'Vents releasing superheated steam and sulfur dioxide gases heated by magma chambers beneath the Tatun range.'
      },
      {
        title: 'Bright Yellow Sulfur Crystals',
        description: 'Acicular needle-like sulfur crystals condensing directly onto rock surfaces from volcanic vapors.'
      },
      {
        title: 'Arrow Bamboo Mountain Corridor',
        description: 'Dense dwarf bamboo vegetation forming natural green walls flanking the mountain trail towards Mt. Qixing.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Take Taipei MRT Red Line to Jiantan Station (R15) Exit 1, board Bus Red 5 to Yangmingshan Bus Terminal, then transfer to the 108 Yangmingshan Shuttle Bus.',
      busDetails: '108 Shuttle Bus loops through Yangmingshan; alight directly at the Xiaoyoukeng (小油坑) stop.',
      bookingAndTickets: 'Free entry to the park and observation decks. 108 shuttle bus fare is NT$15 per ride.',
      easyCardInfo: 'EasyCard and Taipei Fun Pass accepted on all Yangmingshan buses.',
      tips: [
        'Stay on designated boardwalks; ground around active fumaroles can exceed 95°C and rock can be unstable.',
        'High elevation means mountain weather changes quickly; carry an umbrella and wind-resistant jacket.',
        'The hike from Xiaoyoukeng to Mt. Qixing Main Peak (1,120m) takes about 1 hour and offers 360-degree views of the Taipei basin.'
      ]
    },
    gallery: [
        {
          id: 'cur-xyk-01',
          type: 'photo',
          url: '/taiwan/curated/day6_01_xiaoyoukeng_fumaroles_photo_01.jpg',
          title: "Xiaoyoukeng Active Geothermal Fumaroles",
          caption: "Dramatic post-volcanic crater basin spewing billowing plumes of sulfur steam and boiling mineral water."
        },
        {
          id: 'cur-xyk-drive',
          type: 'photo',
          url: '/taiwan/curated/day6_00_mountain_drive_photo_01.jpg',
          title: "Yangmingshan Mountain Pass Drive",
          caption: "Winding national park highway surrounded by volcanic peaks and fields of silver grass."
        },
      {
        id: 'xyk-m1',
        type: 'photo',
        url: '/taiwan/xiaoyoukeng-sulfur-fumaroles.jpg',
        title: 'Xiaoyoukeng Active Geothermal Vents',
        caption: 'Thick columns of steam escaping violently from sulfur vents on the collapsed flank of Mount Qixing.'
      },
      {
        id: 'xyk-m2',
        type: 'photo',
        url: '/taiwan/xiaoyoukeng-volcanic-canyon.jpg',
        title: 'Sulfur Crater & Steaming Canyon Wall',
        caption: 'Exposed volcanic rock layers showing vibrant bright yellow sulfur crusts and hydrothermal erosion.'
      },
      {
        id: 'xyk-m3',
        type: 'photo',
        url: '/taiwan/xiaoyoukeng-steaming-vents.jpg',
        title: 'Bubbling Mineral Vents & Crystals',
        caption: 'Close-up of crystalline yellow sulfur crystals deposited by superheated subterranean volcanic gases.'
      },
      {
        id: 'xyk-m4',
        type: 'photo',
        url: '/taiwan/xiaoyoukeng-qixing-trail.jpg',
        title: 'Trailhead Ascending Mount Qixing',
        caption: 'Stone steps winding past arrow bamboo groves and steaming volcanic gullies towards Taipei’s highest peak.'
      }
    ]
  },
  {
    id: 'lengshuikeng-hotspring',
    name: 'Lengshuikeng & Jingshan Suspension Bridge',
    chineseName: '冷水坑與菁山吊橋',
    category: 'nature',
    categoryLabel: 'Mineral Springs & Suspension Bridge',
    thumbnail: '/taiwan/lengshuikeng-suspension-bridge.jpg',
    oneLiner: 'Scenic highland basin featuring natural mineral hot spring foot-baths, milky sulfur ponds, and the sweeping wooden Jingshan suspension bridge.',
    tags: ['Day 6', 'Yangmingshan', 'Suspension Bridge', 'Hot Springs', 'Mineral Springs', 'Coastal Trail & Ocean Views'],
    location: 'Shilin District / Yangmingshan National Park, Taipei',
    region: 'Northern Volcanic Ridge',
    recommendedDuration: '2 hours',
    bestTime: 'Midday to afternoon for pleasant highland walking',
    transitEase: 'Moderate (Bus / Transfer)',
    overview: [
      'Lengshuikeng (literally "Cold Water Pit") is named in contrast to other scorching Yangmingshan hot springs because its natural waters emerge at a pleasant, batheable 40°C rather than boiling 90°C temperatures.',
      'The basin was created when lava flows from Mount Qixing damned the mountain stream, forming a prehistoric barrier lake. Today it features the striking Milk Lake (牛奶湖)—a turquoise pond tinted opaque white by sulfur precipitate—as well as free public hot spring foot soaking pools.',
      'A short path through tall Japanese cedar groves leads to the picturesque Jingshan Suspension Bridge (菁山吊橋), a graceful wooden pedestrian bridge spanning 50 meters across a verdant volcanic stream ravine.'
    ],
    specialties: [
      {
        title: 'Jingshan Pedestrian Suspension Bridge',
        description: 'Red-cabled timber suspension bridge framing panoramic vistas of Mount Qixing and the forested canyon.'
      },
      {
        title: 'Milk Lake (Niunai Hu)',
        description: 'Taipei’s only white sulfur lake, where low-temperature thermal springs precipitate fine sulfur particles into milk-like water.'
      },
      {
        title: 'Free Public Foot-Soaking Pavilion',
        description: 'Open-air stone footbaths fed by natural 40°C mineral spring water, ideal for relaxing tired hikers’ feet.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Take Taipei MRT Red Line to Jiantan Station (R15), take Bus Small 15 (小15) direct to Lengshuikeng Service Center.',
      busDetails: 'Alternatively, board the 108 Yangmingshan Shuttle Bus from Xiaoyoukeng or Yangmingshan Bus Terminal.',
      bookingAndTickets: 'All walking trails, the suspension bridge, and public foot-soaking pools are free to the public.',
      easyCardInfo: 'EasyCard accepted on Small 15 and 108 shuttle buses.',
      tips: [
        'Bring a small towel to dry your feet after soaking in the warm mineral footbaths.',
        'The walking trail connects Lengshuikeng directly to Qingtiangang Grassland (1.8 km, approx. 45-minute scenic stroll).',
        'Spring and autumn bring cool mountain breezes and blooming silver grass along the hillsides.'
      ]
    },
    gallery: [
        {
          id: 'cur-lsk-37',
          type: 'photo',
          url: '/taiwan/curated/day6_02_lengshuikeng_hotspring_photo_37.jpg',
          title: "Lengshuikeng Geothermal Hot Spring Foot Bath (\u51b7\u6c34\u5751\u6eab\u6cc9\u6ce1\u8173\u6c60)",
          caption: "Therapeutic public mineral spring foot bath warmed to 40\u00b0C by natural volcanic heat."
        },
        {
          id: 'cur-lsk-11',
          type: 'photo',
          url: '/taiwan/curated/day6_02_lengshuikeng_hotspring_photo_11.jpg',
          title: "Jingshan Suspension Bridge (\u83c1\u5c71\u540a\u6a4b)",
          caption: "Picturesque red suspension bridge spanning the geothermal brook between Japanese cedar groves."
        },
        {
          id: 'cur-lsk-16',
          type: 'photo',
          url: '/taiwan/curated/day6_02_lengshuikeng_hotspring_photo_16.jpg',
          title: "Cedar Forest Boardwalk Walkway",
          caption: "Serene trail winding through dense evergreen woodlands and mountain meadows."
        },
        {
          id: 'cur-lsk-33',
          type: 'photo',
          url: '/taiwan/curated/day6_02_lengshuikeng_hotspring_photo_33.jpg',
          title: "Volcanic Basin & Mountain Slopes",
          caption: "Panoramic view of the collapsed crater lake basin now carpeted in vibrant high-altitude vegetation."
        },
      {
        id: 'lsk-m1',
        type: 'photo',
        url: '/taiwan/lengshuikeng-suspension-bridge.jpg',
        title: 'Jingshan Wooden Suspension Bridge',
        caption: 'Graceful timber pedestrian suspension bridge stretching across the scenic mountain valley.'
      },
      {
        id: 'lsk-m2',
        type: 'photo',
        url: '/taiwan/lengshuikeng-mineral-spring.jpg',
        title: 'Milky Mineral Pond (Milk Lake)',
        caption: 'Precipitated sulfur particles giving the caldera pool its striking opaque milky-white appearance.'
      },
      {
        id: 'lsk-m3',
        type: 'photo',
        url: '/taiwan/lengshuikeng-mountain-valley.jpg',
        title: 'Lush Volcanic Ridge & Forest Vistas',
        caption: 'Sweeping views of forested peaks, mountain meadows, and footpaths leading across the ridge.'
      },
      {
        id: 'lsk-m4',
        type: 'photo',
        url: '/taiwan/lengshuikeng-cedar-trail.jpg',
        title: 'Tall Japanese Cedar Woods Trail',
        caption: 'Shaded woodland stone path flanked by tall cryptomeria cedar trees providing cool mountain shade.'
      },
      {
        id: 'lsk-v1',
        type: 'video',
        url: '/taiwan/lengshuikeng-bridge-walk.mp4',
        title: 'Crossing Jingshan Suspension Bridge Video',
        caption: 'Walking across the gently swaying suspension bridge with panoramic views of the green mountain valley.',
        duration: '0:03',
        thumbnailUrl: '/taiwan/lengshuikeng-bridge-thumb.jpg'
      }
    ]
  },
  {
    id: 'qingtiangang-grassland',
    name: 'Qingtiangang Grassland & Lava Plateau',
    chineseName: '擎天崗大草原',
    category: 'nature',
    categoryLabel: 'Highland Pasture & Volcanic Plateau',
    thumbnail: '/taiwan/qingtiangang-highland-meadows.jpg',
    oneLiner: 'Saddle-shaped volcanic lava plateau covered in rolling emerald pastures where historic herd water buffaloes graze peacefully in mountain fog.',
    tags: ['Day 6', 'Yangmingshan', 'Grassland', 'Water Buffaloes', 'Lava Plateau', 'Coastal Trail & Ocean Views'],
    location: 'Shilin District / Yangmingshan National Park, Taipei',
    region: 'Northern Volcanic Ridge',
    recommendedDuration: '2 - 3 hours',
    bestTime: 'Late afternoon when the sea of fog rolls over the ridge',
    transitEase: 'Moderate (Bus / Transfer)',
    overview: [
      'Perched at 770 meters elevation, Qingtiangang is a dramatic flat lava plateau formed over thousands of years by lava flows erupting from Mount Zhuzi. During Japanese colonial rule in 1934, it was established as Dalingka Ranch, a high-altitude dairy pasture.',
      'Today, the plateau is famous for its vast undulating green grasslands framed by rustic split-rail wooden fences. A resident herd of semi-wild water buffaloes—descendants of working draft cattle brought here decades ago—graze peacefully on the highland carpet.',
      'A circular walking trail loops around the saddle ridge, delivering breathtaking 360-degree vistas stretching north towards the Jinshan coastline and south across the entire Taipei metropolis. As late afternoon approaches, swirling white mountain clouds frequently sweep over the ridge.'
    ],
    specialties: [
      {
        title: 'Wild Water Buffalo Grazing Herds',
        description: 'Historic herds of black water buffalo roaming freely across the open grasslands and cooling in mud wallows.'
      },
      {
        title: 'Circular Pasture Boardwalk',
        description: 'Well-maintained gravel and timber pathway with dual-sided protective wooden fences separating visitors from grazing cattle.'
      },
      {
        title: 'Historic Jinbaoli Fish Trail',
        description: 'Ancient stone pathway once used by coastal fishermen to carry fresh fish overnight across the mountains to Taipei markets.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Take Taipei MRT Red Line to Jiantan Station (R15), board Bus Small 15 (小15) direct to Qingtiangang terminus.',
      busDetails: '108 Shuttle Bus also stops at Qingtiangang Service Center.',
      bookingAndTickets: 'Free entry to the park and grasslands year-round.',
      easyCardInfo: 'EasyCard accepted on Small 15 bus.',
      tips: [
        'Maintain a respectful distance of at least 20 meters from water buffaloes and never attempt to feed or touch them.',
        'There is little tree shade on the open grassland; wear sunscreen and bring drinking water.',
        'In autumn (October to November), the rolling hills are covered in waving silver miscanthus grass feathers.'
      ]
    },
    gallery: [
        {
          id: 'cur-qtg-15',
          type: 'photo',
          url: '/taiwan/curated/day6_03_qingtiangang_grassland_photo_15.jpg',
          title: "Qingtiangang Highland Plateau & Silver Grass",
          caption: "Sprawling volcanic plateau meadow formed by prehistoric lava flows, blanketed in soft silver grass."
        },
        {
          id: 'cur-qtg-22',
          type: 'photo',
          url: '/taiwan/curated/day6_03_qingtiangang_grassland_photo_22.jpg',
          title: "Historic Water Buffalo Grazing Pasture",
          caption: "Rolling pastoral slopes where herds of free-roaming water buffalo graze along the fenced footpaths."
        },
        {
          id: 'cur-qtg-s05',
          type: 'photo',
          url: '/taiwan/curated/day6_04_shilin_evening_photo_05.jpg',
          title: "Golden Hour Descent from Yangmingshan",
          caption: "Sunset glow illuminating the mountain ridges and winding roads descending toward Shilin."
        },
        {
          id: 'cur-qtg-s08',
          type: 'photo',
          url: '/taiwan/curated/day6_04_shilin_evening_photo_08.jpg',
          title: "Twilight Horizon Over Taipei Basin",
          caption: "Dusk settling over the mountain valleys as the sparkling lights of Taipei emerge below."
        },
      {
        id: 'qtg-m1',
        type: 'photo',
        url: '/taiwan/qingtiangang-highland-meadows.jpg',
        title: 'Rolling Highland Meadows & Cattle Fence',
        caption: 'Sweeping green pastures atop the ancient volcanic lava flow, bounded by rustic wooden post fences.'
      },
      {
        id: 'qtg-m2',
        type: 'photo',
        url: '/taiwan/qingtiangang-buffalo-trail.jpg',
        title: 'Grazing Water Buffalo Herd',
        caption: 'Semi-wild water buffaloes peacefully grazing on the cool plateau grass beneath swirling mountain mist.'
      },
      {
        id: 'qtg-m3',
        type: 'photo',
        url: '/taiwan/qingtiangang-rolling-pasture.jpg',
        title: 'Undulating Grassland Ridges',
        caption: 'Vast open panoramic walking trail extending along the gentle slopes of the historic tea transport path.'
      },
      {
        id: 'qtg-m4',
        type: 'photo',
        url: '/taiwan/qingtiangang-volcanic-mist.jpg',
        title: 'Swirling Mountain Cloud Inversion',
        caption: 'Dramatic mountain mist pouring over the ridge and enveloping the highland walking trails in cool air.'
      },
      {
        id: 'qtg-v1',
        type: 'video',
        url: '/taiwan/qingtiangang-plateau-breeze.mp4',
        title: 'Qingtiangang Highland Breeze Video',
        caption: 'Gentle mountain wind rippling across the vast grassy lava plateau and wooden pasture fences.',
        duration: '0:06',
        thumbnailUrl: '/taiwan/qingtiangang-plateau-thumb.jpg'
      }
    ]
  },

  // ================= DAY 7 =================
  {
    id: 'jinshan-coastal-highway',
    name: 'Jinshan Coastal Highway & Northern Shore',
    chineseName: '金山北海岸與公路',
    category: 'nature',
    categoryLabel: 'Pacific Shoreline & Coastal Highway',
    thumbnail: '/taiwan/jinshan-coastal-pacific.jpg',
    oneLiner: 'Rugged marine highway carved along dramatic Pacific bluffs, fishing ports, and sea-sculpted rock formations of Taiwan’s northern capes.',
    tags: ['Day 7', 'Jinshan', 'Northern Coast', 'Pacific Highway', 'Ocean Cliffs', 'Coastal Trail & Ocean Views'],
    location: 'Jinshan & Shimen Districts, New Taipei',
    region: 'North Coast',
    recommendedDuration: '2 hours',
    bestTime: 'Sunny mornings with sparkling blue Pacific horizon',
    transitEase: 'Moderate (Bus / Transfer)',
    overview: [
      'Provincial Highway 2 hugs Taiwan’s northernmost shoreline as it curves along the Jinshan and Shimen districts. Here, where the volcanic mountain ridges plunge directly into the deep blue Pacific Ocean, the coastal highway provides jaw-dropping seaside vistas.',
      'Salt spray drifts across the roadway as turquoise breakers crash onto sea arches, basalt columns, and golden sandy coves. Fishing boats return to small harbors lined with drying squid nets and colorful maritime shrines.',
      'Scenic roadside pullouts provide uninterrupted viewpoints of the horizon, where offshore freighter lanes meet the vast open expanse of the East China Sea and North Pacific.'
    ],
    specialties: [
      {
        title: 'Pacific Marine Highway Panorama',
        description: 'Sweeping curves following the coastline with endless blue ocean vistas stretching toward the horizon.'
      },
      {
        title: 'Sea-Carved Coastal Bluffs',
        description: 'Centuries of wave erosion carving intricate caves, sea stacks, and honeycombed sandstone formations.'
      },
      {
        title: 'Jinshan Duck Meat (Jinshan Yari)',
        description: 'Famous century-old culinary tradition at Jinshan Old Street where patrons carry their own duck dishes across the alley.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Take Kuo-Kuang Bus 1815 direct from Taipei Main Station or Taipei City Hall Bus Station to Jinshan (approx. 70 mins).',
      busDetails: 'Taiwan Tourist Shuttle Crown Northern Coast Route 716 connects Tamsui MRT Station with Jinshan along the scenic shoreline.',
      bookingAndTickets: 'Bus fare is paid via EasyCard or cash directly upon boarding.',
      easyCardInfo: 'EasyCard and iPASS fully supported across all North Coast bus routes.',
      tips: [
        'Sit on the right side of the bus heading north for the most dramatic direct ocean views.',
        'Pair your visit with a stop at Jinshan Old Street (Jinbaoli Old Street) for traditional herbal drinks and sweet potato snacks.',
        'Sunset along the northern headlands casts brilliant orange and magenta reflections over the Pacific water.'
      ]
    },
    gallery: [
      {
        id: 'js-m1',
        type: 'photo',
        url: '/taiwan/jinshan-coastal-pacific.jpg',
        title: 'Pacific Coastal Marine Highway',
        caption: 'Dramatic coastal road skirting sea cliffs, fishing villages, and the sparkling deep blue Pacific Ocean.'
      },
      {
        id: 'js-m2',
        type: 'photo',
        url: '/taiwan/jinshan-ocean-cliffs.jpg',
        title: 'Rugged Volcanic Ocean Bluffs',
        caption: 'Wave-carved volcanic rock formations and reefs standing resilient against the coastal surf.'
      },
      {
        id: 'js-m3',
        type: 'photo',
        url: '/taiwan/jinshan-coastal-highway.jpg',
        title: 'Northern Cape Scenic Lookout',
        caption: 'Expansive vistas along the coastal highway with fishing boats dotting the horizon.'
      },
      {
        id: 'js-v1',
        type: 'video',
        url: '/taiwan/jinshan-coast-waves.mp4',
        title: 'Pacific Waves Crashing on Shore Video',
        caption: 'Rolling ocean surf and coastal sea breeze along the northern Pacific highway.',
        duration: '0:09',
        thumbnailUrl: '/taiwan/jinshan-coast-thumb.jpg'
      }
    ]
  },
  {
    id: 'beitou-thermal-valley',
    name: 'Xinbeitou Thermal Valley (Hell Valley)',
    chineseName: '新北投地熱谷 (地熱地獄谷)',
    category: 'nature',
    categoryLabel: 'Emerald Hot Spring Lake',
    thumbnail: '/taiwan/beitou-thermal-valley-lake.jpg',
    oneLiner: 'Enigmatic 90°C emerald-green sulfuric thermal lake perpetually shrouded in spectral steam plumes, the volcanic cradle of Taiwan’s onsen culture.',
    tags: ['Day 7', 'Beitou', 'Thermal Valley', 'Hot Springs', 'Green Sulfur', 'Coastal Trail & Ocean Views'],
    location: 'Beitou District, Taipei City',
    region: 'Northern Taipei',
    recommendedDuration: '1.5 - 2 hours',
    bestTime: 'Morning or cloudy cool days when the rising steam is most theatrical',
    transitEase: 'Easy (Direct MRT)',
    overview: [
      'Tucked deep inside Beitou Hot Spring Park, Thermal Valley (地熱谷)—historically dubbed "Hell Valley" by locals—is a natural volcanic sulfur lake that serves as the primary source for Beitou’s legendary green sulfur hot spring bathhouses.',
      'The lake’s superheated emerald waters bubble continuously at temperatures between 80°C and 100°C. Thick, ethereal clouds of white sulfuric mist billow into the surrounding subtropical greenery, creating a dreamlike, mystical atmosphere that has captivated visitors since the Qing Dynasty.',
      'A revitalized wooden observation boardwalk wraps around the lake, featuring sensory hand-soaking mineral channels, steam inhalation rest pavilions, and lush Japanese-style stone landscape paths beside the Beitou Stream.'
    ],
    specialties: [
      {
        title: 'Rare "Green Sulfur" Acidic Spring',
        description: 'One of only two places in the world (along with Akita, Japan) with natural radium-bearing green sulfur spring water containing Hokutolite crystals.'
      },
      {
        title: 'Theatrical Thermal Steam Clouds',
        description: 'Perpetual volcanic vapors rising from the jade-green lake surface and floating through the forest canopy.'
      },
      {
        title: 'Hand-Soaking Mineral Channel',
        description: 'Warm outdoor stone basin allowing visitors to touch and experience the smooth, mineral-rich thermal water.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Take Taipei MRT Red Line to Beitou Station (R22), transfer to the single-stop Xinbeitou Branch Line (Pink) to Xinbeitou Station (R22A).',
      busDetails: 'From Xinbeitou MRT, walk 10–12 minutes uphill through the beautiful Beitou Hot Spring Park along Zhongshan Road.',
      bookingAndTickets: 'Free public admission. Open Tuesday to Sunday, 9:00 AM – 5:00 PM (closed Mondays).',
      easyCardInfo: 'EasyCard accepted on all Taipei MRT trains.',
      tips: [
        'Visit the historic Beitou Hot Spring Museum and the award-winning timber Beitou Public Library located right in the park.',
        'Cooking eggs directly in the thermal lake is strictly prohibited to preserve water quality; you can buy hot spring-boiled eggs at nearby stalls.',
        'Treat yourself to a private hot spring bath or public foot soak after walking the valley.'
      ]
    },
    gallery: [
      {
        id: 'btv-m1',
        type: 'photo',
        url: '/taiwan/beitou-thermal-valley-lake.jpg',
        title: 'Emerald Jade Thermal Sulfur Lake',
        caption: 'Steaming 90°C green sulfur lake surrounded by lush subtropical valley hills and wooden boardwalks.'
      },
      {
        id: 'btv-m2',
        type: 'photo',
        url: '/taiwan/xinbeitou-hotspring-park.jpg',
        title: 'Xinbeitou Hot Spring Park Stream',
        caption: 'Mineral-rich thermal waters flowing gently through stone channels in the historic Japanese-era park.'
      },
      {
        id: 'btv-m3',
        type: 'photo',
        url: '/taiwan/thermal-valley-steaming-water.jpg',
        title: 'Rising Thermal Steam Clouds',
        caption: 'Spectral clouds of sulfuric vapor billowing continuously from the turquoise mineral water surface.'
      },
      {
        id: 'btv-m4',
        type: 'photo',
        url: '/taiwan/thermal-valley-wooden-walkway.jpg',
        title: 'Lakeside Wooden Observation Deck',
        caption: 'Scenic barrier walkway allowing visitors to experience the gentle warmth and therapeutic sulfur aroma.'
      }
    ]
  },
  {
    id: 'beitou-sulfur-valley',
    name: 'Beitou Sulfur Valley Geothermal Scenic Area',
    chineseName: '北投硫磺谷地熱景觀區',
    category: 'nature',
    categoryLabel: 'Volcanic Caldera Basin',
    thumbnail: '/taiwan/beitou-sulfur-valley-geothermal.jpg',
    oneLiner: 'Sprawling amphitheater of rugged yellow rock, boiling geothermal craters, and bubbling mineral streams equipped with scenic wooden boardwalks.',
    tags: ['Day 7', 'Beitou', 'Sulfur Valley', 'Geothermal', 'Volcano Caldera', 'Coastal Trail & Ocean Views'],
    location: 'Beitou District, Taipei City',
    region: 'Northern Taipei',
    recommendedDuration: '1.5 - 2 hours',
    bestTime: 'Afternoon for dramatic sunbeam illumination over the steam clouds',
    transitEase: 'Moderate (Bus / Transfer)',
    overview: [
      'Located just above Xinbeitou on the boundary of Yangmingshan National Park, Sulfur Valley (硫磺谷, Liuhuanggu) is a vast, rugged volcanic crater basin measuring over 700 meters across.',
      'Here, Taiwan’s earliest recorded sulfur mining took place when Qing Dynasty explorer Yu Yonghe arrived in 1697 to quarry sulfur for gunpowder. Today, the dramatic depression remains a breathtaking geothermal showcase of boiling thermal pools, gushing hot mineral streams, and craggy yellow-and-white sulfur-coated boulders.',
      'Elevated wooden walking trails, stone pavilions, and an open-air public foot-soaking pool invite visitors to take in panoramic views of the bubbling crater basin framed against Mount Datun and Mount Qixing.'
    ],
    specialties: [
      {
        title: 'Rugged Volcanic Caldera Basin',
        description: 'Exposed rocky crater terrain with steam vents hissing from cracks and vents in the mineral-stained bedrock.'
      },
      {
        title: 'Public Natural Footbath Pavilion',
        description: 'Large, clean, covered wooden pavilion offering free public foot soaking in natural white sulfur hot spring water.'
      },
      {
        title: 'Historic Gunpowder Sulfur Quarry',
        description: 'The historic site where Yu Yonghe recorded his 1697 expedition in the classic travelogue "Small Sea Travel Diary".'
      }
    ],
    howToGo: {
      metroOrTrain: 'Take Taipei MRT Red Line to Beitou Station (R22), board Bus Small 9 (小9) or Bus Small 7 (小7) to the Sulfur Valley (硫磺谷) stop (approx. 10 mins).',
      busDetails: 'Alternatively, a scenic 20-minute uphill walk along Quanyuan Road from Xinbeitou Station leads directly to the valley entrance.',
      bookingAndTickets: 'Completely free admission to the scenic area and public hot spring footbath.',
      easyCardInfo: 'EasyCard accepted on Small 9 and Small 7 buses.',
      tips: [
        'The free footbath pavilion is open Tuesday through Sunday from 8:00 AM to 6:00 PM.',
        'Sunset across the steam-filled caldera creates surreal, golden photo opportunities.',
        'Combine with nearby Longfenggu (Dragon Phoenix Valley) for an extensive volcanic hiking experience.'
      ]
    },
    gallery: [
      {
        id: 'bsv-m1',
        type: 'photo',
        url: '/taiwan/beitou-sulfur-valley-geothermal.jpg',
        title: 'Volcanic Crater Basin Panorama',
        caption: 'Grand overview of the rugged geothermal amphitheater with bubbling hot springs and steaming rock faces.'
      },
      {
        id: 'bsv-m2',
        type: 'photo',
        url: '/taiwan/sulfur-valley-steaming-crater.jpg',
        title: 'Billowing Geothermal Fumarole Vent',
        caption: 'Intense plume of geothermal steam blasting upward from fractured sulfur-stained volcanic bedrock.'
      },
      {
        id: 'bsv-m3',
        type: 'photo',
        url: '/taiwan/sulfur-valley-mineral-pools.jpg',
        title: 'Yellow Sulfur Mineral Pools & Streams',
        caption: 'Vibrant mineral pools where natural hot spring water collects before being piped to Beitou bathhouses.'
      },
      {
        id: 'bsv-v1',
        type: 'video',
        url: '/taiwan/sulfur-valley-steam-plumes.mp4',
        title: 'Roaring Geothermal Steam Plumes Video',
        caption: 'Capturing the raw power of earth’s geothermal energy venting continuously into the valley sky.',
        duration: '0:03',
        thumbnailUrl: '/taiwan/sulfur-valley-steam-thumb.jpg'
      }
    ]
  },
  {
    id: 'shilin-night-market',
    name: 'Shilin Night Market',
    chineseName: '士林夜市',
    category: 'food',
    categoryLabel: 'Street Gastronomy & Night Bazaar',
    thumbnail: '/taiwan/shilin-night-market-arcade.jpg',
    oneLiner: 'Taipei’s most sprawling night market labyrinth packed with world-famous hot star chicken, flame-torched beef, oyster mee sua, and nostalgic carnival games.',
    tags: ['Day 7', 'Shilin', 'Night Market', 'Street Food', 'Carnival Arcades', 'Street Food & Night Market'],
    location: 'Shilin District, Taipei City',
    region: 'Northern Taipei',
    recommendedDuration: '2 - 3 hours',
    bestTime: 'Evening from 6:30 PM onwards',
    transitEase: 'Easy (Direct MRT)',
    overview: [
      'Established in 1899 near Cixian Temple, Shilin Night Market is Taiwan’s most internationally famous night bazaar. The market is a sensory explosion of sizzling street food stalls, neon-lit alleys, clothing boutiques, and nostalgic carnival game arcades.',
      'The market is divided into two distinct zones: the subterranean air-conditioned underground food court housing traditional sit-down eateries, and a sprawling maze of outdoor streets centered on Dadong Road, Danan Road, and Jihe Road.',
      'From oversized crispy fried chicken cutlets as large as a dinner plate to delicate oyster omelets, flame-torched Angus beef cubes, and icy Taiwanese bubble milk teas, Shilin provides an unforgettable feast for every palate.'
    ],
    specialties: [
      {
        title: 'Hot Star Large Fried Chicken (大雞排)',
        description: 'Crispy golden battered chicken cutlet seasoned with five-spice pepper salt, bigger than the palm of your hand.'
      },
      {
        title: 'Flame-Torched Wagyu Beef Cubes',
        description: 'Tender beef cubes seared to medium-rare perfection on a hot grill with a roaring culinary blowtorch and sea salt.'
      },
      {
        title: 'Retro Carnival Game Arcades',
        description: 'Balloon dart throwing, mahogany marble pinball tables, and claw machines offering prizes and retro nostalgia.'
      }
    ],
    howToGo: {
      metroOrTrain: 'Take Taipei MRT Red Line to Jiantan Station (R15) Exit 1 (NOT Shilin Station!). The main entrance is directly across the street from Jiantan Station.',
      busDetails: 'Over 20 city bus lines stop at Jiantan Station / Shilin Market bus stops.',
      bookingAndTickets: 'Free entry. Most street food items cost between NT$50 and NT$150.',
      easyCardInfo: 'Many food vendors now accept EasyCard, LINE Pay, and cash.',
      tips: [
        'Always get off at Jiantan Station (R15), which is directly adjacent to the market; Shilin Station is a 10-minute walk away.',
        'Visit between 7:00 PM and 10:00 PM when all food stalls and game booths are fully operational.',
        'Carry small change and tissue packets, as street food stalls do not provide table napkins.'
      ]
    },
    gallery: [
      {
        id: 'snm-m1',
        type: 'photo',
        url: '/taiwan/shilin-night-market-arcade.jpg',
        title: 'Glowing Night Market Street Arcade',
        caption: 'Vibrant neon street filled with carnival shooting games, retro pinball, and crowds of eager night owls.'
      },
      {
        id: 'snm-m2',
        type: 'photo',
        url: '/taiwan/shilin-street-food-vendors.jpg',
        title: 'Sizzling Night Market Food Stalls',
        caption: 'Skilled vendors tossing stir-fries, flame-torching premium beef cubes, and grilling giant squid.'
      },
      {
        id: 'snm-m3',
        type: 'photo',
        url: '/taiwan/shilin-food-street-neon.jpg',
        title: 'Illuminated Food Lanes & Signs',
        caption: 'Bustling covered pedestrian lanes bathed in the warm glow of traditional lanterns and food stall signs.'
      },
      {
        id: 'snm-v1',
        type: 'video',
        url: '/taiwan/shilin-night-market-walk.mp4',
        title: 'Walking Through Shilin Night Market Video',
        caption: 'Immersing in the lively sounds, sizzling grills, and electric atmosphere of Taiwan’s premier night market.',
        duration: '0:06',
        thumbnailUrl: '/taiwan/shilin-night-market-thumb.jpg'
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
  videoUrl?: string;
  videoCaption?: string;
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
    imageCaption: 'Taipei MRT commuters standing in single file strictly on the right side of escalators, keeping the left side open for walking.',
    videoUrl: '/taiwan/mrt-escalator-commute.mp4',
    videoCaption: 'Real footage: MRT commuters instinctively stopping on the right side of the escalator, leaving the left lane completely open for people walking up.',
    story: 'My very first morning navigating the underground transfer labyrinth at Taipei Main Station, I was captivated by the escalators. Without a single station guard barking orders or a loudspeaker reminder, hundreds of bustling commuters instinctively stepped strictly onto the right side of every moving stairway and stood still. A flawless, silent single-file line formed naturally, leaving the entire left lane open like a high-speed express overtaking corridor for anyone walking up in a hurry.',
    iconName: 'Train',
    moments: [
      'Commuters stopping and standing strictly on the right side, with everyone walking briskly along the open left lane.',
      'Even at the height of peak transit rush hour with thousands pouring through the turnstiles, the left side remained completely unobstructed.',
      'If a traveler with bulky luggage stood on the left by mistake, no one yelled or sighed; someone would just offer a soft "Bù hǎoyìsi" with a gentle head tilt, and the person immediately tucked into the right.',
      'Transit authorities have actually posted notices saying riders can stand on both sides to balance escalator wear, but the civic custom is so deep in commuters\' muscle memory that everyone stops right and walks left anyway.'
    ],
    personalReflection: 'It was my first glimpse of Taiwan\'s spontaneous collective consideration: individuals instinctively giving up half of their space so that strangers in a rush can walk through without obstruction.',
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


