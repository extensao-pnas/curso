
## 2026-07-15: course-data.ts created

### Data extracted from docx files
- **ARTE DIVULGAÇÃO**: Course metadata (title, period, schedule, vacancies, registration dates, criteria)
- **CRONOGRAMA**: All 18 lessons across 3 modules with dates, topics, professors, institutions

### Key decisions
- Period end: "10/12/2026" from ARTE DIVULGAÇÃO
- Registration link: `#inscricao` placeholder
- Heloísa Mesquita institution: "XXXX" per docx
- Aula Introdutória: empty professor/institution
- Partner names: "Logo 1"–"Logo 4" (org names not extractable from images)
- Date format: DD/MM/YYYY

### Verification
- `npx tsc --noEmit`: ✅ clean
- `npm run build`: ✅ successful
- Lessons: 7 + 4 + 7 = 18
