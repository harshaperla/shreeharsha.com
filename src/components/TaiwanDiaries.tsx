import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin, Compass, Play, Pause, ChevronLeft, ChevronRight, X,
  Clock, Calendar, Info, CheckCircle2, Search, Filter,
  Share2, Volume2, VolumeX, Maximize2, Sparkles, ExternalLink,
  Tag, Train, Mountain, Building2, Utensils, TreePine, Eye,
  Store, Music, ShieldCheck, Umbrella, Smile, Receipt, Lightbulb, Flame
} from 'lucide-react';
import {
  TaiwanPlace,
  TaiwanHighlightSlide,
  TaiwanObservation,
  TaiwanFact,
  TAIWAN_HIGHLIGHTS,
  TAIWAN_PLACES,
  TAIWAN_FACTS
} from '../taiwanData';

interface TaiwanDiariesProps {
  onNavigateSection?: (section: string) => void;
  initialPlaceId?: string | null;
}

export default function TaiwanDiaries({ onNavigateSection, initialPlaceId = null }: TaiwanDiariesProps) {
  // Primary Tabs State: 'places' | 'facts'
  const [activeMainTab, setActiveMainTab] = useState<'places' | 'facts'>('places');

  // Highlight Carousel State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Places Filtering & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Facts Filtering & Search State
  const [factSearchQuery, setFactSearchQuery] = useState('');
  const [selectedFactCategory, setSelectedFactCategory] = useState<string>('all');

  // Selected Place Modal State
  const [activePlace, setActivePlace] = useState<TaiwanPlace | null>(() => {
    if (initialPlaceId) {
      return TAIWAN_PLACES.find(p => p.id === initialPlaceId) || null;
    }
    return null;
  });

  // Modal Gallery State
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mediaFilter, setMediaFilter] = useState<'all' | 'photo' | 'video'>('all');
  const [copiedLink, setCopiedLink] = useState(false);
  const [previewObservationImage, setPreviewObservationImage] = useState<{ url: string; title: string; caption?: string } | null>(null);

  // Auto-play for highlight slides
  useEffect(() => {
    if (isAutoPlaying) {
      slideTimerRef.current = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % TAIWAN_HIGHLIGHTS.length);
      }, 5500);
    }
    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [isAutoPlaying]);

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePlace) {
        if (e.key === 'Escape') {
          handleClosePlaceModal();
        } else if (e.key === 'ArrowRight') {
          handleNextMedia();
        } else if (e.key === 'ArrowLeft') {
          handlePrevMedia();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePlace, activeMediaIndex]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activePlace) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activePlace]);

  // Filtered places
  const filteredPlaces = useMemo(() => {
    return TAIWAN_PLACES.filter((place) => {
      // Category filter
      if (selectedCategory !== 'all' && place.category !== selectedCategory) {
        return false;
      }
      // Tag filter
      if (selectedTag && !place.tags.includes(selectedTag)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = place.name.toLowerCase().includes(q);
        const matchesChinese = place.chineseName.toLowerCase().includes(q);
        const matchesOneLiner = place.oneLiner.toLowerCase().includes(q);
        const matchesLocation = place.location.toLowerCase().includes(q);
        const matchesTags = place.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesChinese && !matchesOneLiner && !matchesLocation && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedTag, searchQuery]);

  // All unique tags across all places
  const allTags = useMemo(() => {
    const set = new Set<string>();
    TAIWAN_PLACES.forEach(p => p.tags.forEach(t => set.add(t)));
    return Array.from(set);
  }, []);

  // Modal Gallery Media List
  const modalMediaList = useMemo(() => {
    if (!activePlace) return [];
    if (mediaFilter === 'all') return activePlace.gallery;
    return activePlace.gallery.filter(m => m.type === mediaFilter);
  }, [activePlace, mediaFilter]);

  const currentMedia = modalMediaList[activeMediaIndex] || modalMediaList[0];

  // Carousel controls
  const handlePrevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlideIndex((prev) => (prev === 0 ? TAIWAN_HIGHLIGHTS.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlideIndex((prev) => (prev + 1) % TAIWAN_HIGHLIGHTS.length);
  };

  // Open modal for a specific place
  const handleOpenPlace = (place: TaiwanPlace) => {
    setActivePlace(place);
    setActiveMediaIndex(0);
    setIsVideoPlaying(false);
    setMediaFilter('all');
  };

  const handleOpenPlaceById = (placeId: string) => {
    const place = TAIWAN_PLACES.find(p => p.id === placeId);
    if (place) {
      handleOpenPlace(place);
    }
  };

  const handleClosePlaceModal = () => {
    setActivePlace(null);
    setIsVideoPlaying(false);
  };

  const handleNextMedia = () => {
    if (modalMediaList.length > 0) {
      setActiveMediaIndex((prev) => (prev + 1) % modalMediaList.length);
      setIsVideoPlaying(false);
    }
  };

  const handlePrevMedia = () => {
    if (modalMediaList.length > 0) {
      setActiveMediaIndex((prev) => (prev === 0 ? modalMediaList.length - 1 : prev - 1));
      setIsVideoPlaying(false);
    }
  };

  // Navigate to adjacent places within the modal
  const handleAdjacentPlace = (direction: 'prev' | 'next') => {
    if (!activePlace) return;
    const currentIndex = TAIWAN_PLACES.findIndex(p => p.id === activePlace.id);
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex < 0) nextIndex = TAIWAN_PLACES.length - 1;
    if (nextIndex >= TAIWAN_PLACES.length) nextIndex = 0;
    handleOpenPlace(TAIWAN_PLACES[nextIndex]);
  };

  const handleCopyShareLink = () => {
    if (activePlace) {
      navigator.clipboard.writeText(`${window.location.origin}/#taiwan/${activePlace.id}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'transit': return Train;
      case 'landmark': return Building2;
      case 'nature': return Mountain;
      case 'food': return Utensils;
      case 'heritage': return Sparkles;
      case 'scenic': return TreePine;
      default: return Compass;
    }
  };

  // Filtered Field Stories & Observations
  const filteredFacts = useMemo(() => {
    return TAIWAN_FACTS.filter((fact) => {
      if (selectedFactCategory !== 'all' && fact.category !== selectedFactCategory) {
        return false;
      }
      if (factSearchQuery.trim()) {
        const q = factSearchQuery.toLowerCase();
        const matchesTitle = fact.title.toLowerCase().includes(q);
        const matchesChinese = fact.chineseTitle ? fact.chineseTitle.toLowerCase().includes(q) : false;
        const matchesStory = fact.story ? fact.story.toLowerCase().includes(q) : false;
        const matchesReflection = fact.personalReflection ? fact.personalReflection.toLowerCase().includes(q) : false;
        const matchesMoments = fact.moments ? fact.moments.some(m => m.toLowerCase().includes(q)) : false;
        const matchesSummary = fact.summary ? fact.summary.toLowerCase().includes(q) : false;
        if (!matchesTitle && !matchesChinese && !matchesStory && !matchesReflection && !matchesMoments && !matchesSummary) {
          return false;
        }
      }
      return true;
    });
  }, [selectedFactCategory, factSearchQuery]);

  const getFactIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return Flame;
      case 'Sparkles': return Sparkles;
      case 'Train': return Train;
      case 'Store': return Store;
      case 'Utensils': return Utensils;
      case 'Music': return Music;
      case 'ShieldCheck': return ShieldCheck;
      case 'Umbrella': return Umbrella;
      case 'Smile': return Smile;
      case 'Receipt': return Receipt;
      default: return Sparkles;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* -------------------- 1. HERO TITLE & STATS BAR -------------------- */}
      <section className="mb-8 text-center md:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>EXPEDITION ARCHIVE • TAIWAN (台灣)</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Taiwan Diaries <span className="text-zinc-500 font-normal">/ 台灣日記</span>
            </h1>
            <p className="mt-3 text-base md:text-lg text-zinc-300 max-w-3xl leading-relaxed">
              Taiwan is a breathtaking blend of lush nature, living culture, cutting-edge modernity, and unmatched everyday convenience. From misty Pacific mountain headlands and ancient temple incense to precision high-speed transit and 24/7 convenience life, it is an island of remarkable civil discipline, seamless exploration, and warm hospitality.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/60 backdrop-blur-sm self-start md:self-auto">
            <div className="text-center px-2 py-1">
              <span className="block text-lg sm:text-xl font-bold font-mono text-emerald-400">{TAIWAN_PLACES.length}</span>
              <span className="text-[10px] uppercase tracking-wider text-zinc-500">Places Visited</span>
            </div>
            <div className="text-center px-2 py-1 border-x border-zinc-800">
              <span className="block text-lg sm:text-xl font-bold font-mono text-amber-400">{TAIWAN_FACTS.length}</span>
              <span className="text-[10px] uppercase tracking-wider text-zinc-500">Field Stories</span>
            </div>
            <div className="text-center px-2 py-1">
              <span className="block text-lg sm:text-xl font-bold font-mono text-cyan-400">2 Regions</span>
              <span className="text-[10px] uppercase tracking-wider text-zinc-500">Taipei • Keelung</span>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- 2. MAIN NAVIGATION TABS -------------------- */}
      <div className="flex items-center space-x-3 border-b border-zinc-800/80 pb-4 mb-8">
        <button
          onClick={() => setActiveMainTab('places')}
          className={`flex items-center space-x-2.5 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            activeMainTab === 'places'
              ? 'bg-zinc-800 text-white border border-zinc-700 shadow-md'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 border border-transparent'
          }`}
          id="taiwan-tab-places"
        >
          <Compass className={`w-4 h-4 ${activeMainTab === 'places' ? 'text-emerald-400' : 'text-zinc-400'}`} />
          <span>Places Visited</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 font-mono border border-zinc-800">
            {TAIWAN_PLACES.length}
          </span>
        </button>

        <button
          onClick={() => setActiveMainTab('facts')}
          className={`flex items-center space-x-2.5 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            activeMainTab === 'facts'
              ? 'bg-zinc-800 text-white border border-zinc-700 shadow-md'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 border border-transparent'
          }`}
          id="taiwan-tab-facts"
        >
          <Sparkles className={`w-4 h-4 ${activeMainTab === 'facts' ? 'text-amber-400' : 'text-zinc-400'}`} />
          <span>Stories & Observations</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 font-mono border border-zinc-800">
            {TAIWAN_FACTS.length}
          </span>
        </button>
      </div>

      {/* -------------------- PLACES TAB CONTENT -------------------- */}
      {activeMainTab === 'places' && (
        <>
          {/* -------------------- HORIZONTAL SLIDES: HIGHLIGHT PHOTOS & VIDEOS -------------------- */}
          <section className="mb-14" aria-label="Highlight Gallery">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-mono">
              Highlights Reel & Cinematic Slides
            </h2>
          </div>

          {/* Slide Navigation Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="px-2.5 py-1 rounded-md text-xs font-mono border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white hover:border-zinc-700 transition flex items-center space-x-1.5"
              title={isAutoPlaying ? 'Pause autoplay' : 'Resume autoplay'}
              aria-label={isAutoPlaying ? 'Pause slides autoplay' : 'Resume slides autoplay'}
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-emerald-400" /> : <Play className="w-3.5 h-3.5 text-zinc-400" />}
              <span className="hidden sm:inline">{isAutoPlaying ? 'Playing' : 'Paused'}</span>
            </button>

            <button
              onClick={handlePrevSlide}
              className="p-1.5 rounded-md border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white hover:border-zinc-600 transition"
              aria-label="Previous Highlight Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-mono text-xs text-zinc-500 px-1">
              {String(currentSlideIndex + 1).padStart(2, '0')} / {String(TAIWAN_HIGHLIGHTS.length).padStart(2, '0')}
            </span>

            <button
              onClick={handleNextSlide}
              className="p-1.5 rounded-md border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white hover:border-zinc-600 transition"
              aria-label="Next Highlight Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Highlight Carousel Viewport */}
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900 group shadow-2xl">
          {/* Main Slide Image / Display */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[2.4/1] w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={TAIWAN_HIGHLIGHTS[currentSlideIndex].id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0"
              >
                <img
                  src={TAIWAN_HIGHLIGHTS[currentSlideIndex].imageUrl}
                  alt={TAIWAN_HIGHLIGHTS[currentSlideIndex].title}
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Atmospheric gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent" />

                {/* Video Play Indicator Overlay if slide is video */}
                {TAIWAN_HIGHLIGHTS[currentSlideIndex].type === 'video' && (
                  <button
                    onClick={() => handleOpenPlaceById(TAIWAN_HIGHLIGHTS[currentSlideIndex].placeId)}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 flex items-center justify-center text-white hover:bg-emerald-500/30 hover:scale-110 transition-all duration-300 group/play shadow-lg cursor-pointer"
                    aria-label="Play Highlight Video"
                  >
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-emerald-400 text-emerald-400 translate-x-0.5 group-hover/play:scale-105 transition-transform" />
                  </button>
                )}

                {/* Slide Caption & Metadata Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="max-w-2xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold tracking-wider uppercase border ${
                        TAIWAN_HIGHLIGHTS[currentSlideIndex].type === 'video'
                          ? 'bg-red-500/10 text-red-400 border-red-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      }`}>
                        {TAIWAN_HIGHLIGHTS[currentSlideIndex].badge}
                      </span>
                      {TAIWAN_HIGHLIGHTS[currentSlideIndex].videoDuration && (
                        <span className="text-[11px] font-mono text-zinc-400 flex items-center space-x-1 bg-black/40 px-2 py-0.5 rounded">
                          <Clock className="w-3 h-3 text-zinc-400" />
                          <span>{TAIWAN_HIGHLIGHTS[currentSlideIndex].videoDuration}</span>
                        </span>
                      )}
                      <span className="text-zinc-400 text-xs flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>{TAIWAN_HIGHLIGHTS[currentSlideIndex].location}</span>
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">
                      {TAIWAN_HIGHLIGHTS[currentSlideIndex].title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-zinc-300 line-clamp-2 drop-shadow">
                      {TAIWAN_HIGHLIGHTS[currentSlideIndex].subtitle}
                    </p>
                  </div>

                  {/* Action Link Button */}
                  <button
                    onClick={() => handleOpenPlaceById(TAIWAN_HIGHLIGHTS[currentSlideIndex].placeId)}
                    className="self-start md:self-auto inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-emerald-500 text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-emerald-400 transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    <span>Explore Place & Gallery</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Slide Strip Bar with Dots */}
          <div className="bg-zinc-950/90 border-t border-zinc-800/80 px-4 py-3 flex items-center justify-between">
            <div className="flex space-x-1.5 overflow-x-auto py-1">
              {TAIWAN_HIGHLIGHTS.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setCurrentSlideIndex(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentSlideIndex
                      ? 'w-8 bg-emerald-400'
                      : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                  aria-label={`Jump to slide ${idx + 1}: ${slide.title}`}
                />
              ))}
            </div>

            <div className="text-xs text-zinc-400 font-mono hidden sm:block">
              Click any slide or press arrows to navigate
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- 3. PLACES & ATTRACTIONS LIST -------------------- */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Compass className="w-6 h-6 text-emerald-400" />
              <span>Visited Places & Attractions</span>
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Click any attraction for full photo/video galleries, engineering marvels, and step-by-step transit guides.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places, bullet train, tags..."
              className="w-full bg-zinc-900/90 border border-zinc-800 rounded-lg pl-9 pr-8 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition"
              id="taiwan-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>



        {/* Category Filter Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
          {[
            { id: 'all', label: 'All Categories', count: TAIWAN_PLACES.length },
            { id: 'transit', label: 'Transit & Rail', count: TAIWAN_PLACES.filter(p => p.category === 'transit').length },
            { id: 'landmark', label: 'Landmark & Youth District', count: TAIWAN_PLACES.filter(p => p.category === 'landmark').length },
            { id: 'heritage', label: 'Historic & Temples', count: TAIWAN_PLACES.filter(p => p.category === 'heritage').length },
            { id: 'food', label: 'Street Food & Night Market', count: TAIWAN_PLACES.filter(p => p.category === 'food').length },
            { id: 'nature', label: 'Coastal Trail & Ocean Views', count: TAIWAN_PLACES.filter(p => p.category === 'nature').length },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedTag(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-zinc-200 text-zinc-950 font-bold shadow'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === cat.id ? 'bg-zinc-400/40 text-zinc-900' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tag Filters (Active or Popular) */}
        {selectedTag && (
          <div className="mb-4 flex items-center space-x-2 text-xs text-zinc-400 bg-zinc-800/60 border border-zinc-700/60 px-3 py-1.5 rounded-lg w-fit">
            <span>Filtered by tag:</span>
            <span className="font-semibold text-zinc-200">#{selectedTag}</span>
            <button
              onClick={() => setSelectedTag(null)}
              className="text-zinc-400 hover:text-white ml-1 cursor-pointer"
              aria-label="Remove tag filter"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Grid of Places / Attractions */}
        {filteredPlaces.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30">
            <Compass className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-zinc-300">No matching attractions found</h3>
            <p className="text-sm text-zinc-500 mt-1">Try adjusting your search terms or category filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTag(null);
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-zinc-800 text-xs font-semibold text-zinc-300 hover:bg-zinc-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => {
              const CategoryIcon = getCategoryIcon(place.category);
              return (
                <motion.div
                  key={place.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleOpenPlace(place)}
                  className="group bg-zinc-900/70 border border-zinc-800/80 hover:border-emerald-500/40 rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 relative"
                  id={`place-card-${place.id}`}
                >
                  {/* Thumbnail Image Box */}
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                      <img
                        src={place.thumbnail}
                        alt={place.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-[11px] font-medium text-emerald-400">
                        <CategoryIcon className="w-3 h-3" />
                        <span>{place.categoryLabel}</span>
                      </div>

                      {/* Transit Ease Pill */}
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900/90 text-zinc-300 border border-zinc-800 backdrop-blur-sm">
                        {place.transitEase.split(' ')[0]}
                      </div>

                      {/* Media Count Pill */}
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-black/60 text-zinc-300 backdrop-blur-sm flex items-center space-x-1">
                        <Eye className="w-3 h-3 text-emerald-400" />
                        <span>{place.gallery.length} Media</span>
                      </div>
                    </div>

                    {/* Card Content Area */}
                    <div className="p-5">
                      {/* Place Name + Chinese Name */}
                      <div className="mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors tracking-tight flex items-baseline justify-between">
                          <span>{place.name}</span>
                        </h3>
                        <span className="text-xs font-mono text-zinc-500">{place.chineseName}</span>
                      </div>

                      {/* One Liner */}
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                        {place.oneLiner}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {place.tags.map((tag) => (
                          <span
                            key={tag}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTag(tag);
                            }}
                            className={`text-[11px] font-mono px-2 py-0.5 rounded transition ${
                              selectedTag === tag
                                ? 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                                : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800/60'
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Metadata Bar */}
                  <div className="px-5 py-3 border-t border-zinc-800/60 bg-zinc-950/40 flex items-center justify-between text-xs text-zinc-400 font-mono">
                    <span className="flex items-center space-x-1 truncate max-w-[65%]">
                      <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{place.region}</span>
                    </span>

                    <span className="text-emerald-400 font-sans font-medium flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
        </>
      )}

      {/* -------------------- 3. INTERESTING FACTS & ETIQUETTE TAB -------------------- */}
      {activeMainTab === 'facts' && (
        <section aria-label="Taiwan Cultural Facts and Etiquette" className="animate-in fade-in duration-300">
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-amber-400" />
                <span>Field Stories & Cultural Observations</span>
              </h2>
              <p className="text-sm text-zinc-400 mt-1 max-w-3xl">
                Personal reflections, street rituals, and everyday cultural moments observed firsthand while exploring the temples, metro corridors, and neighborhood alleys of Taiwan.
              </p>
            </div>

            {/* Search Input for Stories */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={factSearchQuery}
                onChange={(e) => setFactSearchQuery(e.target.value)}
                placeholder="Search paper burning, Kuai Kuai, boba..."
                className="w-full bg-zinc-900/90 border border-zinc-800 rounded-lg pl-9 pr-8 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400/70 transition"
                id="taiwan-fact-search-input"
              />
              {factSearchQuery && (
                <button
                  onClick={() => setFactSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                  aria-label="Clear story search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Story Category Filter Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
            {[
              { id: 'all', label: 'All Stories', count: TAIWAN_FACTS.length },
              { id: 'culture', label: 'Spiritual & Temple Rituals', count: TAIWAN_FACTS.filter(f => f.category === 'culture').length },
              { id: 'transit', label: 'Transit & Metro', count: TAIWAN_FACTS.filter(f => f.category === 'transit').length },
              { id: 'convenience', label: 'Everyday Convenience', count: TAIWAN_FACTS.filter(f => f.category === 'convenience').length },
              { id: 'civic', label: 'Neighborhood & Civic Habits', count: TAIWAN_FACTS.filter(f => f.category === 'civic').length },
              { id: 'food', label: 'Culinary Culture', count: TAIWAN_FACTS.filter(f => f.category === 'food').length },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFactCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center space-x-2 cursor-pointer ${
                  selectedFactCategory === cat.id
                    ? 'bg-zinc-200 text-zinc-950 font-bold shadow'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedFactCategory === cat.id ? 'bg-zinc-400/40 text-zinc-900' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Stories Grid */}
          {filteredFacts.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30">
              <Sparkles className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-zinc-300">No matching observations found</h3>
              <p className="text-sm text-zinc-500 mt-1">Try searching for terms like paper burning, Kuai Kuai, escalator, or boba.</p>
              <button
                onClick={() => {
                  setFactSearchQuery('');
                  setSelectedFactCategory('all');
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-zinc-800 text-xs font-semibold text-zinc-300 hover:bg-zinc-700 transition cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFacts.map((fact) => {
                const FactIcon = getFactIcon(fact.iconName);
                return (
                  <motion.div
                    key={fact.id}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-amber-500/5 group"
                    id={`fact-card-${fact.id}`}
                  >
                    <div>
                      {/* Top Header Row: Icon, Category Badge & Chinese Name */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-amber-400 group-hover:scale-105 transition-transform">
                            <FactIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block">
                              {fact.categoryLabel}
                            </span>
                            {fact.chineseTitle && (
                              <span className="text-xs font-mono text-zinc-400">
                                {fact.chineseTitle}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Media Explaining the Observation Story (Video or Photo) */}
                      {fact.videoUrl ? (
                        <div className="mb-4">
                          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-zinc-800/80 bg-black shadow-inner">
                            <video
                              src={fact.videoUrl}
                              controls
                              playsInline
                              preload="metadata"
                              poster={fact.imageUrl}
                              className="w-full h-full object-cover"
                            />
                            {fact.videoCaption && (
                              <div className="p-2.5 bg-zinc-950/90 border-t border-zinc-800/60">
                                <p className="text-[11.5px] text-zinc-300 font-sans leading-snug">
                                  {fact.videoCaption}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : fact.imageUrl ? (
                        <div className="mb-4">
                          <div
                            onClick={() => setPreviewObservationImage({
                              url: fact.imageUrl!,
                              title: fact.title,
                              caption: fact.imageCaption
                            })}
                            className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-zinc-800/80 bg-zinc-950 group/img cursor-pointer shadow-inner"
                            title="Click to view full image"
                          >
                            <img
                              src={fact.imageUrl}
                              alt={fact.title}
                              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover/img:opacity-60 transition-opacity" />
                            
                            <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white/80 group-hover/img:text-white group-hover/img:scale-110 transition-all shadow-md">
                              <Maximize2 className="w-3.5 h-3.5" />
                            </div>

                            {fact.imageCaption && (
                              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/95 via-black/75 to-transparent">
                                <p className="text-[11.5px] text-zinc-300 font-sans leading-snug line-clamp-2">
                                  {fact.imageCaption}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : null}

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-3 group-hover:text-amber-200 transition-colors">
                        {fact.title}
                      </h3>

                      {/* First-person Narrative Story */}
                      <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                        {fact.story || fact.summary}
                      </p>

                      {/* Scenes Noticed On The Ground */}
                      <div className="mb-5 bg-zinc-950/40 rounded-xl p-3.5 border border-zinc-800/60">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block mb-2 font-semibold">
                          What caught my eye:
                        </span>
                        <ul className="space-y-2">
                          {(fact.moments || fact.details).map((moment, idx) => (
                            <li key={idx} className="text-xs sm:text-sm text-zinc-400 flex items-start space-x-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 mt-1.5 flex-shrink-0" />
                              <span className="leading-relaxed">{moment}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Personal Reflection Box */}
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 flex items-start space-x-2.5">
                      <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-amber-200/90 leading-relaxed">
                        <strong className="text-amber-300 font-semibold mr-1">My Reflection:</strong>
                        <span>{fact.personalReflection || fact.etiquetteTip}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* -------------------- 4. INTERACTIVE DETAIL MODAL / DRAWER -------------------- */}
      <AnimatePresence>
        {activePlace && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={handleClosePlaceModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-place-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[92vh] bg-zinc-950 border border-zinc-800 rounded-2xl overflow-y-auto shadow-2xl flex flex-col my-auto"
            >
              {/* Modal Sticky Header */}
              <div className="sticky top-0 z-20 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 id="modal-place-title" className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center space-x-2">
                      <span>{activePlace.name}</span>
                      <span className="text-xs sm:text-sm font-mono text-zinc-500 font-normal">
                        ({activePlace.chineseName})
                      </span>
                    </h2>
                    <div className="flex items-center space-x-2 text-xs text-zinc-400 font-mono mt-0.5">
                      <span className="text-emerald-400 font-semibold">{activePlace.categoryLabel}</span>
                      <span>•</span>
                      <span>{activePlace.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyShareLink}
                    className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition relative"
                    title="Copy share link"
                    aria-label="Copy share link"
                  >
                    <Share2 className="w-4 h-4" />
                    {copiedLink && (
                      <span className="absolute -bottom-7 right-0 text-[10px] font-mono bg-emerald-500 text-zinc-950 px-2 py-0.5 rounded font-bold whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </button>

                  <button
                    onClick={handleClosePlaceModal}
                    className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition"
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Main Body Content */}
              <div className="p-4 sm:p-6 md:p-8 space-y-8">
                {/* 4.1 PHOTO / VIDEO GALLERY VIEWER */}
                <section aria-label="Photo and Video Gallery">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
                        Photo & Video Gallery ({modalMediaList.length})
                      </h3>
                    </div>

                    {/* Filter media tabs */}
                    <div className="flex space-x-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800 text-xs font-mono">
                      {(['all', 'photo', 'video'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setMediaFilter(type);
                            setActiveMediaIndex(0);
                            setIsVideoPlaying(false);
                          }}
                          className={`px-2.5 py-1 rounded capitalize transition ${
                            mediaFilter === type
                              ? 'bg-zinc-800 text-white font-bold'
                              : 'text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          {type === 'all' ? 'All' : `${type}s`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main Gallery Display Screen */}
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 group shadow-inner">
                    {currentMedia ? (
                      <>
                        {currentMedia.type === 'video' ? (
                          isVideoPlaying ? (
                            <div className="relative w-full h-full bg-black flex items-center justify-center">
                              <video
                                src={currentMedia.url}
                                autoPlay
                                controls
                                playsInline
                                className="w-full h-full max-h-full object-contain"
                                onEnded={() => setIsVideoPlaying(false)}
                              />
                            </div>
                          ) : (
                            <div className="relative w-full h-full">
                              <img
                                src={currentMedia.thumbnailUrl || currentMedia.url.replace('.mp4', '.jpg')}
                                alt={currentMedia.title}
                                className="w-full h-full object-cover object-center"
                              />
                              <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col justify-between p-4 sm:p-6">
                                <div className="flex items-center justify-between">
                                  <span className="px-2.5 py-1 rounded bg-red-600/90 text-white font-mono text-[10px] font-bold tracking-wider uppercase flex items-center space-x-1.5 shadow">
                                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    <span>REAL EXPEDITION FOOTAGE</span>
                                  </span>

                                  <span className="text-xs font-mono text-zinc-200 bg-black/60 px-2.5 py-0.5 rounded border border-white/10">
                                    {currentMedia.duration || '0:10'}
                                  </span>
                                </div>

                                {/* Center Play trigger */}
                                <button
                                  onClick={() => setIsVideoPlaying(true)}
                                  className="self-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center hover:bg-emerald-400 hover:scale-110 transition shadow-2xl cursor-pointer"
                                  aria-label="Play video clip"
                                >
                                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-zinc-950 translate-x-0.5" />
                                </button>

                                {/* Video Info Bar */}
                                <div className="bg-black/70 backdrop-blur-md rounded-lg p-2.5 border border-white/10 flex items-center justify-between text-xs font-mono text-zinc-300">
                                  <span className="font-medium text-white">{currentMedia.title}</span>
                                  <span className="text-emerald-400 flex items-center gap-1 font-bold">
                                    <Play className="w-3 h-3 fill-emerald-400" />
                                    <span>Click to Play</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        ) : (
                          <div className="relative w-full h-full">
                            <img
                              src={currentMedia.url}
                              alt={currentMedia.title}
                              className="w-full h-full object-cover object-center bg-zinc-950"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent flex items-end p-4 sm:p-6 pointer-events-none">
                              <div>
                                <h4 className="text-base sm:text-lg font-bold text-white drop-shadow">
                                  {currentMedia.title}
                                </h4>
                                <p className="text-xs sm:text-sm text-zinc-300 mt-1 drop-shadow">
                                  {currentMedia.caption}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Prev & Next Gallery Arrows */}
                        {modalMediaList.length > 1 && (
                          <>
                            <button
                              onClick={handlePrevMedia}
                              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition border border-white/10"
                              aria-label="Previous Media"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                              onClick={handleNextMedia}
                              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition border border-white/10"
                              aria-label="Next Media"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full text-zinc-500 font-mono text-xs">
                        No media available in this category
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Filmstrip */}
                  {modalMediaList.length > 1 && (
                    <div className="flex space-x-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
                      {modalMediaList.map((media, idx) => (
                        <button
                          key={media.id}
                          onClick={() => {
                            setActiveMediaIndex(idx);
                            setIsVideoPlaying(false);
                          }}
                          className={`relative aspect-[16/10] w-24 sm:w-28 rounded-lg overflow-hidden flex-shrink-0 border transition-all ${
                            idx === activeMediaIndex
                              ? 'border-emerald-400 ring-2 ring-emerald-400/20 scale-102'
                              : 'border-zinc-800 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={media.thumbnailUrl || media.url}
                            alt={media.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-black/70 text-white">
                            {media.type === 'video' ? 'VIDEO' : 'PHOTO'}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </section>

                {/* 4.2 QUICK SPECS MATRIX */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/80">
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500">Region</span>
                    <span className="text-xs sm:text-sm font-semibold text-zinc-200 mt-0.5 block">{activePlace.region}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500">Duration</span>
                    <span className="text-xs sm:text-sm font-semibold text-zinc-200 mt-0.5 block">{activePlace.recommendedDuration}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500">Best Time</span>
                    <span className="text-xs sm:text-sm font-semibold text-zinc-200 mt-0.5 block truncate" title={activePlace.bestTime}>
                      {activePlace.bestTime}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500">Transit Mode</span>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-400 mt-0.5 block">{activePlace.transitEase}</span>
                  </div>
                </div>

                {/* 4.3 WHAT IS THIS PLACE / ATTRACTION? (Overview) */}
                <section>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center space-x-2 mb-3">
                    <Info className="w-5 h-5 text-emerald-400" />
                    <span>What is this Attraction / Place?</span>
                  </h3>
                  <div className="space-y-3 text-sm sm:text-base text-zinc-300 leading-relaxed bg-zinc-900/30 p-5 rounded-xl border border-zinc-800/60">
                    {activePlace.overview.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </section>

                {/* 4.4 SPECIALITIES & KEY HIGHLIGHTS */}
                <section>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center space-x-2 mb-3">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>Specialities & Must-Experience Highlights</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activePlace.specialties.map((spec, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition"
                      >
                        <h4 className="text-sm font-bold text-white mb-1.5 flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span>{spec.title}</span>
                        </h4>
                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                          {spec.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 4.5 INSTRUCTIONS & HOW TO GO */}
                <section>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center space-x-2 mb-3">
                    <Train className="w-5 h-5 text-cyan-400" />
                    <span>Instructions & How To Go</span>
                  </h3>

                  <div className="space-y-4 bg-zinc-900/40 p-5 rounded-xl border border-zinc-800/80">
                    {activePlace.howToGo.metroOrTrain && (
                      <div className="border-l-2 border-emerald-400 pl-4 py-1">
                        <span className="block font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                          Train / Metro (MRT) Route
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                          {activePlace.howToGo.metroOrTrain}
                        </p>
                      </div>
                    )}

                    {activePlace.howToGo.busDetails && (
                      <div className="border-l-2 border-cyan-400 pl-4 py-1">
                        <span className="block font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider">
                          Bus Connection
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                          {activePlace.howToGo.busDetails}
                        </p>
                      </div>
                    )}

                    {activePlace.howToGo.bookingAndTickets && (
                      <div className="border-l-2 border-amber-400 pl-4 py-1">
                        <span className="block font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
                          Tickets & Booking
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                          {activePlace.howToGo.bookingAndTickets}
                        </p>
                      </div>
                    )}

                    {activePlace.howToGo.easyCardInfo && (
                      <div className="border-l-2 border-violet-400 pl-4 py-1">
                        <span className="block font-mono text-xs font-bold text-violet-400 uppercase tracking-wider">
                          EasyCard / iPASS Information
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                          {activePlace.howToGo.easyCardInfo}
                        </p>
                      </div>
                    )}

                    {/* Pro Traveler Tips */}
                    <div className="mt-4 pt-4 border-t border-zinc-800">
                      <span className="block font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                        Essential Pro Tips
                      </span>
                      <ul className="space-y-2">
                        {activePlace.howToGo.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-zinc-300">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>

              {/* Modal Footer with Adjacent Navigation */}
              <div className="sticky bottom-0 z-20 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800/80 px-4 sm:px-6 py-3 flex items-center justify-between">
                <button
                  onClick={() => handleAdjacentPlace('prev')}
                  className="px-3 py-1.5 rounded-lg border border-zinc-800 text-xs text-zinc-400 hover:text-white hover:border-zinc-700 flex items-center space-x-1.5 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Attraction</span>
                </button>

                <button
                  onClick={handleClosePlaceModal}
                  className="px-4 py-1.5 rounded-lg bg-zinc-800 text-xs font-semibold text-zinc-200 hover:bg-zinc-700 transition"
                >
                  Close Guide
                </button>

                <button
                  onClick={() => handleAdjacentPlace('next')}
                  className="px-3 py-1.5 rounded-lg border border-zinc-800 text-xs text-zinc-400 hover:text-white hover:border-zinc-700 flex items-center space-x-1.5 transition"
                >
                  <span>Next Attraction</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Observation Photo Lightbox Modal */}
      <AnimatePresence>
        {previewObservationImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setPreviewObservationImage(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col my-auto"
            >
              <div className="p-4 sm:px-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                <div className="pr-4">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {previewObservationImage.title}
                  </h3>
                  {previewObservationImage.caption && (
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      {previewObservationImage.caption}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setPreviewObservationImage(null)}
                  className="p-2 rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-zinc-400 hover:text-white hover:bg-zinc-700 transition cursor-pointer flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-zinc-950 p-2 sm:p-4">
                <img
                  src={previewObservationImage.url}
                  alt={previewObservationImage.title}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
