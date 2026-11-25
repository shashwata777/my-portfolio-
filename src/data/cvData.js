export const PROFILE = {
  firstName: 'Shashwata Ranjan',
  lastName: 'Bhatta',
  name: 'Shashwata Ranjan Bhatta',
  badge: 'CSE Student • AI Enthusiast',
  headline: 'Building intelligent solutions, one line of code at a time.',
  heroSubcopy:
    'Motivated Software Developer exploring AI, Machine Learning, Generative AI, and Full-Stack Development.',
  aboutSummary:
    "I'm a Computer Science Engineering final year student at Netaji Subhash Engineering College with a strong foundation in programming, Artificial Intelligence, Machine Learning, and Full-Stack Web Development. I love turning ideas into real-world products.",
  email: 'shashwata607@gmail.com',
  phone: '+91 8927144598',
  linkedin: 'https://www.linkedin.com/in/shashwata-ranjan-bhatta7bb648291',
  linkedinDisplay: 'linkedin.com/in/shashwata-ranjan-bhatta7bb648291',
  github: 'https://github.com/shashwata777',
  githubDisplay: 'github.com/shashwata777',
  leetcode: 'https://leetcode.com/u/Mespycoder/',
  leetcodeDisplay: 'leetcode.com/u/Mespycoder',
  summary:
    'Motivated Computer Science undergraduate with a strong foundation in programming, software development, and problem-solving. Experienced in developing academic and practical projects using Python, machine learning, and web technologies. Eager to apply technical knowledge, learn new technologies, and contribute to innovative projects while growing as a software professional.',
  languages: ['English', 'Hindi', 'Bengali'],
};

export const EDUCATION = {
  college: 'Netaji Subhash Engineering College',
  status: 'Final Year Student',
  degree: 'B.Tech. in Computer Science and Engineering',
};

export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export const SKILL_CATEGORIES = [
  {
    id: 'languages',
    title: 'Programming Languages',
    color: '#a78bfa',
    skills: ['Java', 'Python'],
    description:
      'Core programming foundations for software engineering, algorithms, and AI pipelines.',
  },
  {
    id: 'ai-ml',
    title: 'AI / Machine Learning',
    color: '#818cf8',
    skills: [
      'Machine Learning',
      'Deep Learning',
      'PyTorch',
      'TensorFlow',
      'Keras',
      'OpenCV',
      'NumPy',
      'Pandas',
      'Matplotlib',
    ],
    description:
      'Computer vision, neural architectures, semantic segmentation, and end-to-end model evaluation.',
  },
  {
    id: 'genai',
    title: 'Generative AI',
    color: '#c084fc',
    skills: [
      'Retrieval-Augmented Generation (RAG)',
      'LangChain',
      'LangGraph',
      'ChromaDB',
    ],
    description:
      'LLM orchestration, vector stores, and retrieval-augmented reasoning pipelines.',
  },
  {
    id: 'web',
    title: 'Web Development',
    color: '#38bdf8',
    skills: [
      'HTML5',
      'CSS3',
      'React.js',
      'Node.js',
      'REST APIs',
      'Firebase Authentication',
    ],
    description:
      'Responsive modern interfaces, component systems, backend APIs, and authentication.',
  },
  {
    id: 'databases',
    title: 'Databases',
    color: '#60a5fa',
    skills: ['MongoDB', 'MySQL'],
    description:
      'Relational schema design and flexible NoSQL document persistence.',
  },
  {
    id: 'tools',
    title: 'Tools & Analytics',
    color: '#34d399',
    skills: ['Git', 'GitHub', 'Power BI', 'Streamlit'],
    description:
      'Version control workflows, interactive ML apps, and data analytics dashboards.',
  },
];

export const PROJECT_FILTERS = [
  { id: 'all', label: 'All Projects (5)' },
  { id: 'vision', label: 'Computer Vision' },
  { id: 'genai', label: 'GenAI & RAG' },
  { id: 'fullstack', label: 'Full-Stack MERN' },
];

