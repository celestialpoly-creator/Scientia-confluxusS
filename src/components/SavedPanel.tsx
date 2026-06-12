import React, { useState } from "react";
import { Paper } from "../types";
import { translations, SupportedLanguage } from "../languages";
import { 
  X, 
  Bookmark, 
  FileText, 
  Download, 
  Trash2, 
  Edit2, 
  Check, 
  Settings, 
  Mail, 
  Copy, 
  Palette, 
  MessageSquare, 
  Send,
  Heart,
  Globe,
  Type as FontIcon
} from "lucide-react";

interface SavedPanelProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Paper[];
  onToggleBookmark: (paper: Paper) => void;
  downloads: string[];
  notes: { [key: string]: string };
  onSaveNote: (paperId: string, text: string) => void;
  theme: string;
  onChangeTheme: (theme: string) => void;
  onShowToast: (message: string) => void;
  language: SupportedLanguage;
  onChangeLanguage: (lang: SupportedLanguage) => void;
  font: string;
  onChangeFont: (font: string) => void;
}

export default function SavedPanel({
  isOpen,
  onClose,
  bookmarks,
  onToggleBookmark,
  downloads,
  notes,
  onSaveNote,
  theme,
  onChangeTheme,
  onShowToast,
  language,
  onChangeLanguage,
  font,
  onChangeFont,
}: SavedPanelProps) {
  const [panelTab, setPanelTab] = useState<"research" | "control">("research");
  const [editingPaperId, setEditingPaperId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const t = translations[language] || translations.en;

  if (!isOpen) return null;

  const handleStartNote = (paper: Paper) => {
    setEditingPaperId(paper.id);
    setNoteText(notes[paper.id] || "");
  };

  const handleSaveNoteLocal = (paperId: string) => {
    onSaveNote(paperId, noteText);
    setEditingPaperId(null);
  };

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText("celestialpoly@gmail.com");
      setCopiedEmail(true);
      onShowToast("Chief Scholar email copied to clipboard!");
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFeedbackSubmit = () => {
    if (!feedback.trim()) {
      onShowToast("Please enter a comment or suggestion first.");
      return;
    }
    
    // Local storage persistence log for comments
    try {
      const storedFeedback = localStorage.getItem("scientia_comments");
      const currentComments = storedFeedback ? JSON.parse(storedFeedback) : [];
      currentComments.push({
        text: feedback.trim(),
        timestamp: new Date().toISOString()
      });
      localStorage.setItem("scientia_comments", JSON.stringify(currentComments));
    } catch (err) {
      console.warn("Could not save feedback permanently: ", err);
    }

    setFeedback("");
    onShowToast("Thanks for using! Your valuable feedback has been submitted successfully.");
  };

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-full sm:w-[420px] bg-surface/95 backdrop-blur-md shadow-2xl border-r border-outline-variant flex flex-col transition-all duration-300 animate-slide-in">
      {/* Drawer Title Header */}
      <div className="px-6 py-5 border-b border-outline-variant flex items-center justify-between bg-primary-container text-white">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-secondary" />
          <h2 className="font-serif text-base font-extrabold tracking-tight uppercase">
            Scientia Control Center
          </h2>
        </div>
        <button
          onClick={onClose}
          id="close-desk-btn"
          className="p-1 rounded-full hover:bg-white/10 transition-colors text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Internal Navigation Sub-tabs */}
      <div className="grid grid-cols-2 border-b border-outline-variant bg-surface-container">
        <button
          onClick={() => setPanelTab("research")}
          className={`py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 flex items-center justify-center gap-2 transition-all ${
            panelTab === "research"
              ? "text-secondary border-secondary bg-surface-container-high"
              : "text-on-surface-variant border-transparent hover:text-white"
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Academic Desk</span>
        </button>
        <button
          onClick={() => setPanelTab("control")}
          className={`py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 flex items-center justify-center gap-2 transition-all ${
            panelTab === "control"
              ? "text-secondary border-secondary bg-surface-container-high"
              : "text-on-surface-variant border-transparent hover:text-white"
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Preferences & Help</span>
        </button>
      </div>

      {/* Dynamic Content Body panels based on active sub-tab */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
        {panelTab === "research" ? (
          <>
            {/* Bookmarked Papers Section */}
            <div>
              <h3 className="font-serif text-sm uppercase tracking-wider text-secondary mb-3 flex items-center gap-1.5 border-b border-outline-variant pb-1">
                Bookmarked Lit ({bookmarks.length})
              </h3>
              {bookmarks.length === 0 ? (
                <div className="text-center py-6 text-on-surface-variant font-sans text-xs bg-surface-container rounded border border-dashed border-outline-variant p-4">
                  <Bookmark className="w-8 h-8 mx-auto opacity-35 mb-2" />
                  <p className="font-semibold">Your reading desk is empty.</p>
                  <p className="text-[10px] opacity-70 mt-1">
                    Bookmark manuscripts or profiles across active screens to compile a syllabus.
                  </p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {bookmarks.map((paper) => (
                    <li
                      key={paper.id}
                      className="bg-surface-container border border-outline-variant rounded p-3 text-xs font-sans flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-secondary tracking-widest block mb-1">
                            {paper.journal}
                          </span>
                          <h4 className="font-bold text-on-surface text-xs font-serif mb-1 line-clamp-2 leading-relaxed">
                            {paper.title}
                          </h4>
                          <p className="text-on-surface-variant mb-2 text-[10px]">by {paper.authors}</p>
                        </div>
                        <button
                          onClick={() => onToggleBookmark(paper)}
                          className="text-on-surface-variant hover:text-red-500 transition-colors p-1 rounded hover:bg-surface-container-high"
                          title="Remove Bookmark"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Notes Space */}
                      <div className="mt-2 border-t border-outline-variant/40 pt-2">
                        {editingPaperId === paper.id ? (
                          <div>
                            <textarea
                              className="w-full p-2 bg-slate-950 border border-outline-variant rounded text-xs focus:ring-1 focus:ring-secondary focus:outline-none mb-1.5 font-sans"
                              rows={3}
                              placeholder="Jot down notes, formulas, or derivations..."
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                            />
                            <div className="flex justify-end gap-1.5">
                              <button
                                onClick={() => setEditingPaperId(null)}
                                className="px-2 py-1 text-[10px] font-mono font-bold text-on-surface-variant uppercase rounded hover:bg-surface-container-high"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSaveNoteLocal(paper.id)}
                                className="px-2.5 py-1 text-[10px] font-mono font-bold bg-secondary text-black rounded hover:bg-opacity-90 flex items-center gap-1 uppercase"
                              >
                                <Check className="w-3 h-3" /> Save Note
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center bg-slate-950/50 p-2 rounded border border-outline-variant">
                            <div className="flex-1 text-[11px] italic text-on-surface-variant truncate">
                              {notes[paper.id] ? notes[paper.id] : "No research notes taken yet."}
                            </div>
                            <button
                              onClick={() => handleStartNote(paper)}
                              className="text-secondary hover:text-white p-1 ml-2 transition-colors flex items-center gap-1"
                              title="Write Note"
                            >
                              <Edit2 className="w-3 h-3" />
                              <span className="text-[9px] font-mono font-bold uppercase">Note</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Local Downloads History */}
            <div>
              <h3 className="font-serif text-sm uppercase tracking-wider text-secondary mb-3 flex items-center gap-1.5 border-b border-outline-variant pb-1">
                Downloaded Dossiers ({downloads.length})
              </h3>
              {downloads.length === 0 ? (
                <div className="text-center py-6 text-on-surface-variant font-sans text-xs bg-surface-container rounded border border-dashed border-outline-variant p-4">
                  <Download className="w-6 h-6 mx-auto opacity-35 mb-2" />
                  <p className="font-semibold">No downloaded compilations.</p>
                  <p className="text-[10px] opacity-70 mt-1">
                    Download papers, reports or charts onto your workstation storage.
                  </p>
                </div>
              ) : (
                <ul className="space-y-2 font-mono text-[10px]">
                  {downloads.map((file, idx) => (
                    <li
                      key={`file-${idx}`}
                      className="flex items-center justify-between bg-surface-container border border-outline-variant p-2 rounded"
                    >
                      <div className="flex items-center gap-2 text-on-surface truncate">
                        <FileText className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                        <span className="truncate font-semibold">{file}</span>
                      </div>
                      <span className="text-[8px] text-white bg-slate-900 border border-white/10 px-1 py-0.5 rounded font-bold uppercase tracking-wider">
                        SECURE LOG
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Tab B: Themes, Languages, Fonts and Contact */}
            
            {/* Language Change Selection Selector */}
            <div className="space-y-3">
              <h3 className="font-serif text-sm uppercase tracking-wider text-secondary flex items-center gap-1.5 border-b border-outline-variant pb-1">
                <Globe className="w-4 h-4 text-secondary" /> {t.activeLanguage}
              </h3>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {(["en", "hi", "hinglish", "fr", "es", "zh"] as SupportedLanguage[]).map((lang) => {
                  const labels: Record<string, string> = {
                    en: "EN",
                    hi: "HI",
                    hinglish: "HING",
                    fr: "FR",
                    es: "ES",
                    zh: "ZH"
                  };
                  const fullLabels: Record<string, string> = {
                    en: "English",
                    hi: "हिन्दी",
                    hinglish: "Hinglish",
                    fr: "Français",
                    es: "Español",
                    zh: "中文"
                  };
                  return (
                    <button
                      key={lang}
                      onClick={() => {
                        onChangeLanguage(lang);
                        onShowToast(`Language switched to ${fullLabels[lang]}`);
                      }}
                      className={`py-2 rounded text-xs font-mono font-bold transition-all border flex flex-col items-center justify-center cursor-pointer ${
                        language === lang
                          ? "bg-secondary text-black border-secondary ring-1 ring-secondary/40"
                          : "bg-slate-950/70 border-outline-variant text-slate-400 hover:text-white"
                      }`}
                      title={fullLabels[lang]}
                    >
                      <span className="text-[10px] tracking-wider">{labels[lang]}</span>
                      <span className="text-[8px] opacity-70 font-sans font-normal">{fullLabels[lang]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Font Custom Changing Selector */}
            <div className="space-y-3">
              <h3 className="font-serif text-sm uppercase tracking-wider text-secondary flex items-center gap-1.5 border-b border-outline-variant pb-1">
                <FontIcon className="w-4 h-4 text-secondary" /> {t.selectFontLabel}
              </h3>
              <div className="flex flex-col gap-1.5 pt-1 max-h-[160px] overflow-y-auto pr-1">
                {[
                  { id: "inter", name: "Inter (Modern Sans)" },
                  { id: "space", name: "Space Grotesk (Tech)" },
                  { id: "playfair", name: "Playfair Display (Serif)" },
                  { id: "jetbrains", name: "JetBrains Mono (Technical)" },
                  { id: "lora", name: "Lora (Editorial)" },
                  { id: "cinzel", name: "Cinzel (Sculpted Roman)" },
                  { id: "fira", name: "Fira Sans (Humanistic Sans)" }
                ].map((fItem) => (
                  <button
                    key={fItem.id}
                    onClick={() => {
                      onChangeFont(fItem.id);
                      onShowToast(`Aesthetics typography set to ${fItem.name}`);
                    }}
                    className={`px-3 py-1.5 rounded text-left text-xs transition-all border flex items-center justify-between cursor-pointer ${
                      font === fItem.id
                        ? "bg-secondary/15 text-secondary border-secondary font-bold"
                        : "bg-slate-950/40 border-outline-variant text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>{fItem.name}</span>
                    {font === fItem.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Dynamic Background Customizer Palette */}
            <div className="space-y-3">
              <h3 className="font-serif text-sm uppercase tracking-wider text-secondary flex items-center gap-1.5 border-b border-outline-variant pb-1">
                <Palette className="w-4 h-4 text-secondary" /> {t.themeShift}
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {t.themeDescription}
              </p>
              
              <div className="grid grid-cols-2 gap-2.5 pt-1.5">
                {/* Theme options */}
                <button
                  onClick={() => onChangeTheme("black")}
                  className={`p-3 rounded border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    theme === "black"
                      ? "bg-slate-950 border-secondary text-white ring-1 ring-secondary/50"
                      : "bg-slate-950/70 border-outline-variant text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Obsidian (Black)</span>
                  <div className="flex gap-1 mt-2.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-slate-950 border border-white/20" />
                    <span className="w-3.5 h-3.5 rounded-full bg-secondary" />
                    <span className="w-3.5 h-3.5 rounded-full bg-neutral-800" />
                  </div>
                </button>

                <button
                  onClick={() => onChangeTheme("white")}
                  className={`p-3 rounded border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    theme === "white"
                      ? "bg-white border-blue-500 text-slate-900 ring-1 ring-blue-400/50"
                      : "bg-white/90 border-outline-variant text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Ivory (White)</span>
                  <div className="flex gap-1 mt-2.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-white border border-slate-300" />
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-600" />
                    <span className="w-3.5 h-3.5 rounded-full bg-stone-200" />
                  </div>
                </button>

                <button
                  onClick={() => onChangeTheme("green")}
                  className={`p-3 rounded border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    theme === "green"
                      ? "bg-emerald-950 border-emerald-400 text-emerald-100 ring-1 ring-emerald-300/40"
                      : "bg-emerald-950/70 border-outline-variant text-emerald-400 hover:text-white"
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Jade (Green)</span>
                  <div className="flex gap-1 mt-2.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-950 border border-emerald-800" />
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-400" />
                    <span className="w-3.5 h-3.5 rounded-full bg-teal-900" />
                  </div>
                </button>

                <button
                  onClick={() => onChangeTheme("red")}
                  className={`p-3 rounded border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    theme === "red"
                      ? "bg-red-950 border-red-500 text-red-100 ring-1 ring-red-400/40"
                      : "bg-red-950/70 border-outline-variant text-red-400 hover:text-white"
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Crimson (Red)</span>
                  <div className="flex gap-1 mt-2.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-red-950 border border-red-800" />
                    <span className="w-3.5 h-3.5 rounded-full bg-red-500" />
                    <span className="w-3.5 h-3.5 rounded-full bg-rose-950" />
                  </div>
                </button>
              </div>
            </div>

            {/* Chief Scholar Contact Gmail panel */}
            <div className="space-y-3 bg-surface-container p-4 rounded-lg border border-outline-variant">
              <h4 className="font-serif text-sm font-bold text-white flex items-center gap-1.5 uppercase tracking-wide">
                <Mail className="w-4 h-4 text-secondary" /> {t.scholarContact}
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {t.scholarDescription}
              </p>
              <div className="flex items-center justify-between bg-slate-950 p-2 rounded.5 border border-outline-variant mt-2">
                <span className="text-xs font-mono text-white/90 truncate flex-1 block px-1.5 font-bold">
                  celestialpoly@gmail.com
                </span>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 px-2 bg-slate-800 hover:bg-slate-700 hover:text-white rounded text-[10px] text-on-surface-variant font-mono transition-colors flex items-center gap-1 cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-secondary" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedEmail ? "Copied" : "Copy"}</span>
                  </button>
                  <a
                    href="mailto:celestialpoly@gmail.com"
                    className="p-1 px-2 bg-secondary hover:bg-opacity-90 rounded text-[10px] text-black font-mono font-bold transition-all flex items-center gap-1"
                    title="Send Direct Email"
                  >
                    <Send className="w-3 h-3" />
                    <span>Mail</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Comments and Suggestions empty box with Thanks tribute */}
            <div className="space-y-4">
              <div className="border-t border-outline-variant/60 pt-4">
                <h4 className="font-serif text-md font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-red-500 animate-pulse fill-current" />
                  <span>{t.thanksTribute}</span>
                </h4>
                <p className="text-[11px] text-on-surface-variant leading-normal mt-1 italic">
                  {t.thanksDetailed}
                </p>
              </div>

              {/* Feedback box */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold uppercase text-secondary tracking-wider block">
                  {t.commentsLabel}
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={t.commentsPlaceholder}
                  rows={4}
                  className="w-full p-3 bg-slate-950 border border-outline-variant rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary transition-all placeholder:text-on-surface-variant/40"
                />
                <button
                  onClick={handleFeedbackSubmit}
                  className="w-full py-2 bg-secondary text-black hover:bg-opacity-90 font-mono text-xs font-extrabold uppercase rounded transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-black" />
                  <span>{t.submitComments}</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Drawer footer info */}
      <div className="bg-surface-container px-6 py-4.5 border-t border-outline-variant text-[10px] font-mono text-on-surface-variant text-center flex flex-col gap-0.5">
        <span>Scientia Confluxus Protocol v2.5</span>
        <span className="opacity-60 text-[9px]">Active Theme: {theme.toUpperCase()} • Local Session 2026</span>
      </div>
    </div>
  );
}
