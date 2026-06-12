import React, { useState, useEffect } from "react";
import { TopicDossier, AcademicPaper } from "../types";
import { Search, Bookmark, Download, BookOpen, GraduationCap, ArrowRight, FileText, CheckCircle } from "lucide-react";

interface PapersTabProps {
  dossier: TopicDossier;
  bookmarks: any[];
  onToggleBookmark: (paper: any) => void;
  onDownloadFile: (fileName: string) => void;
  searchText: string;
  onSearchChange: (text: string) => void;
  activePaper: any | null;
  onSetActivePaper: (paper: any | null) => void;
}

export default function PapersTab({
  dossier,
  bookmarks,
  onToggleBookmark,
  onDownloadFile,
  searchText,
  onSearchChange,
  activePaper,
  onSetActivePaper,
}: PapersTabProps) {
  // Map dossier papers dynamically to fit local paper schemas on-the-fly
  const mappedPapers = dossier.papers.map((p, index) => {
    const citation = `${p.authors.split(",")[0] || "Unknown"} et al. (${p.year})`;
    const localDifficulty: "Beginner" | "Intermediate" | "Advanced" =
      p.difficulty === "Introductory" ? "Beginner" : p.difficulty === "Intermediate" ? "Intermediate" : "Advanced";

    return {
      id: `paper-${index}`,
      title: p.title,
      journal: dossier.category + " Reviews",
      year: parseInt(p.year) || 2026,
      authors: p.authors,
      summary: p.summary,
      tags: [dossier.category, dossier.topic],
      content: p.significance,
      difficulty: localDifficulty,
      citationsCode: citation,
    };
  });

  // Load first paper automatically if none is selected
  useEffect(() => {
    if (!activePaper && mappedPapers.length > 0) {
      onSetActivePaper(mappedPapers[0]);
    }
  }, [dossier]);

  // Filter papers
  const filteredPapers = mappedPapers.filter(
    (paper) =>
      paper.title.toLowerCase().includes(searchText.toLowerCase()) ||
      paper.authors.toLowerCase().includes(searchText.toLowerCase()) ||
      paper.summary.toLowerCase().includes(searchText.toLowerCase())
  );

  const selectedPaper = activePaper && filteredPapers.some(p => p.id === activePaper.id) ? activePaper : filteredPapers[0] || mappedPapers[0];

  return (
    <div className="space-y-8 animate-fade-in text-on-background">
      {/* Header section */}
      <section className="bg-surface-container border border-outline-variant p-6 rounded-lg relative overflow-hidden">
        <p className="font-mono text-xs font-bold text-secondary uppercase tracking-widest mb-1.5">
          Masterpiece Manuscripts
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-primary font-bold tracking-tight mb-3">
          Foundational Literature & Journals
        </h2>
        <p className="font-sans text-sm text-on-surface-variant max-w-4xl leading-relaxed">
          Access high-fidelity theoretical reviews and empirical findings synthesized for <strong className="text-white">{dossier.topic}</strong>. Read landmark manuscripts, save bibliographic entries directly to your local reading stack, and map citation codes.
        </p>
      </section>

      {/* Grid structure: Sidebar list + reader panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Paper List Sidebar (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Paper Search Filter */}
          <div className="relative border-b border-outline focus-within:border-secondary transition-all py-1.5">
            <Search className="absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              type="text"
              className="w-full pl-7 pr-4 py-1.5 bg-transparent focus:outline-none font-sans text-xs text-on-surface placeholder:text-on-surface-variant/70 italic"
              placeholder="Search papers, authors, or abstract details..."
              value={searchText}
              onChange={(e) => onSearchChange(e.target.value)}
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

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredPapers.map((paper) => {
              const isSelected = selectedPaper?.id === paper.id;
              const isBookmarked = bookmarks.some((b) => b.id === paper.id);

              return (
                <div
                  key={paper.id}
                  onClick={() => onSetActivePaper(paper)}
                  className={`border rounded-lg p-4 cursor-pointer text-left transition-all ${
                    isSelected
                      ? "bg-surface-container border-secondary/50 shadow-md scale-[1.01]"
                      : "bg-surface-container-low border-outline-variant/40 hover:bg-surface-container"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5 font-mono text-[9px] font-bold">
                    <span className="text-secondary/85 uppercase">{paper.journal}</span>
                    <span className="text-on-surface-variant">{paper.year}</span>
                  </div>

                  <h4 className="font-serif text-sm font-bold text-white mb-2 line-clamp-2">
                    {paper.title}
                  </h4>

                  <p className="font-sans text-[11px] text-on-surface-variant mb-3 line-clamp-1">
                    by {paper.authors}
                  </p>

                  <div className="flex items-center justify-between border-t border-outline-variant/30 pt-2 text-[10px] font-mono">
                    <span className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                      paper.difficulty === "Advanced" ? "bg-red-950/40 text-red-400 border border-red-900/40" : "bg-blue-950/40 text-blue-400 border border-blue-900/40"
                    }`}>
                      {paper.difficulty}
                    </span>
                    {isBookmarked && (
                      <span className="text-[10px] text-secondary flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Bookmarked
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredPapers.length === 0 && (
              <div className="text-center py-8 text-xs text-on-surface-variant italic">
                No matching scholarly resources logged.
              </div>
            )}
          </div>
        </div>

        {/* Paper Reader Panel (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container border border-outline-variant rounded-lg p-6 min-h-[480px] flex flex-col justify-between">
          {selectedPaper ? (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-outline-variant/50 pb-4">
                <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                  <span className="text-secondary uppercase font-bold tracking-widest">
                    {selectedPaper.journal}
                  </span>
                  <span className="bg-surface-container-high border border-outline-variant/50 px-2.5 py-0.5 rounded text-white">
                    {selectedPaper.year}
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                  {selectedPaper.title}
                </h3>
                <p className="font-sans text-xs font-semibold text-on-surface-variant mt-2">
                  Authors: {selectedPaper.authors}
                </p>
              </div>

              {/* Summary Block */}
              <div className="space-y-2">
                <h4 className="font-mono text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">
                  MANUSCRIPT ABSTRACT
                </h4>
                <p className="font-sans text-xs text-on-surface leading-relaxed p-4 bg-surface-container-lowest border border-outline-variant/30 rounded">
                  {selectedPaper.summary}
                </p>
              </div>

              {/* Dynamic highly structured box with left line: SIGNIFICANCE */}
              {selectedPaper.content && (
                <div className="pl-4 border-l-4 border-secondary bg-surface-container-low p-4 rounded-r-lg text-xs leading-relaxed">
                  <span className="text-[10px] font-mono font-bold text-secondary flex items-center gap-1 mb-1.5">
                    <GraduationCap className="w-4 h-4 text-secondary" /> SHAPING SIGNIFICANCE
                  </span>
                  <p className="text-white font-medium">{selectedPaper.content}</p>
                </div>
              )}

              {/* Citation layout block */}
              {selectedPaper.citationsCode && (
                <div className="bg-surface-container-lowest p-3 border border-dashed border-outline-variant/60 rounded text-center font-mono text-[10px]">
                  <p className="text-on-surface-variant font-bold uppercase tracking-wider mb-1">
                    BIBLIOGRAPHIC CITATION VALUE
                  </p>
                  <code className="text-secondary tracking-widest">{selectedPaper.citationsCode}</code>
                </div>
              )}

              {/* Actions panel */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-outline-variant/50">
                <button
                  onClick={() => onToggleBookmark(selectedPaper)}
                  className={`px-4 py-2 border rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    bookmarks.some((b) => b.id === selectedPaper.id)
                      ? "bg-secondary text-black border-secondary hover:opacity-85"
                      : "bg-surface text-on-surface border-outline hover:bg-surface-container"
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span>
                    {bookmarks.some((b) => b.id === selectedPaper.id) ? "Bookmarked on Desk" : "Bookmark Entry"}
                  </span>
                </button>

                <button
                  onClick={() => onDownloadFile(`${selectedPaper.title.substring(0, 24).replace(/\s+/g, "_")}_Manuscript.pdf`)}
                  className="px-4 py-2 bg-surface hover:bg-surface-container border border-outline rounded text-xs font-semibold text-on-surface flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Blueprint</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-on-surface-variant font-sans">
              <FileText className="w-12 h-12 text-outline-variant mb-3" />
              <p className="text-sm font-semibold">Select a manuscript listing to open reader</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
