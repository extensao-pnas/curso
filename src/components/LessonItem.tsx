import type { Lesson } from '../data/course-data';

interface LessonItemProps {
  lesson: Lesson;
}

export default function LessonItem({ lesson }: LessonItemProps) {
  const professor = lesson.professor.trim();
  const institution = lesson.institution.trim();

  return (
    <div className="flex items-start gap-4 py-3 border-b border-black/5 last:border-b-0">
      <span className="font-bold text-gray-dark text-sm shrink-0 min-w-[5.5rem]">
        {lesson.date}
      </span>

      <div className="min-w-0">
        <p className="font-semibold text-navy text-sm leading-snug">
          {lesson.topic}
        </p>
        {professor && (
          <p className="text-xs text-gray-light mt-0.5">
            <span>{professor}</span>
            {lesson.lattes && (
              <a
                href={lesson.lattes}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center ml-1 align-middle text-navy hover:text-gold transition-colors"
                aria-label={`Currículo Lattes de ${professor}`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </a>
            )}
            {lesson.cienciaVitae && (
              <a
                href={lesson.cienciaVitae}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center ml-1 align-middle text-navy hover:text-gold transition-colors"
                aria-label={`Ciência Vitae de ${professor}`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </a>
            )}
            {lesson.linkedin && (
              <a
                href={lesson.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center ml-1 align-middle text-navy hover:text-gold transition-colors"
                aria-label={`LinkedIn de ${professor}`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
            {institution && <span className="ml-1">({institution})</span>}
          </p>
        )}
      </div>
    </div>
  );
}
