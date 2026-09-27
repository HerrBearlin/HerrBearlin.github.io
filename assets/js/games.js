/* ================================================================
   GAMES – the single source of truth for every game on the site.
   ================================================================
   Edit a game here and it updates on index.html, portfolio.html
   and all-games.html at the same time.

   Each game has:
     title        – name shown on the card and in the pop-up
     category     – genre tags under the title
     image        – path from the site root, e.g. "assets/img/x.png"
                    (leave out to show a plain placeholder cover)
     visits       – e.g. "37M" (leave out to hide the visits badge)
     links        – any of: play, video, trailer, tutorial, info, presentation
                    (web addresses or paths from the site root)
     description  – intro text shown at the top of the pop-up
                    (one string, or a list of strings for several paragraphs)
     whatIDid     – bullet points in the pop-up; the "What I did" button
                    appears when this list or the description is filled in
     detailsLabel – button text, defaults to "What I did"
     meta         – info boxes in the pop-up, e.g. { label: "Role", value: "..." }
                    (defaults to the visit count when left out)
     documents    – extra buttons in the pop-up linking to docs or images

   Which games appear where is set in GAME_LISTS at the bottom.
   ================================================================ */

var GAMES = {
  'pull-a-lucky-fish': {
    title: "Pull a Lucky Fish",
    category: "Simulation, Tycoon",
    image: "assets/img/PullALuckyFish.jpg",
    visits: "37M",
    links: {
      play: "https://www.roblox.com/games/112781315318195/Pull-a-Lucky-Fish",
      video: "https://www.youtube.com/watch?v=Z3fYOxb-2pM"
    },
    description: "Simulation game where players catch fish and manage their own fishing island.",
    whatIDid: [
      "Acted as the Game Design consultant, focused on Live Ops, quests and progression.",
      "Helped QA the progression system and Player Experience in the core loop.",
      "Helped design the monetisation strategy and in-game economy features."
    ],
    meta: [
      { label: "Role", value: "Game Design Consultant" },
      { label: "Focus", value: "Live Ops, Progression, Economy" },
      { label: "Scale", value: "37M Visits" },
      { label: "User Rating", value: "95%" }
    ]
  },

  'fish-farm-sushi': {
    title: "Fish Farm Sushi",
    category: "Simulation, Tycoon",
    image: "assets/img/fishFarmSushi.webp",
    visits: "60K",
    links: {
      play: "https://www.roblox.com/games/133644227090327/Fish-Farm-Sushi"
    },
    whatIDid: [
      "Led a team of 6 to develop and publish the game.",
      "Collaborated with the budgeting team and marketing on promotion of the game with 95% positive rating.",
      "Worked as a lead quest designer.",
      "Worked as a lead player experience designer."
    ],
    meta: [
      { label: "Role", value: "Team Lead, Lead Quest & Player Experience Designer" },
      { label: "Team", value: "6 People" },
      { label: "Scale", value: "60K Visits" },
      { label: "User Rating", value: "95%" }
    ]
  },

  'ing-city-s5': {
    title: "ING City Season 5",
    category: "Roleplay, Casual",
    image: "assets/img/MiastoIngS05.jpg",
    visits: "4.6M",
    links: {
      play: "https://www.roblox.com/games/8458974184/Miasto-ING-Koncert-Waksy-Aria-Martelle",
      video: "https://www.youtube.com/watch?v=Xnr2olh5120&list=PLVdeQz_6ceEt2zOkDfWMvELz5kP3kU8LZ"
    },
    description: "5th Season of ING City focused around catching Brainrot-like creatures and house building.",
    whatIDid: [
      "Pitched the Game concept to the team and investors. Defended game idea in front of the management board, and implemented needed changes to the design.",
      "Designed game loop and mechanics of the newest season. Reworked existing game mechanics.",
      "Created A/B tests for game balancing and implemented balance of the game's features based on feedback.",
      "Collaborated with the creative director and art department to create a cohesive vision of the game focused on comedic Gamerots and science."
    ]
  },

  'skoda-bike-planet': {
    title: "Skoda Bike Planet",
    category: "Roleplay, Sports",
    image: "assets/img/skoda.png",
    visits: "3M",
    links: {
      play: "https://www.roblox.com/de/games/14177140042/OBBY-MODE-Skoda-Bike-Planet",
      video: "https://www.youtube.com/watch?v=-vOVrT-kd4w"
    },
    description: "Roleplay city focused around Cycling, racing, and community events.",
    whatIDid: [
      "Wrote 15 quest/mission scenarios for the game and revised them with the artistic and development team to fit the game's vision.",
      "Designed and balanced the game's progression system, including the in-game economy, rewards, and player advancement mechanics.",
      "Collaborated with the creative director and art department to create a cohesive vision of the game focused on cycling culture and community."
    ]
  },

  'hells-obby': {
    title: "Hell's Obby Opera GX",
    category: "Competitive, Shooter",
    image: "assets/img/Hell'sObby.png",
    visits: "2M",
    links: {
      play: "https://www.roblox.com/share?code=57add02cd4db6c499c6b60f3803413e0&type=ExperienceDetails&stamp=1738691684953",
      video: "https://www.youtube.com/watch?v=0pYaSLVQA3g"
    },
    description: "A branded action obby/parkour game with fast-paced movement, focused around explosions and big guns.",
    whatIDid: [
      "Designed and wrote item descriptions and UI text for the game.",
      "Created together with the creative director a vision for the game that combined the fast-paced movement and competitive energy of the game with the unique flavor of the Opera GX brand.",
      "Balanced (but not designed) the game's progression system, including the in-game economy, rewards, and player advancement mechanics."
    ]
  },

  'foodziki-evolution': {
    title: "Foodziki Evolution",
    category: "Simulation, Incremental",
    image: "assets/img/LapFoodziki.webp",
    visits: "1.7M",
    links: {
      play: "https://www.roblox.com/games/78403106549851/Foodziki-Evolution",
      video: "https://youtu.be/ntD5OTN30yk?t=150"
    },
    description: [
      "🐸 FOODZIKI EVOLUTION 🐸",
      "Evolution-style game based on the growth and transformation of Foodziks through various stages."
    ],
    whatIDid: [
      "Designed the core gameplay mechanics for this evolution-based simulator.",
      "Collaborated on the game's progression system and reward mechanics.",
      "Worked on features that encourage playing with friends and community engagement."
    ]
  },

  'sky-trails': {
    title: "Build your Sky Trails",
    category: "Builder, Sandbox",
    image: "assets/img/SkyTrails.webp",
    visits: "1.6M",
    links: {
      play: "https://www.roblox.com/games/134671381817712/Build-your-SKY-TRAILS",
      video: "https://www.youtube.com/watch?v=IVv2vw6--SA"
    },
    description: "A sandbox builder, where players create Rollercoaster-like tracks and can showcase their creativity to the community.",
    whatIDid: [
      "Designed and supervised the implementation of the player-friendly building system key for the game.",
      "Designed QoL features that focused on enhancing player's feeling of creativity, community, and fun."
    ]
  },

  'virtual-vibes-3': {
    title: "Virtual Vibes 3",
    category: "Digital Festival, Game Event",
    image: "assets/img/VirtualVibes3.webp",
    visits: "1.5M",
    links: {
      play: "https://www.roblox.com/games/17067024883/Bank-Millennium-Virtual-Vibes",
      video: "https://www.youtube.com/watch?v=kgSNje62cM4"
    }
  },

  'helios-cinema-tycoon': {
    title: "Helios Cinema Tycoon",
    category: "Tycoon, Management",
    image: "assets/img/HeliosCinemaTycoon1.jpg",
    visits: "1M",
    links: {
      play: "https://www.roblox.com/games/140422012851942/Helios-Cinema-Tycoon",
      video: "https://www.youtube.com/watch?v=zqlrOMSREvM"
    }
  },

  'treflandia': {
    title: "Treflandia",
    category: "Adventure, Casual, Story",
    image: "assets/img/Treflik.jpg",
    visits: "580K",
    links: {
      play: "https://www.roblox.com/games/86253893074445/Treflandia-Wielka-Przygoda-Pomagaj-zwierz-tom"
    }
  },

  'hellena-obby': {
    title: "Popisowe Obby Oranżady Hellena",
    category: "Parkour, Casual",
    image: "assets/img/Hellena.png",
    visits: "463K",
    links: {
      play: "https://www.roblox.com/pl/games/17011973911/Popisowe-Obby-Oran-ady-Hellena"
    }
  },

  'stylish-hobby-horse': {
    title: "Stylish Hobby Horse",
    category: "Casual, Fashion",
    image: "assets/img/StylishHobbyHorse.webp",
    visits: "315K",
    links: {
      play: "https://www.roblox.com/games/102717429184997/Stylish-Hobby-Horse#!/about"
    }
  },

  'virtual-vibes-2': {
    title: "Virtual Vibes 2",
    category: "Digital Festival, Game Event",
    image: "assets/img/VirtualVibes2.png",
    links: {
      play: "https://www.roblox.com/games/17067024883/Virtual-Vibes-Festival"
    }
  },

  'miasto-ing-s4': {
    title: "Miasto ING Sezon 4",
    category: "Roleplay, Casual",
    image: "assets/img/miastoIng.jpg_large",
    links: {
      play: "https://www.roblox.com/pl/games/8458974184/Miasto-ING-Sezon-4-Bitwa-na-Rymy"
    }
  },

  'virtual-vibes': {
    title: "Virtual Vibes",
    category: "Digital Festival, Game Event",
    image: "assets/img/VirtualVibes.jfif"
  },

  /* ---------- Non-commercial ---------- */

  'redkit-quest': {
    title: "[Learning] Quest in RedKit",
    category: "The Witcher 3 Modding, Quest Design · Studying",
    image: "assets/img/QuestEditorRedKit.png",
    links: {
      tutorial: "https://www.youtube.com/watch?v=SRhCNH16jw4&list=PLf-QZNCg8OAZk8zwPJLiJMU238LkGMHoZ&index=7"
    },
    description: "I am currently studying RedKit, the official modding toolkit for The Witcher 3: Wild Hunt, by creating my own quest.",
    detailsLabel: "What I'm learning",
    whatIDid: [
      "Building the quest's flow and logic in the Quest Editor.",
      "Creating animations for characters and scenes.",
      "Writing and implementing dialogues.",
      "Managing a RedKit project and its assets."
    ],
    meta: [
      { label: "Role", value: "Quest Designer (Solo)" },
      { label: "Tool", value: "RedKit – The Witcher 3" },
      { label: "Status", value: "Studying / In Progress" }
    ]
  },

  'gic-2026-talk': {
    title: "Game Industry Conference 2026",
    category: "Presentation",
    image: "assets/img/GIC2026.jpg",
    links: {
      presentation: "assets/pdfs/Branded Game Experiences.pdf"
    },
    description: "Want to know how games made with brands like Żabka or Pepsi are built? Walk with me through the process behind branded game development. You will see how concepts evolve through client feedback, how brand goals influence mechanics, and what it is like to design games while dealing with hordes of marketing teams, legal rules, and approvals. Expect a practical talk, a few (horror) stories from production, and... probably some memes.",
    detailsLabel: "About the talk",
    meta: [
      { label: "Talk", value: "Branded Game Experiences" },
      { label: "Event", value: "Game Industry Conference 2026" }
    ]
  },

  'project-chronos': {
    title: "Project Chronos",
    category: "Platformer, Puzzle, Pixelart",
    image: "assets/img/projectChronos.png",
    links: {
      play: "https://denya-56.itch.io/project-chronos",
      trailer: "https://drive.google.com/file/d/1Dfcauu02mHnJE_lEjY48HCyk4BhLWvb3/view?usp=sharing"
    },
    description: "A pixel-art puzzle platformer built around traversal, time-stopping puzzles and platforming challenges.",
    whatIDid: [
      "Designed and revised the majority of the game's puzzles and levels.",
      "Hand-crafted all pixelart animations and characters. Including the main character movement, time stopping and more.",
      "Wrote the game's narrative and story, including the in-game text and dialogue.",
      "Managed and led the project, including scheduling, task management, and team coordination to ensure the game's on-time release and quality. (3 programmers and 1 artist)",
      "Created the game's trailer, including the script, storyboard, and editing."
    ]
  },

  'ctrl-alt-clean': {
    title: "Ctrl+Alt Clean",
    category: "Casual, Simulator",
    image: "assets/img/CTRLALTCLEAN.png",
    links: {
      info: "https://www.linkedin.com/posts/jan-malicki-6684ba247_hello-there-this-is-my-very-first-post-here-activity-7267297341584396288-BPsj?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD0e4jABMAWAP_9kMJmgna_UEN3ktoQ8Kig"
    },
    description: "A casual simulator built around crazy and over-the-top cleaning gameplay.",
    whatIDid: [
      "Managed the team as the producer for the whole production, from concept to prototyping. Managing to achieve an engaging gameplay experience.",
      "Achieved the goal of the project for the whole team - getting jobs in the industry.",
      "Managed the legal and financial aspects in the team and the project."
    ],
    documents: [
      { label: "Design Snapshot", url: "assets/img/GDD.png" },
      { label: "Open Doc", url: "assets/pdfs/GDD.pdf" }
    ]
  }
};

