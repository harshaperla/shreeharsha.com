import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Search, Calendar, Clock, Tag, MapPin, 
  Compass, Mountain, Hash, Languages, Globe 
} from 'lucide-react';
import { BlogPost, BlogType } from '../types';
import { BLOG_POSTS, SHREEHARSHA_BIO } from '../data';

interface BlogSectionProps {
  initialType?: BlogType;
}

export default function BlogSection({ initialType = 'tech' }: BlogSectionProps) {
  const [selectedType, setSelectedType] = useState<BlogType>(initialType);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [kannadaTranslationEnabled, setKannadaTranslationEnabled] = useState(true);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  // Synchronize or reset sectional navigation state
  React.useEffect(() => {
    const post = BLOG_POSTS.find(p => p.id === activePostId);
    if (post?.sections && post.sections.length > 0) {
      setActiveSectionId(post.sections[0].id);
    } else {
      setActiveSectionId(null);
    }
  }, [activePostId]);

  // Filter posts based on selected tab, search query, and selected tag
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      // Must match active blog tab type
      if (post.type !== selectedType) return false;

      // Must match search query if any
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesSubtitle = post.subtitle?.toLowerCase().includes(query) || false;
        const matchesIntro = post.intro.toLowerCase().includes(query);
        const matchesTags = post.tags.some(tag => tag.toLowerCase().includes(query));
        const matchesKannada = post.kannadaTitle?.toLowerCase().includes(query) || false;
        
        if (!matchesTitle && !matchesSubtitle && !matchesIntro && !matchesTags && !matchesKannada) {
          return false;
        }
      }

      // Must match selected tag if any
      if (selectedTag && !post.tags.includes(selectedTag)) {
        return false;
      }

      return true;
    });
  }, [selectedType, searchQuery, selectedTag]);

  // Derive all unique tags for the currently selected blog type
  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>();
    BLOG_POSTS.forEach((post) => {
      if (post.type === selectedType) {
        post.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    return Array.from(tagsSet);
  }, [selectedType]);

  // Reset page parameters when switching tabs
  const handleTabChange = (type: BlogType) => {
    setSelectedType(type);
    setSearchQuery('');
    setSelectedTag(null);
    setActivePostId(null);
  };

  const activePost = useMemo(() => {
    return BLOG_POSTS.find(post => post.id === activePostId);
  }, [activePostId]);

  // Inline custom renderer to parse markdown-like structures we drafted in data.ts
  const renderBlogPostContent = (text: string) => {
    const lines = text.split('\n');
    let insideList = false;
    let listItems: string[] = [];

    return lines.map((line, idx) => {
      const trimmed = line.trim();

      // Heading 3
      if (trimmed.startsWith('### ')) {
        const hText = trimmed.replace('### ', '');
        return (
          <h3 key={idx} className="font-sans font-bold text-xl text-white mt-8 mb-4 border-l-4 border-zinc-200 pl-3">
            {hText}
          </h3>
        );
      }

      // Markdown Images Support: ![alt](src)
      if (trimmed.startsWith('![') && trimmed.endsWith(')')) {
        const match = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (match) {
          const alt = match[1];
          const src = match[2];
          return (
            <div key={idx} className="my-6 flex flex-col items-center">
              <img 
                src={src} 
                alt={alt} 
                className="rounded-xl border border-zinc-800/60 max-w-full md:max-w-2xl lg:max-w-3xl object-contain shadow-2xl shadow-black/50" 
              />
              {alt && <span className="text-zinc-500 font-mono text-xs mt-3 tracking-wide">{alt}</span>}
            </div>
          );
        }
      }
      // Divider
      if (trimmed === '---') {
        return <hr key={idx} className="border-zinc-800 my-8" />;
      }

      // Strong / Bold indicators
      // Example: **Term:** or **Text**
      let parsedLine: React.ReactNode = line;
      if (trimmed.includes('**')) {
        const parts = line.split('**');
        parsedLine = parts.map((part, pIdx) => {
          if (pIdx % 2 === 1) {
            return <strong key={pIdx} className="font-semibold text-white">{part}</strong>;
          }
          return part;
        });
      }

      // Numeric lists or bullet items
      if (trimmed.startsWith('- ')) {
        const itemText = trimmed.replace('- ', '');
        return (
          <li key={idx} className="font-sans text-sm text-zinc-300 ml-6 list-disc mb-2 leading-relaxed">
            {itemText}
          </li>
        );
      }

      if (/^\d+\.\s/.test(trimmed)) {
        const itemText = trimmed.replace(/^\d+\.\s/, '');
        return (
          <li key={idx} className="font-sans text-sm text-zinc-300 ml-6 list-decimal mb-2 leading-relaxed">
            {itemText}
          </li>
        );
      }

      // Code blocks logic (simple inline renderer)
      if (trimmed.startsWith('```')) {
        // If it's a code block toggle, skip rendering raw syntax markers
        if (trimmed === '```' || trimmed.startsWith('```typescript') || trimmed.startsWith('```json')) {
          return null;
        }
      }

      // Check if line actually belongs to a code snippet block
      const isInsideCodeSegment = trimmed.startsWith('{') || trimmed.startsWith('}') || trimmed.startsWith('"action"') || trimmed.startsWith('interface ') || trimmed.startsWith('type ') || trimmed.startsWith('[ ') || trimmed.includes('evaluate(') || trimmed.startsWith('type ') || trimmed.startsWith('const ');
      if (isInsideCodeSegment) {
        return (
          <pre key={idx} className="font-mono text-xs text-sky-300 bg-zinc-950 p-3 rounded-lg border border-zinc-900 overflow-x-auto my-2 max-w-full">
            <code>{line}</code>
          </pre>
        );
      }

      // Simple Table markdown
      if (trimmed.startsWith('|') && trimmed.includes('-')) {
        return null; // Skip table borders
      }
      if (trimmed.startsWith('|')) {
        const cells = trimmed.split('|').map(c => c.trim()).filter(c => c !== '');
        const isHeaderRow = trimmed.includes('Sector') || trimmed.includes('Dist');
        return (
          <div key={idx} className={`grid grid-cols-4 gap-2 p-3 font-sans text-xs border border-zinc-900 ${isHeaderRow ? 'bg-zinc-900 text-white font-bold' : 'text-zinc-300'}`}>
            {cells.map((cell, cIdx) => (
              <span key={cIdx}>{cell}</span>
            ))}
          </div>
        );
      }

      if (trimmed === '') {
        return <div key={idx} className="h-4" />;
      }

      // Regular paragraph
      return (
        <p key={idx} className="font-sans text-sm text-zinc-300 leading-relaxed mb-4">
          {parsedLine}
        </p>
      );
    });
  };

  const currentTabName = () => {
    switch(selectedType) {
      case 'tech': return 'Systems & Architecture';
      case 'kannada': return 'ಕನ್ನಡ ಸಾಹಿತ್ಯ ಮತ್ತು ಚಿಂತನೆ';
      case 'travel': return 'Monsoon Trails & Geographies';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12" id="blog-section-wrapper">
      <AnimatePresence mode="wait">
        {!activePost ? (
          /* =========================================================================
             1. LIST VIEW MODE
             ========================================================================= */
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Blog Sub-Navigation Tabs */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-6 gap-4">
              <div>
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Writings & Explorations</span>
                <h2 className="font-sans font-extrabold text-3xl text-white tracking-tight mt-1">
                  {currentTabName()}
                </h2>
              </div>

              {/* Slider Controls */}
              <div className="flex bg-[#18181c] p-1 border border-zinc-800/30 rounded-xl w-full md:w-auto">
                <button
                  onClick={() => handleTabChange('tech')}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-sans text-xs font-semibold tracking-wider uppercase transition-all ${
                    selectedType === 'tech'
                      ? 'bg-zinc-800/50 text-white shadow-md'
                      : 'text-zinc-400 hover:text-zinc-250'
                  }`}
                  id="tab-select-tech"
                >
                  Tech
                </button>
                <button
                  onClick={() => handleTabChange('kannada')}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-sans text-xs font-semibold tracking-wider uppercase transition-all ${
                    selectedType === 'kannada'
                      ? 'bg-zinc-800/50 text-white shadow-md'
                      : 'text-zinc-400 hover:text-zinc-250'
                  }`}
                  id="tab-select-kannada"
                >
                  ಕನ್ನಡ
                </button>
                <button
                  onClick={() => handleTabChange('travel')}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-sans text-xs font-semibold tracking-wider uppercase transition-all ${
                    selectedType === 'travel'
                      ? 'bg-zinc-800/50 text-white shadow-md'
                      : 'text-zinc-400 hover:text-zinc-250'
                  }`}
                  id="tab-select-travel"
                >
                  Travel
                </button>
              </div>
            </div>

            {/* Controls Bar: Search & Tag Filters */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search */}
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
                <input
                  type="text"
                  placeholder={`Search in ${selectedType === 'kannada' ? 'ಕನ್ನಡ ಬ್ಲಾಗ್' : selectedType === 'tech' ? 'tech tags' : 'travel regions'}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900/40 border border-zinc-800/30 rounded-lg pl-10 pr-4 py-2.5 font-sans text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700/40 transition-colors"
                  id="blog-search-input"
                />
              </div>

              {/* Dynamically Populated Tags list */}
              <div className="md:col-span-7 flex flex-wrap gap-2 items-center">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mr-1">Filter Tags:</span>
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-3 py-1 rounded-full font-mono text-[10px] transition-all cursor-pointer border ${
                    selectedTag === null
                      ? 'bg-zinc-800/50 text-white border-zinc-700/30'
                      : 'bg-zinc-900/40 text-zinc-400 hover:bg-zinc-800/30 hover:text-zinc-200 border-zinc-800/35'
                  }`}
                  id="tag-filter-all"
                >
                  All
                </button>
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-full font-mono text-[10px] transition-all cursor-pointer border ${
                      selectedTag === tag
                        ? 'bg-zinc-800/50 text-white border-zinc-700/30'
                        : 'bg-zinc-900/40 text-zinc-400 hover:bg-zinc-800/30 hover:text-zinc-200 border-zinc-800/35'
                    }`}
                    id={`tag-filter-${tag}`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Post Cards Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => {
                      setActivePostId(post.id);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="bg-[#18181c]/60 border border-zinc-800/25 hover:border-zinc-700/40 hover:bg-zinc-850/15 transition-all rounded-2xl p-6 cursor-pointer flex flex-col justify-between group h-full relative overflow-hidden"
                    id={`blog-card-${post.id}`}
                  >
                    {/* Visual indicators for travel context */}
                    {post.type === 'travel' && post.geo && (
                      <div className="absolute right-3 top-3 text-[9px] font-mono text-zinc-500 bg-zinc-900/45 border border-zinc-800/20 px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                        <Mountain className="w-3 h-3 text-amber-500" />
                        <span>{post.geo.elevation}</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Meta info */}
                      <div className="flex items-center space-x-3 text-zinc-500 font-mono text-[10px]">
                        <span className="text-zinc-400 bg-zinc-900/30 border border-zinc-800/20 px-2 py-0.5 rounded font-sans uppercase font-bold text-[9px]">
                          {post.category}
                        </span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{post.date}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className={`font-sans font-extrabold text-xl text-white group-hover:text-zinc-200 transition-colors tracking-tight ${selectedType === 'kannada' ? 'font-kannada text-2xl font-semibold leading-relaxed' : ''}`}>
                          {post.title}
                        </h3>
                        {post.kannadaTitle && (
                          <p className="font-mono text-xs text-zinc-500 leading-normal italic">
                            Alt: {post.kannadaTitle}
                          </p>
                        )}
                        <p className="font-sans text-xs text-zinc-400 leading-relaxed line-clamp-3">
                          {post.intro}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-800/20 flex justify-between items-center text-zinc-400">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map(t => (
                          <span key={t} className="font-mono text-[9px] text-zinc-500 bg-zinc-900/40 px-2 py-0.5 rounded border border-zinc-800/20">
                            #{t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-1 font-mono text-[10px] text-zinc-500">
                        <Clock className="w-3 h-3" />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-zinc-900 bg-zinc-950/40 rounded-2xl">
                <p className="font-sans text-sm text-zinc-500">No blog entries match your search criteria.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
                  className="mt-4 font-mono text-xs text-zinc-300 underline hover:text-white"
                  id="reset-search-btn"
                >
                  Clear Filters & Search
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          /* =========================================================================
             2. DETAIL POST READING VIEW
             ========================================================================= */
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-4xl mx-auto space-y-8"
            id={`blog-detail-${activePost.id}`}
          >
            {/* Back controls */}
            <button
              onClick={() => setActivePostId(null)}
              className="inline-flex items-center space-x-2 text-zinc-400 hover:text-white font-sans text-xs font-semibold cursor-pointer py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800/80 transition-colors"
              id="back-to-blogs-btn"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Listings</span>
            </button>

            {/* Main Header Card */}
            <div className="border-b border-zinc-800 pb-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-zinc-500 font-mono text-xs">
                <span className="text-zinc-200 bg-zinc-900 border border-zinc-850 px-3 py-1 rounded font-sans uppercase font-bold text-[10px]">
                  {activePost.category}
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{activePost.date}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{activePost.readingTime}</span>
                </span>
              </div>

              <div className="space-y-4">
                <h1 className={`font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-[1.1] ${activePost.type === 'kannada' ? 'font-kannada text-4xl leading-snug font-semibold' : ''}`}>
                  {activePost.title}
                </h1>
                {activePost.subtitle && (
                  <p className="font-sans font-medium text-lg text-zinc-400 leading-relaxed">
                    {activePost.subtitle}
                  </p>
                )}
              </div>

              {/* Travel Geographic Panel */}
              {activePost.type === 'travel' && activePost.geo && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-zinc-900/40 p-4 border border-zinc-800/80 rounded-xl font-mono text-xs text-zinc-400">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="text-zinc-600 block text-[9px] uppercase">COORDINATES</span>
                      <span className="text-zinc-200">{activePost.geo.lat}° N, {activePost.geo.lng}° E</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mountain className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <div>
                      <span className="text-zinc-600 block text-[9px] uppercase">ALTITUDE</span>
                      <span className="text-zinc-200">{activePost.geo.elevation}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Compass className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <div>
                      <span className="text-zinc-600 block text-[9px] uppercase">RECOGNIZED BOUNDS</span>
                      <span className="text-zinc-200">{activePost.geo.region}, {activePost.id === 'travel-vietnam' ? 'VN' : 'IN'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Kannada Translation Bar Option */}
              {activePost.type === 'kannada' && (
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-xs font-sans text-zinc-300">
                    <Languages className="w-4 h-4 text-emerald-400" />
                    <span>ಕನ್ನಡ ಅಕ್ಷರ ಶೈಲಿ ಸಕ್ರಿಯಗೊಂಡಿದೆ (Kannada rendering enabled)</span>
                  </div>
                  <button
                    onClick={() => setKannadaTranslationEnabled(!kannadaTranslationEnabled)}
                    className="font-mono text-[10px] uppercase font-bold px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-md text-zinc-400 hover:text-white"
                    id="toggle-translation-btn"
                  >
                    {kannadaTranslationEnabled ? "Hide Eng Annotation" : "Show Eng Annotation"}
                  </button>
                </div>
              )}
            </div>

            {/* Immersive Article Content Container */}
            <div className="prose prose-invert max-w-none pt-4 pb-12 leading-relaxed">
              {activePost.sections && activePost.sections.length > 0 ? (
                <div className="space-y-6">
                  {/* Interactive Chapter/Sections Navigator Panel */}
                  <div className="bg-[#18181c]/70 border border-zinc-800/25 p-4 rounded-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-805/30 pb-2.5">
                      <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest leading-none">STORY PIPELINE / REGIONAL CHAPTERS</span>
                      <span className="font-mono text-[9px] text-amber-400 bg-amber-950/20 border border-amber-900/30 px-2 py-0.5 rounded uppercase">
                        {activeSectionId === 'full' ? 'Continuous Scroll' : 'Chapter View'}
                      </span>
                    </div>
                    
                    {/* Chapter Buttons Track */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {activePost.sections.map((sect) => {
                        const isCurrent = activeSectionId === sect.id;
                        return (
                          <button
                            key={sect.id}
                            onClick={() => {
                              setActiveSectionId(sect.id);
                            }}
                            className={`px-3 py-2 text-xs font-sans rounded-lg border text-left transition-all relative cursor-pointer ${
                              isCurrent
                                ? 'bg-zinc-800/40 border-zinc-700/40 text-white shadow-md font-medium'
                                : 'bg-zinc-900/10 border-zinc-800/15 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/20'
                            }`}
                            id={`chap-btn-${sect.id}`}
                          >
                            <div className="flex items-center space-x-1.5 truncate">
                              {isCurrent && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                              )}
                              <span className="truncate">{sect.title}</span>
                            </div>
                          </button>
                        );
                      })}
                      
                      {/* Full story visual option */}
                      <button
                        onClick={() => setActiveSectionId('full')}
                        className={`px-3 py-2 text-xs font-sans rounded-lg border text-left transition-all cursor-pointer ${
                          activeSectionId === 'full'
                            ? 'bg-zinc-800/40 border-zinc-700/40 text-white shadow-md font-medium'
                            : 'bg-zinc-900/10 border-zinc-800/15 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/20'
                        }`}
                        id="chap-btn-full"
                      >
                        📚 View All
                      </button>
                    </div>
                  </div>

                  {/* Render targeted section content or all of them */}
                  <AnimatePresence mode="wait">
                    {activeSectionId === 'full' ? (
                      <motion.div
                        key="full-scroll"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-8"
                      >
                        {renderBlogPostContent(activePost.content)}
                      </motion.div>
                    ) : (
                      (() => {
                        const currentSectIndex = activePost.sections.findIndex(s => s.id === activeSectionId);
                        const currentSection = activePost.sections[currentSectIndex >= 0 ? currentSectIndex : 0];
                        if (!currentSection) return null;
                        return (
                          <motion.div
                            key={currentSection.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6 pt-2"
                          >
                            <div className="min-h-[250px]">
                              {renderBlogPostContent(currentSection.content)}
                            </div>

                            {/* Dynamic Chapter Navigation Controller at bottom */}
                            <div className="flex justify-between items-center bg-[#18181c]/30 border border-zinc-800/20 p-4 rounded-xl mt-10">
                              <button
                                disabled={currentSectIndex === 0}
                                onClick={() => {
                                  const prevSect = activePost.sections![currentSectIndex - 1];
                                  if (prevSect) setActiveSectionId(prevSect.id);
                                }}
                                className={`px-3 py-1.5 font-mono text-[10px] uppercase rounded-md border font-semibold ${
                                  currentSectIndex === 0
                                    ? 'bg-zinc-900/20 border-zinc-800/10 text-zinc-600 cursor-not-allowed'
                                    : 'bg-zinc-900 hover:bg-zinc-800/50 border-zinc-800/45 text-zinc-300 hover:text-white transition-all cursor-pointer'
                                }`}
                                id="chapter-nav-prev"
                              >
                                &larr; Prev Chapter
                              </button>

                              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                                Chapter {currentSectIndex + 1} of {activePost.sections.length}
                              </span>

                              <button
                                disabled={currentSectIndex === activePost.sections.length - 1}
                                onClick={() => {
                                  const nextSect = activePost.sections![currentSectIndex + 1];
                                  if (nextSect) setActiveSectionId(nextSect.id);
                                }}
                                className={`px-3 py-1.5 font-mono text-[10px] uppercase rounded-md border font-semibold ${
                                  currentSectIndex === activePost.sections.length - 1
                                    ? 'bg-zinc-900/20 border-zinc-800/10 text-zinc-600 cursor-not-allowed'
                                    : 'bg-zinc-900 hover:bg-zinc-800/50 border-zinc-800/45 text-zinc-300 hover:text-white transition-all cursor-pointer'
                                }`}
                                id="chapter-nav-next"
                              >
                                Next Chapter &rarr;
                              </button>
                            </div>
                          </motion.div>
                        );
                      })()
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Fallback for standard legacy blogs */
                renderBlogPostContent(activePost.content)
              )}

              {/* Kannada Translation Help Annotation */}
              {activePost.type === 'kannada' && kannadaTranslationEnabled && (
                <div className="mt-8 p-5 bg-zinc-950 border border-zinc-850 rounded-xl space-y-3">
                  <div className="flex items-center space-x-2 border-b border-zinc-900 pb-2">
                    <Globe className="w-4 h-4 text-sky-400" />
                    <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider font-semibold">Systems Synopsis (In English)</span>
                  </div>
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed italic">
                    In this piece, {SHREEHARSHA_BIO.name} discusses the structural foundations behind local language models. 
                    He outlines why simple literal translations fail to capture the deep Subject-Object-Verb (SOV) structure 
                    of Kannada, illustrating that language acts as a logical system of agglutinative changes. He models this 
                    not as random phrases but as a mathematical &apos;Constraint-based Joint System&apos; for robust computing.
                  </p>
                </div>
              )}
            </div>

            {/* Footer metadata panel */}
            <div className="border-t border-zinc-900 pt-8 flex justify-between items-center pb-12">
              <div className="flex items-center space-x-2">
                <Hash className="w-4 h-4 text-zinc-600" />
                <div className="flex gap-2">
                  {activePost.tags.map(t => (
                    <span key={t} className="font-mono text-xs text-zinc-400 focus:outline-none">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => {
                  setActivePostId(null);
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className="font-mono text-xs text-zinc-400 hover:text-white hover:underline transition-all"
                id="footer-back-to-blogs-btn"
              >
                Back to Blogs List
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
