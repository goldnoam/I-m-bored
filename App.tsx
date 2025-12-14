import React, { useState, useEffect, useMemo } from 'react';
import { 
  Ghost, Sparkles, Moon, Sun, Dices, RefreshCw, WifiOff, 
  Search, X, Baby, Gamepad2, Smartphone, GraduationCap, 
  Briefcase, Armchair, ChevronLeft 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { ACTIVITIES } from './constants';
import { Activity, AgeGroup, Category, Gender, UserPreferences } from './types';

// --- Icon Mapping ---
const AGE_ICONS = {
  [AgeGroup.TODDLER]: Baby,
  [AgeGroup.CHILD]: Gamepad2,
  [AgeGroup.TEEN]: Smartphone,
  [AgeGroup.YOUNG]: GraduationCap,
  [AgeGroup.ADULT]: Briefcase,
  [AgeGroup.SENIOR]: Armchair,
};

const App: React.FC = () => {
  // --- State ---
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [preferences, setPreferences] = useState<UserPreferences>({
    ageGroup: null,
    gender: null,
  });
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [isLuckyMode, setIsLuckyMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<Category | 'ALL'>('ALL');

  // --- Effects ---
  
  // Theme Effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load Preferences from LocalStorage on mount with Error Handling
  useEffect(() => {
    try {
      const savedPrefs = localStorage.getItem('boringApp_prefs');
      if (savedPrefs) {
        const parsed = JSON.parse(savedPrefs);
        // Basic validation to ensure the parsed object matches expected shape
        if (parsed && typeof parsed === 'object') {
          setPreferences(parsed);
        }
      }
    } catch (e) {
      // Gracefully handle disabled storage, parsing errors, or access issues
      console.warn("Could not load preferences from local storage:", e);
      // We rely on default state in this case
    }
  }, []);

  // --- Logic ---
  const toggleTheme = () => setDarkMode(!darkMode);

  const handlePreferenceChange = (key: keyof UserPreferences, value: any) => {
    const newPrefs = { ...preferences, [key]: value };
    setPreferences(newPrefs);
    setCurrentActivity(null); // Reset result when filters change
    
    // Save to LocalStorage with Error Handling
    try {
      localStorage.setItem('boringApp_prefs', JSON.stringify(newPrefs));
    } catch (e) {
      // Handle QuotaExceededError or SecurityError silently so app doesn't crash
      console.warn("Could not save preferences to local storage:", e);
    }
  };

  const getRandomActivity = (lucky: boolean = false) => {
    setLoading(true);
    setIsLuckyMode(lucky);

    // Added slightly random delay for realistic feel
    const delay = 600 + Math.random() * 400;

    setTimeout(() => {
      let filtered: Activity[] = [];

      if (lucky) {
        filtered = ACTIVITIES;
      } else {
        filtered = ACTIVITIES.filter((act) => {
          const matchesAge = preferences.ageGroup && act.suitableAges.includes(preferences.ageGroup);
          const matchesGender = preferences.gender && (
            act.suitableGenders.includes(preferences.gender) || 
            act.suitableGenders.includes('BOTH')
          );
          return matchesAge && matchesGender;
        });
      }

      if (filtered.length === 0) filtered = ACTIVITIES;

      const random = filtered[Math.floor(Math.random() * filtered.length)];
      
      if (currentActivity && currentActivity.id === random.id && filtered.length > 1) {
        const others = filtered.filter(a => a.id !== random.id);
        setCurrentActivity(others[Math.floor(Math.random() * others.length)]);
      } else {
        setCurrentActivity(random);
      }
      
      setLoading(false);
    }, delay);
  };

  const selectSpecificActivity = (activity: Activity) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchCategory('ALL');
    setLoading(true);
    // Slight delay to allow modal to close smoothly before showing result
    setTimeout(() => {
      setCurrentActivity(activity);
      setLoading(false);
    }, 300);
  };

  const resetApp = () => {
    // We keep preferences in local storage, but clear current activity to go back to selection
    setCurrentActivity(null);
    setIsLuckyMode(false);
  };

  // --- Search Logic with Fuzzy Search & Filtering ---
  const fuse = useMemo(() => {
    return new Fuse(ACTIVITIES, {
      keys: ['text', 'description', 'categories'],
      threshold: 0.4, // Sensitivity for typo tolerance
      distance: 100,
    });
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim() && searchCategory === 'ALL') return [];

    let results = ACTIVITIES;

    // 1. Filter by Category first if selected
    if (searchCategory !== 'ALL') {
      results = results.filter(act => act.categories.includes(searchCategory));
    }

    // 2. Fuzzy Search if query exists
    if (searchQuery.trim()) {
      // Need to re-instantiate Fuse with filtered results if category is selected
      // But for performance with small dataset, we can just search global fuse and filter results
      const fuseResults = fuse.search(searchQuery);
      const fuseItems = fuseResults.map(r => r.item);
      
      // Intersect fuzzy results with category filter
      if (searchCategory !== 'ALL') {
        results = fuseItems.filter(act => act.categories.includes(searchCategory));
      } else {
        results = fuseItems;
      }
    } else {
      // If only category selected and no query, 'results' is already filtered by category
    }
    
    return results;
  }, [searchQuery, searchCategory, fuse]);

  // --- Animations ---
  
  // Enhanced page transitions with blur and scale
  const pageVariants = {
    initial: { 
      opacity: 0, 
      y: 15, 
      scale: 0.96, 
      filter: 'blur(8px)' 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 25,
        mass: 1
      }
    },
    exit: { 
      opacity: 0, 
      y: -15, 
      scale: 0.96, 
      filter: 'blur(8px)',
      transition: { duration: 0.2 }
    },
  };

  // --- Render Helpers ---

  const renderSearchOverlay = () => (
    <motion.div 
      initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 pt-20 overflow-y-auto"
    >
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="relative">
          <input 
            type="text" 
            autoFocus
            placeholder="חפש פעילות..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pr-12 text-xl rounded-2xl border-2 border-primary/30 focus:border-primary bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-xl outline-none transition-all"
          />
          <Search className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <button 
            onClick={() => setSearchCategory('ALL')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-colors ${searchCategory === 'ALL' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'}`}
          >
            הכל
          </button>
          {Object.values(Category).map(cat => (
            <button
              key={cat}
              onClick={() => setSearchCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${searchCategory === cat ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-2 pt-2">
          {searchQuery && searchResults.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <p className="text-lg">לא מצאנו כלום...</p>
              <p className="text-sm">נסה מילה אחרת?</p>
            </div>
          )}
          
          <AnimatePresence mode='popLayout'>
            {searchResults.map(act => {
              const Icon = act.icon || Ghost;
              return (
                <motion.button
                  layout
                  key={act.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectSpecificActivity(act)}
                  className="w-full text-right p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-colors group flex items-start gap-4"
                >
                  <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-6 h-6 text-gray-400 dark:text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors">{act.text}</h3>
                    {act.description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{act.description}</p>}
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {act.categories.map((c, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-slate-700 rounded-full text-gray-500 dark:text-gray-300">{c}</span>
                      ))}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
      
      <button 
        onClick={() => setIsSearchOpen(false)}
        className="absolute top-6 left-6 p-2 bg-gray-100 dark:bg-slate-800 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
      >
        <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </button>
    </motion.div>
  );

  const renderSelectionScreen = () => (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-8 p-4">
      
      {/* Age Selection */}
      <div className="w-full space-y-3">
        <label className="text-lg font-semibold text-gray-700 dark:text-gray-200 block text-center">
          באיזה גיל אנחנו היום?
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: AgeGroup.TODDLER, label: 'קטנטנים', sub: '(0-5)' },
            { id: AgeGroup.CHILD, label: 'ילדים', sub: '(6-12)' },
            { id: AgeGroup.TEEN, label: 'נוער', sub: '(13-18)' },
            { id: AgeGroup.YOUNG, label: 'צעירים', sub: '(18-30)' },
            { id: AgeGroup.ADULT, label: 'מבוגרים', sub: '(30-60)' },
            { id: AgeGroup.SENIOR, label: 'גיל הזהב', sub: '(60+)' }
          ].map((item, index) => {
            const Icon = AGE_ICONS[item.id as AgeGroup];
            const isSelected = preferences.ageGroup === item.id;
            
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: isSelected ? 1.08 : 1,
                  filter: isSelected ? 'brightness(1.1) saturate(1.1)' : 'brightness(1) saturate(1)',
                }}
                whileHover={{ scale: isSelected ? 1.1 : 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => handlePreferenceChange('ageGroup', item.id)}
                className={`
                  flex flex-col items-center justify-center p-3 rounded-xl border-2 min-h-[100px] relative overflow-hidden group z-0
                  ${isSelected
                    ? 'bg-primary/20 border-primary text-primary dark:text-primary-light shadow-lg z-10 ring-2 ring-primary/20' 
                    : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:border-primary/50'}
                `}
              >
                <div className={`mb-1 transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-bold text-base leading-tight z-10">{item.label}</span>
                <span className="text-[10px] opacity-70 mt-0.5 z-10">{item.sub}</span>
                
                {/* Background Decoration */}
                {isSelected && <motion.div layoutId="age-bg" className="absolute inset-0 bg-primary/5 z-0" />}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Gender Selection */}
      <motion.div 
        layout
        className={`w-full space-y-3 transition-opacity duration-500 ${preferences.ageGroup ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}
      >
        <label className="text-lg font-semibold text-gray-700 dark:text-gray-200 block text-center">
          אני...
        </label>
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: Gender.BOY, label: 'בן' },
            { id: Gender.GIRL, label: 'בת' }
          ].map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handlePreferenceChange('gender', item.id)}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className={`
                p-4 rounded-xl border-2 text-xl font-bold transition-colors
                ${preferences.gender === item.id 
                  ? 'bg-secondary/20 border-secondary text-secondary shadow-lg' 
                  : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:border-secondary/50'}
              `}
            >
              {item.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div layout className="w-full space-y-4 pt-4">
        <motion.button
          onClick={() => getRandomActivity(false)}
          disabled={!preferences.ageGroup || !preferences.gender}
          whileHover={(!preferences.ageGroup || !preferences.gender) ? {} : { scale: 1.02 }}
          whileTap={(!preferences.ageGroup || !preferences.gender) ? {} : { scale: 0.98 }}
          className={`
            w-full py-4 rounded-2xl text-xl font-bold text-white shadow-xl flex items-center justify-center gap-2
            ${(!preferences.ageGroup || !preferences.gender)
              ? 'bg-gray-400 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-primary to-primary-dark shadow-primary/30'}
          `}
        >
          <Ghost className="w-6 h-6" />
          תמצאו לי מה לעשות
        </motion.button>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">או</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
        </div>

        <motion.button
          onClick={() => getRandomActivity(true)}
          whileHover={{ scale: 1.03, rotate: [0, -1, 1, 0] }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 rounded-2xl text-xl font-bold text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 shadow-xl shadow-orange-500/20 flex items-center justify-center gap-3 relative overflow-hidden group"
        >
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
          
          <Dices className="w-6 h-6 relative z-10" />
          <span className="relative z-10">Lucky Dip - הפתע אותי!</span>
        </motion.button>
      </motion.div>

    </div>
  );

  const renderResultScreen = () => {
    const ActivityIcon = currentActivity?.icon || (isLuckyMode ? Sparkles : Ghost);
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto space-y-8 p-6">
        
        {/* Result Card */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, rotateX: 10 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-full bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden relative border border-gray-100 dark:border-slate-700/50"
        >
          
          {/* Header Strip */}
          <div className={`h-3 w-full ${isLuckyMode ? 'bg-yellow-400' : 'bg-gradient-to-r from-primary to-secondary'}`}></div>
          
          <div className="p-8 md:p-12 text-center space-y-6">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center p-3 bg-gray-100 dark:bg-slate-700 rounded-full mb-4"
            >
              <ActivityIcon className={`w-8 h-8 ${isLuckyMode ? 'text-yellow-500' : 'text-primary'}`} />
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white leading-tight">
              {currentActivity?.text}
            </h2>
            
            {currentActivity?.description && (
              <p className="text-xl text-gray-600 dark:text-gray-300 font-light">
                {currentActivity.description}
              </p>
            )}

            <div className="flex flex-wrap justify-center gap-2 pt-4">
               {currentActivity?.categories.map((cat, idx) => (
                 <motion.span 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   whileHover={{ scale: 1.1, backgroundColor: isLuckyMode ? '#FBBF24' : '#8B5CF6', color: '#fff' }}
                   transition={{ delay: 0.3 + (idx * 0.1), type: 'spring', stiffness: 300 }}
                   key={idx} 
                   className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium cursor-default"
                 >
                   {cat}
                 </motion.span>
               ))}
            </div>
          </div>
        </motion.div>

        {/* Navigation Controls */}
        <div className="flex flex-col sm:flex-row w-full gap-4">
          <motion.button
            onClick={() => getRandomActivity(isLuckyMode)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            {isLuckyMode ? 'עוד מזה!' : 'לא אהבתי, עוד אחד'}
          </motion.button>

          <motion.button
            onClick={resetApp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-4 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2"
          >
            {/* If we are deep in results, maybe a back arrow? For now just reset */}
            <ChevronLeft className="w-5 h-5 hidden sm:block" />
            חזרה להגדרות
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-950' : 'bg-gray-50'}`}>
      <div className="min-h-screen flex flex-col font-sans text-gray-900 dark:text-gray-100 selection:bg-primary selection:text-white">
        
        {/* Header */}
        <header className="w-full p-6 flex justify-between items-center max-w-4xl mx-auto z-10 relative">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg shadow-lg">
              <Ghost className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black tracking-tight leading-none">משעמם לי</h1>
              
              {/* Offline Indicator */}
              <div className="flex items-center gap-1.5 mt-1 opacity-70" title="האפליקציה פועלת במלואה גם ללא חיבור לאינטרנט">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                 <span className="text-[10px] font-medium tracking-wide">זמין אופליין</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-md hover:shadow-lg text-gray-600 dark:text-gray-300 transition-all duration-300"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-md hover:shadow-lg text-gray-600 dark:text-yellow-400 transition-all duration-300"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center p-4 overflow-hidden relative">
          <AnimatePresence>
            {isSearchOpen && renderSearchOverlay()}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xl font-medium text-gray-500 dark:text-gray-400">חושב על רעיון גאוני...</p>
              </motion.div>
            ) : currentActivity ? (
              <motion.div
                key="result"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full flex justify-center"
              >
                {renderResultScreen()}
              </motion.div>
            ) : (
              <motion.div
                layout
                key="selection"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full flex justify-center"
              >
                {renderSelectionScreen()}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="w-full p-6 text-center text-sm text-gray-400 dark:text-slate-600 z-10 relative">
          <p>© {new Date().getFullYear()} משעמם לי | פותח ללא AI בזמן אמת</p>
        </footer>
      </div>
    </div>
  );
};

export default App;