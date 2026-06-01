const STORAGE_KEY = "codebloom-garden-v1";

const lessons = [
  {
    id: "mental-model",
    number: "01",
    title: "How Git actually thinks",
    time: "8 min",
    level: "Start here",
    summary: "Meet the repository, working tree, staging area, and commits before memorizing commands.",
    lede: "Git is a snapshot tool. It helps you deliberately turn changes in your working folder into a history you can inspect, share, and revisit.",
    outcome: "You will understand the four places a file can live and why Git asks you to stage changes.",
    sections: [
      {
        title: "A repository is a tracked project",
        body: "A Git repository is an ordinary project folder plus a hidden .git directory. That hidden directory stores the history, branch pointers, and configuration Git needs. Your visible files are the working tree: the version you are actively editing.",
        commands: [
          { syntax: "git init", description: "Create a new .git directory in the current folder." },
          { syntax: "git status", description: "Ask Git what changed and what is ready to commit." }
        ]
      },
      {
        title: "The staging area is your draft snapshot",
        body: "When you edit a file, Git sees a working-tree change. Staging copies the chosen version of that file into an index. Your next commit is made from that index, not blindly from every changed file. This lets one commit tell one clear story.",
        commands: [
          { syntax: "git add README.md", description: "Stage the current version of one file." },
          { syntax: "git add .", description: "Stage changes under the current folder. Review git status first." }
        ]
      },
      {
        title: "A commit is a durable snapshot",
        body: "A commit records the staged snapshot, a message, its author, and a parent commit. A branch is simply a movable name pointing at a commit. HEAD tells Git which commit or branch you currently have checked out.",
        commands: [
          { syntax: "git commit -m \"Add project introduction\"", description: "Record the staged snapshot with a focused message." },
          { syntax: "git log --oneline --decorate --graph", description: "View a compact picture of your local history." }
        ]
      }
    ],
    checkpoint: {
      question: "You edited three files but only want README.md in your next commit. What should you do?",
      options: ["Run git add .", "Run git add README.md", "Run git push", "Run git clone"],
      answer: 1,
      explanation: "Exactly. Staging lets you build a focused commit from selected changes."
    }
  },
  {
    id: "first-snapshot",
    number: "02",
    title: "Make a clean first commit",
    time: "10 min",
    level: "Beginner",
    summary: "Initialize a repo, inspect changes, stage intentionally, commit, and read your history.",
    lede: "A good commit is small enough to understand and complete enough to be useful. The first loop to master is edit, inspect, stage, inspect, commit.",
    outcome: "You will be able to create a repository and record a clean snapshot with confidence.",
    sections: [
      {
        title: "Begin with identity and a repository",
        body: "Git attaches an author to commits. Configure your name and email once on your machine, then initialize your project. A repository can stay fully local until you choose to connect a remote.",
        commands: [
          { syntax: "git config --global user.name \"Your Name\"", description: "Set the author name Git adds to new commits." },
          { syntax: "git config --global user.email \"you@example.com\"", description: "Set the author email Git adds to new commits." },
          { syntax: "git init", description: "Start tracking history in the current project folder." }
        ]
      },
      {
        title: "Inspect before you record",
        body: "Use status constantly. It shows untracked files, modified files, and staged changes. Use diff to see unstaged line-by-line changes, and diff --staged to review the exact patch your next commit will record.",
        commands: [
          { syntax: "git status", description: "See the state of your working tree and staging area." },
          { syntax: "git diff", description: "Review changes you have not staged yet." },
          { syntax: "git diff --staged", description: "Review the patch that the next commit will contain." }
        ]
      },
      {
        title: "Write a useful commit message",
        body: "A commit message should explain what the snapshot accomplishes. Prefer an imperative summary such as Add install instructions or Fix empty search results. Future you and your collaborators will read it during reviews and debugging.",
        commands: [
          { syntax: "git add README.md", description: "Choose the file for the next snapshot." },
          { syntax: "git commit -m \"Add install instructions\"", description: "Record the staged change with a clear summary." },
          { syntax: "git show --stat", description: "Inspect the latest commit and its changed-file summary." }
        ]
      }
    ],
    checkpoint: {
      question: "Which command reviews the exact patch that will enter your next commit?",
      options: ["git diff --staged", "git log", "git clone", "git branch"],
      answer: 0,
      explanation: "Right. git diff --staged shows what is currently in the index."
    }
  },
  {
    id: "branches",
    number: "03",
    title: "Branch without the drama",
    time: "12 min",
    level: "Beginner",
    summary: "Create feature branches, switch safely, merge finished work, and understand conflicts.",
    lede: "A branch is a lightweight movable label pointing to a commit. Branches let you develop an idea without disturbing the main line of work.",
    outcome: "You will be able to create a feature branch, merge it into main, and know what a merge conflict means.",
    sections: [
      {
        title: "Create a focused branch",
        body: "Use one branch for one piece of work. Clear names such as docs/quickstart or fix/mobile-menu make pull requests easier to understand. git switch -c both creates a branch and moves you onto it.",
        commands: [
          { syntax: "git switch -c docs/quickstart", description: "Create a branch and switch to it in one command." },
          { syntax: "git branch --show-current", description: "Print the branch you currently have checked out." },
          { syntax: "git branch", description: "List local branches. The active branch is marked with an asterisk." }
        ]
      },
      {
        title: "Merge completed work",
        body: "After committing the branch, switch back to main and merge the feature branch. Git may fast-forward main when no divergent commits exist. Otherwise it creates a merge commit that joins both histories.",
        commands: [
          { syntax: "git switch main", description: "Return to your main branch." },
          { syntax: "git merge docs/quickstart", description: "Integrate the named branch into your current branch." },
          { syntax: "git branch -d docs/quickstart", description: "Delete a fully merged local branch." }
        ]
      },
      {
        title: "A conflict is a request for a decision",
        body: "If two branches changed overlapping lines, Git cannot pick the intended result. It places conflict markers into the file. Edit the file into its desired final form, stage it, then finish the merge commit. Conflicts are normal collaboration work.",
        commands: [
          { syntax: "git status", description: "See which files still contain unresolved conflicts." },
          { syntax: "git add src/app.js", description: "Mark a resolved file as ready for the merge commit." },
          { syntax: "git commit", description: "Complete the merge after all conflicts are resolved." }
        ]
      }
    ],
    checkpoint: {
      question: "What is a Git branch at its core?",
      options: ["A full duplicate folder", "A movable pointer to a commit", "A GitHub-only feature", "A zip archive"],
      answer: 1,
      explanation: "Yes. A branch is a lightweight movable pointer, which is why creating one is fast."
    }
  },
  {
    id: "remotes",
    number: "04",
    title: "Share work with remotes",
    time: "11 min",
    level: "Beginner",
    summary: "Clone, fetch, pull, push, and understand what origin really means.",
    lede: "Git works locally. A remote is a named connection to another copy of the repository, often hosted on GitHub. origin is just the conventional name for the remote you cloned from.",
    outcome: "You will know the difference between fetch, pull, and push and how to inspect your remote connections.",
    sections: [
      {
        title: "Clone brings history with it",
        body: "Cloning copies a repository and its history to your machine, then sets up a remote named origin. If you initialized locally instead, add a remote explicitly. A project can have more than one remote.",
        commands: [
          { syntax: "git clone https://github.com/example/project.git", description: "Copy a remote repository and its history to your machine." },
          { syntax: "git remote -v", description: "List named remotes and their fetch and push URLs." },
          { syntax: "git remote add origin https://github.com/you/project.git", description: "Connect a local repository to a remote named origin." }
        ]
      },
      {
        title: "Fetch is the calm way to look",
        body: "git fetch downloads remote commits and updates remote-tracking names such as origin/main without changing your working files. git pull usually fetches and then integrates the remote branch into your current branch. Fetch first when you want to inspect before merging.",
        commands: [
          { syntax: "git fetch origin", description: "Download updates from origin without changing your working tree." },
          { syntax: "git log --oneline main..origin/main", description: "See commits on origin/main that your local main does not have." },
          { syntax: "git pull --ff-only", description: "Update your current branch only when Git can fast-forward safely." }
        ]
      },
      {
        title: "Push publishes local commits",
        body: "git push sends commits to a remote. The -u option records an upstream relationship so later git push and git pull commands know which remote branch to use by default.",
        commands: [
          { syntax: "git push -u origin docs/quickstart", description: "Publish a new branch and remember its upstream." },
          { syntax: "git push", description: "Publish commits to the configured upstream branch." }
        ]
      }
    ],
    checkpoint: {
      question: "Which command downloads remote commits without changing your working files?",
      options: ["git push", "git fetch", "git add", "git merge"],
      answer: 1,
      explanation: "Correct. Fetch updates your view of the remote and leaves your checked-out files alone."
    }
  },
  {
    id: "undo",
    number: "05",
    title: "Undo with confidence",
    time: "13 min",
    level: "Careful mode",
    summary: "Restore files, unstage changes, amend local commits, and revert shared history safely.",
    lede: "Undo commands affect different layers of Git. Pause before running one and ask: am I changing the working tree, the staging area, or recorded history?",
    outcome: "You will choose a safe recovery command based on where the mistake lives and whether a commit has already been shared.",
    sections: [
      {
        title: "Discard or unstage deliberately",
        body: "git restore file replaces an unstaged working-tree change with the version from the index. This discards edits, so inspect first. git restore --staged file removes a file from the staging area while keeping your working copy intact.",
        commands: [
          { syntax: "git diff", description: "Inspect unstaged edits before discarding anything." },
          { syntax: "git restore README.md", description: "Discard unstaged edits in README.md." },
          { syntax: "git restore --staged README.md", description: "Unstage README.md while preserving the edits in your working tree." }
        ]
      },
      {
        title: "Fix the most recent local commit",
        body: "If the latest commit is only on your machine, amend it to replace that snapshot and message. Avoid amending a commit other people may already have because it rewrites the commit identity.",
        commands: [
          { syntax: "git commit --amend --no-edit", description: "Replace the latest local commit while keeping its message." },
          { syntax: "git commit --amend -m \"Improve install instructions\"", description: "Replace the latest local commit and update its message." }
        ]
      },
      {
        title: "Revert shared history",
        body: "When a bad commit has already been pushed to a shared branch, git revert is usually the collaborative answer. It creates a new commit that applies the inverse change, preserving the public history instead of rewriting it.",
        commands: [
          { syntax: "git log --oneline", description: "Find the commit identifier you want to undo." },
          { syntax: "git revert a1b2c3d", description: "Create a new commit that reverses the named commit." }
        ]
      }
    ],
    checkpoint: {
      question: "A bad commit is already shared on main. Which command is usually safest for collaboration?",
      options: ["git revert <commit>", "git reset --hard HEAD~1", "Delete the project", "git init"],
      answer: 0,
      explanation: "Exactly. Revert preserves shared history by recording a new inverse commit."
    }
  },
  {
    id: "open-source",
    number: "06",
    title: "Ship your first pull request",
    time: "15 min",
    level: "Open source",
    summary: "Fork, clone, branch, verify, push, and open a reviewable pull request.",
    lede: "A pull request is a conversation around a proposed set of commits. The Git part is a short, repeatable loop; the collaboration part is reading the project's guidelines and keeping the change focused.",
    outcome: "You will be able to describe and execute the standard fork-based contribution workflow.",
    sections: [
      {
        title: "Read before you branch",
        body: "Check README, CONTRIBUTING, issue labels, and recent pull requests. Pick a scoped issue and ask questions when project guidance requests it. Fork the repository on its hosting platform, then clone your fork.",
        commands: [
          { syntax: "git clone https://github.com/your-name/project.git", description: "Clone your fork to your machine." },
          { syntax: "git remote add upstream https://github.com/original-owner/project.git", description: "Keep a connection to the original project for future updates." },
          { syntax: "git switch -c docs/fix-quickstart", description: "Create a focused contribution branch." }
        ]
      },
      {
        title: "Make the smallest useful change",
        body: "Edit, run the relevant checks, review your diff, and commit the intended patch. Before publishing, sync when the project's guidance asks for it. Keep unrelated formatting or refactors out of a focused pull request.",
        commands: [
          { syntax: "git status", description: "Review changed files before staging." },
          { syntax: "git diff --check", description: "Catch whitespace errors in your changes." },
          { syntax: "git add README.md && git commit -m \"Fix quickstart example\"", description: "Stage and commit the focused fix." }
        ]
      },
      {
        title: "Push and open the conversation",
        body: "Push the branch to your fork, then open a pull request against the original project. Explain what changed, why, and how you verified it. Review comments are part of the process: add commits to the same branch to update the pull request.",
        commands: [
          { syntax: "git push -u origin docs/fix-quickstart", description: "Publish your contribution branch to your fork." },
          { syntax: "git fetch upstream", description: "Refresh your view of the original project when needed." }
        ]
      }
    ],
    checkpoint: {
      question: "Where should you usually push a fork-based contribution branch?",
      options: ["To your fork, usually origin", "Directly to the original main branch", "Into the .git folder", "To an email attachment"],
      answer: 0,
      explanation: "Right. Push the branch to your fork, then propose it to the original project with a pull request."
    }
  }
];

