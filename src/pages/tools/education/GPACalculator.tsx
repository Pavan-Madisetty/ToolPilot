import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Button, Input, Select, ResultBox } from '@/components/ui';
import { Plus, Trash2, RotateCcw } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

const SCALE_4_GRADES = [
  { label: 'A+ (4.0)', value: 'A+', points: 4.0 },
  { label: 'A (4.0)', value: 'A', points: 4.0 },
  { label: 'A- (3.7)', value: 'A-', points: 3.7 },
  { label: 'B+ (3.3)', value: 'B+', points: 3.3 },
  { label: 'B (3.0)', value: 'B', points: 3.0 },
  { label: 'B- (2.7)', value: 'B-', points: 2.7 },
  { label: 'C+ (2.3)', value: 'C+', points: 2.3 },
  { label: 'C (2.0)', value: 'C', points: 2.0 },
  { label: 'C- (1.7)', value: 'C-', points: 1.7 },
  { label: 'D+ (1.3)', value: 'D+', points: 1.3 },
  { label: 'D (1.0)', value: 'D', points: 1.0 },
  { label: 'F (0.0)', value: 'F', points: 0.0 },
];

const SCALE_10_GRADES = [
  { label: 'O (10.0)', value: 'O', points: 10.0 },
  { label: 'S (9.0)', value: 'S', points: 9.0 },
  { label: 'A (8.0)', value: 'A', points: 8.0 },
  { label: 'B (7.0)', value: 'B', points: 7.0 },
  { label: 'C (6.0)', value: 'C', points: 6.0 },
  { label: 'D (5.0)', value: 'D', points: 5.0 },
  { label: 'E (4.0)', value: 'E', points: 4.0 },
  { label: 'F (0.0)', value: 'F', points: 0.0 },
];

export default function GPACalculator() {
  const [scale, setScale] = useState<'4' | '10'>('4');
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Course 1', credits: 3, grade: 'A' },
    { id: '2', name: 'Course 2', credits: 4, grade: 'B+' },
    { id: '3', name: 'Course 3', credits: 3, grade: 'A-' },
  ]);

  const handleScaleChange = (newScale: '4' | '10') => {
    setScale(newScale);
    setCourses(prev =>
      prev.map(c => ({
        ...c,
        grade: newScale === '4' ? 'A' : 'O',
      }))
    );
  };

  const currentGradeOptions = useMemo(() => {
    const list = scale === '4' ? SCALE_4_GRADES : SCALE_10_GRADES;
    return list.map(g => ({ value: g.value, label: g.label }));
  }, [scale]);

  const addCourse = () => {
    const defaultGrade = scale === '4' ? 'A' : 'O';
    setCourses(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: `Course ${prev.length + 1}`,
        credits: 3,
        grade: defaultGrade,
      },
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length <= 1) {
      setCourses([{ id: '1', name: 'Course 1', credits: 3, grade: scale === '4' ? 'A' : 'O' }]);
      return;
    }
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(prev =>
      prev.map(c => {
        if (c.id === id) {
          return { ...c, [field]: value };
        }
        return c;
      })
    );
  };

  const resetAll = () => {
    setCourses([
      { id: '1', name: 'Course 1', credits: 3, grade: scale === '4' ? 'A' : 'O' },
    ]);
  };

  const results = useMemo(() => {
    const gradeList = scale === '4' ? SCALE_4_GRADES : SCALE_10_GRADES;
    let totalCredits = 0;
    let totalPoints = 0;

    courses.forEach(c => {
      const match = gradeList.find(g => g.value === c.grade);
      const points = match ? match.points : 0;
      const credits = Number(c.credits) || 0;
      totalCredits += credits;
      totalPoints += points * credits;
    });

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

    return {
      gpa,
      totalCredits,
      totalPoints,
    };
  }, [courses, scale]);

  return (
    <ToolPageWrapper toolId="gpa-calculator">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Semester Details
              </h2>
              <div className="flex gap-2">
                <Button
                  variant={scale === '4' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => handleScaleChange('4')}
                >
                  4.0 Scale
                </Button>
                <Button
                  variant={scale === '10' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => handleScaleChange('10')}
                >
                  10.0 Scale
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {courses.map((course, idx) => (
                <div key={course.id} className="grid grid-cols-12 gap-3 items-end border-b pb-4 last:border-b-0 last:pb-0" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div className="col-span-5">
                    <Input
                      label={idx === 0 ? "Course Name" : undefined}
                      placeholder="e.g. Mathematics"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      label={idx === 0 ? "Credits" : undefined}
                      type="number"
                      min="0.5"
                      step="0.5"
                      placeholder="Credits"
                      value={course.credits}
                      onChange={(e) => updateCourse(course.id, 'credits', Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-3">
                    <Select
                      label={idx === 0 ? "Grade" : undefined}
                      options={currentGradeOptions}
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    />
                  </div>
                  <div className="col-span-1 pb-1 flex justify-center">
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="p-2 text-[var(--danger)] hover:bg-[rgba(239,68,68,0.1)] rounded-lg transition-colors"
                      title="Remove course"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <Button onClick={addCourse} className="flex items-center gap-1.5" variant="secondary">
                <Plus size={16} />
                <span>Add Course</span>
              </Button>
              <Button onClick={resetAll} className="flex items-center gap-1.5" variant="secondary">
                <RotateCcw size={16} />
                <span>Reset</span>
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Calculation Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultBox
                label="GPA"
                value={results.gpa.toFixed(2)}
                highlight
                shouldFormat={false}
                suffix={`/ \${scale}.0`}
              />
              <ResultBox
                label="Total Credits"
                value={results.totalCredits}
                shouldFormat={true}
              />
            </div>
            <div className="p-4 rounded-xl space-y-3" style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)' }}>Total Grade Points</span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{results.totalPoints.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2" style={{ borderColor: 'var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Grading System</span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{scale === '4' ? '4.0 US/International Scale' : '10.0 Indian/University Scale'}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
