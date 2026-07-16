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
            {professor}
            {institution ? ` (${institution})` : ''}
          </p>
        )}
      </div>
    </div>
  );
}