export const PROJECTS = [
  {
    id: 'pothole-detection',
    category: 'vision',
    title: 'Real-Time Pothole Detection System',
    shortTitle: 'YOLOv8 Pothole Vision',
    stack: ['Python', 'PyTorch', 'YOLOv8', 'Streamlit'],
    accent: '#8b5cf6',
    githubLabel: 'Pothole Detection Repository',
    githubUrl: 'https://github.com/shashwata777',
    metrics: [
      { label: 'mAP@0.50', value: '80.05%' },
      { label: 'Annotated Images', value: '651' },
      { label: 'Pothole Instances', value: '1,784' },
      { label: 'Export Target', value: 'ONNX' },
    ],
    highlights: [
      'Developed a computer vision system using a fine-tuned YOLOv8 model to detect potholes in images, videos, and live webcam feeds.',
      'Trained and evaluated the model on 651 annotated images containing 1,784 pothole instances, achieving 80.05% mAP@0.50 on the test set.',
      'Built a Streamlit application featuring configurable detection thresholds, bounding-box visualizations, and detection summaries.',
      'Implemented dataset preparation, model training, evaluation, inference, and ONNX export workflows.',
    ],
    demoType: 'yolo',
  },
  {
    id: 'unet-segmentation',
    category: 'vision',
    title: 'U-Net: Semantic Image Segmentation',
    shortTitle: 'U-Net Pixel Segmentation',
    stack: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy'],
    accent: '#38bdf8',
    githubLabel: 'U-Net Repository',
    githubUrl: 'https://github.com/shashwata777',
    metrics: [
      { label: 'Architecture', value: 'Encoder-Decoder' },
      { label: 'Loss Function', value: 'BCE + Dice' },
      { label: 'Connections', value: 'Skip Links' },
      { label: 'Callbacks', value: '3 Active' },
    ],
    highlights: [
      'Implemented a U-Net encoder-decoder architecture with skip connections for pixel-level semantic image segmentation.',
      'Combined Binary Cross-Entropy and Dice Loss to improve segmentation performance.',
      'Created a TensorFlow data pipeline and implemented EarlyStopping, ModelCheckpoint, and ReduceLROnPlateau callbacks.',
      'Visualized input images, ground-truth masks, and predicted segmentation masks to evaluate model performance.',
    ],
    demoType: 'unet',
  },
  {
    id: 'expiry-tracker',
    category: 'fullstack',
    title: 'ExpiryGuard — AI Expiry & Warranty Tracker',
    shortTitle: 'ExpiryGuard (MERN + AI)',
    stack: [
      'React 18',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Gemini AI',
      'Three.js',
      'Firebase Auth',
    ],
    accent: '#a78bfa',
    githubLabel: 'Expirey-Tracker',
    githubUrl: 'https://github.com/shashwata777/Expirey-Tracker',
    metrics: [
      { label: 'Stack', value: 'MERN + 3D' },
      { label: 'Extraction', value: 'Gemini AI' },
      { label: 'Cron Alerts', value: '30/15/7/1d' },
      { label: 'Storage', value: 'Cloudinary' },
    ],
    highlights: [
      'Built a MERN stack application that auto-extracts product names, purchase dates, warranty expiry dates, vendors, prices, and serial numbers from bill and receipt photos using Google Gemini AI.',
      'Designed an interactive 3D interface with Three.js particles, dynamic tilt cards, calendar view, and real-time tracking (Active, Expiring Soon, Expired).',
      'Implemented automated multi-stage email reminders (30, 15, 7, and 1 day before expiry) using Node-Cron and Resend, with Cloudinary receipt storage.',
      'Secured authentication using JWT and Firebase OAuth (Google Login).',
    ],
    demoType: 'expiry',
  },
  {
    id: 'ai-resume-scanner',
    category: 'fullstack',
    title: 'TalentAI — AI Resume Screening & Verification Portal',
    shortTitle: 'TalentAI (MERN + AI)',
    stack: [
      'React 18',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Redis',
      'BullMQ',
      'Hugging Face',
      'Three.js',
    ],
    accent: '#f472b6',
    githubLabel: 'Ai-Resume-Scanner',
    githubUrl: 'https://github.com/shashwata777/Ai-Resume-Scanner',
    metrics: [
      { label: 'Queue Engine', value: 'BullMQ + Redis' },
      { label: 'AI Detection', value: 'Desklib + HF' },
      { label: 'Portals', value: 'Admin/HR/User' },
      { label: 'Sentinel', value: 'Bot + IP Score' },
    ],
    highlights: [
      'Developed an AI-powered applicant tracking portal (MERN + Redis + BullMQ) that parses PDF/DOCX resumes and scores applications for LLM-generated text using Desklib and Hugging Face models.',
      'Built a Bot & Spam Application Sentinel flagging automated repetitive submissions via IP clustering and submission velocity tracking.',
      'Implemented Candidate, HR Recruiter, and Master Admin Governance portals with 1-click HR access approval and live session audit logs (CSV export).',
      'Crafted a cyberpunk glassmorphism UI powered by Three.js animated backgrounds, Framer Motion, and Tailwind CSS.',
    ],
    demoType: 'talent',
  },
  {
    id: 'rag-qna-bot',
    category: 'genai',
    title: 'RAG-Based Medical Report Q&A Bot',
    shortTitle: 'Medical RAG + OCR Bot',
    stack: [
      'Python',
      'LangChain',
      'ChromaDB',
      'Groq LPU',
      'HuggingFace',
      'PyMuPDF',
      'Tesseract OCR',
    ],
    accent: '#34d399',
    githubLabel: 'rag-based-QNA-bot',
    githubUrl: 'https://github.com/shashwata777/rag-based-QNA-bot',
    metrics: [
      { label: 'Vector DB', value: 'ChromaDB' },
      { label: 'Embeddings', value: 'MiniLM-L6-v2' },
      { label: 'LLM Engine', value: 'ChatGroq' },
      { label: 'OCR Fallback', value: '3x PyMuPDF' },
    ],
    highlights: [
      'Built a Retrieval-Augmented Generation (RAG) PDF Q&A assistant using LangChain LCEL, ChromaDB, and Groq LPU (ChatGroq) for diagnostic medical reports.',
      'Engineered an automatic OCR fallback that detects corrupted private-use Unicode fonts (\\uE000–\\uF8FF) and switches to 3x resolution PyMuPDF + Tesseract OCR.',
      'Indexed 1000-char overlapping chunks using HuggingFace sentence-transformers/all-MiniLM-L6-v2 embeddings for semantic retrieval.',
      'Enforced strict anti-hallucination guardrails across both Jupyter Notebook and modular Python CLI (rag_pipeline.py) workflows.',
    ],
    demoType: 'rag',
  },
];

export const CERTIFICATIONS = [
  {
    title: 'Python Basics',
    issuer: 'Coursera',
  },
  {
    title: 'HTML5, CSS3, and JavaScript for Beginners: Zero to Hero',
    issuer: 'Udemy',
  },
  {
    title: 'Microsoft Power BI: Complete Beginner to Advanced Guide 2026',
    issuer: 'Udemy',
  },
];
