import React, { useState, useEffect } from "react";
import { DEFAULT_DOSSIER } from "./defaultDossier";
import { TopicDossier, Paper } from "./types";
import ExploreTab from "./components/ExploreTab";
import TimelineTab from "./components/TimelineTab";
import FiguresTab from "./components/FiguresTab";
import PapersTab from "./components/PapersTab";
import SavedPanel from "./components/SavedPanel";
import { translations, SupportedLanguage } from "./languages";

// @ts-ignore
import confluxusLogo from "./assets/images/scientia_confluxus_logo_1781089198631.png";

import {
  Menu,
  BookOpen,
  Compass,
  Search,
  Network,
  GraduationCap,
  Bookmark,
  Sparkles,
  RefreshCw,
  AlertCircle,
  X,
  Share2,
  Copy,
  Check
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"explore" | "timeline" | "figures" | "papers">("explore");
  const [searchText, setSearchText] = useState<string>("");
  const [currentDossier, setCurrentDossier] = useState<TopicDossier>(DEFAULT_DOSSIER);
  
  // Search state for gathering dossiers
  const [searchTopicField, setSearchTopicField] = useState<string>("");
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [compileStep, setCompileStep] = useState<number>(0);
  const [compileError, setCompileError] = useState<string | null>(null);

  // Saved Desk panel variables
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [downloads, setDownloads] = useState<string[]>([]);
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [savedDeskOpen, setSavedDeskOpen] = useState<boolean>(false);
  
  // Custom toast notification states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activePaperInReader, setActivePaperInReader] = useState<any | null>(null);

  // Share link visibility states
  const [shareOpen, setShareOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Pre-selected popular recommendation badges
  const preSelectedBadges = [
    "Dark Matter",
    "Quantum Cryptography",
    "Room-Temperature Fusion",
    "Higgs Boson",
    "Gravitational Waves",
    "Graphene Superconductivity"
  ];

  // Dynamic status list while synthesizing information
  const compilationSteps = [
    "Contacting high-altitude orbital registries...",
    "Tracing initial discoveries & observation parameters...",
    "Mapping chronological breakthrough chains...",
    "Querying subterranean particle collider labs...",
    "Reconstructing physical methodologies as of Jun 2026...",
    "Compiling peer-reviewed manuscript blueprints...",
    "Synching academic dossier parameters..."
  ];

  // Loader cycle timer
  useEffect(() => {
    let interval: any = null;
    if (isCompiling) {
      interval = setInterval(() => {
        setCompileStep((prev) => (prev < compilationSteps.length - 1 ? prev + 1 : prev));
      }, 1200);
    } else {
      setCompileStep(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCompiling]);

  // Theme customization state
  const [theme, setTheme] = useState<string>("black");
  const [language, setLanguage] = useState<SupportedLanguage>("en");
  const [font, setFont] = useState<string>("inter");

  const t = translations[language] || translations.en;

  // Load local desk profiles and preferences on mount
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("scientia_theme");
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        setTheme("black");
      }

      const storedLanguage = localStorage.getItem("scientia_language");
      if (storedLanguage) {
        setLanguage(storedLanguage as SupportedLanguage);
      }

      const storedFont = localStorage.getItem("scientia_font");
      if (storedFont) {
        setFont(storedFont);
      }

      const storedBookmarks = localStorage.getItem("nexus_bookmarks");
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }

      const storedDownloads = localStorage.getItem("nexus_downloads");
      if (storedDownloads) {
        setDownloads(JSON.parse(storedDownloads));
      }

      const storedNotes = localStorage.getItem("nexus_notes");
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (e) {
      console.warn("Storage permissions prevent loading local data: ", e);
    }
  }, []);

  // Update theme configurations dynamically on document body
  useEffect(() => {
    try {
      localStorage.setItem("scientia_theme", theme);
      localStorage.setItem("scientia_language", language);
      localStorage.setItem("scientia_font", font);
    } catch (e) {
      console.warn("Could not save preferences: ", e);
    }
    
    // Apply styling on document body
    document.body.className = `theme-${theme} font-chosen-${font} bg-background text-on-background`;
  }, [theme, language, font]);

  // Sync to localStorage
  const syncBookmarks = (newBookmarks: any[]) => {
    setBookmarks(newBookmarks);
    try {
      localStorage.setItem("nexus_bookmarks", JSON.stringify(newBookmarks));
    } catch (e) {
      console.warn(e);
    }
  };

  const syncDownloads = (newDownloads: string[]) => {
    setDownloads(newDownloads);
    try {
      localStorage.setItem("nexus_downloads", JSON.stringify(newDownloads));
    } catch (e) {
      console.warn(e);
    }
  };

  const syncNotes = (newNotes: { [key: string]: string }) => {
    setNotes(newNotes);
    try {
      localStorage.setItem("nexus_notes", JSON.stringify(newNotes));
    } catch (e) {
      console.warn(e);
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Toggle bookmark
  const handleToggleBookmark = (paper: any) => {
    const isBookmarked = bookmarks.some((b) => b.id === paper.id);
    if (isBookmarked) {
      const updated = bookmarks.filter((b) => b.id !== paper.id);
      syncBookmarks(updated);
      showToast(`Removed "${paper.title.substring(0, 30)}..." from Academic Desk.`);
    } else {
      const updated = [...bookmarks, paper];
      syncBookmarks(updated);
      showToast(`Saved "${paper.title.substring(0, 30)}..." to Academic Desk bookmarks!`);
    }
  };

  // Simulate downloading files
  const handleDownloadFile = (fileName: string) => {
    if (downloads.includes(fileName)) {
      showToast(`Document "${fileName}" already exists in local downloads.`);
      return;
    }
    const updated = [fileName, ...downloads];
    syncDownloads(updated);
    showToast(`Successfully downloaded dynamic report: "${fileName}"!`);
  };

  // Save notes
  const handleSaveNote = (paperId: string, noteText: string) => {
    const updated = { ...notes, [paperId]: noteText };
    syncNotes(updated);
    showToast("Research note captured successfully on draft stack.");
  };

  // Copy Link function
  const handleCopyShareLink = () => {
    try {
      navigator.clipboard.writeText("https://ais-pre-36acrqaeepk4zvx7hxnkx3-961100046804.asia-southeast1.run.app");
      setCopied(true);
      showToast("View-only student access link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy link via clipboard API:", err);
    }
  };

  // Dynamically research a brand new topic via our full-stack Express API
  const handleResearchTopic = async (topicName: string) => {
    if (!topicName || !topicName.trim()) return;
    
    setIsCompiling(true);
    setCompileError(null);
    setActiveTab("explore"); // Reset tab to explore
    setSearchText("");       // Clear filters

    try {
      const response = await fetch("/api/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: topicName.trim() }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to compile academic knowledge on this topic.");
      }

      setCurrentDossier(data);
      setSearchTopicField("");
      setActivePaperInReader(null); // Reset active readers
      showToast(`Synthesized complete academic data for: "${data.topic}"!`);
    } catch (err: any) {
      console.error(err);
      setCompileError(err.message || "An unpredictable connection error occurred while querying academic databases.");
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div className={`theme-${theme} font-sans text-on-background bg-background min-h-screen flex flex-col justify-between transition-colors duration-300`}>
      {/* Top Main AppBar */}
      <header className="w-full top-0 sticky z-40 bg-background/95 backdrop-blur-md border-b border-outline-variant/60 h-16 flex items-center justify-between px-6 transition-colors duration-300">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSavedDeskOpen(!savedDeskOpen)}
            title="Open Academic Desk"
            className="hover:bg-surface-container-high transition-colors p-2 rounded-full relative cursor-pointer"
          >
            <Menu className="w-5 h-5 text-on-background hover:text-secondary transition-colors" />
            {bookmarks.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-secondary ring-1 ring-background" />
            )}
          </button>

          {/* Logo Title with App Icon */}
          <div 
            onClick={() => { setCurrentDossier(DEFAULT_DOSSIER); setActiveTab("explore"); }} 
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-surface-container border border-secondary/35 ring-1 ring-secondary/15 flex items-center justify-center transition-all group-hover:scale-105 group-hover:border-secondary/60 shadow-md">
              <img
                src={confluxusLogo}
                alt="Scientia Confluxus Emblem"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="font-serif text-base sm:text-lg text-on-background font-extrabold tracking-tight group-hover:text-secondary transition-colors">
              {t.appName}
            </h1>
          </div>
        </div>

        {/* Tab Navigation links (Desktop) */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 text-xs font-mono font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab("explore")}
              className={`hover:text-secondary transition-colors cursor-pointer ${
                activeTab === "explore" ? "text-secondary border-b-2 border-secondary pb-1" : "text-on-surface-variant"
              }`}
            >
              {t.exploreTab}
            </button>
            <button
              onClick={() => setActiveTab("timeline")}
              className={`hover:text-secondary transition-colors cursor-pointer ${
                activeTab === "timeline" ? "text-secondary border-b-2 border-secondary pb-1" : "text-on-surface-variant"
              }`}
            >
              {t.chronologyTab}
            </button>
            <button
              onClick={() => setActiveTab("figures")}
              className={`hover:text-secondary transition-colors cursor-pointer ${
                activeTab === "figures" ? "text-secondary border-b-2 border-secondary pb-1" : "text-on-surface-variant"
              }`}
            >
              Pioneers
            </button>
            <button
              onClick={() => setActiveTab("papers")}
              className={`hover:text-secondary transition-colors cursor-pointer ${
                activeTab === "papers" ? "text-secondary border-b-2 border-secondary pb-1" : "text-on-surface-variant"
              }`}
            >
              {t.readingsTab}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Share Link Button */}
            <div className="relative">
              <button
                onClick={() => setShareOpen(!shareOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-blue-500/30 hover:border-blue-400 rounded font-mono text-xs font-bold bg-blue-950/20 hover:bg-blue-900/40 text-blue-300 transition-colors cursor-pointer"
                title="Share View-Only Preview Link"
              >
                <Share2 className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">{t.shareLinkBtn}</span>
              </button>
              
              {shareOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-slate-900 border border-blue-500/30 rounded-lg p-4 shadow-2xl z-50 animate-fade-in text-left">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-mono font-bold uppercase text-blue-400 tracking-wider flex items-center gap-1.5">
                      <Share2 className="w-3.5 h-3.5" /> Direct Safe Link
                    </h4>
                    <button 
                      onClick={() => setShareOpen(false)}
                      className="text-white/40 hover:text-white transition-colors p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-white/70 leading-relaxed mb-3">
                    This secure, read-only preview can be shared with anyone. They can read and search academic dossiers, but cannot edit your underlying application code.
                  </p>
                  <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded border border-white/10 mb-3">
                    <span className="text-[10px] font-mono text-white/50 truncate flex-1 px-1">
                      https://ais-pre-36acrqaeepk4...
                    </span>
                    <button
                      onClick={handleCopyShareLink}
                      className="p-1.5 bg-secondary hover:bg-opacity-90 text-black rounded transition-all cursor-pointer flex items-center justify-center flex-shrink-0"
                      title="Copy URL to Clipboard"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="text-[9px] font-mono text-center text-secondary/75 uppercase tracking-wider">
                    [ READ-ONLY SECURE PROTOCOL ]
                  </div>
                </div>
              )}
            </div>

            {/* Toggle sidebar desk indicator (Desktop) */}
            <button
              onClick={() => setSavedDeskOpen(!savedDeskOpen)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 border border-outline-variant rounded font-mono text-xs font-bold bg-surface hover:bg-surface-container transition-colors cursor-pointer text-white border-white/20 hover:border-secondary"
            >
              <Bookmark className="w-3.5 h-3.5 text-secondary" />
              <span>{t.academicDesk}</span>
              {bookmarks.length > 0 && (
                <span className="bg-secondary text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {bookmarks.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Universal Topic Search input */}
      <section className="bg-slate-950 py-8 border-b border-outline-variant/30 text-center relative px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.02)_0%,transparent_80%)]" />
        <div className="max-w-3xl mx-auto relative z-10 space-y-4">
          {/* Main Visual App Icon Emblem on Main Screen */}
          <div className="flex justify-center pb-2">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-900 border-2 border-secondary/40 ring-4 ring-secondary/15 flex items-center justify-center shadow-xl animate-[pulse_6s_infinite]">
              <img
                src={confluxusLogo}
                alt="Scientia Confluxus Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.appName}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleResearchTopic(searchTopicField);
            }}
            className="flex items-center gap-2 max-w-xl mx-auto bg-surface-container-low border border-outline-variant rounded-lg p-1 px-3 focus-within:border-secondary/60 transition-colors"
          >
            <Search className="w-5 h-5 text-on-surface-variant flex-shrink-0" />
            <input
              type="text"
              required
              className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none text-sm text-white py-2 placeholder:text-on-surface-variant/70 italic"
              placeholder={t.searchPlaceholder}
              value={searchTopicField}
              onChange={(e) => setSearchTopicField(e.target.value)}
            />
            <button
              type="submit"
              disabled={isCompiling}
              className="font-mono text-xs font-bold uppercase bg-secondary text-black hover:opacity-90 px-4 py-2 rounded transition-opacity cursor-pointer flex items-center gap-1.5"
            >
              {isCompiling ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.synthesizeBtn}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick topic tags row */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 max-w-xl mx-auto">
            <span className="font-mono text-[9px] font-bold text-on-surface-variant uppercase mr-1">{t.recommendedTopics}:</span>
            {preSelectedBadges.map((badge, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleResearchTopic(badge)}
                className="text-[10px] font-mono text-neutral-300 hover:text-secondary border border-outline-variant hover:border-secondary/40 bg-slate-900/40 px-2 py-1 rounded transition-colors cursor-pointer"
              >
                {badge}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Body view */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 pb-32 md:pb-12 text-on-surface relative">
        {/* Dynamic Stepped Loader Layer during compile */}
        {isCompiling && (
          <div className="absolute inset-0 bg-slate-950/98 z-30 flex flex-col items-center justify-center py-20 text-center">
            <div className="space-y-6 max-w-md bg-slate-900/60 border border-outline-variant/60 p-8 rounded-lg shadow-xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent animate-[pulse_2s_infinite]" />
              
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <SpinnerDynamic />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-lg font-bold text-white tracking-tight flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-secondary animate-bounce" /> Academic Synthesizer Active
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Gemini-3.5 cognitive pipelines are scouring historical libraries and collider benchmarks...
                </p>
              </div>

              {/* Dynamic steps stepper */}
              <div className="border-t border-outline-variant/40 pt-4 space-y-2 text-left font-mono">
                {compilationSteps.map((step, sIdx) => {
                  const isCurrent = compileStep === sIdx;
                  const isDone = compileStep > sIdx;

                  return (
                    <div
                      key={sIdx}
                      className={`text-[10px] flex items-center gap-2.5 transition-all duration-350 ${
                        isCurrent
                          ? "text-secondary font-bold translate-x-1"
                          : isDone
                          ? "text-white/45"
                          : "text-white/10"
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0">
                        {isDone ? "✓" : isCurrent ? "●" : " "}
                      </span>
                      <span className="truncate">{step}</span>
                    </div>
                  );
                })}
              </div>

              <span className="text-[9px] font-mono tracking-widest text-on-surface-variant/60 uppercase block pt-2">
                [ PROCESSING MULTI-ORBIT TIMELINES ]
              </span>
            </div>
          </div>
        )}

        {/* Error Notification banner */}
        {compileError && (
          <div className="bg-red-950/40 border border-red-900/60 p-4 rounded-lg flex gap-3 text-xs mb-8">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <div className="space-y-1 text-left">
              <p className="font-bold text-red-400">Database Connection Conflict</p>
              <p className="text-red-200/80 leading-relaxed">{compileError}</p>
              <button
                type="button"
                onClick={() => setCompileError(null)}
                className="text-secondary hover:underline font-mono text-[10px] font-bold uppercase mt-2 block"
              >
                Dismiss Error
              </button>
            </div>
          </div>
        )}

        {/* Dynamic active tabs container (Shown when not compiling) */}
        {!isCompiling && currentDossier && (
          <div className="space-y-6">
            {activeTab === "explore" && (
              <ExploreTab dossier={currentDossier} onSearchTopic={handleResearchTopic} />
            )}

            {activeTab === "timeline" && (
              <TimelineTab dossier={currentDossier} t={t} />
            )}

            {activeTab === "figures" && (
              <FiguresTab
                dossier={currentDossier}
                searchText={searchText}
                onSearchChange={setSearchText}
                t={t}
              />
            )}

            {activeTab === "papers" && (
              <PapersTab
                dossier={currentDossier}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                onDownloadFile={handleDownloadFile}
                searchText={searchText}
                onSearchChange={setSearchText}
                activePaper={activePaperInReader}
                onSetActivePaper={setActivePaperInReader}
              />
            )}
          </div>
        )}
      </main>

      {/* Technical mobile navigation row (Tablet/Mobile only view) */}
      <nav className="md:hidden fixed bottom-0 w-full z-45 h-20 bg-slate-900 border-t border-outline-variant/60 flex justify-around items-center px-4 pb-2">
        <button
          onClick={() => { setActiveTab("explore"); setSearchText(""); }}
          className={`flex flex-col items-center justify-center p-2 rounded-full transition-colors cursor-pointer ${
            activeTab === "explore" ? "text-secondary font-bold" : "text-on-surface-variant hover:bg-slate-800"
          }`}
        >
          <Compass className="w-4 h-4 mb-0.5" />
          <span className="font-mono text-[10px] font-bold">{t.exploreTab}</span>
        </button>

        <button
          onClick={() => setActiveTab("timeline")}
          className={`flex flex-col items-center justify-center p-2 rounded-full transition-colors cursor-pointer ${
            activeTab === "timeline" ? "text-secondary font-bold" : "text-on-surface-variant hover:bg-slate-800"
          }`}
        >
          <Network className="w-4 h-4 mb-0.5" />
          <span className="font-mono text-[10px] font-bold">{t.chronologyTab}</span>
        </button>

        <button
          onClick={() => { setActiveTab("figures"); setSearchText(""); }}
          className={`flex flex-col items-center justify-center p-2 rounded-full transition-colors cursor-pointer ${
            activeTab === "figures" ? "text-secondary font-bold" : "text-on-surface-variant hover:bg-slate-800"
          }`}
        >
          <GraduationCap className="w-4 h-4 mb-0.5" />
          <span className="font-mono text-[10px] font-bold">Pioneers</span>
        </button>

        <button
          onClick={() => { setActiveTab("papers"); setSearchText(""); }}
          className={`flex flex-col items-center justify-center p-2 rounded-full transition-colors cursor-pointer ${
            activeTab === "papers" ? "text-secondary font-bold" : "text-on-surface-variant hover:bg-slate-800"
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span className="font-mono text-[10px] font-bold">{t.readingsTab}</span>
        </button>
      </nav>

      {/* Saved Desk Drawer Overlay */}
      <SavedPanel
        isOpen={savedDeskOpen}
        onClose={() => setSavedDeskOpen(false)}
        bookmarks={bookmarks}
        onToggleBookmark={handleToggleBookmark}
        downloads={downloads}
        notes={notes}
        onSaveNote={handleSaveNote}
        theme={theme}
        onChangeTheme={(newTheme) => setTheme(newTheme)}
        onShowToast={showToast}
        language={language}
        onChangeLanguage={(newLang) => setLanguage(newLang)}
        font={font}
        onChangeFont={(newFont) => setFont(newFont)}
      />

      {/* Elegant Toast notification overlay */}
      {toastMessage && (
        <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white border border-secondary/40 text-xs px-5 py-3 rounded shadow-xl flex items-center gap-2 animate-fade-in font-mono">
          <span className="w-2 h-2 rounded-full bg-secondary animate-ping mr-1" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

// Subcomponent: Beautiful dynamic geometric spinner
function SpinnerDynamic() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute w-full h-full border-2 border-secondary/15 rounded-full" />
      <div className="absolute w-full h-full border-2 border-t-secondary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
      <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
    </div>
  );
}
