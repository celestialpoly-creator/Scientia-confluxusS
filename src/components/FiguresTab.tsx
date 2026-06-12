import React, { useState } from "react";
import { TopicDossier, Figure } from "../types";
import { TranslationDictionary } from "../languages";
import {
  GraduationCap,
  Award,
  Compass,
  Search,
  ArrowRight,
  BookOpen,
  Sparkles,
  RefreshCw,
  AlertCircle,
  ExternalLink
} from "lucide-react";

interface FiguresTabProps {
  dossier: TopicDossier;
  searchText: string;
  onSearchChange: (text: string) => void;
  t: TranslationDictionary;
}

export default function FiguresTab({ dossier, searchText, onSearchChange, t }: FiguresTabProps) {
  const [selectedFigureIndex, setSelectedFigureIndex] = useState<number>(0);

  // Cache generated images during the active session to prevent redundant requests
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [generatingState, setGeneratingState] = useState<Record<string, boolean>>({});
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Filter figures based on Search text
  const filteredFigures = dossier.figures.filter((figure) => {
    const searchLower = searchText.toLowerCase();
    return (
      figure.name.toLowerCase().includes(searchLower) ||
      (figure.bio && figure.bio.toLowerCase().includes(searchLower)) ||
      (figure.role && figure.role.toLowerCase().includes(searchLower)) ||
      figure.contributions.some((contrib) => contrib.toLowerCase().includes(searchLower))
    );
  });

  const activeFigure = filteredFigures[selectedFigureIndex] || filteredFigures[0] || dossier.figures[0];

  const handleGenerateImage = async (figName: string, visualPrompt: string) => {
    setGeneratingState((prev) => ({ ...prev, [figName]: true }));
    setGenerationError(null);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: visualPrompt }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to compile deep visual layers.");
      }

      setGeneratedImages((prev) => ({ ...prev, [figName]: data.imageUrl }));
    } catch (err: any) {
      console.error(err);
      setGenerationError(err.message || "An error occurred during Gemini photo generation.");
    } finally {
      setGeneratingState((prev) => ({ ...prev, [figName]: false }));
    }
  };

  const currentImageUrl = activeFigure
    ? (generatedImages[activeFigure.name] || activeFigure.imageUrl)
    : undefined;

  const isGenerating = activeFigure
    ? !!generatingState[activeFigure.name]
    : false;

  return (
    <div className="space-y-8 animate-fade-in text-on-background">
      {/* Header section */}
      <section className="bg-surface-container border border-outline-variant p-6 rounded-lg relative overflow-hidden">
        <p className="font-mono text-xs font-bold text-secondary uppercase tracking-widest mb-1.5">
          Pioneering Investigators
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-primary font-bold tracking-tight mb-3">
          Scientific Pioneers & Key Scholars
        </h2>
        <p className="font-sans text-sm text-on-surface-variant max-w-4xl leading-relaxed">
          Behind every great cosmological breakthrough are dedicated theorists, experimentalists, and astronomers who dared to query cosmic anomalies. See their autobiography summaries, review key book handbooks, and generate copyright-safe visuals using <strong className="text-secondary font-mono text-xs">Nano Banana 2</strong>.
        </p>
      </section>

      {/* Embedded search bar for figures */}
      <div className="relative max-w-md border-b border-outline focus-within:border-secondary transition-all py-1">
        <Search className="absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
        <input
          type="text"
          className="w-full pl-7 pr-4 py-1 bg-transparent focus:outline-none font-sans text-xs text-on-surface placeholder:text-on-surface-variant/70 italic"
          placeholder="Filter investigators by name, role, or contributions..."
          value={searchText}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setSelectedFigureIndex(0); // Reset index on search
          }}
        />
        {searchText && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] font-mono text-secondary hover:text-white"
          >
            CLEAR
          </button>
        )}
      </div>

      {generationError && (
        <div className="bg-red-950/30 border border-red-900/40 p-4 rounded-lg flex gap-3 text-xs">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <div className="text-left">
            <p className="font-bold text-red-400">Visual Generator Notice</p>
            <p className="text-red-200/85">{generationError}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Figure selection sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-surface-container border border-outline-variant p-4 rounded-lg space-y-3 max-h-[550px] overflow-y-auto">
          <p className="font-mono text-[9px] uppercase tracking-widest text-on-surface-variant font-bold border-b border-outline-variant/50 pb-2">
            PIONEER INDEX ({filteredFigures.length})
          </p>

          {filteredFigures.length === 0 ? (
            <div className="text-center py-6 text-xs text-on-surface-variant italic">
              No matching pioneers discovered.
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFigures.map((fig, idx) => {
                const isActive = activeFigure?.name === fig.name;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedFigureIndex(idx)}
                    className={`w-full text-left p-3 rounded transition-all flex flex-col justify-between border cursor-pointer ${
                      isActive
                        ? "bg-secondary border-secondary text-black"
                        : "bg-surface-container-low border-outline-variant/40 text-white hover:bg-surface-container-high hover:border-outline-variant"
                    }`}
                  >
                    <div>
                      <h4 className="font-serif font-bold text-sm tracking-tight">{fig.name}</h4>
                      <p className={`text-[10px] font-sans ${isActive ? "text-neutral-800" : "text-on-surface-variant"}`}>
                        {fig.role}
                      </p>
                    </div>
                    <span className="text-[9px] font-mono mt-1 font-bold tracking-tight block">
                      {fig.dates}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Detailed scholarly profile view (8 cols) */}
        <div className="lg:col-span-8 bg-surface-container border border-outline-variant rounded-lg p-6 space-y-6 min-h-[440px] flex flex-col justify-between">
          {activeFigure ? (
            <div className="space-y-6 animate-fade-in">
              
              {/* Profile Card Body Grid (splits into Portrait and Metadata) */}
              <div className="flex flex-col md:flex-row gap-6 items-start border-b border-outline-variant/60 pb-5">
                
                {/* Safe Portrait box with copyright bypass using Nano Banana 2 generator */}
                <div className="w-full md:w-44 flex-shrink-0 flex flex-col items-center space-y-2">
                  <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-lg overflow-hidden border border-outline-variant/40 bg-slate-900 flex items-center justify-center">
                    {currentImageUrl ? (
                      <>
                        <img
                          src={currentImageUrl}
                          alt={`Portrait of ${activeFigure.name}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        {/* Integrated Direct Picture Info Overlay */}
                        <div className="absolute bottom-0 inset-x-0 bg-slate-950/90 border-t border-white/10 px-2 py-1.5 text-center flex flex-col justify-center leading-normal">
                          <span className="text-[9px] font-bold text-white truncate leading-none">
                            {activeFigure.name}
                          </span>
                          <span className="text-[7px] font-mono text-secondary truncate mt-0.5" title={activeFigure.imageSource || "Source Cited"}>
                            {activeFigure.imageSource || "Source: Academic Portrait"}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-4">
                        <GraduationCap className="w-8 h-8 text-neutral-600 mx-auto mb-1 animate-pulse" />
                        <span className="text-[9px] font-mono text-neutral-500 uppercase block leading-tight">No copyright-safe photo cached</span>
                      </div>
                    )}
                    {isGenerating && (
                      <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center text-center p-2 space-y-2.5">
                        <RefreshCw className="w-5 h-5 text-secondary animate-spin" />
                        <span className="text-[8px] font-mono text-secondary leading-tight">Generative engine (Nano Banana 2) painting portrait...</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                        const defaultPrompt = `Portrait illustration of scientist ${activeFigure.name}, pioneer of ${dossier.topic}, styled as high contrast academic charcoal sketch, deep colors`;
                        handleGenerateImage(activeFigure.name, activeFigure.imagePrompt || defaultPrompt);
                    }}
                    disabled={isGenerating}
                    className="w-full font-mono text-[9px] font-bold uppercase tracking-wider py-1.5 px-2 bg-secondary/10 hover:bg-secondary border border-secondary/40 text-secondary hover:text-black rounded transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>{currentImageUrl ? t.regeneratePortrait : t.generatePortrait}</span>
                  </button>
                </div>

                {/* Profile descriptive core text */}
                <div className="flex-1 space-y-3.5 w-full">
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <h3 className="font-serif text-2xl font-bold text-white uppercase tracking-tight">
                        {activeFigure.name}
                      </h3>
                      <span className="font-mono text-[10px] text-secondary font-bold bg-secondary/15 px-2 py-0.5 rounded border border-secondary/15">
                        {activeFigure.dates}
                      </span>
                    </div>

                    {/* Interactive Wikipedia Page External Link */}
                    <div className="mt-2 text-left">
                      <a
                        href={activeFigure.wikipediaUrl || `https://en.wikipedia.org/wiki/${encodeURIComponent(activeFigure.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-900/15 hover:bg-blue-800/30 border border-blue-500/20 hover:border-blue-400/40 text-blue-300 font-mono text-[10px] font-bold uppercase rounded tracking-wider transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                        <span>Wikipedia Biography</span>
                      </a>
                    </div>

                    <p className="font-sans text-xs font-bold text-on-surface-variant flex items-center gap-1 mt-3.5 uppercase tracking-wide">
                      <GraduationCap className="w-4 h-4 text-secondary" /> {activeFigure.role}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-mono text-[9px] uppercase font-bold tracking-wider text-on-surface-variant">
                      BIOGRAPHICAL CONTEXT
                    </h4>
                    <p className="font-sans text-xs text-on-surface leading-relaxed italic bg-surface-container-low border border-outline-variant/30 p-2.5 rounded-lg select-text">
                      "{activeFigure.bio}"
                    </p>
                  </div>
                </div>

              </div>

              {/* Autobiography brief segment */}
              {activeFigure.autobiography && (
                <div className="space-y-2 bg-secondary/[0.04] border border-secondary/20 p-4.5 rounded-lg text-left">
                  <h4 className="font-mono text-[10px] uppercase font-bold tracking-wider text-secondary flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-secondary" /> AUTOBIOGRAPHICAL BRIEF & MEMOIRS
                  </h4>
                  <p className="font-serif text-xs text-on-surface leading-relaxed italic border-l-2 border-secondary/35 pl-3">
                    "{activeFigure.autobiography}"
                  </p>
                </div>
              )}

              {/* Achievements accomplishments highlights */}
              <div className="space-y-2.5">
                <h4 className="font-mono text-[10px] uppercase font-bold tracking-wider text-on-surface-variant flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-secondary" /> MAJOR ACADEMIC BREAKTHROUGHS
                </h4>
                <ul className="space-y-2.5">
                  {activeFigure.contributions.map((contribution, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-3 text-xs text-on-surface text-left">
                      <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center font-mono text-[10px] font-bold text-secondary flex-shrink-0 mt-0.5 border border-secondary/30">
                        {cIdx + 1}
                      </div>
                      <p className="leading-relaxed pt-0.5">{contribution}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Autobiography books lists */}
              {activeFigure.books && activeFigure.books.length > 0 && (
                <div className="space-y-3 pt-2 text-left">
                  <h4 className="font-mono text-[10px] uppercase font-bold tracking-wider text-on-surface-variant flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-secondary" /> RECOMMENDED BOOKS & CLASSIC MONOGRAPHS
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeFigure.books.map((book, bIdx) => (
                      <div key={bIdx} className="bg-surface-container-low border border-outline-variant/30 p-3.5 rounded-lg flex flex-col justify-between">
                        <div>
                          <h5 className="font-serif font-bold text-xs text-white tracking-tight">
                            📖 {book.title}
                          </h5>
                          <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed pt-1 select-text">
                            {book.description}
                          </p>
                        </div>
                        <span className="text-[8px] font-mono text-secondary uppercase tracking-wider font-bold block pt-2 select-none">
                          [ SCHOLASTIC HANDBOOK ]
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-on-surface-variant font-sans">
              <Compass className="w-12 h-12 text-outline-variant mb-3 animate-spin duration-[4000ms]" />
              <p className="text-sm font-semibold">Select an investigator profile from the index sidebar</p>
            </div>
          )}

          <div className="pt-4 border-t border-outline-variant/40 text-[10px] font-mono text-on-surface-variant flex items-center gap-2 select-none">
            <BookOpen className="w-3.5 h-3.5 text-secondary" />
            <span>AUTHENTICATED HISTORIAN DATABASE SECURED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
