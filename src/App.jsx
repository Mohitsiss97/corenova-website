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
import About from './pages/About';
import Process from './pages/Process';
import Careers from './pages/Careers';
import JobDetail from './pages/JobDetail';
import Blog from './pages/Blog';
import ArticleDetail from './pages/ArticleDetail';
import Resources from './pages/Resources';
import Docs from './pages/Docs';
import Support from './pages/Support';
import Integrations from './pages/Integrations';
import IntegrationDetail from './pages/IntegrationDetail';
import Placeholder from './pages/Placeholder';
import NotFound from './pages/NotFound';

/* Pages still in the build queue. Each one states its planned sections so
   no navigation link ever dead-ends while the site is being built out. */
const queued = [
  { path: '/industries', title: 'Industries', phase: 'Phase 3', sections: ['Industry grid with outcome metrics', 'Cross-industry platform capabilities', 'Regulatory and compliance coverage', 'Featured case studies'] },
  { path: '/industries/:industrySlug', title: 'Industry detail', phase: 'Phase 3', sections: ['Industry hero with named pain points', 'Outcome metrics', 'Recommended product stack', 'Workflow diagram', 'Compliance notes', 'Industry case study', 'CTA'] },
  { path: '/case-studies', title: 'Case studies', phase: 'Phase 4', sections: ['Filterable case study grid (industry, product, region)', 'Featured study', 'Results summary strip', 'Reference call CTA'] },
  { path: '/pricing', title: 'Pricing', phase: 'Phase 4', sections: ['Monthly / annual toggle', 'Three plan cards', 'Full feature comparison matrix', 'Interactive ROI calculator', 'Deployment cost notes', 'Pricing FAQ', 'Sales CTA'] },
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
            <Route path="/about" element={<About />} />
            <Route path="/process" element={<Process />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:jobId" element={<JobDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<ArticleDetail />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/support" element={<Support />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/integrations/:integrationSlug" element={<IntegrationDetail />} />

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
