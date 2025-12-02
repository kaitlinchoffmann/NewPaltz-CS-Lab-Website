/**
 * Course Data Configuration
 * Contains all course information for the CS department
 */

const coursesData = [
  {
    id: 'cps104',
    slug: 'cps104',
    code: 'CPS 104',
    name: 'Visual Programming',
    section: '01',
    professor: 'Moshe Plotkin',
    semester: 'Fall 2025',
    credits: 3,
    days: 'M',
    time: '5:00 PM-7:50 PM',
    location: 'HUM 318',
    description: 'Introduction to visual programming concepts and techniques.',
    syllabusFile: '/syllabi/CPS104_01_Visual_Programming_Plotkin_FA25.pdf',
    category: 'introductory',
    color: 'bg-blue-200',
    resources: [
      { name: 'Processing.org', url: 'https://processing.org/', description: 'Visual arts programming language' },
      { name: 'p5.js Reference', url: 'https://p5js.org/reference/', description: 'JavaScript library for creative coding' }
    ]
  },
  {
    id: 'cps110',
    slug: 'cps110',
    code: 'CPS 110',
    name: 'Web Page Design',
    section: '01',
    professor: 'Asmahan Ali',
    semester: 'Fall 2025',
    credits: 3,
    days: 'T',
    time: '5:00 PM-7:50 PM',
    location: 'SH 259',
    description: 'Fundamentals of web page design using HTML, CSS, and basic JavaScript.',
    syllabusFile: '/syllabi/CPS110_01_WebPageDesign_Ali_FA2025.pdf',
    category: 'introductory',
    color: 'bg-green-200',
    resources: [
      { name: 'MDN Web Docs', url: 'https://developer.mozilla.org/', description: 'Comprehensive web development documentation' },
      { name: 'W3Schools', url: 'https://www.w3schools.com/', description: 'Web development tutorials' },
      { name: 'CSS-Tricks', url: 'https://css-tricks.com/', description: 'CSS tips, tricks, and techniques' }
    ]
  },
  {
    id: 'cps210-banerjee',
    slug: 'cps210-banerjee',
    code: 'CPS 210',
    name: 'Computer Science I',
    section: '04',
    professor: 'Sreya Banerjee',
    semester: 'Fall 2025',
    credits: 4,
    days: 'TF',
    time: '12:30 PM-1:45 PM',
    location: 'CSB AUD',
    description: 'Introduction to computer science and programming fundamentals.',
    syllabusFile: '/syllabi/CPS210_CS1_Banerjee_FA25.pdf',
    category: 'core',
    color: 'bg-purple-200',
    resources: [
      { name: 'Python Documentation', url: 'https://docs.python.org/3/', description: 'Official Python documentation' },
      { name: 'Codecademy Python', url: 'https://www.codecademy.com/learn/learn-python-3', description: 'Interactive Python course' },
      { name: 'LeetCode', url: 'https://leetcode.com/', description: 'Practice programming problems' }
    ]
  },
  {
    id: 'cps210-brainard',
    slug: 'cps210-brainard',
    code: 'CPS 210',
    name: 'Computer Science I',
    section: '02',
    professor: 'Katherine Brainard',
    semester: 'Fall 2025',
    credits: 4,
    days: 'MR',
    time: '8:00 AM-9:15 AM',
    location: 'SH 181',
    description: 'Introduction to computer science and programming fundamentals.',
    syllabusFile: '/syllabi/CPS210_CS1_Brainard_FA25.pdf',
    category: 'core',
    color: 'bg-purple-200',
    resources: [
      { name: 'Python Documentation', url: 'https://docs.python.org/3/', description: 'Official Python documentation' },
      { name: 'Codecademy Python', url: 'https://www.codecademy.com/learn/learn-python-3', description: 'Interactive Python course' },
      { name: 'LeetCode', url: 'https://leetcode.com/', description: 'Practice programming problems' }
    ]
  },
  {
    id: 'cps310',
    slug: 'cps310',
    code: 'CPS 310',
    name: 'Computer Science II',
    section: '01',
    professor: 'Michael Curry',
    semester: 'Fall 2025',
    credits: 4,
    days: 'MR',
    time: '9:30 AM-10:45 AM',
    location: 'LC 108',
    description: 'Advanced programming concepts, data structures, and algorithms.',
    syllabusFile: '/syllabi/CPS310_CS2_Curry_FA251.pdf',
    category: 'core',
    color: 'bg-indigo-200',
    resources: [
      { name: 'Visualgo', url: 'https://visualgo.net/', description: 'Visualize data structures and algorithms' },
      { name: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/', description: 'Computer science portal' },
      { name: 'Big-O Cheat Sheet', url: 'https://www.bigocheatsheet.com/', description: 'Algorithm complexity reference' }
    ]
  },
  {
    id: 'cps315-01-02',
    code: 'CPS 315',
    name: 'Computer Science III',
    professor: 'Easwaran',
    semester: 'Fall 2025',
    section: 'Sections 01-02',
    description: 'Advanced topics in computer science including software design patterns.',
    syllabusFile: '/syllabi/CPS315_01_02_CSIII_Easwaran_FA2025.pdf',
    category: 'core',
    color: 'bg-rose-200',
    resources: [
      { name: 'Refactoring Guru', url: 'https://refactoring.guru/', description: 'Design patterns and refactoring' },
      { name: 'Clean Code Summary', url: 'https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29', description: 'Clean code principles' }
    ]
  },
  {
    id: 'cps315-03-04',
    code: 'CPS 315',
    name: 'Computer Science III',
    professor: 'Easwaran',
    semester: 'Fall 2025',
    section: 'Sections 03-04',
    description: 'Advanced topics in computer science including software design patterns.',
    syllabusFile: '/syllabi/CPS315_03_04_CSIII_Easwaran_fall2025.pdf',
    category: 'core',
    color: 'bg-rose-200',
    resources: [
      { name: 'Refactoring Guru', url: 'https://refactoring.guru/', description: 'Design patterns and refactoring' },
      { name: 'Clean Code Summary', url: 'https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29', description: 'Clean code principles' }
    ]
  },
  {
    id: 'cps330',
    code: 'CPS 330',
    name: 'Assembly Language',
    professor: 'DeGennaro',
    semester: 'Fall 2025',
    description: 'Low-level programming and computer architecture fundamentals.',
    syllabusFile: '/syllabi/CPS330_Assembly_DeGennaro_FA25.pdf',
    category: 'systems',
    color: 'bg-amber-200',
    resources: [
      { name: 'x86 Assembly Guide', url: 'https://www.cs.virginia.edu/~evans/cs216/guides/x86.html', description: 'x86 assembly reference' },
      { name: 'NASM Tutorial', url: 'https://cs.lmu.edu/~ray/notes/nasmtutorial/', description: 'NASM assembly tutorial' }
    ]
  },
  {
    id: 'cps340',
    code: 'CPS 340',
    name: 'Operating Systems',
    professor: 'Pham',
    semester: 'Fall 2025',
    description: 'Principles of operating system design and implementation.',
    syllabusFile: '/syllabi/CPS340_Operating_Systems_Pham_FA25.pdf',
    category: 'systems',
    color: 'bg-orange-200',
    resources: [
      { name: 'OS Dev Wiki', url: 'https://wiki.osdev.org/', description: 'Operating system development resources' },
      { name: 'Linux Kernel Documentation', url: 'https://www.kernel.org/doc/html/latest/', description: 'Official Linux kernel docs' }
    ]
  },
  {
    id: 'cps353',
    code: 'CPS 353',
    name: 'Software Engineering',
    professor: 'Brainard',
    semester: 'Fall 2025',
    description: 'Software development methodologies, project management, and best practices.',
    syllabusFile: '/syllabi/CPS353_Software_Engineering_Brainard_FA25.pdf',
    category: 'software',
    color: 'bg-teal-200',
    resources: [
      { name: 'Agile Manifesto', url: 'https://agilemanifesto.org/', description: 'Agile development principles' },
      { name: 'Git Documentation', url: 'https://git-scm.com/doc', description: 'Version control with Git' },
      { name: 'Scrum Guide', url: 'https://scrumguides.org/', description: 'Official Scrum methodology guide' }
    ]
  },
  {
    id: 'cps393',
    code: 'CPS 393',
    name: 'Principles of Programming Languages',
    professor: 'Suchy',
    semester: 'Fall 2025',
    description: 'Study of programming language concepts and paradigms.',
    syllabusFile: '/syllabi/CPS393_Principles_of_Programming Languages_Suchy_FA25.pdf',
    category: 'theory',
    color: 'bg-cyan-200',
    resources: [
      { name: 'Learn X in Y Minutes', url: 'https://learnxinyminutes.com/', description: 'Quick language references' },
      { name: 'Rosetta Code', url: 'https://rosettacode.org/', description: 'Compare code in different languages' }
    ]
  },
  {
    id: 'cps415',
    code: 'CPS 415',
    name: 'Discrete and Continuous Computer Algorithms',
    professor: 'Li',
    semester: 'Fall 2025',
    description: 'Advanced algorithm design and analysis techniques.',
    syllabusFile: '/syllabi/CPS415 Discrete and Continuous Computer Algorithms_Li_FA25.pdf',
    category: 'theory',
    color: 'bg-lime-200',
    resources: [
      { name: 'Algorithm Visualizer', url: 'https://algorithm-visualizer.org/', description: 'Interactive algorithm visualization' },
      { name: 'CLRS Book Resources', url: 'https://mitpress.mit.edu/books/introduction-algorithms-third-edition', description: 'Introduction to Algorithms textbook' }
    ]
  },
  {
    id: 'cps425',
    code: 'CPS 425',
    name: 'Language Processing',
    professor: 'Suchy',
    semester: 'Fall 2025',
    description: 'Compiler design, parsing, and language translation.',
    syllabusFile: '/syllabi/CPS425_Language_Processing_Suchy_FA25.pdf',
    category: 'theory',
    color: 'bg-fuchsia-200',
    resources: [
      { name: 'Crafting Interpreters', url: 'https://craftinginterpreters.com/', description: 'Free book on building interpreters' },
      { name: 'ANTLR', url: 'https://www.antlr.org/', description: 'Parser generator tool' }
    ]
  },
  {
    id: 'cps485',
    code: 'CPS 485',
    name: 'Projects in Computer Science',
    professor: 'Pham',
    semester: 'Fall 2025',
    description: 'Capstone project course for senior CS students.',
    syllabusFile: '/syllabi/CPS485_Projects_Pham_FA25.pdf',
    category: 'capstone',
    color: 'bg-yellow-200',
    resources: [
      { name: 'GitHub Student Developer Pack', url: 'https://education.github.com/pack', description: 'Free developer tools for students' },
      { name: 'DevDocs', url: 'https://devdocs.io/', description: 'Unified API documentation' }
    ]
  },
  {
    id: 'cps493-cybersecurity',
    code: 'CPS 493',
    name: 'Cybersecurity',
    professor: 'Hoffmann',
    semester: 'Fall 2025',
    section: 'Section 02',
    description: 'Introduction to cybersecurity principles and practices.',
    syllabusFile: '/syllabi/CPS493_02_cybersecurity_Hoffmann_FA25.pdf',
    category: 'security',
    color: 'bg-red-200',
    resources: [
      { name: 'OWASP', url: 'https://owasp.org/', description: 'Web application security project' },
      { name: 'Hack The Box', url: 'https://www.hackthebox.com/', description: 'Cybersecurity training platform' },
      { name: 'CyberChef', url: 'https://gchq.github.io/CyberChef/', description: 'Cyber operations toolkit' }
    ]
  },
  {
    id: 'cps493-ml',
    code: 'CPS 493/536',
    name: 'Machine Learning',
    professor: 'Banerjee',
    semester: 'Fall 2025',
    description: 'Fundamentals of machine learning algorithms and applications.',
    syllabusFile: '/syllabi/CPS493_04_CPS536_01_Machine Learning_Banerjee_FA25.pdf',
    category: 'ai',
    color: 'bg-violet-200',
    resources: [
      { name: 'Scikit-learn Documentation', url: 'https://scikit-learn.org/', description: 'Python ML library' },
      { name: 'Kaggle', url: 'https://www.kaggle.com/', description: 'Data science competitions and datasets' },
      { name: 'Google ML Crash Course', url: 'https://developers.google.com/machine-learning/crash-course', description: 'Free ML course by Google' }
    ]
  },
  {
    id: 'cps493-datascience',
    code: 'CPS 493',
    name: 'Data Science',
    professor: 'Chen',
    semester: 'Fall 2025',
    section: 'Section 05',
    description: 'Data analysis, visualization, and statistical methods.',
    syllabusFile: '/syllabi/CPS493_05_DataScience_Chen_F25.pdf',
    category: 'ai',
    color: 'bg-emerald-200',
    resources: [
      { name: 'Pandas Documentation', url: 'https://pandas.pydata.org/', description: 'Python data analysis library' },
      { name: 'Jupyter Notebooks', url: 'https://jupyter.org/', description: 'Interactive computing environment' },
      { name: 'Matplotlib Gallery', url: 'https://matplotlib.org/stable/gallery/', description: 'Data visualization examples' }
    ]
  },
  {
    id: 'cps493-linux',
    code: 'CPS 493',
    name: 'Managing Linux Systems',
    professor: 'Easwaran',
    semester: 'Fall 2025',
    section: 'Section 06',
    description: 'Linux system administration and management.',
    syllabusFile: '/syllabi/CPS493_06_Managing_Linux_Systems_Easwaran_FA25.pdf',
    category: 'systems',
    color: 'bg-slate-200',
    resources: [
      { name: 'Linux Journey', url: 'https://linuxjourney.com/', description: 'Learn Linux step by step' },
      { name: 'The Linux Command Line', url: 'https://linuxcommand.org/', description: 'Free Linux command line book' },
      { name: 'DigitalOcean Tutorials', url: 'https://www.digitalocean.com/community/tutorials', description: 'Server administration guides' }
    ]
  },
  {
    id: 'cps526',
    code: 'CPS 526',
    name: 'Advanced Data Structures',
    professor: 'Li',
    semester: 'Fall 2025',
    description: 'Advanced data structures and their applications.',
    syllabusFile: '/syllabi/CPS526_01_ Advanced Data Structures_Li_FA25.pdf',
    category: 'theory',
    color: 'bg-sky-200',
    resources: [
      { name: 'Visualgo', url: 'https://visualgo.net/', description: 'Data structure visualizations' },
      { name: 'Data Structure Visualizations', url: 'https://www.cs.usfca.edu/~galles/visualization/', description: 'Interactive DS visualizations' }
    ]
  },
  {
    id: 'cps534',
    code: 'CPS 534',
    name: 'Foundations in Computer Science',
    professor: 'Suchy',
    semester: 'Fall 2025',
    description: 'Graduate-level foundations of computer science.',
    syllabusFile: '/syllabi/CPS534_01_Foundations_in_CPS_Suchy_FA25.pdf',
    category: 'graduate',
    color: 'bg-zinc-200',
    resources: [
      { name: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/', description: 'Free CS courses from MIT' }
    ]
  },
  {
    id: 'cps540',
    code: 'CPS 540',
    name: 'Artificial Intelligence',
    professor: 'Chen',
    semester: 'Fall 2025',
    description: 'Introduction to artificial intelligence concepts and techniques.',
    syllabusFile: '/syllabi/CPS540_01_ArtificialIntelligence_Chen_F25.pdf',
    category: 'ai',
    color: 'bg-pink-200',
    resources: [
      { name: 'AI Course (Berkeley)', url: 'http://ai.berkeley.edu/', description: 'UC Berkeley AI course materials' },
      { name: 'OpenAI Documentation', url: 'https://platform.openai.com/docs/', description: 'OpenAI API documentation' },
      { name: 'Papers With Code', url: 'https://paperswithcode.com/', description: 'ML papers with implementations' }
    ]
  },
  {
    id: 'cps551',
    code: 'CPS 551',
    name: 'Programming and Data Structures',
    professor: 'Li',
    semester: 'Fall 2025',
    description: 'Graduate-level programming and data structures.',
    syllabusFile: '/syllabi/CPS551_01_Programming and Data Structures_Li_FA25.pdf',
    category: 'graduate',
    color: 'bg-stone-200',
    resources: [
      { name: 'LeetCode', url: 'https://leetcode.com/', description: 'Practice programming problems' },
      { name: 'HackerRank', url: 'https://www.hackerrank.com/', description: 'Coding challenges and competitions' }
    ]
  },
  {
    id: 'cps553',
    code: 'CPS 553',
    name: 'Web and Database Programming',
    professor: 'Hoffmann',
    semester: 'Fall 2025',
    description: 'Web development and database integration.',
    syllabusFile: '/syllabi/CPS553_01_web_and_database_prog_Hoffmann_FA25.pdf',
    category: 'software',
    color: 'bg-blue-300',
    resources: [
      { name: 'MDN Web Docs', url: 'https://developer.mozilla.org/', description: 'Web development documentation' },
      { name: 'SQL Tutorial', url: 'https://www.sqltutorial.org/', description: 'Learn SQL basics' },
      { name: 'Node.js Documentation', url: 'https://nodejs.org/docs/', description: 'Node.js official docs' }
    ]
  },
  {
    id: 'cps593-discrete',
    code: 'CPS 593',
    name: 'Discrete Structures',
    professor: 'Manrique',
    semester: 'Fall 2025',
    section: 'Section 03',
    description: 'Mathematical foundations for computer science.',
    syllabusFile: '/syllabi/CPS593-03 Discrete Structures Manrique F25.pdf',
    category: 'theory',
    color: 'bg-neutral-200',
    resources: [
      { name: 'Discrete Math Tutorial', url: 'https://www.tutorialspoint.com/discrete_mathematics/', description: 'Discrete math concepts' },
      { name: 'Book of Proof', url: 'https://www.people.vcu.edu/~rhammack/BookOfProof/', description: 'Free proof writing textbook' }
    ]
  },
  {
    id: 'cps593-linux',
    code: 'CPS 593',
    name: 'Managing Linux Systems',
    professor: 'Easwaran',
    semester: 'Fall 2025',
    section: 'Section 03 (Graduate)',
    description: 'Graduate-level Linux system administration.',
    syllabusFile: '/syllabi/CPS593_03_Managing_Linux_Systems_Easwaran_FA2025.pdf',
    category: 'graduate',
    color: 'bg-gray-200',
    resources: [
      { name: 'Linux Journey', url: 'https://linuxjourney.com/', description: 'Learn Linux step by step' },
      { name: 'Red Hat System Administration', url: 'https://www.redhat.com/en/services/training/rh124-red-hat-system-administration-i', description: 'Official Red Hat training' }
    ]
  },
  {
    id: 'cps593-cybersecurity',
    code: 'CPS 593',
    name: 'Cybersecurity',
    professor: 'Hoffmann',
    semester: 'Fall 2025',
    section: 'Section 04 (Graduate)',
    description: 'Graduate-level cybersecurity principles.',
    syllabusFile: '/syllabi/CPS593_04_cybersecurity_HoffmannFA25.pdf',
    category: 'graduate',
    color: 'bg-red-300',
    resources: [
      { name: 'SANS Reading Room', url: 'https://www.sans.org/white-papers/', description: 'Security research papers' },
      { name: 'NIST Cybersecurity Framework', url: 'https://www.nist.gov/cyberframework', description: 'Industry security standards' }
    ]
  },
  {
    id: 'cps593-netsec',
    code: 'CPS 593',
    name: 'Network Security',
    professor: 'Hoffmann',
    semester: 'Fall 2025',
    section: 'Section 10',
    description: 'Network security principles and practices.',
    syllabusFile: '/syllabi/CPS593_10_network_security_Hoffmann_FA25.pdf',
    category: 'security',
    color: 'bg-orange-300',
    resources: [
      { name: 'Wireshark', url: 'https://www.wireshark.org/', description: 'Network protocol analyzer' },
      { name: 'Cisco Networking Basics', url: 'https://www.netacad.com/', description: 'Cisco networking academy' }
    ]
  }
];

export const categories = [
  { id: 'all', name: 'All Courses' },
  { id: 'introductory', name: 'Introductory' },
  { id: 'core', name: 'Core CS' },
  { id: 'systems', name: 'Systems' },
  { id: 'software', name: 'Software Engineering' },
  { id: 'theory', name: 'Theory' },
  { id: 'ai', name: 'AI & Data Science' },
  { id: 'security', name: 'Security' },
  { id: 'capstone', name: 'Capstone' },
  { id: 'graduate', name: 'Graduate' }
];

// Add slug to courses that don't have one
const coursesWithSlugs = coursesData.map(course => ({
  ...course,
  slug: course.slug || course.id,
  credits: course.credits || 3
}));

export default coursesWithSlugs;
