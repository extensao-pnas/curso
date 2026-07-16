import { useState } from 'react';
import type { Module } from '../data/course-data';
import LessonItem from './LessonItem';

interface ModuleCardProps {
  module: Module;
  defaultOpen: boolean;
}

const BORDER_CLASS: Record<Module['color'], string> = {
  navy: 'border-l-navy',
  gold: 'border-l-gold',
  burgundy: 'border-l-burgundy',
};

const DOT_CLASS: Record<Module['color'], string> = {
  navy: 'bg-navy',
  gold: 'bg-gold',
  burgundy: 'bg-burgundy',
};

export default function ModuleCard({ module, defaultOpen }: ModuleCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const borderClass = BORDER_CLASS[module.color];
  const dotClass = DOT_CLASS[module.color];
  const contentId = `module-content-${module.id}`;

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border-l-[3px] overflow-hidden ${borderClass}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-2 px-5 py-4 text-left hover:bg-black/[0.02] transition-colors duration-200 cursor-pointer"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${dotClass}`}
            aria-hidden="true"
          />
          <h3 className="font-heading font-bold text-sm md:text-base text-navy leading-snug">
            {module.title}
          </h3>
        </div>

        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 transition-transform duration-300 text-gray-light ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        id={contentId}
        role="region"
        className={`transition duration-300 ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="px-5 pb-5">
          {module.lessons.map((lesson) => (
            <LessonItem key={`${lesson.date}-${lesson.topic.slice(0, 20)}`} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
}
