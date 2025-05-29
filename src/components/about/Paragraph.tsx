import { motion } from 'framer-motion';
export default function Paragraph({ text }: { text: string }) {
  return (
    <motion.p
      className='text-lg text-zinc-300 leading-relaxed'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      {text}
    </motion.p>
  );
}