const roadmap = [
  { title: "Learn the Git mental model", description: "Understand snapshots, staging, HEAD, and local history.", label: "Foundation" },
  { title: "Make clean commits", description: "Practice status, diff, add, commit, and helpful messages.", label: "Foundation" },
  { title: "Branch and merge", description: "Develop focused work without disturbing main.", label: "Workflow" },
  { title: "Connect to GitHub", description: "Learn remotes, clone, fetch, pull, and push.", label: "Workflow" },
  { title: "Read contribution guides", description: "Check the README, CONTRIBUTING file, and issue labels.", label: "Community" },
  { title: "Pick a tiny issue", description: "Choose a docs tweak, test improvement, or well-scoped fix.", label: "Community" },
  { title: "Open a pull request", description: "Explain the what, why, and verification clearly.", label: "Contribution" },
  { title: "Respond to review", description: "Treat feedback as collaboration and keep improving.", label: "Contribution" }
];

const repositories = [
  ["first-contributions/first-contributions", "A guided place to practice your first open source contribution.", "JavaScript", "Beginner", 47000, "https://github.com/first-contributions/first-contributions"],
  ["github/docs", "The source for GitHub's documentation with a contributor-friendly workflow.", "JavaScript", "Easy", 17000, "https://github.com/github/docs"],
  ["freeCodeCamp/freeCodeCamp", "The open source codebase and curriculum behind freeCodeCamp.", "TypeScript", "Intermediate", 420000, "https://github.com/freeCodeCamp/freeCodeCamp"],
  ["EddieHubCommunity/LinkFree", "A community-driven profile platform with issue labels for contributors.", "TypeScript", "Easy", 6000, "https://github.com/EddieHubCommunity/LinkFree"],
  ["public-apis/public-apis", "A collaborative list of free APIs for software and web development.", "Python", "Beginner", 340000, "https://github.com/public-apis/public-apis"],
  ["microsoft/vscode", "The open source editor with active issue triage and documentation work.", "TypeScript", "Intermediate", 170000, "https://github.com/microsoft/vscode"],
  ["facebook/react", "The library for web and native user interfaces.", "JavaScript", "Intermediate", 240000, "https://github.com/facebook/react"],
  ["vercel/next.js", "The React framework for full-stack web applications.", "JavaScript", "Intermediate", 130000, "https://github.com/vercel/next.js"],
  ["rust-lang/rustlings", "Small exercises that help developers read and write Rust.", "Rust", "Easy", 58000, "https://github.com/rust-lang/rustlings"],
  ["golang/go", "The Go programming language source repository.", "Go", "Intermediate", 130000, "https://github.com/golang/go"],
  ["kubernetes/kubernetes", "Production-grade container scheduling and management.", "Go", "Intermediate", 115000, "https://github.com/kubernetes/kubernetes"],
  ["appwrite/appwrite", "A backend platform with an active open source community.", "TypeScript", "Intermediate", 52000, "https://github.com/appwrite/appwrite"],
  ["withastro/astro", "A web framework designed for content-driven websites.", "TypeScript", "Easy", 52000, "https://github.com/withastro/astro"],
  ["vitejs/vite", "A fast frontend build tool with a modern JavaScript codebase.", "TypeScript", "Intermediate", 76000, "https://github.com/vitejs/vite"],
  ["vuejs/docs", "The documentation website for Vue, with approachable writing issues.", "TypeScript", "Easy", 3200, "https://github.com/vuejs/docs"],
  ["mdn/content", "The source content for MDN Web Docs.", "Markdown", "Easy", 9500, "https://github.com/mdn/content"],
  ["TheAlgorithms/Python", "A collection of algorithms implemented in Python.", "Python", "Easy", 210000, "https://github.com/TheAlgorithms/Python"],
  ["TheAlgorithms/Java", "A collection of algorithms implemented in Java.", "Java", "Easy", 62000, "https://github.com/TheAlgorithms/Java"],
  ["TheAlgorithms/C-Plus-Plus", "A collection of algorithms implemented in C++.", "C++", "Easy", 33000, "https://github.com/TheAlgorithms/C-Plus-Plus"],
  ["pallets/flask", "A lightweight WSGI web application framework.", "Python", "Intermediate", 70000, "https://github.com/pallets/flask"],
  ["fastapi/fastapi", "A modern, typed Python web API framework.", "Python", "Intermediate", 83000, "https://github.com/fastapi/fastapi"],
  ["spring-projects/spring-petclinic", "A classic sample app for learning Spring patterns.", "Java", "Easy", 8500, "https://github.com/spring-projects/spring-petclinic"],
  ["cli/cli", "GitHub's official command-line tool.", "Go", "Intermediate", 41000, "https://github.com/cli/cli"],
  ["neovim/neovim", "A hyperextensible Vim-based text editor.", "C++", "Intermediate", 86000, "https://github.com/neovim/neovim"],
  ["denoland/deno", "A secure JavaScript, TypeScript, and WebAssembly runtime.", "Rust", "Intermediate", 100000, "https://github.com/denoland/deno"],
  ["sharkdp/bat", "A cat clone with syntax highlighting and Git integration.", "Rust", "Easy", 53000, "https://github.com/sharkdp/bat"],
  ["gin-gonic/gin", "A high-performance HTTP web framework written in Go.", "Go", "Intermediate", 83000, "https://github.com/gin-gonic/gin"],
  ["30-seconds/30-seconds-of-code", "Short JavaScript snippets for common development needs.", "JavaScript", "Beginner", 125000, "https://github.com/30-seconds/30-seconds-of-code"],
  ["codecrafters-io/build-your-own-x", "Tutorials for recreating tools from scratch to learn deeply.", "Markdown", "Beginner", 380000, "https://github.com/codecrafters-io/build-your-own-x"],
  ["ossu/computer-science", "A free self-taught path through computer science fundamentals.", "Markdown", "Beginner", 190000, "https://github.com/ossu/computer-science"]
].map(([name, description, language, difficulty, stars, url]) => ({ name, description, language, difficulty, stars, url }));

