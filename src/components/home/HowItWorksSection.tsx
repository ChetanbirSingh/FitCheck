'use client';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: '🎭',
    title: 'Choose your AI perspective',
    desc: 'Select Mentor, UI/UX, Recruiter and more.',
  },
  {
    icon: '📩',
    title: 'Submit your portfolio link',
    desc: "Share your portfolio's GitHub link and choose the files you want to submit.",
  },
  {
    icon: '📝',
    title: 'Receive your feedback',
    desc: 'Gives detailed reviewer with strength and tips.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className='md:py-25 py-10 px-6'>
      <h2 className='mb-12 text-center'>How it works</h2>
      <div className='grid grid-cols-1 [@media(min-width:1000px)]:grid-cols-3 gap-10 max-w-5xl mx-auto'>
        {steps.map(({ icon, title, desc }, idx) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            <div className='text-5xl text-center pb-3' aria-hidden={true}>
              {icon}
            </div>
            <div className='text-left'>
              <h3 className='tracking-wide leading-14 pb-2'>{title}</h3>
              <p className='text-zinc-400'>{desc}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
