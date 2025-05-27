'use client';

import { useState, useEffect } from 'react';
import PersonSelection, { ModesType } from '@/components/PersonSelection';
import TechstackSelection from '@/components/TechSelection';
import { Techstack } from '@/app/api/extract-files/route';
import RepoInputBar from '@/components/RepoInputBar';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function ReviewPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPersona, setSelectedPersona] = useState<ModesType | null>(null);
  const [selectedTechstack, setSelectedTechstack] = useState<Techstack | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const persona = searchParams.get('persona') as ModesType;
    const techstack = searchParams.get('techstack') as Techstack;

    if (persona && techstack) {
      setSelectedPersona(persona);
      setSelectedTechstack(techstack);
      setStep(3);
    }
  }, [searchParams]);

  const handleContinue = () => {
    if (step === 1 && selectedPersona) {
      setStep(2);
    } else if (step === 2 && selectedTechstack) {
      router.push(`/review?persona=${selectedPersona}&techstack=${selectedTechstack}`);
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  return (
    <div className='text-center'>
      <h1 className='text-4xl font-extrabold tracking-tight text-white'>Setup Review</h1>
      <div className='flex justify-between w-full max-w-md mx-auto'>
        {step > 1 && (
          <button
            onClick={handleBack}
            className='bg-zinc-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-zinc-600 transition-colors duration-200'
          >
            ← Back
          </button>
        )}

        {step < 3 && (
          <button
            onClick={handleContinue}
            disabled={(step === 1 && !selectedPersona) || (step === 2 && !selectedTechstack)}
            className={`px-6 py-2 rounded font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out transform hover:scale-105
        ${
          step === 2
            ? 'bg-[var(--accent-lime)] text-black hover:bg-lime-300'
            : 'hover:text-lime-300'
        }`}
          >
            {step === 1 ? 'Next →' : 'Start Review'}
          </button>
        )}
      </div>

      {step === 1 && <PersonSelection handleClick={(mode) => setSelectedPersona(mode)} />}
      {step === 2 && <TechstackSelection handleClick={(stack) => setSelectedTechstack(stack)} />}
      {step === 3 && selectedTechstack && selectedPersona && (
        <div className='mt-36'>
          <RepoInputBar framework={selectedTechstack} persona={selectedPersona} />
        </div>
      )}
    </div>
  );
}
