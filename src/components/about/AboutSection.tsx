'use client';
import { motion } from 'framer-motion';
import PageHeader from '../pageHeader';

export default function AboutSection() {
  return (
    <section className='max-w-3xl mx-auto md:pt-2 pt-10'>
      <PageHeader title='About Fitcheck' />
      <motion.p
        className='text-lg text-zinc-300 leading-relaxed'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        FitCheck was built to help developers get honest, useful feedback on their portfolios —
        without the guesswork.
      </motion.p>

      <motion.p
        className='text-lg text-zinc-300 leading-relaxed'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Whether you're a beginner just getting started, a mid-level dev preparing for interviews, or
        someone curious how others perceive your work — FitCheck gives you constructive, tailored
        insights using AI personas like Mentors, Recruiters, Senior Devs, and more.
      </motion.p>

      <motion.div
        className='space-y-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h2 className='md:pt-25 pt-10'>Why it matters:</h2>
        <ul className='list-disc pl-6 text-zinc-400'>
          <li>No more vague advice from random strangers on Discord</li>
          <li>No forms to fill out. Just paste your GitHub repo.</li>
          <li>Get feedback that;s actually helpful — not just “looks good”</li>
        </ul>
      </motion.div>

      <motion.p
        className='text-lg text-zinc-300 leading-relaxed md:pt-25 pt-10 pb-25'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        Not trying to pitch a company here. Just showing what I can do.
      </motion.p>
    </section>
  );
}
