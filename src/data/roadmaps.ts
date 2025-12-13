export interface RoadmapStep {
    id: string;
    title: string;
    description: string;
    topics: string[];
    projects: {
        simple: { title: string; description: string }[];
        intermediate: { title: string; description: string }[];
        advanced: { title: string; description: string }[];
    };
    professional_toolset?: string[];
    whyThisOrder: string;
}

export interface RoadmapData {
    id: string;
    title: string;
    description: string;
    steps: RoadmapStep[];
    summary?: string;
}

export const roadmapsData: Record<string, RoadmapData> = {
    'web-development': {
        id: 'web-development',
        title: 'Web Development Roadmap',
        description: 'A pragmatic, project-driven guide for becoming a real developer.',
        summary: `FINAL ORDER SUMMARY (Brutally Clear)

HTML + CSS → 2 simple, 2 intermediate, 2 advanced

JavaScript Core → Projects

Git/GitHub → Projects

Advanced JavaScript → Projects

React → Projects

Node + Backend → Projects

Full-Stack → Projects

DevOps → Projects

If you follow this path seriously, you’ll reach the level where companies stop seeing you as a student and start seeing you as a developer.`,
        steps: [
            {
                id: 'html-css',
                title: '1. HTML + CSS Foundation (Month 1)',
                description: 'Most beginners fool themselves thinking HTML/CSS is “easy.” It’s not. If your fundamentals are weak, everything collapses later.',
                topics: [
                    'HTML structure',
                    'Semantic tags',
                    'Forms',
                    'CSS selectors',
                    'Flexbox & Grid',
                    'Responsive design'
                ],
                projects: {
                    simple: [
                        { title: 'Personal Portfolio (Static)', description: 'One-page, responsive, clean layout using only HTML + CSS.' },
                        { title: 'Product Landing Page', description: 'A typical “startup hero section + features + footer” layout.' }
                    ],
                    intermediate: [
                        { title: 'Restaurant Website (Multi-page)', description: 'Home, Menu, About, Contact pages. Responsive layout + grid gallery.' },
                        { title: 'CSS Clone of a Popular Website', description: 'Clone: Netflix homepage / Spotify / Zomato home screen (CSS only).' }
                    ],
                    advanced: [
                        { title: 'Full Responsive UI Kit', description: 'Buttons, cards, navbars, grids, forms—all reusable components.' },
                        { title: 'Pixel-Perfect Figma to HTML/CSS Conversion', description: 'Take a Figma template and convert it exactly.' }
                    ]
                },
                professional_toolset: ['Tailwind CSS', 'Sass/SCSS', 'BEM Naming', 'PostCSS'],
                whyThisOrder: 'If you can’t build layouts confidently, JavaScript will feel like hell. Master the basics here first.'
            },
            {
                id: 'ui-ux',
                title: '1.5. UI/UX Design Fundamentals (2 Weeks)',
                description: 'Code implements design. If you don\'t understand design, you build ugly code.',
                topics: [
                    'Layout & Hierarchy',
                    'Color Theory',
                    'Typography',
                    'Wireframing (Figma)',
                    'Accessibility (a11y)',
                    'Mobile-First Thinking'
                ],
                projects: {
                    simple: [
                        { title: 'Figma Clone of an App', description: 'Recreate Instagram/Spotify UI in Figma.' },
                        { title: 'Redesign a Bad Website', description: 'Take a poor local website and modernize it in Figma.' }
                    ],
                    intermediate: [],
                    advanced: []
                },
                whyThisOrder: 'Before adding logic, learn to make things look good and usable.'
            },
            {
                id: 'js-core',
                title: '2. JavaScript Core (Month 2–3)',
                description: 'Stop memorising syntax; learn how to think in JS.',
                topics: [
                    'Variables, scopes',
                    'Functions (normal + arrow)',
                    'DOM manipulation',
                    'Events',
                    'API fetching',
                    'Promises, async/await',
                    'Array & object manipulation'
                ],
                projects: {
                    simple: [
                        { title: 'Calculator (Basic)', description: 'DOM handling + events.' },
                        { title: 'Todo App (LocalStorage)', description: 'Add/delete/edit tasks, save in browser.' }
                    ],
                    intermediate: [
                        { title: 'Weather App (API based)', description: 'Fetch live weather data from open weather API.' },
                        { title: 'Typing Speed Tester', description: 'Timer, accuracy calculation, highlights mistakes.' }
                    ],
                    advanced: [
                        { title: 'Mini E-Commerce Cart Logic', description: 'Add/remove items, quantity update, total calculation.' },
                        { title: 'Real-Time Chat UI (Front-end only)', description: 'Send messages, display in chat bubbles, auto-scroll.' }
                    ]
                },
                professional_toolset: ['TypeScript', 'Jest (Testing)', 'Vite', 'ESLint', 'Prettier'],
                whyThisOrder: 'JS is the backbone. If your JS skills are weak, React will eat you alive.'
            },
            {
                id: 'git-github',
                title: '3. Git + GitHub (2 weeks)',
                description: 'Most beginners avoid Git — and stay amateurs.',
                topics: [
                    'Repos, commits, branches',
                    'Pull/push',
                    'Merge conflicts',
                    'GitHub workflow'
                ],
                projects: {
                    simple: [
                        { title: 'Upload all previous projects to GitHub', description: '' },
                        { title: 'Create Simple Documentation for One Project (README)', description: '' }
                    ],
                    intermediate: [
                        { title: 'Host a Portfolio Using GitHub Pages', description: '' },
                        { title: 'Collaborate with a Friend on a Tiny Repo', description: 'Make pull requests, review code.' }
                    ],
                    advanced: [
                        { title: 'Set Up CI/CD for a Static Project (GitHub Actions)', description: '' },
                        { title: 'Create a GitHub Project Board for Task Management', description: '' }
                    ]
                },
                professional_toolset: ['GitHub Actions', 'Husky (Git Hooks)', 'Conventional Commits'],
                whyThisOrder: 'Git is not optional. Developers who avoid it are treated like kids.'
            },
            {
                id: 'advanced-js',
                title: '4. Advanced JavaScript + Web APIs (Month 4)',
                description: 'Now you polish your raw JS and get real power.',
                topics: [
                    'Debouncing, throttling',
                    'Closures',
                    'Modules',
                    'ES6+',
                    'localStorage/sessionStorage',
                    'Fetch + async patterns',
                    'Error handling'
                ],
                projects: {
                    simple: [
                        { title: 'Form Validator', description: '' },
                        { title: 'Notes App with Search & Filters', description: '' }
                    ],
                    intermediate: [
                        { title: 'Movie Search App (TMDB API)', description: '' },
                        { title: 'Infinite Scroll Image Gallery', description: '' }
                    ],
                    advanced: [
                        { title: 'Custom Carousel/Slider Without Libraries', description: '' },
                        { title: 'Browser Game (Snake / Breakout)', description: '' }
                    ]
                },
                whyThisOrder: 'You’re preparing your brain for React.'
            },
            {
                id: 'react',
                title: '5. React (Month 5–6)',
                description: 'React destroys those who enter with weak JS. You’re entering with strong foundations now.',
                topics: [
                    'Components',
                    'Props + state',
                    'useEffect, useState',
                    'Lifting state',
                    'Routing',
                    'Context API',
                    'Lists, keys',
                    'React best practices'
                ],
                projects: {
                    simple: [
                        { title: 'React Todo App', description: '' },
                        { title: 'User List Viewer (API call + pagination)', description: '' }
                    ],
                    intermediate: [
                        { title: 'React E-Commerce Store (Front-End Only)', description: 'Products page, Cart, Filters' },
                        { title: 'React Admin Dashboard', description: 'Sidebar, Charts, Table with search' }
                    ],
                    advanced: [
                        { title: 'Full Blog App (CRUD with backend)', description: '' },
                        { title: 'Real-Time Chat App Using Firebase', description: '' }
                    ]
                },
                professional_toolset: ['Next.js', 'TanStack Query', 'Shadcn/UI', 'Zustand', 'Storybook'],
                whyThisOrder: 'React forces you to think in components and data flows. These projects make you industry-ready.'
            },
            {
                id: 'ecosystem',
                title: '5.5. The Ecosystem & Libraries (Month 6.5)',
                description: 'Stop installing npm packages randomly. Learn when to use libraries vs vanilla code.',
                topics: [
                    'Styling: Tailwind vs CSS Modules vs Material UI',
                    'State: Context vs Zustand vs Redux',
                    'Forms: React Hook Form vs Formik',
                    'Routing: React Router vs Next.js',
                    'Animation: Framer Motion vs GSAP',
                    'Utility: Lodash, Date-fns, Classnames'
                ],
                projects: {
                    simple: [
                        { title: 'Refactor Todo App with Zustand', description: 'Move state from useState/Context to Zustand.' }
                    ],
                    intermediate: [
                        { title: 'Form Heavy App with React Hook Form', description: 'Registration wizard with validation (Zod).' }
                    ],
                    advanced: []
                },
                whyThisOrder: 'Don\'t use a library until you feel the pain of doing it manually. Then you\'ll appreciate the tool.'
            },
            {
                id: 'backend',
                title: '6. Backend Development (Node.js + Express + MongoDB) (Month 7–8)',
                description: 'Front-end developers who don’t know backend remain half-skilled.',
                topics: [
                    'REST APIs',
                    'Express routing',
                    'Authentication (JWT)',
                    'MongoDB CRUD',
                    'Middleware',
                    'MVC structure'
                ],
                projects: {
                    simple: [
                        { title: 'CRUD API for Users', description: '' },
                        { title: 'Authentication System (Signup/Login)', description: '' }
                    ],
                    intermediate: [
                        { title: 'Blog API with Comments and Likes', description: '' },
                        { title: 'URL Shortener Backend', description: '' }
                    ],
                    advanced: [
                        { title: 'E-Commerce Backend (Products, Cart, Orders, Admin)', description: '' },
                        { title: 'Full Authentication System (JWT + Refresh Tokens + Roles)', description: '' }
                    ]
                },
                professional_toolset: ['PostgreSQL', 'Prisma ORM', 'Redis', 'Docker', 'Swagger/OpenAPI'],
                whyThisOrder: 'Backend builds your engineering fundamentals, not UI skills.'
            },
            {
                id: 'full-stack',
                title: '7. Full-Stack Integration (Month 9)',
                description: '',
                topics: [],
                projects: {
                    simple: [
                        { title: 'Combine React + Node to Make Basic Full-Stack TODO', description: '' },
                        { title: 'Basic Contact Form Full-Stack', description: '' }
                    ],
                    intermediate: [
                        { title: 'Full-Stack Blog', description: '' },
                        { title: 'User Dashboard App (Auth + CRUD)', description: '' }
                    ],
                    advanced: [
                        { title: 'Full-Stack E-Commerce', description: '' },
                        { title: 'SaaS Billing App (Stripe Integration)', description: '' }
                    ]
                },
                whyThisOrder: ''
            },
            {
                id: 'devops',
                title: '8. DevOps Basics (Month 10)',
                description: 'Deploying makes you a real developer.',
                topics: [],
                projects: {
                    simple: [
                        { title: 'Deploy Front-End on Vercel/Netlify', description: '' },
                        { title: 'Deploy Node API on Render', description: '' }
                    ],
                    intermediate: [
                        { title: 'Dockerize Your Node App', description: '' },
                        { title: 'Connect Docker + MongoDB Containers', description: '' }
                    ],
                    advanced: [
                        { title: 'CI/CD with GitHub Actions', description: '' },
                        { title: 'Nginx + PM2 Deployment on VPS', description: '' }
                    ]
                },
                whyThisOrder: ''
            }
        ]
    },
    'devops': {
        id: 'devops',
        title: 'DevOps Roadmap',
        description: 'Bridge the gap between development and operations with modern tools.',
        summary: `FINAL ORDER SUMMARY (Brutally Clear)
✔ Linux & Networking → flush weak foundations
✔ Docker → containerise everything
✔ CI/CD → automate relationships
✔ AWS/Cloud → rent someone else's computer
✔ Kubernetes → orchestrate the chaos
✔ Terraform → code your infrastructure
✔ Monitoring → know when things break

If you can't glue these together, you're not a DevOps engineer, you're just a sysadmin with a cloud bill.`,
        steps: [
            {
                id: 'prerequisites',
                title: '1. Prerequisites & Linux (Month 1)',
                description: 'You cannot manage servers if you cannot use the terminal. Stop clicking GUIs.',
                topics: ['Linux Filesystem', 'Bash Scripting', 'SSH & Permissions', 'OS Concepts', 'Networking (DNS, HTTP/S, TCP/IP)'],
                projects: {
                    simple: [{ title: 'Setup a Headless Linux Server', description: 'Configure SSH, firewall (UFW), and users.' }, { title: 'Bash Backup Script', description: 'Auto-zip and rotate logs older than 7 days.' }],
                    intermediate: [{ title: 'Nginx Static Site Host', description: 'Serve a HTML page with Nginx on a VM.' }],
                    advanced: [{ title: 'Custom Load Balancer', description: 'Configure Nginx to balance traffic between 2 python servers.' }]
                },
                whyThisOrder: 'Everything you build will run on Linux. If you don\'t know it, you are building on sand.'
            },
            {
                id: 'containers',
                title: '2. Containerization (Month 2)',
                description: '"It works on my machine" is not a valid excuse anymore.',
                topics: ['Docker Basics', 'Dockerfiles', 'Image Optimization', 'Docker Compose', 'Networking in Docker'],
                professional_toolset: ['Docker Desktop', 'Podman', 'Dive'],
                projects: {
                    simple: [{ title: 'Dockerize a Python Script', description: '' }, { title: 'Dockerize a React App', description: 'Multi-stage build for production.' }],
                    intermediate: [{ title: 'Full Stack with Docker Compose', description: 'Node API + React + Postgres in one file.' }],
                    advanced: [{ title: 'Optimized Micro-Alpine Images', description: 'Reduce image size from 1GB to <100MB.' }]
                },
                whyThisOrder: 'Standard unit of software delivery. Essential.'
            },
            {
                id: 'cicd',
                title: '3. CI/CD Pipelines (Month 3)',
                description: 'If you deploy manually, you are the bottleneck.',
                topics: ['GitHub Actions', 'YAML Syntax', 'Automated Testing', 'Artifact Management', 'Deployment Strategies'],
                projects: {
                    simple: [{ title: 'Auto-Run Tests on Push', description: 'GitHub Action to run npm test.' }],
                    intermediate: [{ title: 'Build & Push Docker Image', description: 'On merge to main, build image and push to Docker Hub.' }],
                    advanced: [{ title: 'Full CD Pipeline to VPS', description: 'SSH into server, pull new image, restart container automatically.' }]
                },
                whyThisOrder: 'Automation is the core job description.'
            },
            {
                id: 'cloud-aws',
                title: '4. Cloud Fundamentals (AWS) (Month 4)',
                description: 'The world runs on AWS. Learn the primitives.',
                topics: ['EC2 (Compute)', 'S3 (Storage)', 'RDS (Databases)', 'VPC & Subnets', 'IAM (Permissions)'],
                projects: {
                    simple: [{ title: 'Launch EC2 & Host Site', description: 'Manually via console.' }],
                    intermediate: [{ title: 'S3 Static Website', description: 'Host React app on S3 + CloudFront.' }],
                    advanced: [{ title: '3-Tier Architecture', description: 'Public web tier, private app tier, private DB tier.' }]
                },
                whyThisOrder: 'You need a playground for your infrastructure skills.'
            },
            {
                id: 'iac',
                title: '5. Infrastructure as Code (Terraform) (Month 5)',
                description: 'Clicking in the console is for amateurs. Code your infrastructure.',
                topics: ['Terraform Basics', 'HCL Syntax', 'State Management', 'Modules', 'Variables & Outputs'],
                projects: {
                    simple: [{ title: 'Provision EC2 with Terraform', description: '' }],
                    intermediate: [{ title: 'Provision Full VPC Network', description: 'Subnets, gateways, route tables defined in code.' }],
                    advanced: [{ title: 'Production Ready Module', description: 'Reusable module for web-servers with load balancers.' }]
                },
                whyThisOrder: 'Reproducibility is key. Manual configs drift and break.'
            },
            {
                id: 'k8s',
                title: '6. Orchestration (Kubernetes) (Month 6-7)',
                description: 'The beast. Only learn this after you master Docker.',
                topics: ['Pods, Services, Deployments', 'Ingress Controllers', 'ConfigMaps & Secrets', 'Helm Charts'],
                professional_toolset: ['minikube', 'kubectl', 'k9s', 'Helm'],
                projects: {
                    simple: [{ title: 'Deploy Nginx on Minikube', description: '' }],
                    intermediate: [{ title: 'Deploy Microservices App', description: 'Frontend + Backend pods communicating via Services.' }],
                    advanced: [{ title: 'GitOps with ArgoCD', description: 'Auto-sync cluster state from Git repo.' }]
                },
                whyThisOrder: 'Complex but necessary for scaling enterprise applications.'
            },
            {
                id: 'monitoring',
                title: '7. Monitoring & Logging (Month 8)',
                description: 'If you can\'t see it, you can\'t fix it.',
                topics: ['Prometheus (Metrics)', 'Grafana (Visualization)', 'ELK Stack (Logging)', 'Alerting Rules'],
                projects: {
                    simple: [{ title: 'Grafana Dashboard', description: 'Visualize server CPU/Memory.' }],
                    intermediate: [{ title: 'Prometheus + Node Exporter', description: 'Scrape metrics from your Node app.' }],
                    advanced: [{ title: 'Full Observability Stack', description: 'Loki (Logs) + Tempo (Traces) + Prometheus (Metrics).' }]
                },
                whyThisOrder: 'Blind flying leads to crashes. Observability is the cockpit.'
            }
        ]
    },
    'data-engineer': {
        id: 'data-engineer',
        title: 'Data Engineer Roadmap',
        description: 'Design and build systems for collecting, storing, and analyzing data.',
        summary: `FINAL ORDER SUMMARY (BRUTALLY CLEAR)
✔ Python → mini ETL scripts
✔ Linux → shell monitoring
✔ SQL → 2 simple, 2 intermediate, 2 advanced
✔ Data Modeling → star schema + SCD
✔ ETL → Python, Airflow, dbt
✔ Big Data → Spark + HDFS + Data Lakes
✔ Streaming → Kafka + Spark Streaming
✔ Cloud → S3, Glue, Redshift
✔ DevOps → Docker + CI/CD

This path — if done properly — transforms you from “student learning tools” → engineer building systems.`,
        steps: [
            {
                id: 'programming',
                title: '1. Programming Foundation (Month 1)',
                description: 'Most beginners jump to Spark and AWS without even knowing how to write clean Python. Don’t be that clown.',
                topics: [
                    'Python basics', 'Functions, OOP', 'File handling (CSV, JSON, Parquet)',
                    'Virtual environments', 'Error handling', 'Logging basics'
                ],
                professional_toolset: ['Pandas', 'Jupyter / VS Code', 'Pyenv / pipenv', 'Python packaging basics'],
                projects: {
                    simple: [
                        { title: 'Log Parser Script', description: 'Process server logs, extract IPs, count frequency.' },
                        { title: 'CSV → JSON Converter', description: 'Automate format conversion with CLI arguments.' }
                    ],
                    intermediate: [
                        { title: 'Mini Data Cleaner', description: 'Load CSV → remove nulls → transform columns → save to new file.' }
                    ],
                    advanced: [
                        { title: 'Pandas Analytics Toolkit', description: 'Build a small library with reusable cleaning/analysis functions.' }
                    ]
                },
                whyThisOrder: 'If you can’t clean basic data using Python, forget Spark or Airflow. You’re not ready.'
            },
            {
                id: 'linux-shell',
                title: '1.5. Linux + Shell + Networking Basics (2 Weeks)',
                description: 'Data engineers who fear terminal are a joke. Everything in production runs on Linux.',
                topics: [
                    'File system', 'Permissions', 'grep, awk, sed', 'Crontab', 'SSH',
                    'Basics of networking ports & protocols'
                ],
                projects: {
                    simple: [
                        { title: 'Shell Script – Automated Backup', description: 'Compress a folder daily.' }
                    ],
                    intermediate: [
                        { title: 'Log Monitoring Script', description: 'Alert when error count crosses threshold.' }
                    ],
                    advanced: []
                },
                whyThisOrder: 'Pipelines live on servers. You should know WTF is happening inside one.'
            },
            {
                id: 'sql',
                title: '2. SQL Mastery (Month 2)',
                description: 'SQL isn’t optional. If your SQL is weak, no one takes you seriously.',
                topics: [
                    'Joins, subqueries', 'Window functions', 'Aggregations', 'CTEs',
                    'Indexing', 'ACID properties', 'Normalization', 'Query optimization basics'
                ],
                projects: {
                    simple: [
                        { title: 'Sales Insights', description: 'Monthly revenue, top customers, top categories.' },
                        { title: 'Netflix Dataset Exploration', description: 'Genre counts, release trends, top actors.' }
                    ],
                    intermediate: [
                        { title: 'E-commerce Analytics DB', description: 'Build DB schema + run 20 analytic queries.' }
                    ],
                    advanced: [
                        { title: 'End-to-End SQL Case Study (OLAP)', description: 'Full business analysis with 15+ window function queries.' }
                    ]
                },
                whyThisOrder: 'Every real data pipeline ends in SQL. Avoiding it means staying broke.'
            },
            {
                id: 'data-modeling',
                title: '3. Data Modeling & Warehousing (Month 3)',
                description: 'Beginners chase tools. Engineers design systems. Modeling separates amateurs from professionals.',
                topics: [
                    'OLTP vs OLAP', 'Star schema', 'Snowflake schema', 'Fact vs Dimension',
                    'Surrogate keys', 'SCD Type 1 & 2', 'Kimball methodology'
                ],
                projects: {
                    simple: [
                        { title: 'Star Schema for Retail', description: 'Fact_sales + dim_product + dim_customer + dim_date.' }
                    ],
                    intermediate: [
                        { title: 'Mini Data Warehouse (Postgres/MySQL)', description: 'Create staging + warehouse tables.' }
                    ],
                    advanced: [
                        { title: 'SCD Type 2 Customer Table', description: 'Track customer changes with versioning.' }
                    ]
                },
                whyThisOrder: 'Spark, Airflow, AWS won’t save you if you can’t design proper tables.'
            },
            {
                id: 'etl',
                title: '4. ETL / Data Pipelines (Month 4)',
                description: 'This is where you stop being a "coder" and start becoming a data engineer.',
                topics: [
                    'ETL vs ELT', 'Batch vs streaming', 'Pipeline orchestration',
                    'Logging & error handling', 'Scheduling basics',
                    'Apache Airflow', 'dbt (ELT transformations)', 'Python ETL scripts'
                ],
                projects: {
                    simple: [
                        { title: 'Daily CSV → Clean → Postgres Pipeline', description: 'Extract, clean, load using Python.' }
                    ],
                    intermediate: [
                        { title: 'Airflow ETL DAG', description: 'Schedule daily data ingestion with retries + logging.' }
                    ],
                    advanced: [
                        { title: 'dbt Project', description: 'Raw → staging → marts with documentation & tests.' }
                    ]
                },
                whyThisOrder: 'These are real production skills. No one cares how many Kaggle notebooks you’ve done.'
            },
            {
                id: 'big-data',
                title: '5. Big Data Engineering (Month 5–6)',
                description: 'If your system breaks at 5GB of data, you don’t know big data. Learn the tools that matter.',
                topics: [
                    'HDFS', 'Spark (RDD + DataFrames + SQL)', 'Parquet, ORC, Avro',
                    'Partitioning & bucketing', 'Shuffle & optimization'
                ],
                projects: {
                    simple: [
                        { title: 'Spark Data Cleaning Script', description: 'Load 5–10GB dataset, clean, save Parquet.' }
                    ],
                    intermediate: [
                        { title: 'MovieLens Big Data Analytics', description: 'Top movies, rating trends, user clustering.' }
                    ],
                    advanced: [
                        { title: 'Data Lake (Bronze → Silver → Gold)', description: 'Use Spark for transformations.' }
                    ]
                },
                whyThisOrder: 'This is the difference between "student projects" and real-world workloads.'
            },
            {
                id: 'streaming',
                title: '6. Streaming Systems (Month 6.5)',
                description: 'Modern companies don’t survive on batch alone. Real-time data is the future.',
                topics: [
                    'Kafka fundamentals', 'Producers/consumers', 'Offsets, partitions',
                    'Spark Structured Streaming', 'Event-driven design'
                ],
                projects: {
                    simple: [
                        { title: 'Kafka Producer + Consumer', description: 'Send & read messages.' }
                    ],
                    intermediate: [
                        { title: 'Real-Time Log Stream', description: 'Consume logs → process → store.' }
                    ],
                    advanced: [
                        { title: 'Real-Time Dashboard Pipeline', description: 'Kafka → Spark → Postgres → Grafana.' }
                    ]
                },
                whyThisOrder: 'Streaming makes you a modern data engineer—not a 2012 Hadoop dinosaur.'
            },
            {
                id: 'cloud',
                title: '7. Cloud (AWS Preferred) (Month 7–8)',
                description: 'If you don\'t know cloud, you’re not job-ready. Period.',
                topics: [
                    'S3 (Data lake)', 'Redshift', 'Glue Crawlers + ETL', 'Athena',
                    'IAM', 'Lambda', 'EC2 basics', 'CloudWatch'
                ],
                projects: {
                    simple: [
                        { title: 'S3-based Data Lake', description: 'Raw/staging/processed folders.' }
                    ],
                    intermediate: [
                        { title: 'AWS Glue ETL Job', description: 'Crawl → transform → load into Redshift.' }
                    ],
                    advanced: [
                        { title: 'Serverless ETL Pipeline', description: 'S3 → Lambda → Glue → Redshift → Dashboard.' }
                    ]
                },
                whyThisOrder: 'Cloud + pipelines = real production engineering.'
            },
            {
                id: 'devops-data',
                title: '8. DevOps for Data Engineers (Month 9)',
                description: 'If you can’t deploy your pipelines, you’re just a local hero.',
                topics: [
                    'Docker', 'CI/CD basics', 'GitHub Actions', 'Monitoring & alerting',
                    'Infrastructure-as-code (Terraform — optional)'
                ],
                projects: {
                    simple: [
                        { title: 'Dockerize an ETL Script', description: 'Containerize Python pipeline.' }
                    ],
                    intermediate: [
                        { title: 'CI/CD for Airflow DAG Deployment', description: 'Auto-deploy to a server.' }
                    ],
                    advanced: [
                        { title: 'Airflow on EC2 with Docker + Nginx', description: 'Full production setup.' }
                    ]
                },
                whyThisOrder: 'You\'re becoming company-ready now, not just skilled.'
            }
        ]
    },
    'ml-engineer': {
        id: 'ml-engineer',
        title: 'Machine Learning Engineer Roadmap',
        description: 'A pragmatic, brutally honest, project-driven guide for becoming a real ML Engineer.',
        summary: `FINAL ROADMAP SUMMARY (BRUTALLY CLEAR)
✔ Python + Math → foundation
✔ Data Cleaning + Feature Engineering → real-world power
✔ Core ML → algorithms + evaluation
✔ Pipelines → reproducibility & versioning
✔ Deep Learning → modern AI
✔ Specialisation → NLP / CV / MLOps
✔ Deployment → FastAPI, Docker, Cloud
✔ ML Systems → portfolio that gets jobs

If you follow this sequence seriously, you’ll stop being a “Kaggle notebook enjoyer” and start becoming a machine learning engineer companies trust.`,
        steps: [
            {
                id: 'foundations',
                title: '1. Programming Foundation (Month 1)',
                description: 'If you jump to models before mastering Python, you’re just setting yourself up to fail.',
                topics: [
                    'Variables, loops, conditionals', 'Functions & OOP', 'File & Exception handling',
                    'List comprehensions', 'Modules & Packages', 'Debugging techniques'
                ],
                professional_toolset: ['Jupyter Notebook', 'VS Code / PyCharm', 'pipenv / Poetry', 'Black / isort'],
                projects: {
                    simple: [
                        { title: 'Log Analyzer', description: 'Extract insights from logs.' },
                        { title: 'CSV Cleaner', description: 'Automate cleaning and formatting.' }
                    ],
                    intermediate: [
                        { title: 'Mini Pandas Toolkit', description: 'Reusable EDA utilities.' }
                    ],
                    advanced: [
                        { title: 'API Data Fetcher', description: 'Fetch data from a public API and save to JSON.' },
                        { title: 'Web Scraper (BeautifulSoup)', description: 'Scrape a simple website and extract list data.' }
                    ]
                },
                whyThisOrder: 'Python is the language of ML. You must be fluent in it.'
            },
            {
                id: 'math-for-ml',
                title: '1.1. Mathematics for ML (Month 1.5)',
                description: 'ML is applied mathematics. You cannot execute what you do not understand.',
                topics: [
                    'Linear Algebra: Vectors, Matrices, Eigenvalues, SVD',
                    'Calculus: Derivatives, Gradients, Chain Rule',
                    'Probability: Bayes Theorem, Distributions (Normal, Binomial)',
                    'Statistics: Hypothesis testing, p-values, MLE',
                    'Optimization: Gradient Descent, Stochastic Gradient Descent'
                ],
                professional_toolset: ['NumPy', 'SciPy', 'SymPy', 'Matplotlib'],
                projects: {
                    simple: [
                        { title: 'Vector & Matrix Operations', description: 'Implement dot product and geometric transformations using NumPy.' },
                        { title: 'Probability Distributions', description: 'Visualize Normal and Binomial distributions.' }
                    ],
                    intermediate: [
                        { title: 'PCA from Scratch', description: 'Implement Principal Component Analysis using Eigen decomposition.' }
                    ],
                    advanced: [
                        { title: 'Neural Net Forward Pass', description: 'Implement the forward pass of a dense network using only NumPy.' },
                        { title: 'Gradient Descent Simulation', description: 'Visualize gradient descent finding minima on a surface.' }
                    ]
                },
                whyThisOrder: 'Math is the engine. Code is just the steering wheel.'
            },
            {
                id: 'data-analysis',
                title: '2. Data Analysis & Preprocessing (Month 2–3)',
                description: 'Data is 80% of ML. If you don’t master cleaning and transforming data, forget high accuracy.',
                topics: [
                    'Pandas (MultiIndex, Apply, Groupby)', 'NumPy (Vectorization, Broadcasting)',
                    'Feature Engineering (Scaling, Encoding)', 'Outlier treatment', 'Feature selection'
                ],
                projects: {
                    simple: [
                        { title: 'Titanic EDA', description: 'Visual & statistical summary.' },
                        { title: 'Feature Engineering Playground', description: 'Evaluate 20+ transforms.' }
                    ],
                    intermediate: [
                        { title: 'Churn Data Preprocessing Pipeline', description: 'Ready for modeling.' }
                    ],
                    advanced: [
                        { title: 'Automated Preprocessing CLI', description: 'Dataset → clean output + report.' }
                    ]
                },
                whyThisOrder: 'Models are easy. Clean, structured data? That’s the real challenge.'
            },
            {
                id: 'core-ml',
                title: '3. Core Machine Learning (Month 3–4)',
                description: 'Training a model is not ML engineering. Understanding why the model behaves a certain way is.',
                topics: [
                    'Linear + Logistic Regression', 'SVM, Decision Trees, Random Forest',
                    'XGBoost / LightGBM', 'K-Means, PCA',
                    'Cross-validation', 'Precision, recall, F1, ROC-AUC'
                ],
                projects: {
                    simple: [
                        { title: 'House Price Prediction', description: '' },
                        { title: 'Spam Classifier (TF-IDF)', description: '' }
                    ],
                    intermediate: [
                        { title: 'Customer Churn Prediction Pipeline', description: '' },
                        { title: 'Retail Customer Segmentation', description: 'PCA + K-means.' }
                    ],
                    advanced: [
                        { title: 'Model Comparison Framework', description: 'Create your own mini AutoML benchmarking tool.' }
                    ]
                },
                whyThisOrder: 'ML engineers know algorithms inside-out — not just how to call fit().'
            },
            {
                id: 'pipelines',
                title: '4. ML Pipelines & Production Thinking (Month 4.5)',
                description: 'Jupyter notebooks don’t exist in production. Pipelines, reproducibility, and versioning do.',
                topics: [
                    'sklearn Pipeline', 'ColumnTransformer', 'Custom transformers',
                    'Experiment Tracking (MLflow)', 'Model registry', 'Serialization (pickle/ONNX)'
                ],
                projects: {
                    simple: [
                        { title: 'Pipeline for Churn Model', description: '' }
                    ],
                    intermediate: [
                        { title: 'MLflow Tracking Integration', description: '' }
                    ],
                    advanced: [
                        { title: 'Config-Based Training CLI', description: 'Reproducible and production-grade.' }
                    ]
                },
                whyThisOrder: 'If your ML code can’t be reproduced on another machine → it’s useless.'
            },
            {
                id: 'deep-learning',
                title: '5. Deep Learning (Month 5–6)',
                description: 'Deep learning is not magic. It\'s math + compute + architecture. Learn it properly.',
                topics: [
                    'Backpropagation & Loss functions', 'CNNs (ResNet / VGG)', 'Transfer learning',
                    'NLP (Embeddings, RNN/LSTM/GRU)', 'PyTorch (primary) or TensorFlow'
                ],
                projects: {
                    simple: [
                        { title: 'MNIST Digit Classifier', description: 'From scratch.' },
                        { title: 'Cat vs Dog Classifier', description: 'Using PyTorch.' }
                    ],
                    intermediate: [
                        { title: 'Sentiment Analysis with LSTM', description: '' }
                    ],
                    advanced: [
                        { title: 'Transfer Learning Classifier', description: 'ResNet/VGG on custom dataset.' }
                    ]
                },
                whyThisOrder: 'This phase requires discipline and patience. Now you understand modern AI.'
            },
            {
                id: 'specialisation',
                title: '6. Advanced ML Specialisation (Month 6.5–7.5)',
                description: 'Companies don’t hire "general ML engineers." Pick a path: NLP, CV, or MLOps.',
                topics: [
                    'Transformers (BERT/RoBERTa)', 'Vector databases',
                    'Object detection (YOLO)', 'Vision Transformers',
                    'CI/CD for ML', 'Docker + Kubernetes', 'Monitoring'
                ],
                projects: {
                    simple: [
                        { title: 'BERT text classifier', description: 'NLP path' }
                    ],
                    intermediate: [
                        { title: 'Custom object detection', description: 'CV path' }
                    ],
                    advanced: [
                        { title: 'Cloud training pipeline', description: 'MLOps path' }
                    ]
                },
                whyThisOrder: 'Choose your path wisely based on interest + job market.'
            },
            {
                id: 'deployment',
                title: '7. ML Deployment & Serving (Month 8)',
                description: 'A model has zero value until real users can consume its predictions.',
                topics: [
                    'FastAPI / Flask', 'REST APIs', 'Scalability & Caching',
                    'Docker & GitHub Actions', 'Cloud deployment (AWS/GCP)'
                ],
                projects: {
                    simple: [
                        { title: 'Deploy Logistic Regression via FastAPI', description: '' }
                    ],
                    intermediate: [
                        { title: 'Deep Learning API deployed with Docker', description: '' }
                    ],
                    advanced: [
                        { title: 'Full ML Microservice', description: 'Training pipeline → API serving → Monitoring.' }
                    ]
                },
                whyThisOrder: 'This is where most ML learners fall apart. Don’t be one of them.'
            },
            {
                id: 'portfolio',
                title: '8. Final Portfolio Projects (Month 9)',
                description: 'Stop building toy notebooks. Build systems. Companies hire system-builders.',
                topics: [],
                projects: {
                    simple: [],
                    intermediate: [],
                    advanced: [
                        { title: 'Recommendation System', description: 'ML + data pipelines.' },
                        { title: 'Fraud Detection System', description: 'Anomaly detection + streaming.' },
                        { title: 'NLP Semantic Search Engine', description: 'Embeddings + vector DB.' },
                        { title: 'Object Detection App', description: 'CV + deployment.' }
                    ]
                },
                whyThisOrder: 'These projects demonstrate you’re not just a learner — you’re an engineer who delivers.'
            }
        ]
    },
    'mobile-dev': {
        id: 'mobile-dev',
        title: 'Mobile App Development',
        description: 'Build native iOS and Android applications.',
        summary: `FINAL ORDER SUMMARY (Focused Path)
✔ JS/TS Foundation → logic first
✔ React Native Core → components & styling
✔ Navigation → structure your app
✔ API & State → handling real data
✔ Native Features → camera, maps, sensors
✔ Deployment → App Store & Play Store

Mobile dev is ruthless about performance. Code that works on web might lag on a phone.`,
        steps: [
            {
                id: 'mobile-foundations',
                title: '1. Fundamentals (Month 1)',
                description: 'Don\'t jump into RN without solid JS. Mobile debugging is harder.',
                topics: ['ES6+ JavaScript', 'TypeScript Basics', 'React Core Concepts (Props, State, Hooks)', 'Flexbox (Crucial for RN)'],
                projects: {
                    simple: [{ title: 'Responsive Layouts', description: 'Practice Flexbox without any library.' }],
                    intermediate: [{ title: 'JS Logic Challenges', description: 'Solve data manipulation problems cleanly.' }],
                    advanced: []
                },
                whyThisOrder: 'React Native is just React + Native capabilities. React knowledge is 80% of the game.'
            },
            {
                id: 'rn-basics',
                title: '2. React Native Core (Month 2)',
                description: 'Forget HTML tags. div is View, span is Text.',
                topics: ['View, Text, Image, ScrollView', 'StyleSheet API', 'Platform Specific Code', 'Debugging (Flipper/React DevTools)'],
                projects: {
                    simple: [{ title: 'Profile Screen', description: 'Static UI with avatar and details.' }],
                    intermediate: [{ title: 'Scrollable Feed', description: 'Mock Instagram feed with FlatList.' }],
                    advanced: [{ title: 'Custom Interactive Button', description: 'Animations on press, custom styling props.' }]
                },
                whyThisOrder: 'Learn the primitives of mobile UI before adding complex logic.'
            },
            {
                id: 'navigation',
                title: '3. Navigation & Architecture (Month 3)',
                description: 'Bad navigation ruins user experience.',
                topics: ['React Navigation', 'Stack Navigator', 'Tab Navigator', 'Drawer Navigator', 'Deep Linking'],
                projects: {
                    simple: [{ title: 'Login Flow', description: 'Auth screen -> Home screen navigation.' }],
                    intermediate: [{ title: 'Settings App', description: 'Nested navigation with tabs and details.' }],
                    advanced: [{ title: 'Deep Link Handler', description: 'Open specific screens from URL.' }]
                },
                whyThisOrder: 'Apps are not single pages. You need to move between screens smoothly.'
            },
            {
                id: 'native-features',
                title: '4. Native Features & API (Month 4)',
                description: 'Unlock the power of the device hardware.',
                topics: ['Camera & Gallery', 'Geolocation / Maps', 'AsyncStorage / MMKV', 'Push Notifications', 'Sensors'],
                professional_toolset: ['Expo', 'Expo Go', 'EAS Build'],
                projects: {
                    simple: [{ title: 'Photo Picker App', description: 'Select image from gallery and display it.' }],
                    intermediate: [{ title: 'Location Tracker', description: 'Show user coordinates on a map.' }],
                    advanced: [{ title: 'Offline-First Notes App', description: 'Persist data locally with AsyncStorage.' }]
                },
                whyThisOrder: 'This is what makes it an "App" and not just a website.'
            },
            {
                id: 'deployment-mobile',
                title: '5. Deployment (Month 5)',
                description: 'Getting into the store is a skill in itself.',
                topics: ['App Config (app.json)', 'Assets & Icons', 'Building Binaries (AAB/IPA)', 'Store Guidelines', 'OTA Updates'],
                projects: {
                    simple: [{ title: 'Build Standalone APK', description: 'Generate installation file.' }],
                    intermediate: [{ title: 'Publish to Expo', description: 'Shareable QR code link.' }],
                    advanced: [{ title: 'Store Submission Mockup', description: 'Prepare screenshots, description, and privacy policy.' }]
                },
                whyThisOrder: 'The finish line. A published app is the only one that counts.'
            }
        ]
    },
    'blockchain': {
        id: 'blockchain',
        title: 'Blockchain Development',
        description: 'Build decentralized applications (DApps) and smart contracts.',
        summary: `FINAL ORDER SUMMARY (The Hard Truth)
✔ Cryptography Basics → understand the math
✔ Solidity → write the rules
✔ Testing (Hardhat/Foundry) → bugs = lost money
✔ Frontend Integration → Web3.js/Ethers.js
✔ Security → Auditors get paid the most

Blockchain is 90% financial engineering and security. Mistakes are permanent.`,
        steps: [
            {
                id: 'crypto-basics',
                title: '1. Blockchain Fundamentals (Month 1)',
                description: 'Understand the "Why" and "How" before writing code.',
                topics: ['Hash Functions', 'Public/Private Keys', 'Consensus (PoW/PoS)', 'Wallets & Transactions', 'Gas & Fees'],
                projects: {
                    simple: [{ title: 'Create a Wallet (Manual)', description: 'Generate keypair and address using a script.' }],
                    intermediate: [{ title: 'Simple Block Structure', description: 'Implement a basic blockchain class in JS.' }],
                    advanced: []
                },
                whyThisOrder: 'You can\'t build on a ledger if you don\'t understand immutability.'
            },
            {
                id: 'solidity',
                title: '2. Smart Contracts (Solidity) (Month 2-3)',
                description: 'The backend of Web3. Code is law here.',
                topics: ['Data Types & Structs', 'Mappings & Arrays', 'Functions & Modifiers', 'Events', 'Inheritance', 'ERC-20 & ERC-721 Standards'],
                professional_toolset: ['Remix IDE', 'OpenZeppelin'],
                projects: {
                    simple: [{ title: 'Hello World Contract', description: 'Store and retrieve a number.' }],
                    intermediate: [{ title: 'Your Own ERC-20 Token', description: 'Deploy "MyCoin" with a fixed supply.' }],
                    advanced: [{ title: 'Crowdfunding Contract', description: 'Logic for deposits, goals, and refunds.' }]
                },
                whyThisOrder: 'Solidity is the primary language for EVM chains.'
            },
            {
                id: 'testing-security',
                title: '3. Testing & Security (Month 4)',
                description: 'In Web2, you patch bugs. In Web3, you get drained.',
                topics: ['Hardhat / Foundry', 'Unit Testing Contracts', 'Gas Optimization', 'Re-entrancy Attacks', 'Access Control'],
                projects: {
                    simple: [{ title: 'Test Token Transfer', description: 'Verify balances update correctly.' }],
                    intermediate: [{ title: 'Gas Optimization Challenge', description: 'Rewrite function to save gas.' }],
                    advanced: [{ title: 'Hack This Contract', description: 'Create an exploit for a vulnerable contract.' }]
                },
                whyThisOrder: 'Security is paramount. Testing is not optional.'
            },
            {
                id: 'dapp-frontend',
                title: '4. Frontend Integration (Month 5)',
                description: 'Contracts are useless without a UI.',
                topics: ['Ethers.js / Viem', 'Wallet Connection (RainbowKit)', 'Reading Contract State', 'Sending Transactions', 'IPFS'],
                projects: {
                    simple: [{ title: 'Wallet Connector', description: 'Button to connect MetaMask and show address.' }],
                    intermediate: [{ title: 'Token Dashboard', description: 'Show user balance and allow transfers.' }],
                    advanced: [{ title: 'NFT Minting Page', description: 'Full DApp to mint and view NFTs.' }]
                },
                whyThisOrder: 'Connect your users to the blockchain.'
            }
        ]
    },
    'cybersecurity': {
        id: 'cybersecurity',
        title: 'Cybersecurity Analyst',
        description: 'Protect systems, networks, and data from digital attacks.',
        summary: `FINAL ORDER SUMMARY (Defense Depth)
✔ Networking (CCNA level) → know the terrain
✔ Linux/OS Internals → know the battlefield
✔ Scripting (Python/Bash) → automate defense
✔ Ethical Hacking Basics → think like attackers
✔ SIEM & Monitoring → see the attacks
✔ Incident Response → fight back`,
        steps: [
            {
                id: 'net-sec-foundations',
                title: '1. Systems & Networking (Month 1-2)',
                description: 'You cannot secure what you do not understand.',
                topics: ['OSI Model', 'TCP/IP', 'Subnetting', 'DNS security', 'Linux Administration', 'Windows Active Directory'],
                projects: {
                    simple: [{ title: 'Secure Home Network', description: 'Configure firewall (pfSense/UFW) and VLANs.' }],
                    intermediate: [{ title: 'Active Directory Lab', description: 'Setup Domain Controller and enforce GPOs.' }],
                    advanced: []
                },
                whyThisOrder: 'Attacks happen on the network and OS layer.'
            },
            {
                id: 'scripting-sec',
                title: '2. Security Scripting (Month 3)',
                description: 'Manual analysis is too slow.',
                topics: ['Python for Security', 'Bash Scripting', 'PowerShell for Windows', 'Regex'],
                projects: {
                    simple: [{ title: 'Port Scanner', description: 'Python script to scan open ports.' }],
                    intermediate: [{ title: 'Log Parser', description: 'Identify failed login attempts from auth.log.' }],
                    advanced: [{ title: 'Automated Hardening Script', description: 'Script to apply CIS benchmarks to a server.' }]
                },
                whyThisOrder: 'Tools are great, but custom scripts save the day.'
            },
            {
                id: 'offensive-basics',
                title: '3. Offensive Basics (Ethical Hacking) (Month 4)',
                description: 'To catch a thief, think like a thief.',
                topics: ['OWASP Top 10', 'Penetration Testing Phases', 'Metasploit Basics', 'Burp Suite', 'Social Engineering'],
                projects: {
                    simple: [{ title: 'Hack The Box (Easy)', description: 'Complete 5 easy retired machines.' }],
                    intermediate: [{ title: 'Vulnerable Web App', description: 'Exploit SQLi and XSS in DVWA.' }],
                    advanced: []
                },
                whyThisOrder: 'Understanding exploits helps you write better rules.'
            },
            {
                id: 'blue-team',
                title: '4. Blue Team Operations (Month 5)',
                description: 'Detection and Response.',
                topics: ['SIEM (Splunk/Elastic)', 'IDS/IPS (Snort/Suricata)', 'Threat Hunting', 'Digital Forensics Basics'],
                projects: {
                    simple: [{ title: 'ELK Stack Setup', description: 'Ingest logs from a VM into Elastic.' }],
                    intermediate: [{ title: 'IDS Rules', description: 'Write Snort rules to detect specific traffic.' }],
                    advanced: [{ title: 'Incident Response Playbook', description: 'Document steps for a ransomware outbreak.' }]
                },
                whyThisOrder: 'This is the actual job involved in defense.'
            }
        ]
    },
    'game-dev': {
        id: 'game-dev',
        title: 'Game Developer',
        description: 'Create interactive experiences using engines and code.',
        summary: `FINAL ORDER SUMMARY (Play Bound)
✔ C++/C# → the languages of games
✔ Linear Algebra/Physics → the math of movement
✔ Engine Mastery (Unity/Unreal) → the tools
✔ Game Design Patterns → clean architecture
✔ Shaders/VFX → making it look good`,
        steps: [
            {
                id: 'game-code',
                title: '1. Programming & Math (Month 1-2)',
                description: 'Games are math in motion.',
                topics: ['C# (Unity) or C++ (Unreal)', 'Vectors & Matrices', 'Quaternions', 'Physics 101'],
                projects: {
                    simple: [{ title: 'Text Adventure', description: 'Console based RPG.' }],
                    intermediate: [{ title: 'Custom Physics Engine', description: '2D circle collision resolver.' }],
                    advanced: []
                },
                whyThisOrder: 'Engine tools change, math and logic remain.'
            },
            {
                id: 'engine-basics',
                title: '2. Engine Fundamentals (Month 3)',
                description: 'Pick one and dive deep.',
                topics: ['Game Loop', 'Prefabs/Signaling', 'Input Systems', 'UI Systems', 'Audio'],
                projects: {
                    simple: [{ title: 'Pong Clone', description: 'Complete gameplay loop.' }],
                    intermediate: [{ title: 'Endless Runner', description: 'Object pooling and PCG basics.' }],
                    advanced: []
                },
                whyThisOrder: 'Implement your code in a visual environment.'
            },
            {
                id: 'game-polish',
                title: '3. Polish & Shader Magic (Month 4)',
                description: 'Juice makes the game.',
                topics: ['Shader Graph / HLSL', 'Particle Systems', 'Post-processing', 'Animation Controllers'],
                projects: {
                    simple: [{ title: 'Interactive Water', description: 'Shader implementation.' }],
                    intermediate: [{ title: 'Combat System', description: 'Hit stops, screen shake, VFX.' }],
                    advanced: []
                },
                whyThisOrder: 'Visuals sell the game.'
            }
        ]
    },
    'data-science': {
        id: 'data-science',
        title: 'Data Scientist',
        description: 'Extract insights from data using statistics and ML.',
        summary: `FINAL ORDER SUMMARY (Insight Driven)
✔ Statistics → truth finding
✔ Python/R → tool of choice
✔ EDA & Viz → storytelling
✔ Traditional ML → predictive power
✔ Deep Learning → complex patterns`,
        steps: [
            {
                id: 'stats-math',
                title: '1. Statistics & Probability (Month 1)',
                description: 'Don\'t lie with data.',
                topics: ['Hypothesis Testing', 'Bayesian Inference', 'Regression Analysis', 'Distributions'],
                projects: {
                    simple: [{ title: 'A/B Testing Simulator', description: 'Python script to simulate conversion rates.' }],
                    intermediate: [{ title: 'Statistical Analysis of Public Data', description: 'Correlation vs Causation report.' }],
                    advanced: []
                },
                whyThisOrder: 'Stats is the grammar of data science.'
            },
            {
                id: 'eda-viz',
                title: '2. EDA & Visualization (Month 2)',
                description: 'A picture is worth a thousand rows.',
                topics: ['Matplotlib/Seaborn', 'Tableau/PowerBI', 'Data Cleaning', 'Storytelling'],
                projects: {
                    simple: [{ title: 'Dashboard for Covid Data', description: 'Interactive charts.' }],
                    intermediate: [{ title: 'Exploratory Analysis of Sales', description: 'Find hidden trends.' }],
                    advanced: []
                },
                whyThisOrder: 'You must understand data before modeling it.'
            },
            {
                id: 'modeling',
                title: '3. Machine Learning Application (Month 3-4)',
                description: 'Applying algorithms to business problems.',
                topics: ['Scikit-Learn', 'Feature Selection', 'Model Evaluation metrics', 'Clustering'],
                projects: {
                    simple: [{ title: 'Loan Default Predictor', description: 'Classification problem.' }],
                    intermediate: [{ title: 'Customer Segmentation', description: 'K-Means clustering.' }],
                    advanced: [{ title: 'Time Series Forecasting', description: 'Predict stock/sales trends.' }]
                },
                whyThisOrder: 'Predictions drive value.'
            }
        ]
    },
    'ui-ux': {
        id: 'ui-ux',
        title: 'UI/UX Designer',
        description: 'Design intuitive and beautiful digital products.',
        summary: `FINAL ORDER SUMMARY (User First)
✔ Design Theory → color, type, space
✔ UX Research → know the user
✔ Figma Mastery → the industry tool
✔ Prototyping → interaction design
✔ Design Systems → consistency at scale`,
        steps: [
            {
                id: 'design-theory',
                title: '1. Design Fundamentals (Month 1)',
                description: 'Make it look good (UI).',
                topics: ['Color Theory', 'Typography', 'Spacing & Grids', 'Visual Hierarchy'],
                projects: {
                    simple: [{ title: 'Redesign a Login Screen', description: 'Focus on spacing and clean UI.' }],
                    intermediate: [{ title: 'Icon Set', description: 'Create 10 consistent icons.' }],
                    advanced: []
                },
                whyThisOrder: 'Visuals form the first impression.'
            },
            {
                id: 'ux-research',
                title: '2. UX Research (Month 2)',
                description: 'Make it work well (UX).',
                topics: ['User Personas', 'User Journeys', 'Wireframing', 'Usability Testing'],
                projects: {
                    simple: [{ title: 'User Persona Creation', description: 'For a fitness app.' }],
                    intermediate: [{ title: 'Low-Fidelity Wireframes', description: 'Full app flow on paper/digital.' }],
                    advanced: []
                },
                whyThisOrder: 'Build the right thing, not just the thing right.'
            },
            {
                id: 'figma-proto',
                title: '3. Figma & Prototyping (Month 3)',
                description: 'Bring it to life.',
                topics: ['Auto Layout', 'Components & Variants', 'Interactive Prototypes', 'Smart Animate'],
                projects: {
                    simple: [{ title: 'High-Fidelity App Mockup', description: '3-5 core screens.' }],
                    intermediate: [{ title: 'Clickable Prototype', description: 'Full flow with transitions.' }],
                    advanced: [{ title: 'Mini Design System', description: 'Buttons, Inputs, Colors, Typography.' }]
                },
                whyThisOrder: 'Deliverables for developers.'
            }
        ]
    },
    'product-manager': {
        id: 'product-manager',
        title: 'Product Manager',
        description: 'Lead the intersection of tech, business, and UX.',
        summary: `FINAL ORDER SUMMARY (CEO of Product)
✔ Product Sense → what to build
✔ Agile/Scrum → how to build
✔ Metrics/Analytics → did it work?
✔ Strategy/Roadmapping → where are we going?
✔ Communication → rallying the team`,
        steps: [
            {
                id: 'pm-foundations',
                title: '1. Product Fundamentals (Month 1)',
                description: 'Solving the right problems.',
                topics: ['Product Lifecycle', 'Market Research', 'Competitive Analysis', 'MVP Definition'],
                projects: {
                    simple: [{ title: 'PRD (Product Requirement Doc)', description: 'Write a PRD for a feature.' }],
                    intermediate: [{ title: 'Competitor Tear-down', description: 'Analyze strengths/weaknesses of a rival.' }],
                    advanced: []
                },
                whyThisOrder: 'Define value before execution.'
            },
            {
                id: 'execution',
                title: '2. Execution & Agile (Month 2)',
                description: 'Shipping software.',
                topics: ['Scrum/Kanban', 'User Stories', 'Backlog Prioritization (RICE/MoSCoW)', 'JIRA basics'],
                projects: {
                    simple: [{ title: 'Write 10 User Stories', description: 'With acceptance criteria.' }],
                    intermediate: [{ title: 'Sprint Planning Mockup', description: 'Plan a 2-week sprint.' }],
                    advanced: []
                },
                whyThisOrder: 'Ideas are cheap, execution is everything.'
            },
            {
                id: 'growth',
                title: '3. Growth & Metrics (Month 3)',
                description: 'Measure success.',
                topics: ['KPIs vs OKRs', 'AARRR Funnel', 'Retention', 'Effectiveness Analysis'],
                projects: {
                    simple: [{ title: 'Define Success Metrics', description: 'For a Spotify new feature.' }],
                    intermediate: [{ title: 'Funnel Analysis', description: 'Identify drop-off points in a signup flow.' }],
                    advanced: []
                },
                whyThisOrder: 'Data drives decisions.'
            }
        ]
    },
    'cloud-architect': {
        id: 'cloud-architect',
        title: 'Cloud Architect',
        description: 'Design scalable, secure, and cost-effective cloud systems.',
        summary: `FINAL ORDER SUMMARY (Big Picture)
✔ Advanced Networking → VPC, Transit Gateway
✔ Hybrid Cloud → Connect on-prem to cloud
✔ Security Architecture → Zero Trust
✔ Cost Optimization → FinOps
✔ Migration Strategies → The 6 Rs`,
        steps: [
            {
                id: 'arch-design',
                title: '1. Designing for Scale (Month 1-2)',
                description: 'Handling millions of users.',
                topics: ['Load Balancing strategies', 'Caching Patterns (Redis/CDN)', 'Database Sharding/Read Replicas', 'Stateless vs Stateful'],
                projects: {
                    simple: [{ title: 'Diagram a Global App', description: 'Using draw.io, design multi-region faillover.' }],
                    intermediate: [{ title: 'Disaster Recovery Plan', description: 'RTO/RPO definitions for a bank.' }],
                    advanced: []
                },
                whyThisOrder: 'Architecture is about trade-offs.'
            },
            {
                id: 'hybrid-sec',
                title: '2. Security & Hybrid (Month 3)',
                description: 'Enterprise grade requirements.',
                topics: ['VPN vs Direct Connect', 'IAM Federation', 'KMS & Encryption', 'Compliance (HIPAA/PCI)'],
                projects: {
                    simple: [{ title: 'Secure VPC Design', description: 'Public/Private subnets, NACLs, SGs.' }],
                    intermediate: [{ title: 'Compliance Checklist', description: 'Audit a mocked environment.' }],
                    advanced: []
                },
                whyThisOrder: 'Enterprises live in hybrid worlds.'
            }
        ]
    },
    'qa-automation': {
        id: 'qa-automation',
        title: 'QA Automation Engineer',
        description: 'Ensure software quality through automated testing.',
        summary: `FINAL ORDER SUMMARY (Bug Hunter)
✔ Manual Testing → find bugs by hand
✔ Coding (Java/Python/JS) → write the scripts
✔ Selenium/Playwright → drive the browser
✔ API Testing → check the backend
✔ CI/CD Integration → gatekeepers`,
        steps: [
            {
                id: 'manual-basics',
                title: '1. Testing Foundations (Month 1)',
                description: 'Understand what to test.',
                topics: ['Test Cases', 'Bug Reporting', 'Types of Testing (Functional, Regression)', 'STLC'],
                projects: {
                    simple: [{ title: 'Test Case Sheet', description: 'Write 20 cases for a login page.' }],
                    intermediate: [{ title: 'Bug Report', description: 'Document a bug with reproduction steps.' }],
                    advanced: []
                },
                whyThisOrder: 'Automation is just manual steps scripted.'
            },
            {
                id: 'automation-web',
                title: '2. Web Automation (Month 2-3)',
                description: 'Let the robot click.',
                topics: ['Selenium WebDriver', 'Playwright/Cypress', 'Page Object Model', 'Locators (XPath/CSS)'],
                projects: {
                    simple: [{ title: 'Login Script', description: 'Automate login flow.' }],
                    intermediate: [{ title: 'E-commerce Checkout', description: 'Full flow automation.' }],
                    advanced: [{ title: 'Framework Setup', description: 'TestNG/Junit with reporting.' }]
                },
                whyThisOrder: 'UI is where users interact.'
            },
            {
                id: 'api-test',
                title: '3. API Testing (Month 4)',
                description: 'Faster and stable.',
                topics: ['Postman', 'RestAssured', 'Status Codes', 'JSON Validation'],
                projects: {
                    simple: [{ title: 'Postman Collection', description: 'Suite of API tests.' }],
                    intermediate: [{ title: 'Code-based API Test', description: 'Automated check of endpoints.' }],
                    advanced: []
                },
                whyThisOrder: 'API tests are less flaky than UI.'
            }
        ]
    },
    'network-engineer': {
        id: 'network-engineer',
        title: 'Network Engineer',
        description: 'Design and manage the digital plumbing of the world.',
        summary: `FINAL ORDER SUMMARY (Packet Master)
✔ Networking Fundamentals → OSI, TCP/IP
✔ Routing & Switching → VLANs, OSPF, BGP
✔ Network Security → Firewalls, VPNs
✔ Automation → Python (Netmiko), Ansible`,
        steps: [
            {
                id: 'net-fun',
                title: '1. Fundamentals (CCNA level) (Month 1-2)',
                description: 'How the internet works.',
                topics: ['IP Addressing', 'Subnetting', 'Cabling', 'Switching Logic', 'Routing Tables'],
                projects: {
                    simple: [{ title: 'Subnet Calculator', description: 'Python script to calculate ranges.' }],
                    intermediate: [{ title: 'Packet Tracer Lab', description: 'Small office network simulation.' }],
                    advanced: []
                },
                whyThisOrder: 'Basics are everything in networking.'
            },
            {
                id: 'advanced-routing',
                title: '2. Advanced Routing & Switching (Month 3-4)',
                description: 'Moving data at scale.',
                topics: ['OSPF', 'BGP', 'VLAN/Trunking', 'STP', 'MPLS basics'],
                projects: {
                    simple: [{ title: 'GNS3 Lab', description: 'Multi-router OSPF network.' }],
                    intermediate: [{ title: 'High Availability Setup', description: 'HSRP/VRRP configuration.' }],
                    advanced: []
                },
                whyThisOrder: 'Connecting networks is the core job.'
            },
            {
                id: 'net-auto',
                title: '3. Network Automation (Month 5)',
                description: 'Stop typing CLI commands manually.',
                topics: ['Python (Netmiko/Napalm)', 'Ansible for Networking', 'RESTCONF/NETCONF'],
                projects: {
                    simple: [{ title: 'Config Backup Script', description: 'Pull configs from 10 routers.' }],
                    intermediate: [{ title: 'VLAN Provisioning Tool', description: 'Automate switch port config.' }],
                    advanced: []
                },
                whyThisOrder: 'Scale requires automation.'
            }
        ]
    },
    'embedded-engineer': {
        id: 'embedded-engineer',
        title: 'Embedded Systems Engineer',
        description: 'Write code that runs on hardware.',
        summary: `FINAL ORDER SUMMARY (Close to Metal)
✔ C/C++ → the only languages that matter
✔ Electronics Basics → voltage, current, GPIO
✔ Microcontrollers → Arduino, STM32, ESP32
✔ RTOS → Real-time operating systems
✔ Communication Protocols → I2C, SPI, UART`,
        steps: [
            {
                id: 'c-electronics',
                title: '1. C & Electronics (Month 1-2)',
                description: 'Bit manipulation and circuits.',
                topics: ['Advanced C Pointers', 'Bitwise Operators', 'Ohm’s Law', 'Digital Logic', 'Reading Datasheets'],
                projects: {
                    simple: [{ title: 'Blink an LED (Register Level)', description: 'No Arduino library, direct register access.' }],
                    intermediate: [{ title: 'Traffic Light Controller', description: 'State machine implementation.' }],
                    advanced: []
                },
                whyThisOrder: 'You need to understand the hardware constraints.'
            },
            {
                id: 'mcu-prog',
                title: '2. Microcontroller Programming (Month 3-4)',
                description: 'Talking to chips.',
                topics: ['Interrupts', 'Timers/Counters', 'ADC/DAC', 'I2C/SPI/UART', 'DMA'],
                projects: {
                    simple: [{ title: 'Temperature Monitor', description: 'Read sensor via I2C, display on LCD.' }],
                    intermediate: [{ title: 'UART CLI', description: 'Command line interface over serial.' }],
                    advanced: [{ title: 'Custom Bootloader', description: 'Update firmware over UART.' }]
                },
                whyThisOrder: 'Drivers give life to hardware.'
            },
            {
                id: 'rtos',
                title: '3. RTOS & Connectivity (Month 5)',
                description: 'Multitasking on a chip.',
                topics: ['FreeRTOS', 'Task Scheduling', 'Mutex/Semaphores', 'WiFi/BLE (ESP32)'],
                projects: {
                    simple: [{ title: 'Multi-tasking LED', description: 'Blink distinct LEDs at different rates with RTOS tasks.' }],
                    intermediate: [{ title: 'IoT Sensor Node', description: 'Send sensor data to cloud via MQTT.' }],
                    advanced: []
                },
                whyThisOrder: 'Complex systems need structure.'
            }
        ]
    },
    'ar-vr-dev': {
        id: 'ar-vr-dev',
        title: 'AR/VR Developer',
        description: 'Build immersive realities and spatial computing experiences.',
        summary: `FINAL ORDER SUMMARY (Spatial)
✔ 3D Math → linear algebra
✔ Unity/Unreal → engine skills
✔ VR SDKs → Oculus/OpenXR
✔ AR SDKs → ARKit/ARCore/Vuforia
✔ Optimization → 90fps is mandatory`,
        steps: [
            {
                id: 'vr-foundations',
                title: '1. VR Foundations (Month 1-2)',
                description: 'Immersion mechanics.',
                topics: ['Stereoscopic Rendering', 'Locomotion Techniques (Teleport/Smooth)', 'Interaction (Grab/Throw)', 'Spatial Audio'],
                projects: {
                    simple: [{ title: 'VR Museum', description: 'Walk around and inspect 3D models.' }],
                    intermediate: [{ title: 'VR Shooting Range', description: 'Physics based interactions.' }],
                    advanced: []
                },
                whyThisOrder: 'VR is about presence.'
            },
            {
                id: 'ar-interactions',
                title: '2. AR Mechanics (Month 3)',
                description: 'Overlaying the digital.',
                topics: ['Image Tracking', 'Plane Detection', 'Light Estimation', 'Face Tracking'],
                projects: {
                    simple: [{ title: 'AR Business Card', description: 'Show 3D info on a card.' }],
                    intermediate: [{ title: 'Furniture Placer', description: 'Place 3D chair in room.' }],
                    advanced: []
                },
                whyThisOrder: 'AR interacts with the real world.'
            }
        ]
    },
    'sre': {
        id: 'sre',
        title: 'Site Reliability Engineer',
        description: 'Ensure reliability and uptime of large-scale systems.',
        summary: `FINAL ORDER SUMMARY (Uptime Keepers)
✔ Advanced Linux → deep debugging
✔ Observability → SLIs, SLOs, SLAs
✔ Incident Management → on-call culture
✔ Automation → toil reduction
✔ Capacity Planning → scaling proactively`,
        steps: [
            {
                id: 'observability',
                title: '1. Metrics & Reliability (Month 1-2)',
                description: 'Measuring health.',
                topics: ['Golden Signals (Latency, Traffic, Errors, Saturation)', 'Defining SLOs', 'Alert Fatigue Control'],
                projects: {
                    simple: [{ title: 'Define SLOs for an API', description: 'Document goals.' }],
                    intermediate: [{ title: 'Prometheus Alerting Rules', description: 'Complex queries for detection.' }],
                    advanced: []
                },
                whyThisOrder: 'You fix what you measure.'
            },
            {
                id: 'sys-internals',
                title: '2. System Internals (Month 3)',
                description: 'Deep dive.',
                topics: ['Kernel Tuning', 'eBPF basics', 'Memory Management', 'Process Scheduling'],
                projects: {
                    simple: [{ title: 'Performance Audit', description: 'Use strace/perf to analyze a slow binary.' }],
                    intermediate: [{ title: 'Chaotic Experiments', description: 'Simulate high load and packet loss.' }],
                    advanced: []
                },
                whyThisOrder: 'Root cause analysis requires deep knowledge.'
            }
        ]
    },
    'technical-writer': {
        id: 'technical-writer',
        title: 'Technical Writer',
        description: 'Explain complex technology clearly to users and developers.',
        summary: `FINAL ORDER SUMMARY (Clarity)
✔ Writing Skills → concise, clear, accurate
✔ Markdown/Docs-as-code → dev tooling
✔ API Documentation → Swagger/OpenAPI
✔ Information Architecture → organizing content
✔ User Guides → how-tos and tutorials`,
        steps: [
            {
                id: 'writing-basics',
                title: '1. Technical Writing Core (Month 1)',
                description: 'The art of explanation.',
                topics: ['Active Voice', 'Audience Analysis', 'Simplified English', 'Grammar & Style Guides (Google/Microsoft)'],
                projects: {
                    simple: [{ title: 'Rewrite a Bad Error Message', description: 'Make it actionable.' }],
                    intermediate: [{ title: 'How-To Guide', description: 'Step-by-step installation of a tool.' }],
                    advanced: []
                },
                whyThisOrder: 'Writing quality comes first.'
            },
            {
                id: 'docs-tooling',
                title: '2. Tools of the Trade (Month 2)',
                description: 'Write like a developer.',
                topics: ['Markdown', 'Git for Writers', 'Static Site Generators (Docusaurus/MkDocs)'],
                projects: {
                    simple: [{ title: 'Portfolio Site in Docusaurus', description: 'Host your docs.' }],
                    intermediate: [{ title: 'Git Workflow', description: 'Submit a PR to correct a typo in open source.' }],
                    advanced: []
                },
                whyThisOrder: 'Modern docs live in repos.'
            },
            {
                id: 'api-docs',
                title: '3. API Documentation (Month 3)',
                description: 'The most in-demand skill.',
                topics: ['REST APIs', 'OpenAPI/Swagger Specs', 'Endpoints & Parameters', 'Authentication Docs'],
                projects: {
                    simple: [{ title: 'Document an API Endpoint', description: 'Request/Response examples.' }],
                    intermediate: [{ title: 'Full API Reference', description: 'From a swagger file.' }],
                    advanced: []
                },
                whyThisOrder: 'Developers need good API docs.'
            }
        ]
    },
    'dev-advocate': {
        id: 'dev-advocate',
        title: 'Developer Advocate',
        description: 'Build community and help developers succeed with your platform.',
        summary: `FINAL ORDER SUMMARY (The Bridge)
✔ Coding Skills → credibility
✔ Content Creation → blogs, videos, talks
✔ Community Management → Discord, Forums
✔ Public Speaking → conferences
✔ Empathy → feel the user pain`,
        steps: [
            {
                id: 'content-creation',
                title: '1. Content & Teaching (Month 1-2)',
                description: 'Scaling your knowledge.',
                topics: ['Technical Blogging', 'Video Tutorials', 'Social Media Presence', 'Storytelling'],
                projects: {
                    simple: [{ title: 'Write 3 Technical Blogs', description: 'Solve specific problems.' }],
                    intermediate: [{ title: 'Video Tutorial', description: 'Screen recording walkthrough.' }],
                    advanced: []
                },
                whyThisOrder: 'You must be able to teach.'
            },
            {
                id: 'community-stuff',
                title: '2. Community Building (Month 3)',
                description: 'Gathering people.',
                topics: ['Community Strategy', 'Moderation', 'Event Organizing', 'Feedback Loops'],
                projects: {
                    simple: [{ title: 'Host a Meetup/Space', description: 'Virtual or physical.' }],
                    intermediate: [{ title: 'Reply to 50 StackOverflow Qs', description: 'Help users.' }],
                    advanced: []
                },
                whyThisOrder: 'Relationships matter.'
            }
        ]
    },
    'iot-dev': {
        id: 'iot-dev',
        title: 'IoT Developer',
        description: 'Connect physical devices to the internet.',
        summary: `FINAL ORDER SUMMARY (Connected World)
✔ Hardware → sensors, actuators
✔ Connectivity → MQTT, CoAP, LoRaWAN
✔ Edge Computing → processing locally
✔ Cloud IoT → AWS IoT / Azure IoT
✔ Security → device identity & encryption`,
        steps: [
            {
                id: 'connectivity',
                title: '1. Protocols & Connectivity (Month 1-2)',
                description: 'Speaking the language of things.',
                topics: ['MQTT', 'HTTP vs CoAP', 'JSON vs Protobuf', 'WiFi vs BLE vs LoRa'],
                projects: {
                    simple: [{ title: 'MQTT Broker Setup', description: 'Mosquitto setup + pub/sub.' }],
                    intermediate: [{ title: 'ESP32 Weather Station', description: 'Send temp/humidity to cloud.' }],
                    advanced: []
                },
                whyThisOrder: 'Data transmission is key.'
            },
            {
                id: 'cloud-iot',
                title: '2. Cloud IoT Platforms (Month 3)',
                description: 'Managing millions of devices.',
                topics: ['Device Shadows', 'OTA Updates', 'Rules Engines', 'Fleet Management'],
                projects: {
                    simple: [{ title: 'Connect to AWS IoT Core', description: 'Cert-based auth.' }],
                    intermediate: [{ title: 'OTA Update Mechanism', description: 'Update firmware remotely.' }],
                    advanced: []
                },
                whyThisOrder: 'Scale happens in the cloud.'
            }
        ]
    },
    'systems-programmer': {
        id: 'systems-programmer',
        title: 'Systems Programmer',
        description: 'Build operating systems, databases, and browsers.',
        summary: `FINAL ORDER SUMMARY (The Heavy Lifters)
✔ Rust / C++ / C → manual memory management
✔ OS Concepts → threading, locks, file systems
✔ Compilers → how code becomes machine code
✔ Networking Internals → raw sockets
✔ Performance → CPU caches, SIMD`,
        steps: [
            {
                id: 'low-level-lang',
                title: '1. Advanced Systems Language (Month 1-2)',
                description: 'Mastering the tool.',
                topics: ['Ownership/Borrowing (Rust)', 'Pointers/Memory (C++)', 'Concurrency Models', 'Unsafe Code'],
                projects: {
                    simple: [{ title: 'Custom Vector/List Class', description: 'Reimplement STL vector.' }],
                    intermediate: [{ title: 'Multithreaded Web Server', description: 'Thread pool implementation.' }],
                    advanced: []
                },
                whyThisOrder: 'Efficiency is the goal.'
            },
            {
                id: 'sys-projects',
                title: '2. Core Systems (Month 3-4)',
                description: 'Building the infrastructure.',
                topics: ['File Systems', 'Database Engines (B-Trees)', 'Network Stacks'],
                projects: {
                    simple: [{ title: 'KV Store', description: 'Persistent key-value database.' }],
                    intermediate: [{ title: 'Text Editor', description: 'Like nano/vim (buffer management).' }],
                    advanced: [{ title: 'Mini OS Kernel', description: 'Boot and print text.' }]
                },
                whyThisOrder: 'Learn how the world runs.'
            }
        ]
    },
    'graphics-engineer': {
        id: 'graphics-engineer',
        title: 'Graphics Engineer',
        description: 'Push pixels to the screen efficiently.',
        summary: `FINAL ORDER SUMMARY (Pixel Pushers)
✔ Linear Algebra → the math of 3D
✔ Graphics APIs → OpenGL, Vulkan, DirectX, WebGPU
✔ Shaders → GLSL/HLSL
✔ Rendering Pipelines → rasterization, ray tracing
✔ GPU Architecture → parallel processing`,
        steps: [
            {
                id: 'graphics-math',
                title: '1. Math & Basic API (Month 1-2)',
                description: 'Triangles on screen.',
                topics: ['Transformations', 'Projections', 'OpenGL/WebGL Context', 'Buffers'],
                projects: {
                    simple: [{ title: 'Rotating Cube', description: 'From scratch (no engine).' }],
                    intermediate: [{ title: 'Model Loader (OBJ)', description: 'Parse and render a mesh.' }],
                    advanced: []
                },
                whyThisOrder: 'You must understand the pipeline.'
            },
            {
                id: 'shaders',
                title: '2. Shaders & Lighting (Month 3)',
                description: 'Painting with light.',
                topics: ['Phong Lighting', 'Textures', 'Shadow Mapping', 'Post-processing'],
                projects: {
                    simple: [{ title: 'Phong Shader', description: 'Ambient + Diffuse + Specular.' }],
                    intermediate: [{ title: 'Shadow Mapping', description: 'Implement shadows.' }],
                    advanced: []
                },
                whyThisOrder: 'Realism comes from light.'
            }
        ]
    },
    'smart-contract-auditor': {
        id: 'smart-contract-auditor',
        title: 'Smart Contract Auditor',
        description: 'Review and secure blockchain code.',
        summary: `FINAL ORDER SUMMARY (Security elite)
✔ Solidity Deep Dive → EVM opcodes
✔ DeFi Primitives → AMMs, Lending
✔ Attack Vectors → Reentrancy, Oracle manipulation
✔ Auditing Tools → Slither, Echidna
✔ Report Writing → clear findings`,
        steps: [
            {
                id: 'attack-vectors',
                title: '1. Common Vulnerabilities (Month 1)',
                description: 'Knowing the enemy.',
                topics: ['Reentrancy', 'Integer Overflow (historic)', 'Front-running', 'Governance Attacks'],
                projects: {
                    simple: [{ title: 'Ethernaut CTF', description: 'Complete levels 1-10.' }],
                    intermediate: [{ title: 'Damn Vulnerable DeFi', description: 'Solve challenges.' }],
                    advanced: []
                },
                whyThisOrder: 'Learn how things break.'
            },
            {
                id: 'audit-process',
                title: '2. The Audit (Month 2-3)',
                description: 'Professional review.',
                topics: ['Line-by-line Review', 'Fuzzing', 'Formal Verification', 'Gas Analysis'],
                projects: {
                    simple: [{ title: 'Audit a Simple Protocol', description: 'Write a mock report.' }],
                    intermediate: [{ title: 'Contests (Code4rena)', description: 'Participate and find 1 bug.' }],
                    advanced: []
                },
                whyThisOrder: 'Find bugs before the black hats do.'
            }
        ]
    },
    'erp-consultant': {
        id: 'erp-consultant',
        title: 'ERP Consultant',
        description: 'Implement large scale business software.',
        summary: `FINAL ORDER SUMMARY (Business Systems)
✔ Business Processes → Order to Cash, Procure to Pay
✔ ERP Platforms → SAP, Oracle, Dynamics 365
✔ Functional Config → setting up the system
✔ Data Migration → legacy to new
✔ Soft Skills → stakeholder management`,
        steps: [
            {
                id: 'biz-process',
                title: '1. Business Processes (Month 1)',
                description: 'How companies run.',
                topics: ['Finance (GL/AP/AR)', 'Supply Chain', 'HR Processes', 'CRM'],
                projects: {
                    simple: [{ title: 'Process Flowchart', description: 'Map a "Purchase to Pay" flow.' }],
                    intermediate: [{ title: 'Gap Analysis', description: 'Compare requirements vs software capabilities.' }],
                    advanced: []
                },
                whyThisOrder: 'Software serves the business.'
            },
            {
                id: 'plat-skills',
                title: '2. Platform Skills (Month 2-3)',
                description: 'The tool.',
                topics: ['SAP S/4HANA or Odoo (Open Source)', 'Configuration', 'Reporting', 'User Roles'],
                projects: {
                    simple: [{ title: 'Setup Odoo', description: 'Configure a basic sales module.' }],
                    intermediate: [{ title: 'Import Data', description: 'Upload customer list from Excel.' }],
                    advanced: []
                },
                whyThisOrder: 'Master one platform.'
            }
        ]
    },
    'cv-engineer': {
        id: 'cv-engineer',
        title: 'Computer Vision Engineer',
        description: 'Teach computers to see and understand images.',
        summary: `FINAL ORDER SUMMARY (Machine Sight)
✔ Image Processing → OpenCV basics
✔ Deep Learning for Vision → CNNs
✔ Detection & Segmentation → YOLO, Mask R-CNN
✔ 3D Vision → Stereo, LiDAR
✔ Deployment → Edge capabilities`,
        steps: [
            {
                id: 'img-proc',
                title: '1. Image Processing (Month 1)',
                description: 'Old school vision.',
                topics: ['Kernels/Filters', 'Edge Detection (Canny)', 'Morphological Ops', 'Color Spaces'],
                projects: {
                    simple: [{ title: 'Document Scanner', description: 'Perspective transform.' }],
                    intermediate: [{ title: 'Lane Detection', description: 'Hough transforms for lanes.' }],
                    advanced: []
                },
                whyThisOrder: 'Basics are fast and cheap.'
            },
            {
                id: 'dl-vision',
                title: '2. Deep Learning Vision (Month 2-3)',
                description: 'Modern vision.',
                topics: ['CNN Architectures', 'Object Detection', 'Semantic Segmentation', 'Transfer Learning'],
                projects: {
                    simple: [{ title: 'Face Mask Detector', description: 'CNN classification.' }],
                    intermediate: [{ title: 'Vehicle Counter', description: 'YOLO implementation.' }],
                    advanced: []
                },
                whyThisOrder: 'Where the state of the art lives.'
            }
        ]
    },
    'no-code-dev': {
        id: 'no-code-dev',
        title: 'No-Code Developer',
        description: 'Build software without writing code.',
        summary: `FINAL ORDER SUMMARY (Rapid Build)
✔ Web Builders → Webflow, Framer
✔ App Builders → Bubble, FlutterFlow
✔ Automation → Zapier, Make
✔ Database → Airtable, Supabase
✔ Logic → Visual programming`,
        steps: [
            {
                id: 'builders',
                title: '1. Visual Builders (Month 1)',
                description: 'Drag and drop interfaces.',
                topics: ['Box Model (still needed)', 'CMS Structure', 'Responsive Design', 'States'],
                projects: {
                    simple: [{ title: 'Portfolio Site', description: 'Webflow/Framer.' }],
                    intermediate: [{ title: 'Directory Site', description: 'CMS driven list (e.g. Job Board).' }],
                    advanced: []
                },
                whyThisOrder: 'Build the UI first.'
            },
            {
                id: 'logic-db',
                title: '2. Logic & Data (Month 2)',
                description: 'Making it functional.',
                topics: ['Relational Data Basics', 'API Connectors', 'Workflows', 'User Auth'],
                projects: {
                    simple: [{ title: 'Automated Email', description: 'Form submit -> Zapier -> Email.' }],
                    intermediate: [{ title: 'SaaS MVP', description: 'Bubble app with stripes payments.' }],
                    advanced: []
                },
                whyThisOrder: 'Power comes from logic.'
            }
        ]
    }
};
