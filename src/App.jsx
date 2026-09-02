import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from './theme/ThemeProvider';
import Layout from './components/layout/Layout';

import Home from './pages/Home';
import Products from './pages/Products';
import Services from './pages/Services';
import Technologies from './pages/Technologies';
import ServiceDetail from './pages/ServiceDetail';
import CaseStudyDetail from './pages/CaseStudyDetail';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Placeholder from './pages/Placeholder';
import NotFound from './pages/NotFound';

/* Pages still in the build queue. Each one states its planned sections so
   no navigation link ever dead-ends while the site is being built out. */
const queued = [
  { path: '/industries', title: 'Industries', phase: 'Phase 3', sections: ['Industry grid with outcome metrics', 'Cross-industry platform capabilities', 'Regulatory and compliance coverage', 'Featured case studies'] },
  { path: '/industries/:industrySlug', title: 'Industry detail', phase: 'Phase 3', sections: ['Industry hero with named pain points', 'Outcome metrics', 'Recommended product stack', 'Workflow diagram', 'Compliance notes', 'Industry case study', 'CTA'] },
  { path: '/case-studies', title: 'Case studies', phase: 'Phase 4', sections: ['Filterable case study grid (industry, product, region)', 'Featured study', 'Results summary strip', 'Reference call CTA'] },
  { path: '/pricing', title: 'Pricing', phase: 'Phase 4', sections: ['Monthly / annual toggle', 'Three plan cards', 'Full feature comparison matrix', 'Interactive ROI calculator', 'Deployment cost notes', 'Pricing FAQ', 'Sales CTA'] },
  { path: '/about', title: 'About us', phase: 'Phase 5', sections: ['Founding story', 'Mission and values', 'Company timeline', 'Leadership profiles', 'Offices map', 'Awards and recognition', 'Life at CoreNova'] },
  { path: '/process', title: 'How we work', phase: 'Phase 5', sections: ['Six-stage delivery method in detail', 'Sprint rhythm and ceremonies', 'Quality gates', 'Tooling and collaboration', 'Handover and documentation standards'] },
  { path: '/careers', title: 'Careers', phase: 'Phase 5', sections: ['Culture and benefits', 'Filterable job board', 'Hiring process timeline', 'Employee stories', 'Application form'] },
  { path: '/careers/:jobId', title: 'Job detail', phase: 'Phase 5', sections: ['Role summary', 'Responsibilities and requirements', 'Team and reporting line', 'Interview stages', 'Apply form'] },
  { path: '/blog', title: 'Blog', phase: 'Phase 6', sections: ['Featured post', 'Category filter', 'Post grid with reading time', 'Newsletter signup'] },
  { path: '/blog/:slug', title: 'Article', phase: 'Phase 6', sections: ['Article header with author and date', 'Table of contents', 'Article body', 'Related posts', 'Share and subscribe'] },
  { path: '/resources', title: 'Resources', phase: 'Phase 6', sections: ['Whitepapers and ebooks', 'Templates and checklists', 'Webinars', 'Gated download flow'] },
  { path: '/docs', title: 'Documentation', phase: 'Phase 6', sections: ['Docs shell with sidebar navigation', 'API reference', 'Getting started guides', 'Search'] },
  { path: '/support', title: 'Help centre', phase: 'Phase 6', sections: ['Search across articles', 'Category tiles', 'Popular articles', 'SLA and contact escalation'] },
  { path: '/integrations', title: 'Integrations', phase: 'Phase 6', sections: ['Searchable integration directory', 'Category filters', 'Individual integration pages', 'Build-your-own API note'] },
  { path: '/partners', title: 'Partners', phase: 'Phase 7', sections: ['Partner tiers', 'Become a partner form', 'Partner directory', 'Co-selling benefits'] },
  { path: '/newsroom', title: 'Newsroom', phase: 'Phase 7', sections: ['Press releases', 'Media coverage', 'Brand assets download', 'Press contact'] },
  { path: '/demo', title: 'Book a demo', phase: 'Phase 4', sections: ['Two-step qualification form', 'Calendar slot picker', 'What to expect on the call', 'Trust signals sidebar'] },
  { path: '/privacy', title: 'Privacy policy', phase: 'Phase 7', sections: ['Data we collect', 'How we use it', 'Sub-processors', 'Your rights', 'Contact the DPO'] },
  { path: '/terms', title: 'Terms of service', phase: 'Phase 7', sections: ['Service terms', 'Acceptable use', 'Liability', 'Termination'] },
  { path: '/security', title: 'Security & compliance', phase: 'Phase 7', sections: ['Certifications', 'Infrastructure security', 'Application security', 'Data handling and residency', 'Incident response', 'Request pentest summary'] },
  { path: '/cookies', title: 'Cookie policy', phase: 'Phase 7', sections: ['Cookie categories', 'Preference manager', 'Third-party cookies'] },
];

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:categorySlug" element={<CategoryPage />} />
            <Route path="/products/:categorySlug/:productSlug" element={<ProductDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/technologies" element={<Technologies />} />
            <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/contact" element={<Contact />} />

            {queued.map((p) => (
              <Route
                key={p.path}
                path={p.path}
                element={<Placeholder title={p.title} phase={p.phase} sections={p.sections} />}
              />
            ))}

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
