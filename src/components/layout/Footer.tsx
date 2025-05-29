'use client';
import Link from 'next/link';
export const footerSections = [
  {
    title: 'FitCheck',
    description: 'AI-powered feedback for developers. Choose your reviewer, get better.',
  },
  {
    title: '',
    links: [
      { label: 'Get a Review', href: '/review' },
      { label: 'About Project', href: '/about' },
      {
        label: 'GitHub Repo',
        href: 'https://github.com/ChetanbirSingh/FitCheck',
        external: true,
      },
    ],
  },
  {
    title: 'Built With',
    stack: ['Next.js', 'Tailwind CSS', 'OpenAI API'],
  },
];

export default function Footer() {
  return (
    <footer className='text-white bg-black px-6 md:px-10 py-16'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10'>

        <div className='space-y-3'>
          <h2 className='text-2xl font-bold'>{footerSections[0].title}</h2>
          <p className='text-sm max-w-xs text-zinc-400'>{footerSections[0].description}</p>
        </div>

        <div className='flex md:gap-40 gap-10 text-sm'>
          {footerSections.slice(1).map((section, idx) => (
            <div key={idx} className='flex flex-col gap-3'>
              {section.title && <span className='font-semibold'>{section.title}</span>}

              {section.links && (
                <div className='flex flex-col gap-2'>
                  {section.links.map((link, i) =>
                    link.external ? (
                      <a
                        key={i}
                        href={link.href}
                        target='_blank'
                        rel='noreferrer'
                        className='hover:text-lime-400 transition-colors'
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={i}
                        href={link.href}
                        className='hover:text-lime-400 transition-colors'
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </div>
              )}

              {section.stack && (
                <ul className='list-none text-zinc-400'>
                  {section.stack.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='mt-10 border-t border-zinc-800 pt-6 text-xs text-zinc-600 text-center'>
        &copy; 2025 FitCheck. Crafted with care by{' '}
        <a
          href='https://github.com/ChetanbirSingh'
          target='_blank'
          className='hover:underline hover:text-accent-lime'
        >
          Chetanbir Singh
        </a>
        .
      </div>
    </footer>
  );
}
