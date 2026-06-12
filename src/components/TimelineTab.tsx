import React, { useState } from "react";
import { TopicDossier, Milestone } from "../types";
import { TranslationDictionary } from "../languages";
import {
  Calendar,
  Lightbulb,
  Search,
  Cpu,
  Globe,
  Activity,
  Microscope,
  Beaker,
  Atom,
  ChevronDown,
  ChevronUp,
  Eye,
  CornerDownRight,
  Sparkles,
  RefreshCw,
  AlertCircle
} from "lucide-react";

interface TimelineTabProps {
  dossier: TopicDossier;
  t: TranslationDictionary;
}

export default function TimelineTab({ dossier, t }: TimelineTabProps) {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  // Cached generated photos to maintain them during user session toggles
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [generatingState, setGeneratingState] = useState<Record<string, boolean>>({});
  const [generationError, setGenerationError] = useState<string | null>(null);

  const handleGenerateMilestoneImage = async (milestoneTitle: string, visualPrompt: string) => {
    setGeneratingState((prev) => ({ ...prev, [milestoneTitle]: true }));
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
        throw new Error(data.error || "Failed to render physical experiment drawing.");
      }

      setGeneratedImages((prev) => ({ ...prev, [milestoneTitle]: data.imageUrl }));
    } catch (err: any) {
      console.error(err);
      setGenerationError(err.message || "An error occurred compiling milestone graphics with Gemini.");
    } finally {
      setGeneratingState((prev) => ({ ...prev, [milestoneTitle]: false }));
    }
  };

  // Selector icon dynamically based on database hint
  const getMilestoneIcon = (iconName: string, active: boolean) => {
    const iconClass = `w-5 h-5 ${active ? "text-black" : "text-secondary"}`;
    switch (iconName) {
      case "lightbulb":
        return <Lightbulb className={iconClass} />;
      case "search":
        return <Search className={iconClass} />;
      case "cpu":
        return <Cpu className={iconClass} />;
      case "globe":
        return <Globe className={iconClass} />;
      case "activity":
        return <Activity className={iconClass} />;
      case "microscope":
        return <Microscope className={iconClass} />;
      case "flask":
        return <Beaker className={iconClass} />;
      default:
        return <Atom className={iconClass} />;
    }
  };

  const activeMilestone = dossier.milestones[expandedIndex];

  const currentImageUrl = activeMilestone
    ? (generatedImages[activeMilestone.title] || activeMilestone.imageUrl)
    : undefined;

  const isGenerating = activeMilestone
    ? !!generatingState[activeMilestone.title]
    : false;

  return (
    <div className="space-y-8 animate-fade-in text-on-background">
      {/* Header section */}
      <section className="bg-surface-container border border-outline-variant p-6 rounded-lg relative overflow-hidden">
        <p className="font-mono text-xs font-bold text-secondary uppercase tracking-widest mb-1.5">
          Temporal Progression Logs
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-primary font-bold tracking-tight mb-3">
          Milestones & Research Breakthroughs
        </h2>
        <p className="font-sans text-sm text-on-surface-variant max-w-4xl leading-relaxed">
          Follow the step-by-step evolution of scientific consensus on <strong className="text-white">{dossier.topic}</strong>. Below is a rigorous timeline spanning from the original discovery up to the 2026 outer limits of modern energy labs. Generate copyright-free diagrams and physical observatory schematics using <strong className="text-secondary font-mono text-xs">Nano Banana 2</strong>.
        </p>
      </section>

      {/* Focus Indicator */}
      <div className="text-xs bg-surface-container-low border border-outline-variant p-3 rounded flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
        <span className="font-mono font-bold text-secondary">CHRONOLOGICAL TRACE ACTIVE:</span>
        <span className="text-on-surface-variant font-medium">Select any milestone block to explore hyper-detailed observational techniques and scientific imagery.</span>
      </div>

      {generationError && (
        <div className="bg-red-950/30 border border-red-900/40 p-4 rounded-lg flex gap-3 text-xs text-left">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <div>
            <p className="font-bold text-red-400">Diagram Generator Notice</p>
            <p className="text-red-200/85">{generationError}</p>
          </div>
        </div>
      )}

      {/* Vertical Timeline & Interactive Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Timeline Log (Left, 7 cols) */}
        <div className="lg:col-span-7 relative pl-8 border-l border-outline-variant/60 py-4 space-y-8">
          {dossier.milestones.map((milestone, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div
                key={idx}
                className={`relative pl-4 group cursor-pointer transition-all duration-300 ${
                  isExpanded ? "scale-100" : "hover:translate-x-1"
                }`}
                onClick={() => setExpandedIndex(idx)}
              >
                {/* Visual node anchor on vertical line */}
                <span
                  className={`absolute -left-[53px] top-1.5 w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all ${
                    isExpanded
                      ? "bg-secondary border-secondary text-black scale-110 shadow-lg shadow-secondary/20"
                      : "bg-surface-container border-outline-variant text-on-surface hover:border-secondary"
                  }`}
                >
                  {getMilestoneIcon(milestone.icon, isExpanded)}
                </span>

                {/* Milestone container */}
                <div
                  className={`border rounded-lg p-5 transition-all duration-300 text-left ${
                    isExpanded
                      ? "bg-surface-container border-secondary/50 shadow-md"
                      : "bg-surface-container-low border-outline-variant/50 hover:bg-surface-container"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 border-b border-outline-variant/30 pb-2 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-secondary bg-secondary/10 border border-secondary/30 px-2 py-0.5 rounded">
                        YEAR {milestone.year}
                      </span>
                      <p className="font-serif text-sm font-bold text-on-surface-variant italic">by {milestone.discoverer}</p>
                    </div>
                    <span className="font-mono text-[10px] text-on-surface-variant font-bold leading-none bg-surface-container px-2 py-1 rounded">
                      IMPACT {milestone.impactScale}/100
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-secondary transition-colors">
                    {milestone.title}
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                    {milestone.description}
                  </p>

                  <div className="flex items-center gap-1.5 mt-3 text-[10px] font-mono font-bold text-secondary uppercase hover:underline">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isExpanded ? "Currently viewing observation stats" : "Click to load observatory details & diagrams"}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Observational contextualizer (Right, 5 cols) */}
        <div className="lg:col-span-5 bg-surface-container border border-outline-variant rounded-lg p-6 space-y-6 lg:sticky lg:top-24">
          <div className="border-b border-outline-variant/60 pb-3 text-left">
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-secondary" /> Observational Details
            </h3>
            <span className="font-mono text-[9px] text-on-surface-variant uppercase font-bold tracking-wider">
              Scientific Instrumentation & Empirical Mechanics
            </span>
          </div>

          {activeMilestone && (
            <div className="space-y-5 animate-fade-in text-left">
              <div className="flex items-center justify-between text-xs bg-surface-container-low px-3 py-1.5 rounded border border-outline-variant/40">
                <span className="font-mono font-bold text-secondary uppercase tracking-widest">
                  EPOCH: {activeMilestone.year}
                </span>
                <span className="font-sans text-[11.5px] italic text-on-surface-variant">
                  Investigated by: {activeMilestone.discoverer}
                </span>
              </div>

              <div>
                <h4 className="font-serif text-lg text-white font-bold leading-snug">
                  {activeMilestone.title}
                </h4>
              </div>

              {/* Dynamic Project schematic diagram with copyright safety bypass */}
              <div className="space-y-2">
                <h5 className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant font-bold flex items-center gap-1.5">
                  <Atom className="w-3.5 h-3.5 text-secondary animate-spin duration-[8000ms]" /> EXPERIMENTAL CONFIGURATION DIAGRAM
                </h5>

                <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-outline-variant/40 bg-slate-900/60 flex items-center justify-center">
                  {currentImageUrl ? (
                    <img
                      src={currentImageUrl}
                      alt={`Visual diagram depicting ${activeMilestone.title}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-5 space-y-1">
                      <Globe className="w-7 h-7 text-neutral-600 mx-auto animate-pulse" />
                      <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider leading-snug">No copyright-safe drawing cached</span>
                    </div>
                  )}
                  {isGenerating && (
                    <div className="absolute inset-0 bg-black/92 flex flex-col items-center justify-center text-center p-4 space-y-2.5">
                      <RefreshCw className="w-5 h-5 text-secondary animate-spin" />
                      <p className="text-[10px] font-mono text-secondary leading-normal">
                        Generative engine (Nano Banana 2) drafting blueprints...
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-1">
                  <p className="text-[8px] font-mono text-neutral-500 leading-tight max-w-[200px]">
                    {activeMilestone.imageSource || "Source: AI Generated science project illustration inside academic research paper"}
                  </p>

                  <button
                    onClick={() => {
                      const defaultPrompt = `Scientific blueprints, schematic diagram, or physical layout of ${activeMilestone.title} by ${activeMilestone.discoverer} for researching ${dossier.topic}, chalk diagram style on dark slate background`;
                      handleGenerateMilestoneImage(activeMilestone.title, activeMilestone.imagePrompt || defaultPrompt);
                    }}
                    disabled={isGenerating}
                    className="w-full sm:w-auto font-mono text-[9px] font-bold uppercase tracking-wider py-1.5 px-3 bg-secondary/10 hover:bg-secondary border border-secondary/40 text-secondary hover:text-black rounded transition-all disabled:opacity-50 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>{currentImageUrl ? t.regeneratePortrait : t.generatePortrait}</span>
                  </button>
                </div>
              </div>

              {/* Dynamic highlighted block: EXACTLY HOW THEY OBSERVED IT */}
              <div className="pl-4 border-l-4 border-secondary bg-surface-container-lowest p-4 rounded-r-lg space-y-2 mt-4 text-left">
                <span className="text-[10px] uppercase font-mono font-bold text-secondary flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-secondary" /> EXACTLY HOW IT WAS OBSERVED / MEASURED
                </span>
                <p className="text-white text-xs leading-relaxed font-sans font-medium">
                  {activeMilestone.howObserved}
                </p>
              </div>

              <div className="space-y-2 pt-2 text-left">
                <h5 className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                  DEEP ACADEMIC PARTICULARS
                </h5>
                <p className="font-sans text-xs text-on-surface leading-relaxed p-3 bg-surface-container-low border border-outline-variant/30 rounded select-text">
                  {activeMilestone.details}
                </p>
              </div>

              {/* Connection layout helper */}
              {expandedIndex < dossier.milestones.length - 1 && (
                <div className="pt-3 border-t border-outline-variant/30 flex items-start gap-1.5 text-xs text-on-surface-variant text-left">
                  <CornerDownRight className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                  <p className="leading-snug">
                    <strong className="text-white">Next Step:</strong> Following {activeMilestone.discoverer}'s outcomes, are we guided directly to the breakthrough in <span className="text-secondary font-mono font-bold">{dossier.milestones[expandedIndex + 1].year}</span> by <strong className="text-on-surface">{dossier.milestones[expandedIndex + 1].discoverer}</strong>.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
