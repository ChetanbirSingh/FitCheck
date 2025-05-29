'use client';
import { motion } from 'framer-motion';
import PageHeader from '../pageHeader';
import Paragraph from './Paragraph';
export default function AboutSection() {
  return (
    <section className='max-w-3xl mx-auto md:pt-2 pt-10'>
      <PageHeader title='About Fitcheck' />

      <Paragraph
        text={`FitCheck was built to help developers get honest, useful feedback on their portfolios — without the guesswork.`}
      />

      <Paragraph
        text={`Whether you're a beginner just getting started, a mid-level dev preparing for interviews, or
        someone curious how others perceive your work — FitCheck gives you constructive, tailored
        insights using AI personas like Mentors, Recruiters, Senior Devs, and more.`}
      />

      <motion.div
        className='space-y-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h2 className='md:pt-25 pt-10'>Why it matters:</h2>
        <ul className='list-disc pl-6 text-zinc-400 space-y-2'>
          <li>No more vague advice from random strangers on Discord</li>
          <li>No forms to fill out. Just paste your GitHub repo.</li>
          <li>Get feedback that;s actually helpful — not just “looks good”</li>
        </ul>
      </motion.div>
      <div className='md:pt-25 pt-10 pb-25'>
        <Paragraph text={`Not trying to pitch a company here. Just showing what I can do.`} />
      </div>
    </section>
  );
}