/* ================================================================
   GAME_LISTS – which games show up in each section, in order.
   Reorder, add or remove ids here.
   ================================================================ */
var GAME_LISTS = {
  // "Recent Games" on index.html and "Recent Commercial" on portfolio.html
  recentCommercialFeatured: ['pull-a-lucky-fish', 'fish-farm-sushi'],
  recentCommercialGrid: ['ing-city-s5', 'hells-obby', 'foodziki-evolution', 'sky-trails'],

  // "Recent Non-Commercial" on portfolio.html
  // (empty grid slots are filled with "Coming Soon" placeholders)
  recentNonCommercialFeatured: ['redkit-quest', 'gic-2026-talk'],
  recentNonCommercialGrid: ['project-chronos', 'ctrl-alt-clean'],

  // all-games.html
  allGames: [
    'pull-a-lucky-fish',
    'ing-city-s5',
    'skoda-bike-planet',
    'hells-obby',
    'foodziki-evolution',
    'sky-trails',
    'virtual-vibes-3',
    'helios-cinema-tycoon',
    'treflandia',
    'hellena-obby',
    'stylish-hobby-horse',
    'fish-farm-sushi',
    'virtual-vibes-2',
    'ctrl-alt-clean',
    'project-chronos',
    'miasto-ing-s4',
    'virtual-vibes'
  ]
};