const resources = [
  ["Git Book", "The free Pro Git book: broad, precise, and worth keeping nearby.", "Git", "Start here", "https://git-scm.com/book/en/v2"],
  ["Git Reference", "Official command reference and concise Git guides.", "Git", "Reference", "https://git-scm.com/docs"],
  ["GitHub Skills", "Interactive exercises that teach GitHub workflows inside repositories.", "GitHub", "Beginner", "https://skills.github.com/"],
  ["GitHub Flow", "GitHub's short guide to branch-based collaboration.", "GitHub", "Beginner", "https://docs.github.com/en/get-started/using-github/github-flow"],
  ["About pull requests", "Understand proposals, review conversations, and merge options.", "GitHub", "Beginner", "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests"],
  ["First Contributions", "A hands-on repository for making a low-pressure first contribution.", "Open source", "Beginner", "https://github.com/first-contributions/first-contributions"],
  ["Open Source Guides", "Practical guides for contributing to and maintaining open source.", "Open source", "Beginner", "https://opensource.guide/"],
  ["Choose an open source license", "A clear guide to common open source licenses.", "Open source", "Reference", "https://choosealicense.com/"],
  ["MDN Learn Web Development", "A structured path through web platform fundamentals.", "Web development", "Beginner", "https://developer.mozilla.org/en-US/docs/Learn_web_development"],
  ["freeCodeCamp", "Free project-based learning for web development and beyond.", "Web development", "Beginner", "https://www.freecodecamp.org/learn/"],
  ["The Good Docs Project", "Templates and resources for writing useful project documentation.", "Documentation", "Easy", "https://www.thegooddocsproject.dev/"],
  ["Write the Docs Guide", "Community-tested advice for technical documentation work.", "Documentation", "Easy", "https://www.writethedocs.org/guide/"],
  ["Hacktoberfest", "An annual celebration focused on meaningful open source participation.", "Community", "Seasonal", "https://hacktoberfest.com/"],
  ["CNCF Contribute", "Find ways to participate in cloud native open source projects.", "Community", "Intermediate", "https://contribute.cncf.io/"],
  ["GirlScript Summer of Code", "An open source program for learning with project mentors.", "Community", "Seasonal", "https://gssoc.girlscript.tech/"],
  ["Major League Hacking", "Find hackathons, communities, and learning events.", "Community", "Events", "https://mlh.io/"],
  ["Oh Shit, Git!?!", "Plain-language recipes for recovering from common Git mistakes.", "Git", "Reference", "https://ohshitgit.com/"],
  ["Conventional Commits", "A lightweight convention for structured commit messages.", "Git", "Intermediate", "https://www.conventionalcommits.org/"]
].map(([title, description, category, level, url], id) => ({ id, title, description, category, level, url }));

