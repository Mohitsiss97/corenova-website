import {
  MonitorSmartphone, Server, Smartphone, Database, Cloud, Container,
  BrainCircuit, Workflow, ShoppingCart, Hexagon,
} from 'lucide-react';

/* The full stack we hire for, staff and support in production. */
export const techGroups = [
  {
    id: 'dotnet', icon: Hexagon, name: '.NET & Microsoft Stack',
    featured: true,
    blurb:
      'Our deepest practice. ASP.NET Core services, MVC and Blazor front-ends, EF Core data access — and the migration path off .NET Framework that most teams are still putting off.',
    items: [
      { name: 'C#', level: 'Core' },
      { name: 'ASP.NET Core', level: 'Core' },
      { name: 'ASP.NET MVC', level: 'Core' },
      { name: 'Web API & Minimal APIs', level: 'Core' },
      { name: 'Entity Framework Core', level: 'Core' },
      { name: 'Blazor (Server & WASM)', level: 'Strong' },
      { name: 'SignalR', level: 'Strong' },
      { name: '.NET MAUI', level: 'Strong' },
      { name: 'WPF / WinForms', level: 'Strong' },
      { name: '.NET Framework 4.8', level: 'Core' },
      { name: 'Dapper', level: 'Strong' },
      { name: 'Duende IdentityServer', level: 'Strong' },
      { name: 'xUnit / NUnit', level: 'Core' },
      { name: '.NET Aspire', level: 'Working' },
      { name: 'Azure App Service', level: 'Core' },
      { name: 'Visual Studio & Rider', level: 'Core' },
    ],
  },
  {
    id: 'frontend', icon: MonitorSmartphone, name: 'Frontend',
    blurb: 'Component-driven interfaces with a token-based design system and a performance budget enforced in CI.',
    items: [
      { name: 'React', level: 'Core' }, { name: 'Next.js', level: 'Core' },
      { name: 'TypeScript', level: 'Core' }, { name: 'Vue 3', level: 'Strong' },
      { name: 'Angular', level: 'Strong' }, { name: 'Svelte', level: 'Working' },
      { name: 'Tailwind CSS', level: 'Core' }, { name: 'Redux / Zustand', level: 'Core' },
      { name: 'Vite', level: 'Core' }, { name: 'Storybook', level: 'Strong' },
    ],
  },
  {
    id: 'backend', icon: Server, name: 'Backend',
    blurb: 'Service APIs designed contract-first, with idempotency, tracing and backwards-compatible versioning from day one.',
    items: [
      { name: 'Node.js', level: 'Core' }, { name: 'NestJS', level: 'Core' },
      { name: 'Java / Spring Boot', level: 'Core' },
      { name: 'Python / FastAPI', level: 'Core' }, { name: 'Django', level: 'Strong' },
      { name: 'PHP / Laravel', level: 'Strong' }, { name: 'Go', level: 'Strong' },
      { name: 'GraphQL', level: 'Strong' }, { name: 'gRPC', level: 'Working' },
    ],
  },
  {
    id: 'mobile', icon: Smartphone, name: 'Mobile',
    blurb: 'Offline-first apps with background sync, push and release pipelines we operate for you.',
    items: [
      { name: 'React Native', level: 'Core' }, { name: 'Flutter', level: 'Core' },
      { name: 'Swift / SwiftUI', level: 'Strong' }, { name: 'Kotlin / Compose', level: 'Strong' },
      { name: 'Expo', level: 'Strong' }, { name: 'Firebase', level: 'Core' },
      { name: 'SQLite / Realm', level: 'Strong' }, { name: 'Fastlane', level: 'Working' },
    ],
  },
  {
    id: 'databases', icon: Database, name: 'Databases & Storage',
    blurb: 'Schema design, indexing strategy and migration paths that survive a 100× data growth.',
    items: [
      { name: 'PostgreSQL', level: 'Core' }, { name: 'MySQL', level: 'Core' },
      { name: 'MongoDB', level: 'Core' }, { name: 'SQL Server', level: 'Strong' },
      { name: 'Redis', level: 'Core' }, { name: 'Elasticsearch', level: 'Strong' },
      { name: 'ClickHouse', level: 'Working' }, { name: 'S3 / Blob', level: 'Core' },
    ],
  },
  {
    id: 'cloud', icon: Cloud, name: 'Cloud Platforms',
    blurb: 'Landing zones, network design and cost guardrails — certified engineers on all three hyperscalers.',
    items: [
      { name: 'AWS', level: 'Core' }, { name: 'Microsoft Azure', level: 'Core' },
      { name: 'Google Cloud', level: 'Strong' }, { name: 'Cloudflare', level: 'Strong' },
      { name: 'Vercel', level: 'Strong' }, { name: 'DigitalOcean', level: 'Working' },
    ],
  },
  {
    id: 'devops', icon: Container, name: 'DevOps & Platform',
    blurb: 'Everything as code — infra, pipelines, policies and dashboards, reviewed like application code.',
    items: [
      { name: 'Docker', level: 'Core' }, { name: 'Kubernetes', level: 'Core' },
      { name: 'Terraform', level: 'Core' }, { name: 'GitHub Actions', level: 'Core' },
      { name: 'GitLab CI', level: 'Strong' }, { name: 'Jenkins', level: 'Strong' },
      { name: 'ArgoCD', level: 'Strong' }, { name: 'Prometheus / Grafana', level: 'Core' },
      { name: 'OpenTelemetry', level: 'Strong' },
    ],
  },
  {
    id: 'ai', icon: BrainCircuit, name: 'AI & Machine Learning',
    blurb: 'Retrieval, evaluation and guardrails — plus an inference cost model before anything ships.',
    items: [
      { name: 'Claude API', level: 'Core' }, { name: 'PyTorch', level: 'Strong' },
      { name: 'TensorFlow', level: 'Strong' }, { name: 'LangChain', level: 'Strong' },
      { name: 'Vector DBs (pgvector, Pinecone)', level: 'Core' }, { name: 'Hugging Face', level: 'Strong' },
      { name: 'scikit-learn', level: 'Core' }, { name: 'MLflow', level: 'Working' },
    ],
  },
  {
    id: 'data', icon: Workflow, name: 'Data Engineering',
    blurb: 'Ingestion to a governed metric layer, with lineage you can show an auditor.',
    items: [
      { name: 'Apache Kafka', level: 'Core' }, { name: 'Airflow', level: 'Core' },
      { name: 'dbt', level: 'Strong' }, { name: 'Apache Spark', level: 'Strong' },
      { name: 'Snowflake', level: 'Strong' }, { name: 'BigQuery', level: 'Strong' },
      { name: 'Power BI', level: 'Core' }, { name: 'Metabase', level: 'Working' },
    ],
  },
  {
    id: 'commerce', icon: ShoppingCart, name: 'CMS & Commerce',
    blurb: 'Headless content and commerce stacks, integrated with your ERP and payment rails.',
    items: [
      { name: 'Shopify', level: 'Strong' }, { name: 'WooCommerce', level: 'Strong' },
      { name: 'Strapi', level: 'Core' }, { name: 'Sanity', level: 'Strong' },
      { name: 'Contentful', level: 'Strong' }, { name: 'WordPress', level: 'Core' },
      { name: 'Stripe / Razorpay', level: 'Core' },
    ],
  },
];

