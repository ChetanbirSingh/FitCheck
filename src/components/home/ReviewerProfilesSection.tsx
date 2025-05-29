'use client';
import { ModesType } from '@/lib/constants';
import { motion } from 'framer-motion';
type PersonaDetails = {
  mode: ModesType;
  icon: string;
  title: string;
  subtitle: string;
  tone: string;
  focus: string;
  useWhen: string;
};

export const personas: PersonaDetails[] = [
  {
    mode: 'mentor',
    icon: '🧠',
    title: 'Mentor Mode',
    subtitle: 'Supportive & strategic for long-term growth',
    tone: 'Supportive, strategic, growth-focused',
    focus: 'First impressions, project relevance, storytelling, professionalism',
    useWhen: 'You want honest guidance to grow as a dev (not just praise)',
  },
  {
    mode: 'recruiter',
    icon: '📋',
    title: 'Recruiter Mode',
    subtitle: 'Evaluated for industry fit',
    tone: 'Honest, concise, hireability-focused',
    focus: 'First impressions, project quality, skill clarity, hireability',
    useWhen: 'You want to know if a recruiter would shortlist you',
  },
  {
    mode: 'designer',
    icon: '🎨',
    title: 'UI/UX Designer Mode',
    subtitle: 'Visual clarity, flow, and vibe check',
    tone: 'Professional, design-focused, constructive',
    focus: 'Visual identity, brand tone, UX flow, accessibility',
    useWhen: 'You want to polish the look, feel, and user experience',
  },
  {
    mode: 'senior',
    icon: '🧑‍💼',
    title: 'Senior Dev Mode',
    subtitle: 'Evaluated like a tech lead would do',
    tone: 'Sharp, analytical, engineering-focused',
    focus: 'Project depth, stack reasoning, real-world readiness',
    useWhen: 'You want serious dev critique from an engineering lens',
  },
  {
    mode: 'peer',
    icon: '🤝',
    title: 'Peer Mode',
    subtitle: 'Chill feedback from a fellow dev',
    tone: 'Friendly, casual, honest',
    focus: 'Vibe, clarity, relatability',
    useWhen: 'You want real talk without the formality',
  },
];

export default function ReviewerProfilesSection() {
  return (
    <section className='md:py-25 py-10 px-6'>
      <h2 className='mb-12 text-center'>Reviewer Profiles</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto'>
        {personas.map((p, idx) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className='border border-zinc-700 p-6 rounded-xl text-left space-y-4 bg-zinc-900/40 backdrop-blur-sm'
          >
            <div className='text-6xl mb-2 text-center' role='img' aria-label={`${p.title} icon`}>
              {p.icon}
            </div>
            <h3>{p.title}</h3>
            <p className='text-zinc-400 italic'>{p.subtitle}</p>

            <div className='space-y-2 pt-3 tracking-wide'>
              <p>
                <span className='font-semibold'>Tone:</span> {p.tone}
              </p>
              <p>
                <span className='font-semibold'>Focus:</span> {p.focus}
              </p>
              <p>
                <span className='font-semibold'>Use When:</span> {p.useWhen}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