const gitFacts = [
  "Git was created by Linus Torvalds in 2005 while the Linux kernel community needed a new version-control tool.",
  "A branch is not a duplicate project folder. It is a lightweight movable pointer to a commit.",
  "Your working tree, staging area, and commit history are separate places. git status helps you see all three.",
  "The word origin is only a conventional remote name. You can rename it or use several remotes.",
  "git fetch downloads remote history without changing your checked-out files.",
  "A commit identifier is a hash derived from the commit's contents and metadata.",
  "HEAD usually points to your currently checked-out branch, which points to a commit.",
  "git revert is friendly to shared history because it records a new inverse commit.",
  "A merge conflict is not a failure. Git is asking a human to choose the intended final text.",
  "git diff --staged shows the exact patch that your next commit will record.",
  "A repository can exist entirely on your laptop. GitHub hosts repositories, but Git itself works locally.",
  "Small focused commits make code review and debugging much easier."
];

const defaultState = {
  completedLessons: [],
  roadmapDone: [],
  resourcesDone: [],
  repoVisits: 0,
  copiedCommands: 0,
  profile: {
    name: "New contributor",
    bio: "Learning Git one small commit at a time.",
    goal: "Open my first pull request"
  },
  lab: {
    initialized: false,
    fileChanged: false,
    staged: false,
    commitCount: 0,
    branches: ["main"],
    branch: "main",
    merged: false,
    pushed: false,
    logs: [
      { kind: "info", text: "Welcome to the practice garden." },
      { kind: "info", text: "Start with git init, then make a tiny change." }
    ]
  }
};

let state = loadState();
let quizFeedback = {};
let toastTimer;
let currentFactIndex = Math.floor(Math.random() * gitFacts.length);

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return structuredClone(defaultState);
    return {
      ...structuredClone(defaultState),
      ...saved,
      profile: { ...defaultState.profile, ...(saved.profile || {}) },
      lab: { ...structuredClone(defaultState.lab), ...(saved.lab || {}) }
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function encode(value) {
  return encodeURIComponent(value);
}

function showToast(message) {
  const toast = document.querySelector(".toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function updateFacts() {
  document.querySelectorAll("[data-fact-text]").forEach((node, index) => {
    node.textContent = gitFacts[(currentFactIndex + index) % gitFacts.length];
  });
}

function nextFact() {
  currentFactIndex = (currentFactIndex + 1) % gitFacts.length;
  updateFacts();
}

function routeParts() {
  const value = location.hash.replace("#", "") || "home";
  return value.split("/");
}

function setActiveNavigation(page) {
  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === page);
  });
}

function render() {
  const [page, detail] = routeParts();
  setActiveNavigation(page === "lesson" ? "learn" : page);
  document.querySelector(".mobile-panel").classList.remove("open");
  document.querySelector(".mobile-panel").setAttribute("aria-hidden", "true");

  const app = document.querySelector("#app");
  if (page === "home") app.innerHTML = renderHome();
  else if (page === "learn") app.innerHTML = renderLearn();
  else if (page === "lesson") app.innerHTML = renderLesson(detail || lessons[0].id);
  else if (page === "lab") app.innerHTML = renderLab();
  else if (page === "explore") app.innerHTML = renderExplore();
  else if (page === "roadmap") app.innerHTML = renderRoadmap();
  else if (page === "resources") app.innerHTML = renderResources();
  else if (page === "dashboard") app.innerHTML = renderDashboard();
  else app.innerHTML = renderNotFound();

  if (page === "explore") renderRepoGrid();
  window.scrollTo({ top: 0, behavior: "instant" });
}

