import { courseData } from '../data/course-data';
import ModuleCard from './ModuleCard';
import ErrorBoundary from './ErrorBoundary';

export default function ScheduleSection() {
  return (
    <ErrorBoundary>
      <section
        className="max-w-6xl mx-auto px-4 md:px-8 py-16"
        aria-labelledby="schedule-heading"
      >
        <h2
          id="schedule-heading"
          className="font-heading text-3xl md:text-4xl font-bold text-navy mb-10 animate-fade-in-up"
        >
          Programação Completa
        </h2>

        <div className="space-y-4">
          {courseData.modules.map((mod, i) => (
            <div
              key={mod.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${200 + i * 150}ms` }}
            >
              <ModuleCard
                module={mod}
                defaultOpen={mod.id === 1}
              />
            </div>
          ))}
        </div>
      </section>
    </ErrorBoundary>
  );
}
