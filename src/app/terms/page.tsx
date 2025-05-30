const termsSection = [
  {
    title: 'Use at Your Own Risk',
    content:
      'FitCheck provides AI-powered feedback purely for educational and informational use. No professional advice is being offered. Use your own discretion when applying suggestions.',
  },
  {
    title: 'Privacy & Data Usage',
    content:
      'We do not store your personal information or your code. Submitted GitHub URLs are used temporarily, processed in-memory, and not logged or saved. You are responsible for ensuring you have the rights to analyze any repository you submit.',
  },
  {
    title: 'Code Ownership & Intellectual Property',
    content:
      'You retain full ownership of any code you submit. By using the service, you grant FitCheck a temporary license to analyze and provide feedback via AI. We do not store or claim ownership of any submitted content.',
  },
  {
    title: 'We Do Not Perform Web Scraping',
    content:
      'FitCheck does not scrape websites or GitHub data without consent. All analysis is initiated by the user submitting a GitHub repository URL. We only access **public repositories** and retrieve file contents through GitHub’s raw file URLs or APIs. The files are processed temporarily in-memory and never stored or reused. FitCheck is compliant with GitHub’s public content access policies.',
  },

  {
    title: 'How FitCheck Works',
    content: [
      'You submit a public GitHub repo URL.',
      'FitCheck fetches readable code files (like .js, .ts, .html, .css).',
      'The code is streamed to an AI model for analysis.',
      'AI returns feedback formatted as Markdown.',
      'Once the review is complete, the content is discarded. Nothing is stored.',
      'FitCheck is a stateless reviewer – built to protect your code and privacy.',
    ],
  },
  {
    title: 'Limitations of Liability',
    content:
      "FitCheck is provided 'as is' with no guarantees. We are not liable for any decisions, damages, or losses resulting from the use of this service.",
  },
  {
    title: 'Acceptable Use',
    content:
      'Do not misuse FitCheck for illegal, harmful, or misleading purposes. Do not attempt to analyze private repositories or impersonate others. Any misuse may result in restrictions or termination of access.',
  },
  {
    title: 'Changes to the Service or Terms',
    content:
      'These Terms may be updated from time to time. Your continued use of FitCheck after any changes means you accept the updated Terms.',
  },
];

export default function TermsPage() {
  return (
    <section className='max-w-4xl mx-auto py-10 px-6 text-zinc-300'>
      <h1>🧾 Terms and Conditions</h1>
      <p className='text-sm text-zinc-400 mb-8'>Last updated: May 30, 2025</p>
      {termsSection.map((section, index) => (
        <article key={index} className='relative mb-14'>
          <h2 className='mb-2'>{section.title}</h2>
          {Array.isArray(section.content) ? (
            <ul className='list-disc list-inside space-y-2 text-sm text-zinc-400'>
              {section.content.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          ) : (
            <p className='text-zinc-400 leading-relaxed'>{section.content}</p>
          )}
        </article>
      ))}
      <p className='mt-16 text-sm text-zinc-500'>
        By using FitCheck, you agree to these Terms and Conditions.
      </p>
    </section>
  );
}