export const levelMeta = {
  Core: { label: 'Core', hint: '10+ engineers, production for 5+ years' },
  Strong: { label: 'Strong', hint: 'Dedicated practice with certified leads' },
  Working: { label: 'Working', hint: 'Delivered in production, smaller bench' },
};

export const techCount = techGroups.reduce((n, g) => n + g.items.length, 0);

/* ------------------------------------------------------------------
   Brand marks for the technologies we list, sourced from the open
   svgl.app library and served locally from /public/logos.
   `light` / `dark` name the file to use on that theme's background;
   `invert` flips a single-variant monochrome mark for dark surfaces.
   Anything absent here simply renders as a text chip.
------------------------------------------------------------------ */
export const techLogos = {
  'C#': { light: 'dotnet' },
  'ASP.NET Core': { light: 'dotnet' },
  'ASP.NET MVC': { light: 'dotnet' },
  'Web API & Minimal APIs': { light: 'dotnet' },
  'Entity Framework Core': { light: 'dotnet' },
  'Blazor (Server & WASM)': { light: 'dotnet' },
  'SignalR': { light: 'dotnet' },
  '.NET MAUI': { light: 'dotnet' },
  'WPF / WinForms': { light: 'dotnet' },
  '.NET Framework 4.8': { light: 'dotnet' },
  '.NET Aspire': { light: 'dotnet' },
  'Azure App Service': { light: 'azure' },
  'Visual Studio & Rider': { light: 'visual-studio' },
  'SQL Server': { light: 'sql-server' },
  'React': { light: 'react_light', dark: 'react_dark' },
  'React Native': { light: 'react_light', dark: 'react_dark' },
  'Next.js': { light: 'nextjs_icon_dark', invert: true },
  'TypeScript': { light: 'typescript' },
  'Vue 3': { light: 'vue' },
  'Angular': { light: 'angular' },
  'Tailwind CSS': { light: 'tailwindcss' },
  'Node.js': { light: 'nodejs' },
  'Python / FastAPI': { light: 'python' },
  'PHP / Laravel': { light: 'laravel' },
  'GraphQL': { light: 'graphql' },
  'Flutter': { light: 'flutter' },
  'Swift / SwiftUI': { light: 'swift' },
  'Kotlin / Compose': { light: 'kotlin' },
  'Firebase': { light: 'firebase' },
  'PostgreSQL': { light: 'postgresql' },
  'MySQL': { light: 'mysql-icon-light', dark: 'mysql-icon-dark' },
  'MongoDB': { light: 'mongodb-icon-light', dark: 'mongodb-icon-dark' },
  'Redis': { light: 'redis' },
  'AWS': { light: 'aws_light', dark: 'aws_dark' },
  'Microsoft Azure': { light: 'azure' },
  'Google Cloud': { light: 'google-cloud' },
  'Cloudflare': { light: 'cloudflare' },
  'Docker': { light: 'docker' },
  'Kubernetes': { light: 'kubernetes' },
  'Terraform': { light: 'terraform' },
  'GitHub Actions': { light: 'github_light', dark: 'github_dark' },
  'Prometheus / Grafana': { light: 'grafana' },
  'TensorFlow': { light: 'tensorflow-icon-light', dark: 'tensorflow-icon-dark' },
  'Apache Kafka': { light: 'apache-kafka-light', dark: 'apache-kafka-dark' },
  'Shopify': { light: 'shopify' },
  'WordPress': { light: 'wordpress' },
  'Stripe / Razorpay': { light: 'stripe' },
};

/** The practice we lead with; rendered separately from the rest of the stack. */
export const featuredGroup = techGroups.find((g) => g.featured);
export const otherGroups = techGroups.filter((g) => !g.featured);

/** Every technology that has a brand mark, in display order. */
export const loggedTech = techGroups
  .flatMap((g) => g.items)
  .filter((t) => techLogos[t.name]);
