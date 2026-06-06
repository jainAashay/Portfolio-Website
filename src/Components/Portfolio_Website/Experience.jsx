import React from 'react';
import './Experience.css';
import ExperienceItem from './ExperienceItem';

const EXPERIENCE = [
  {
    id: 0,
    company: 'Flipkart',
    accentColor: '#F59E0B',
    headerBg: 'linear-gradient(135deg, #FFF7ED, #FEF3C7)',
    timeline: 'Apr 2026 – Present',
    position: 'Software Development Engineer-2',
    description: [
      'Owned and delivered a high-impact inventory capability for Flipkart Minutes enabling accurate inter-warehouse transfer and inwarding of multi-part shipments across 1,000+ dark stores; drove end-to-end design, development, testing, and productionisation.',
      'Developed a reusable annotation-driven caching library for Dropwizard applications with configurable method-level caching and observability metrics; adopted across 3 services, cutting boilerplate and improving debuggability.',
    ],
    tech: ['Java', 'AOP', 'Dropwizard', 'System Design', 'Guice','Apache Pulsar'],
    impact: [
      { value: '1,000+', label: 'Dark Stores supporting MPS inwarding', color: '#7C3AED' },
      { value: '3 Services', label: 'Adopted Caching Library', color: '#10B981' },
    ],
  },
  {
    id: 1,
    company: 'Flipkart',
    accentColor: '#4338CA',
    headerBg: 'linear-gradient(135deg, #EEF2FF, #E0E7FF)',
    timeline: 'Jul 2024 – Apr 2026',
    position: 'Software Development Engineer-1',
    description: [
      'Redesigned and optimised consignment dispatch flow — eliminated core library bottlenecks, minimised external dependencies, and implemented caching, achieving 90% latency reduction.',
      'Independently led end-to-end delivery (LLD to production) of multiple core features for Advanced Shipping Note in B2B operations, enhancing scalability and customer experience.',
      'Implemented real-time KStream pipelines consuming CDC events, enriching data, and publishing to Elasticsearch as a query-optimised secondary store leveraging the CQRS pattern.',
      'Performed load testing on high-traffic APIs; applied bulk DB operations, cutting latency by 40% and boosting throughput under peak load.',
    ],
    tech: ['Java', 'Microservices', 'Elasticsearch', 'Apache Kafka', 'Dropwizard'],
    impact: [
      { value: '90%', label: 'Reduction in Dispatch Latency', color: '#4338CA' },
      { value: '40%', label: 'Faster API response Under Peak Load', color: '#0EA5E9' },
    ],
  },
  {
    id: 2,
    company: 'Flipkart',
    accentColor: '#0EA5E9',
    headerBg: 'linear-gradient(135deg, #F0F9FF, #DBEAFE)',
    timeline: 'Jan 2024 – Jun 2024',
    position: 'Software Development Engineer Intern',
    description: [
      'Implemented rate limiter for KStream application — per-stream consumption limits with configurable wait/drop strategies to optimise resource usage and simplify high-load stream onboarding.',
      'Enriched order-path details in the IWIT flow, enabling Just-In-Time transfer of Flipkart Minutes consignments.',
    ],
    tech: ['Java', 'Apache Kafka', 'Dropwizard', 'Kubernetes', 'Docker', 'Python'],
    impact: [],
  },
  {
    id: 3,
    company: 'Deutsche Bank',
    accentColor: '#10B981',
    headerBg: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)',
    timeline: 'May 2023 – Jul 2023',
    position: 'Software Development Engineer Intern',
    description: [
      'Developed an application to track, control, and optimise cloud resource utilisation, managing lifecycle for potential cost savings; maintained Sonar coding standards and high test coverage.',
    ],
    tech: ['Java', 'Spring Boot', 'REST APIs', 'Agile'],
    impact: [],
  },
];

function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <h2 className="section-title">Work Experience</h2>
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <ul className="timeline">
              {EXPERIENCE.map((item, idx) => (
                <ExperienceItem data={item} key={item.id} index={idx} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
