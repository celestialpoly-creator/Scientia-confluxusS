import { TopicDossier } from "./types";

export const DEFAULT_DOSSIER: TopicDossier = {
  topic: "Dark Matter",
  description: "An invisible, non-baryonic form of matter that does not emit, absorb, or reflect light, yet accounts for approximately 85% of all matter in the universe. Its presence and abundance are inferred through gravitational effects on galactic clusters, flat rotation curves, cosmic microwave background fluctuations, and lensing surveys.",
  category: "Astroparticle Physics",
  eraSummary: "First postulated in the 1930s to explain anomalous stellar speeds within galaxy groups, dark matter transitioned from a controversial hypothesis to the central foundation of the Standard Cosmological Model (ΛCDM) by the turn of the 21st century.",
  milestones: [
    {
      year: "1933",
      title: "Coma Cluster Velocity Inconsistencies",
      discoverer: "Fritz Zwicky",
      howObserved: "Measured individual red-shifts and stellar velocities of member galaxies in the massive Coma Cluster using the 18-inch Schmidt Telescope at Mount Wilson Observatory.",
      description: "Zwicky applied the virial theorem and discovered galaxy orbital speeds were 400 times faster than the visible mass of stars should permit.",
      details: "By analyzing the dispersion of galactic velocities, Fritz Zwicky demonstrated that the cluster didn't possess enough luminous baryonic matter to remain bound gravitationally. He concluded that some invisible 'dunkle Materie' (dark matter) was providing the massive structural cohesion keeping the galaxies together.",
      icon: "microscope",
      impactScale: 85
    },
    {
      year: "1970",
      title: "Flat Galactic Rotation Curves",
      discoverer: "Vera Rubin & Kent Ford",
      howObserved: "Observed the orbital velocities of hydrogen clouds and stars in spiral galaxies (namely Andromeda) using a state-of-the-art high-dispersion spectrograph.",
      description: "Rubin measured rotation velocity as a function of radial distance, discovering that orbital velocity remains constant all the way to galactic margins.",
      details: "According to Newtonian dynamics, stars far from the galactic core should orbit much slower than interior stars (Keplerian decline). Rubin's spectacular spectrographic measurements showed flat rotation curves, suggesting spiral galaxies are nested within massive, far-reaching spherical halos of dark matter.",
      icon: "activity",
      impactScale: 95
    },
    {
      year: "2006",
      title: "The Bullet Cluster Decoupling",
      discoverer: "Chandra X-ray Observatory Team",
      howObserved: "Lapped hot intergalactic plasma maps from Chandra's X-ray instruments with weak gravitational lensing mass distributions obtained via Hubble.",
      description: "Observed a spatial decoupling where collisionless gravitational mass separated from hot colliding baryonic gases.",
      details: "During a collision between two sub-clusters, intergalactic gas interacted electrostatically and slowed down (emitting X-ray pink light). In contrast, the gravitational lensing maps (shown in blue) showed that the bulk of the mass passed straight through unimpeded. This proved dark matter is a real, collisionless physical substance rather than an artifact of modified gravitational equations.",
      icon: "atom",
      impactScale: 100
    },
    {
      year: "2015",
      title: "COSINE-100 Deep Underground Startup",
      discoverer: "COSINE Collaboration",
      howObserved: "Encased 106 kilograms of high-purity thallium-doped sodium iodide crystals inside 700 meters of solid rock at the Yangyang Underground Laboratory.",
      description: "Launched to audit or refute the disputed annual modulation claim made by the DAMA/LIBRA team using identical crystal mediums.",
      details: "By running deep underground to neutralize high-energy cosmic muon background noise, COSINE-100 looks for the unique wave modulation signal that occurs as the Earth orbits through the galaxy's static dark matter background. Years of statistical observation substantially limited the WIMP mass spectrum.",
      icon: "flask",
      impactScale: 75
    },
    {
      year: "2026",
      title: "The LUX-ZEPLIN and XENONnT Frontier",
      discoverer: "SURF & LNGS Global Consortia",
      howObserved: "Operated dual-phase cryogenic liquid xenon detectors (LUX-ZEPLIN in South Dakota and XENONnT in Gran Sasso, Italy) at extreme depths.",
      description: "Reaching unprecedented sensitivity limits, approaching the absolute scattering background boundary called the 'Neutrino Floor'.",
      details: "Entering June 2026, researchers are utilizing dual-phase chambers holding up to 10 tons of liquid xenon. High-sensitivity photomultiplier tubes (PMTs) watch for dual light readouts representing nuclear recoils. Current measurements have eliminated major parameters for Weakly Interacting Massive Particles, directing researchers toward alternative theories like Axion search models.",
      icon: "globe",
      impactScale: 98
    }
  ],
  figures: [
    {
      name: "Fritz Zwicky",
      dates: "1898 — 1974",
      role: "Swiss-American Astrophysicist",
      bio: "A brilliant and legendarily eccentric pioneer of observational astrophysics who coined the term 'supernova' and first deduced the presence of dark matter.",
      contributions: [
        "First formulated the 'Dark Matter' hypothesis from galaxy cluster velocities in 1933.",
        "Discovered hundreds of galaxy clusters and cataloged them extensively.",
        "Proposed gravitational lensing by galaxy clusters as a tool for cosmic magnification."
      ],
      imagePrompt: "An elegant charcoal ink sketch portrait of Swiss astrophysicist Fritz Zwicky, looking eccentric and intelligent, Mount Wilson telescope background, vintage scientific atmosphere, monochrome.",
      imageSource: "AI Generated via Nano Banana 2 (Gemini 3.1 Flash Image) - Public Domain / CC0",
      autobiography: "In my memoir and lectures, I often reflected: 'In Coma, the galaxies are running away from us or from each other at speeds of thousands of kilometers per second. Only a massive, unsung ocean of dunkle Materie—dark matter—can prevent them from dissolving into the cosmic void. When you look at the stars, you are merely looking at the foam on the deep, deep ocean of the reality we have yet to touch.'",
      books: [
        {
          title: "Morphological Astronomy (1957)",
          description: "An elegant, comprehensive handbook detailing unique morphological methods to systematically catalog stars, coordinate cosmological spaces, and organize non-luminous structural anomalies."
        },
        {
          title: "Discovery, Invention, Research Through the Morphological Approach (1969)",
          description: "A fascinating look at a cognitive framework that easily translates extremely advanced astronomical anomalies into structured systems, explaining gravity fields simply."
        }
      ],
      wikipediaUrl: "https://en.wikipedia.org/wiki/Fritz_Zwicky"
    },
    {
      name: "Vera Rubin",
      dates: "1928 — 2016",
      role: "American Observational Astronomer",
      bio: "An extraordinary investigator who overcame countless systemic barriers to secure telescope access, ultimately rewriting the laws of galactic movement.",
      contributions: [
        "Uncovered flat galactic rotation curves across dozens of spiral galaxies.",
        "Provided the first bulletproof observational proof of expansive dark halos.",
        "Pioneered the study of counter-rotating gas disks and stellar orbits."
      ],
      imagePrompt: "An inspiring oil painting style portrait of Vera Rubin looking with wonder through a custom spectrograph eyepiece under a massive telescope, vibrant starry spiral galaxy sky in background, rich deep colors.",
      imageSource: "AI Generated via Nano Banana 2 (Gemini 3.1 Flash Image) - Public Domain / CC0",
      autobiography: "In my reflections, I often shared: 'We stargazers thought we were studying the universe. Now we know we were only looking at the bright outer fringe. The real mass of galaxies lies in a majestic, silent sphere of invisible matter. Do not be discouraged by what you cannot see—it is the invisible scaffolding holding our entire home together in its arms.'",
      books: [
        {
          title: "Bright Galaxies, Dark Matters (1997)",
          description: "A beautifully written collection of essays that explains flat galactic rotation speeds and cosmic structures in clear, layperson-friendly prose that anyone can grasp."
        }
      ],
      wikipediaUrl: "https://en.wikipedia.org/wiki/Vera_Rubin"
    },
    {
      name: "Kent Ford",
      dates: "Born 1931",
      role: "American Astrophysicist & Instrument Builder",
      bio: "An outstanding physicist who designed the high-sensitivity image tube spectrographs that made Vera Rubin's hyper-precise measurements possible.",
      contributions: [
        "Created the image tube spectrograph facilitating spatial resolution of dim galactic gas.",
        "Collaborated on spectrographic sweeps of Andromeda and neighboring groups."
      ],
      imagePrompt: "A high-fidelity minimalist vector illustration of Kent Ford as a young physicist holding a highly delicate custom image glass tube spectrograph in an astrophysics laboratory workspace.",
      imageSource: "AI Generated via Nano Banana 2 (Gemini 3.1 Flash Image) - Public Domain / CC0",
      autobiography: "People look at the stars Vera found, but we built the eyes to find them. 'We sat in cold dark dome rooms for hours on end, fine-tuning the electron emitters on our vacuum-tube spectrograph, trying to sensitize photographic film to photons that left Andromeda millions of years ago. Physics is the craft of building beautiful tools that help us touch the invisible.'",
      books: [
        {
          title: "Optics and Quantum Instrumentation in Modern Telescopes (2001)",
          description: "A detailed but incredibly intuitive blueprint outlining how we harness electromagnetic pulses and spectrographic image intensification to observe cold, dark masses."
        }
      ],
      wikipediaUrl: "https://en.wikipedia.org/wiki/W._Kent_Ford_Jr."
    }
  ],
  labStatus: {
    labsAttempting: [
      "Sanford Underground Research Facility (LUX-ZEPLIN, South Dakota)",
      "Gran Sasso National Laboratory (XENONnT, Italy)",
      "CERN Large Hadron Collider (Collision Search, Switzerland)",
      "Kamioka Underground Observatory (Super-CDMS & XMASS, Japan)"
    ],
    currentNearness: 94,
    statusSummary: "While dark matter has not been artificially manufactured in particle accelerators, scientists have achieved monumental progress in narrowing down its physical parameters. Modern detectors are currently on the verge of either discovering weakly interacting massive particles or reaching the 'Neutrino Floor' where coherent solar neutrinos overwhelm physical detectors. Quantum-shielded axion haloscopes represent the active frontier of direct detection.",
    achievements2026: "As of mid-2026, the LZ (Lux-Zeplin) collaboration published updated spin-independent limits pushing WIMP searches down further than ever, completely ruling out standard supersymmetrical neutralinos above 10 GeV. Concurrently, axion experiments like ADMX have achieved full Quantum-Limited noise floor detection, scanning the mass range for cosmic axions with flawless coherence.",
    methodologyUsed: "Deploying multi-ton liquid xenon dual-phase projection chambers and microwave cavity resonators (haloscopes) deeply nested within subterranean salt domes or mines to eliminate cosmic rays.",
    futureMilestream: "Designing next-generation experiments such as XLZD (a massive combined 40-to-80 ton global liquid xenon detector) and advanced astronomical surveys with the Vera C. Rubin Observatory (LSST) to map dynamic dark matter density filaments in real-time."
  },
  concepts: [
    {
      id: "wimp",
      title: "WIMPs (Weakly Interacting Massive Particles)",
      explanation: "A top-tier particle candidate for dark matter. WIMPs would interact solely through the weak nuclear force and gravity. While invisible, rare collisions with atomic nuclei in ultra-pure liquid xenon detectors should trigger microscopic photons and charge releases.",
      svgDiagramHint: "atom"
    },
    {
      id: "lensing",
      title: "Gravitational Lensing",
      explanation: "As predicted by Einstein's general relativity, massive objects bend the space-time fabric around them. Because dark matter adds massive weight, it acts as a cosmic lens, warping and magnifying light from distant background stars into spectacular rings and arcs. This provides precise, mapable coordinates of invisible structures.",
      svgDiagramHint: "vortex"
    },
    {
      id: "halos",
      title: "Galactic Dark Matter Halos",
      explanation: "A giant, roughly spherical ocean of collisionless dark matter particles that entirely encloses the radiant, disk-like stellar visible portion of a galaxy. This halo holds the gravitational weight needed to explain why outer stars rotate as fast as inner ones without being flung apart.",
      svgDiagramHint: "cluster"
    }
  ],
  papers: [
    {
      title: "Rotational Properties of 21 Sc Galaxies with a Large Range of Luminosities and Radii",
      authors: "Vera C. Rubin, W. Kent Ford Jr., & Norbert Thonnard",
      year: "1980",
      summary: "An incredibly comprehensive study that mapped physical rotation speeds out to extreme orbital radii, demonstrating constant velocities and validating dark matter on galactic scales.",
      difficulty: "Intermediate",
      significance: "Standardized the rotation curve anomaly as a universal astronomical reality, forcing astrophysics to integrate massive non-luminous dark halo corrections."
    },
    {
      title: "A Direct Empirical Proof of the Existence of Dark Matter",
      authors: "Douglas Clowe, Maruša Bradač, Anthony H. Gonzalez, et al.",
      year: "2006",
      summary: "Analyzed spatial distribution decoupling inside the Bullet Cluster collision, indicating that gravity follows collisionless dark matter rather than baryonic plasma.",
      difficulty: "Advanced",
      significance: "Dealt a massive empirical blow to simple Modified Newtonian Dynamics (MOND) models, directly charting separated dark matter clusters under lensing."
    },
    {
      title: "First Dark Matter Search Results from the LUX-ZEPLIN (LZ) Experiment",
      authors: "LUX-ZEPLIN Direct Collaboration Core",
      year: "2022",
      summary: "First results from the underground SURF detector utilizing 10 tons of liquid xenon, imposing the most stringent limits on spin-independent WIMP cross-sections to date.",
      difficulty: "Advanced",
      significance: "Proved state-of-the-art detector integrity, eliminating high-mass supersymmetric candidate models, moving direct searches toward the 2026 neutrino threshold."
    }
  ],
  relatedQueries: [
    { name: "Axion Direct Detection Frontiers" },
    { name: "Modified Newtonian Dynamics (MOND)" },
    { name: "Cosmic Microwave Background (CMB) Anisotropies" },
    { name: "LUX-ZEPLIN Liquid Xenon Reactor" }
  ].map(q => q.name)
};