function renderHome() {
  return `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">A soft place to learn serious Git</p>
        <h1>Let your open-source skills <em>bloom.</em></h1>
        <p>Learn how Git really works, practice the commands in a guided lab, and make your first contribution with a little more calm and a lot more confidence.</p>
        <div class="hero-actions">
          <a class="button" href="#learn">Start learning <span aria-hidden="true">-></span></a>
          <a class="button button-secondary" href="#lab">Try the practice lab</a>
        </div>
      </div>
      <div class="hero-visual" aria-label="Illustration of Git branches and commits">
        <span class="hero-sticker">small commits, big bloom</span>
        <span class="float-spark spark-1"></span><span class="float-spark spark-2"></span><span class="float-spark spark-3"></span>
        <div class="hero-card terminal-preview">
          <div class="terminal-top">
            <div class="terminal-controls"><i></i><i></i><i></i></div>
            <span>~/my-first-contribution</span>
          </div>
          <div class="terminal-lines">
            <div><b>$</b> git switch -c docs/petal-guide</div>
            <div>Switched to a new branch <strong>'docs/petal-guide'</strong></div>
            <div><b>$</b> git add README.md</div>
            <div><b>$</b> git commit -m <em>"Add petal guide"</em></div>
            <div>[docs/petal-guide 72dbf9a] Add petal guide</div>
          </div>
          <div class="branch-garden">
            <span class="branch-line"></span>
            <span class="commit-dot c1">1</span><span class="commit-dot c2">2</span><span class="commit-dot c3">3</span>
            <span class="commit-dot c4">A</span><span class="commit-dot c5">B</span>
          </div>
        </div>
        <div class="hero-card mini-roadmap">
          <h4>Your little Git garden</h4>
          <div class="mini-check"><i>+</i><span>Learn snapshots</span></div>
          <div class="mini-check"><i>+</i><span>Make a commit</span></div>
          <div class="mini-check"><i>+</i><span>Open a PR</span></div>
        </div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="section-inner">
        <div class="section-heading-row">
          <div class="section-heading">
            <p class="eyebrow">What grows here</p>
            <h2>Git makes more sense<br />when the pieces connect.</h2>
          </div>
          <a class="button button-secondary" href="#learn">See the Git garden</a>
        </div>
        <div class="feature-grid">
          ${[
            ["01", "Real Git modules", "Learn what each command changes, not only what to type."],
            ["02", "Practice terminal", "Move files through working tree, staging, history, branches, and remote."],
            ["03", "Contribution roadmap", "Turn the path to your first pull request into friendly, checkable steps."],
            ["04", "Repository explorer", "Browse a curated set of real open source projects by language and difficulty."],
            ["05", "Resource library", "Keep official references and beginner-friendly learning paths close by."],
            ["06", "Saved progress", "Your completed lessons, roadmap, resources, and lab state stay on your device."]
          ].map(([icon, title, description]) => `
            <article class="card feature-card">
              <span class="card-icon">${icon}</span>
              <h3>${title}</h3>
              <p>${description}</p>
            </article>`).join("")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-inner">
        <div class="section-heading">
          <p class="eyebrow">A practical learning loop</p>
          <h2>From first snapshot to first PR.</h2>
        </div>
        <div class="steps-grid">
          ${[
            ["01", "Learn the model", "See how your files move from edits to staged changes to lasting commits."],
            ["02", "Practice the loop", "Run guided commands and watch your pretend repository change state."],
            ["03", "Pick a project", "Browse real repositories and choose a tiny, useful contribution."],
            ["04", "Share your work", "Push a branch and open a clear, reviewable pull request."]
          ].map(([number, title, description]) => `
            <article class="card step-card">
              <b>${number}</b><h3>${title}</h3><p>${description}</p>
            </article>`).join("")}
        </div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="section-inner">
        <div class="stats-grid">
          ${[
            ["6", "guided Git modules"],
            ["30", "real repositories"],
            ["18", "learning resources"],
            ["12", "tiny Git facts"]
          ].map(([number, label]) => `<div class="card stat-tile"><strong class="stat-number">${number}</strong><small>${label}</small></div>`).join("")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-inner">
        <div class="cta-card">
          <div>
            <p class="eyebrow">Ready when you are</p>
            <h2>Your first clean commit is only a few minutes away.</h2>
            <p>No mystery commands. No pressure to know everything. Just one useful step after another.</p>
          </div>
          <div class="cta-actions">
            <a class="button" href="#lesson/mental-model">Begin module one <span aria-hidden="true">-></span></a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderLearn() {
  const completed = state.completedLessons.length;
  return `
    <div class="page-wrap">
      <div class="page-intro">
        <div>
          <p class="eyebrow">Git garden</p>
          <h1>Learn in small,<br /><em>useful</em> commits.</h1>
          <p>Six practical modules build a real mental model. Each ends with a checkpoint, and your progress is saved in this browser.</p>
        </div>
        <a class="button button-secondary" href="#lab">Open practice lab</a>
      </div>
      <div class="card roadmap-progress">
        <div class="progress-label"><span>Your module progress</span><span>${completed} / ${lessons.length} complete</span></div>
        <div class="progress-shell"><div class="progress-fill" style="width:${Math.round((completed / lessons.length) * 100)}%"></div></div>
      </div>
      <div class="lesson-grid">
        ${lessons.map((lesson) => {
          const done = state.completedLessons.includes(lesson.id);
          return `
            <article class="card lesson-card">
              <span class="lesson-number">${lesson.number}</span>
              <span class="pill ${done ? "completed-pill" : ""}">${done ? "Completed" : lesson.level}</span>
              <h3>${lesson.title}</h3>
              <p>${lesson.summary}</p>
              <div class="card-footer">
                <small>${lesson.time}</small>
                <a class="button button-small" href="#lesson/${lesson.id}">${done ? "Review module" : "Start module"}</a>
              </div>
            </article>`;
        }).join("")}
      </div>
    </div>
  `;
}

function renderLesson(id) {
  const lesson = lessons.find((item) => item.id === id) || lessons[0];
  const feedback = quizFeedback[lesson.id];
  const done = state.completedLessons.includes(lesson.id);
  return `
    <div class="page-wrap">
      <div class="lesson-layout">
        <aside class="card lesson-sidebar">
          ${lessons.map((item) => `
            <a class="${item.id === lesson.id ? "active" : ""}" href="#lesson/${item.id}">
              <i>${state.completedLessons.includes(item.id) ? "+" : item.number}</i>
              <span>${item.title}</span>
            </a>`).join("")}
        </aside>
        <article class="card lesson-content">
          <p class="eyebrow">Module ${lesson.number} | ${lesson.time}</p>
          <h1>${lesson.title}</h1>
          <p class="lesson-lede">${lesson.lede}</p>
          <div class="lesson-block">
            <h3>By the end of this module</h3>
            <p>${lesson.outcome}</p>
          </div>
          ${lesson.sections.map((section) => `
            <section class="lesson-block">
              <h3>${section.title}</h3>
              <p>${section.body}</p>
              <div class="command-grid">
                ${section.commands.map((command) => `
                  <div class="command-card">
                    <div class="command-top">
                      <code>${escapeHtml(command.syntax)}</code>
                      <button class="copy-button" type="button" data-copy="${encode(command.syntax)}">Copy</button>
                    </div>
                    <p>${command.description}</p>
                  </div>`).join("")}
              </div>
            </section>`).join("")}
          <section class="quiz-card">
            <p class="eyebrow">Quick checkpoint</p>
            <h3>${lesson.checkpoint.question}</h3>
            <p>Choose the best answer to complete this module.</p>
            <div class="quiz-options">
              ${lesson.checkpoint.options.map((option, index) => `
                <button type="button" class="quiz-option" data-answer="${lesson.id}:${index}">${option}</button>`).join("")}
            </div>
            ${feedback ? `<p class="quiz-result">${feedback}</p>` : ""}
            ${done ? `<p class="quiz-result">Module complete. Nicely done.</p>` : ""}
          </section>
        </article>
      </div>
    </div>
  `;
}

function renderLab() {
  const lab = state.lab;
  return `
    <div class="page-wrap">
      <div class="page-intro">
        <div>
          <p class="eyebrow">Practice lab</p>
          <h1>Grow a repository,<br /><em>command by command.</em></h1>
          <p>This guided terminal models a real Git workflow. Try commands in order, inspect the state, branch off, merge, and push your tiny contribution.</p>
        </div>
      </div>
      <div class="lab-layout">
        <section class="card lab-terminal">
          <div class="terminal-top">
            <div class="terminal-controls"><i></i><i></i><i></i></div>
            <span>CodeBloom practice terminal</span>
          </div>
          <div class="terminal-lines" id="terminal-lines">
            ${lab.logs.map((entry) => `<p>${entry.kind === "command" ? "<span>$</span> " : entry.kind === "success" ? "<b>+</b> " : ""}${escapeHtml(entry.text)}</p>`).join("")}
          </div>
        </section>
        <aside class="card lab-sidebar">
          <h3>Your repository state</h3>
          <p>Watch each command change a specific layer of Git.</p>
          <div class="lab-state">
            <div class="state-item"><span>Repository</span><b>${lab.initialized ? "initialized" : "not started"}</b></div>
            <div class="state-item"><span>Working tree</span><b>${lab.fileChanged ? "modified" : "clean"}</b></div>
            <div class="state-item"><span>Staging area</span><b>${lab.staged ? "README.md staged" : "empty"}</b></div>
            <div class="state-item"><span>Local commits</span><b>${lab.commitCount}</b></div>
            <div class="state-item"><span>Current branch</span><b>${lab.branch}</b></div>
            <div class="state-item"><span>Remote</span><b>${lab.pushed ? "pushed" : "not pushed"}</b></div>
          </div>
          <h3>Try a command</h3>
          <div class="lab-actions">
            ${[
              ["init", "git init"],
              ["edit", "edit README.md"],
              ["status", "git status"],
              ["add", "git add README.md"],
              ["commit", "git commit"],
              ["branch", "git switch -c feature/petal"],
              ["switch", `git switch ${lab.branch === "main" ? "feature/petal" : "main"}`],
              ["merge", "git merge feature/petal"],
              ["push", "git push -u origin main"]
            ].map(([action, command]) => `<button type="button" class="lab-command" data-lab="${action}">${escapeHtml(command)}</button>`).join("")}
            <button type="button" class="lab-command" data-lab="reset">reset lab</button>
          </div>
          <p class="lab-tip"><b>Garden tip:</b> Start with <code>git init</code>. Make one commit on main, create <code>feature/petal</code>, make another commit there, switch back to main, merge, then push.</p>
        </aside>
      </div>
    </div>
  `;
}

function renderExplore() {
  return `
    <div class="page-wrap">
      <div class="page-intro">
        <div>
          <p class="eyebrow">Repository explorer</p>
          <h1>Find a project<br /><em>worth watering.</em></h1>
          <p>Explore real open source repositories. Stars are approximate discovery hints, so always read the project's current contribution guide before choosing an issue.</p>
        </div>
      </div>
      <section class="card filters-card">
        <div class="filter-row">
          <input id="repo-search" type="search" placeholder="Search repositories..." aria-label="Search repositories" />
          <select id="repo-language" aria-label="Filter by language">
            <option value="">All languages</option>
            ${[...new Set(repositories.map((repo) => repo.language))].sort().map((language) => `<option value="${language}">${language}</option>`).join("")}
          </select>
          <select id="repo-difficulty" aria-label="Filter by difficulty">
            <option value="">All levels</option>
            <option>Beginner</option><option>Easy</option><option>Intermediate</option>
          </select>
          <select id="repo-sort" aria-label="Sort repositories">
            <option value="friendly">Beginner friendly</option>
            <option value="stars">Most starred</option>
            <option value="name">Project name</option>
          </select>
        </div>
      </section>
      <div class="results-summary"><span id="repo-count"></span><span>Curated real repositories | Stars shown approximately</span></div>
      <div class="repo-grid" id="repo-grid"></div>
    </div>
  `;
}

function renderRepoGrid() {
  const grid = document.querySelector("#repo-grid");
  if (!grid) return;
  const query = document.querySelector("#repo-search").value.trim().toLowerCase();
  const language = document.querySelector("#repo-language").value;
  const difficulty = document.querySelector("#repo-difficulty").value;
  const sort = document.querySelector("#repo-sort").value;
  const difficultyOrder = { Beginner: 0, Easy: 1, Intermediate: 2 };

  const filtered = repositories
    .filter((repo) => !query || `${repo.name} ${repo.description} ${repo.language}`.toLowerCase().includes(query))
    .filter((repo) => !language || repo.language === language)
    .filter((repo) => !difficulty || repo.difficulty === difficulty)
    .sort((a, b) => {
      if (sort === "stars") return b.stars - a.stars;
      if (sort === "name") return a.name.localeCompare(b.name);
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty] || b.stars - a.stars;
    });

  document.querySelector("#repo-count").textContent = `${filtered.length} repositories found`;
  grid.innerHTML = filtered.length ? filtered.map((repo) => `
    <article class="card repo-card">
      <div class="repo-meta">
        <span class="tag"><i class="language-dot"></i>&nbsp; ${repo.language}</span>
        <span class="difficulty ${repo.difficulty === "Easy" || repo.difficulty === "Beginner" ? "easy" : ""}">${repo.difficulty}</span>
      </div>
      <h3>${repo.name}</h3>
      <p>${repo.description}</p>
      <div class="repo-bottom">
        <span>${formatStars(repo.stars)} stars</span>
        <a href="${repo.url}" target="_blank" rel="noreferrer" data-repo-visit>View on GitHub -></a>
      </div>
    </article>`).join("") : `
    <div class="card empty-state">
      <h3>No matching repositories yet</h3>
      <p>Try a broader search or choose a different language.</p>
    </div>`;
}

function formatStars(stars) {
  if (stars >= 1000) return `${Math.round(stars / 1000)}k`;
  return String(stars);
}

function renderRoadmap() {
  const percentage = Math.round((state.roadmapDone.length / roadmap.length) * 100);
  return `
    <div class="page-wrap">
      <div class="page-intro">
        <div>
          <p class="eyebrow">Contribution roadmap</p>
          <h1>Your path to a<br /><em>first pull request.</em></h1>
          <p>Click each milestone as you complete it. Your progress is stored locally, so this little garden waits for you.</p>
        </div>
      </div>
      <div class="card roadmap-progress">
        <div class="progress-label"><span>Roadmap progress</span><span>${percentage}% complete</span></div>
        <div class="progress-shell"><div class="progress-fill" style="width:${percentage}%"></div></div>
      </div>
      <div class="roadmap-grid">
        ${roadmap.map((step, index) => {
          const done = state.roadmapDone.includes(index);
          return `
            <article class="card roadmap-card ${done ? "done" : ""}" data-roadmap="${index}" tabindex="0" role="button" aria-pressed="${done}">
              <span class="roadmap-number">${String(index + 1).padStart(2, "0")}</span>
              <h3>${step.title}</h3>
              <p>${step.description}</p>
              <div class="roadmap-meta"><span class="roadmap-tag">${step.label}</span><span>${done ? "Done +" : "Mark done"}</span></div>
            </article>`;
        }).join("")}
      </div>
    </div>
  `;
}

function renderResources() {
  return `
    <div class="page-wrap">
      <div class="page-intro">
        <div>
          <p class="eyebrow">Resource library</p>
          <h1>Keep learning,<br /><em>one leaf at a time.</em></h1>
          <p>A tidy set of official references, practical guides, and welcoming community programs. Mark the ones you have explored.</p>
        </div>
      </div>
      <div class="resource-grid">
        ${resources.map((resource) => {
          const done = state.resourcesDone.includes(resource.id);
          return `
            <article class="card resource-card">
              <div class="resource-meta"><span class="tag">${resource.category}</span><span class="difficulty ${resource.level === "Beginner" || resource.level === "Easy" ? "easy" : ""}">${resource.level}</span></div>
              <h3>${resource.title}</h3>
              <p>${resource.description}</p>
              <div class="card-footer">
                <button type="button" class="copy-button" data-resource="${resource.id}">${done ? "Explored +" : "Mark explored"}</button>
                <a href="${resource.url}" target="_blank" rel="noreferrer">Open resource -></a>
              </div>
            </article>`;
        }).join("")}
      </div>
    </div>
  `;
}

function renderDashboard() {
  const lessonPercent = Math.round((state.completedLessons.length / lessons.length) * 100);
  const roadmapPercent = Math.round((state.roadmapDone.length / roadmap.length) * 100);
  const badges = [
    ["01", "First commit", "Finish module two or commit in the lab.", state.completedLessons.includes("first-snapshot") || state.lab.commitCount > 0],
    ["02", "Branch bloomer", "Create a feature branch in the lab.", state.lab.branches.length > 1],
    ["03", "PR ready", "Finish the open source workflow module.", state.completedLessons.includes("open-source")],
    ["04", "Repo explorer", "Visit three repository pages.", state.repoVisits >= 3]
  ];
  return `
    <div class="page-wrap">
      <div class="page-intro">
        <div>
          <p class="eyebrow">My garden</p>
          <h1>Hello, ${escapeHtml(state.profile.name)}.</h1>
          <p>Your learning lives in this browser. Return whenever you want to grow the next small skill.</p>
        </div>
      </div>
      <div class="dashboard-grid">
        <section class="card dashboard-card">
          <div class="dashboard-heading"><h3>Your contributor card</h3><span class="garden-status">Growing steadily</span></div>
          <form class="profile-form" id="profile-form">
            <label for="profile-name">Display name</label>
            <input id="profile-name" name="name" value="${escapeHtml(state.profile.name)}" />
            <label for="profile-bio">Tiny bio</label>
            <textarea id="profile-bio" name="bio">${escapeHtml(state.profile.bio)}</textarea>
            <label for="profile-goal">Current goal</label>
            <input id="profile-goal" name="goal" value="${escapeHtml(state.profile.goal)}" />
            <button class="button button-small" type="submit">Save contributor card</button>
          </form>
        </section>
        <section class="card dashboard-card">
          <div class="dashboard-heading"><h3>Progress snapshot</h3><a class="button button-ghost button-small" href="#roadmap">Open roadmap</a></div>
          <div class="dashboard-stats">
            <div class="dash-stat"><b>${lessonPercent}%</b><small>Modules</small></div>
            <div class="dash-stat"><b>${roadmapPercent}%</b><small>Roadmap</small></div>
            <div class="dash-stat"><b>${state.resourcesDone.length}</b><small>Resources</small></div>
          </div>
          <div class="lesson-block">
            <div class="progress-label"><span>Git garden modules</span><span>${state.completedLessons.length} / ${lessons.length}</span></div>
            <div class="progress-shell"><div class="progress-fill" style="width:${lessonPercent}%"></div></div>
          </div>
          <div class="progress-label"><span>Current goal</span></div>
          <p>${escapeHtml(state.profile.goal)}</p>
        </section>
      </div>
      <section class="card dashboard-card" style="margin-top:16px">
        <div class="dashboard-heading"><h3>Achievement patches</h3><button type="button" class="button button-ghost button-small" data-reset-progress>Reset saved progress</button></div>
        <div class="badge-grid">
          ${badges.map(([icon, title, description, unlocked]) => `
            <article class="badge ${unlocked ? "" : "locked"}">
              <span class="badge-icon">${icon}</span>
              <h4>${title}</h4>
              <small>${unlocked ? "Unlocked" : description}</small>
            </article>`).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderNotFound() {
  return `
    <div class="page-wrap">
      <div class="card empty-state">
        <p class="eyebrow">404</p>
        <h1>This path has not bloomed yet.</h1>
        <p>Let's head back to the garden and find a useful branch.</p>
        <a class="button" href="#home">Return home</a>
      </div>
    </div>
  `;
}

function answerQuiz(value) {
  const [id, rawIndex] = value.split(":");
  const lesson = lessons.find((item) => item.id === id);
  if (!lesson) return;
  if (Number(rawIndex) === lesson.checkpoint.answer) {
    if (!state.completedLessons.includes(id)) state.completedLessons.push(id);
    quizFeedback[id] = lesson.checkpoint.explanation;
    saveState();
    showToast("Module complete. Your Git garden grew a little.");
  } else {
    quizFeedback[id] = "Almost. Revisit the explanation above and try once more.";
    showToast("Not quite yet. Try another answer.");
  }
  document.querySelector("#app").innerHTML = renderLesson(id);
}

function logLab(kind, text) {
  state.lab.logs.push({ kind, text });
  if (state.lab.logs.length > 34) state.lab.logs = state.lab.logs.slice(-34);
}

function labError(message) {
  logLab("info", `Hint: ${message}`);
  showToast(message);
}

function executeLab(action) {
  const lab = state.lab;
  if (action === "reset") {
    state.lab = structuredClone(defaultState.lab);
    saveState();
    render();
    showToast("Practice lab reset.");
    return;
  }

  const commands = {
    init: "git init",
    edit: "edit README.md",
    status: "git status",
    add: "git add README.md",
    commit: "git commit -m \"Add a tiny petal guide\"",
    branch: "git switch -c feature/petal",
    switch: `git switch ${lab.branch === "main" ? "feature/petal" : "main"}`,
    merge: "git merge feature/petal",
    push: "git push -u origin main"
  };
  logLab("command", commands[action]);

  if (action === "init") {
    if (lab.initialized) labError("This folder is already a Git repository.");
    else {
      lab.initialized = true;
      logLab("success", "Initialized empty Git repository in .git/");
    }
  }

  if (action === "edit") {
    if (!lab.initialized) labError("Initialize a repository first with git init.");
    else {
      lab.fileChanged = true;
      lab.staged = false;
      logLab("success", "README.md now has an unstaged change.");
    }
  }

  if (action === "status") {
    if (!lab.initialized) labError("Git cannot find a repository here yet.");
    else {
      logLab("info", `On branch ${lab.branch}`);
      if (lab.staged) logLab("success", "Changes to be committed: modified: README.md");
      else if (lab.fileChanged) logLab("info", "Changes not staged for commit: modified: README.md");
      else logLab("success", "nothing to commit, working tree clean");
    }
  }

  if (action === "add") {
    if (!lab.initialized) labError("Initialize the repository first.");
    else if (!lab.fileChanged) labError("Make a change to README.md before staging it.");
    else {
      lab.staged = true;
      logLab("success", "README.md moved into the staging area.");
    }
  }

  if (action === "commit") {
    if (!lab.initialized) labError("Initialize the repository first.");
    else if (!lab.staged) labError("Stage README.md with git add before committing.");
    else {
      lab.commitCount += 1;
      lab.fileChanged = false;
      lab.staged = false;
      logLab("success", `[${lab.branch} ${String(lab.commitCount).padStart(4, "0")}abc] Add a tiny petal guide`);
    }
  }

  if (action === "branch") {
    if (!lab.initialized || lab.commitCount === 0) labError("Make the first commit on main before branching.");
    else if (lab.branches.includes("feature/petal")) labError("feature/petal already exists. Switch branches or keep working.");
    else {
      lab.branches.push("feature/petal");
      lab.branch = "feature/petal";
      logLab("success", "Switched to a new branch 'feature/petal'");
    }
  }

  if (action === "switch") {
    if (!lab.branches.includes("feature/petal")) labError("Create feature/petal before switching branches.");
    else if (lab.fileChanged || lab.staged) labError("Commit your current change before switching in this guided lab.");
    else {
      lab.branch = lab.branch === "main" ? "feature/petal" : "main";
      logLab("success", `Switched to branch '${lab.branch}'`);
    }
  }

  if (action === "merge") {
    if (!lab.branches.includes("feature/petal")) labError("Create and commit on feature/petal first.");
    else if (lab.branch !== "main") labError("Switch back to main before merging feature/petal.");
    else if (lab.commitCount < 2) labError("Add and commit a change on feature/petal before merging.");
    else if (lab.merged) labError("feature/petal has already been merged.");
    else {
      lab.merged = true;
      logLab("success", "Fast-forward merge complete. README.md updated.");
    }
  }

  if (action === "push") {
    if (!lab.initialized || lab.commitCount === 0) labError("Create a commit before pushing.");
    else if (!lab.merged) labError("Merge your feature branch into main before pushing this guided workflow.");
    else {
      lab.pushed = true;
      logLab("success", "Branch 'main' set up to track 'origin/main'.");
      logLab("success", "Your tiny contribution is ready for a pull request.");
    }
  }

  saveState();
  document.querySelector("#app").innerHTML = renderLab();
  requestAnimationFrame(() => {
    const terminal = document.querySelector("#terminal-lines");
    if (terminal) terminal.scrollTop = terminal.scrollHeight;
  });
}

function toggleRoadmap(index) {
  const existing = state.roadmapDone.indexOf(index);
  if (existing >= 0) state.roadmapDone.splice(existing, 1);
  else state.roadmapDone.push(index);
  saveState();
  render();
  showToast(existing >= 0 ? "Milestone reopened." : "Roadmap milestone complete.");
}

function toggleResource(id) {
  const existing = state.resourcesDone.indexOf(id);
  if (existing >= 0) state.resourcesDone.splice(existing, 1);
  else state.resourcesDone.push(id);
  saveState();
  render();
  showToast(existing >= 0 ? "Resource removed from explored list." : "Resource marked explored.");
}

async function copyCommand(value) {
  const command = decodeURIComponent(value);
  try {
    await navigator.clipboard.writeText(command);
  } catch {
    const area = document.createElement("textarea");
    area.value = command;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
  state.copiedCommands += 1;
  saveState();
  showToast(`Copied: ${command}`);
}

function openPalette() {
  const palette = document.querySelector(".command-palette");
  palette.classList.add("open");
  palette.setAttribute("aria-hidden", "false");
  const input = document.querySelector("#global-search");
  input.value = "";
  renderSearchResults("");
  setTimeout(() => input.focus(), 0);
}

function closePalette() {
  const palette = document.querySelector(".command-palette");
  palette.classList.remove("open");
  palette.setAttribute("aria-hidden", "true");
}

function searchItems() {
  const pageItems = [
    ["Git garden modules", "Browse the complete Git learning path", "#learn"],
    ["Practice lab", "Try Git commands in a guided terminal", "#lab"],
    ["Repository explorer", "Discover open source projects", "#explore"],
    ["Contribution roadmap", "Track your route to a pull request", "#roadmap"],
    ["Resource library", "Official references and community guides", "#resources"],
    ["My garden", "View your saved progress", "#dashboard"]
  ].map(([title, subtitle, href]) => ({ title, subtitle, href }));

  const lessonItems = lessons.map((lesson) => ({ title: lesson.title, subtitle: `Module ${lesson.number} | ${lesson.summary}`, href: `#lesson/${lesson.id}` }));
  const commandItems = lessons.flatMap((lesson) => lesson.sections.flatMap((section) => section.commands.map((command) => ({
    title: command.syntax,
    subtitle: `${lesson.title} | ${command.description}`,
    href: `#lesson/${lesson.id}`
  }))));
  const resourceItems = resources.map((resource) => ({ title: resource.title, subtitle: `${resource.category} | ${resource.description}`, href: "#resources" }));
  return [...pageItems, ...lessonItems, ...commandItems, ...resourceItems];
}

function renderSearchResults(query) {
  const term = query.trim().toLowerCase();
  const items = searchItems()
    .filter((item) => !term || `${item.title} ${item.subtitle}`.toLowerCase().includes(term))
    .slice(0, 9);
  document.querySelector("#palette-results").innerHTML = items.length
    ? items.map((item) => `<a class="palette-result" href="${item.href}"><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.subtitle)}</small></a>`).join("")
    : `<div class="empty-state"><h3>No results yet</h3><p>Try a command such as git status or a topic such as branches.</p></div>`;
}

document.addEventListener("click", (event) => {
  const nextFactButton = event.target.closest("[data-next-fact]");
  if (nextFactButton) nextFact();

  const copyButton = event.target.closest("[data-copy]");
  if (copyButton) copyCommand(copyButton.dataset.copy);

  const answerButton = event.target.closest("[data-answer]");
  if (answerButton) answerQuiz(answerButton.dataset.answer);

  const labButton = event.target.closest("[data-lab]");
  if (labButton) executeLab(labButton.dataset.lab);

  const roadmapButton = event.target.closest("[data-roadmap]");
  if (roadmapButton) toggleRoadmap(Number(roadmapButton.dataset.roadmap));

  const resourceButton = event.target.closest("[data-resource]");
  if (resourceButton) toggleResource(Number(resourceButton.dataset.resource));

  const visitLink = event.target.closest("[data-repo-visit]");
  if (visitLink) {
    state.repoVisits += 1;
    saveState();
  }

  if (event.target.closest(".search-trigger")) openPalette();

  if (event.target.classList.contains("command-palette")) closePalette();

  if (event.target.closest(".mobile-menu-toggle")) {
    const panel = document.querySelector(".mobile-panel");
    const isOpen = panel.classList.toggle("open");
    panel.setAttribute("aria-hidden", String(!isOpen));
  }

  if (event.target.closest(".theme-toggle")) {
    const root = document.documentElement;
    const isBerry = root.dataset.theme === "berry";
    root.dataset.theme = isBerry ? "" : "berry";
    localStorage.setItem("codebloom-theme", root.dataset.theme);
  }

  if (event.target.closest("[data-reset-progress]")) {
    const confirmed = window.confirm("Reset all saved CodeBloom progress on this device?");
    if (confirmed) {
      state = structuredClone(defaultState);
      saveState();
      render();
      showToast("Your saved garden has been reset.");
    }
  }
});

document.addEventListener("input", (event) => {
  if (["repo-search", "repo-language", "repo-difficulty", "repo-sort"].includes(event.target.id)) renderRepoGrid();
  if (event.target.id === "global-search") renderSearchResults(event.target.value);
});

document.addEventListener("change", (event) => {
  if (["repo-language", "repo-difficulty", "repo-sort"].includes(event.target.id)) renderRepoGrid();
});

document.addEventListener("submit", (event) => {
  if (event.target.id !== "profile-form") return;
  event.preventDefault();
  const data = new FormData(event.target);
  state.profile = {
    name: String(data.get("name") || "New contributor").trim(),
    bio: String(data.get("bio") || "").trim(),
    goal: String(data.get("goal") || "").trim()
  };
  saveState();
  render();
  showToast("Contributor card saved.");
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openPalette();
  }
  if (event.key === "Escape") closePalette();
  if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-roadmap]")) {
    event.preventDefault();
    toggleRoadmap(Number(event.target.dataset.roadmap));
  }
});

window.addEventListener("hashchange", () => {
  closePalette();
  render();
});

document.documentElement.dataset.theme = localStorage.getItem("codebloom-theme") || "";
updateFacts();
setInterval(nextFact, 11000);
render();
