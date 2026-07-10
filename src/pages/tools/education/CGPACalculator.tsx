import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Button, Input, Select, ResultBox } from '@/components/ui';
import { Plus, Trash2, RotateCcw, Calculator } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  credits: number;
  gradePoints: number;
}

interface Semester {
  id: string;
  name: string;
  courses: Course[];
}

const SCALE_10_GRADES = [
  { label: 'O (10.0)', value: 10.0 },
  { label: 'A+ (9.0)', value: 9.0 },
  { label: 'A (8.0)', value: 8.0 },
  { label: 'B+ (7.0)', value: 7.0 },
  { label: 'B (6.0)', value: 6.0 },
  { label: 'C (5.0)', value: 5.0 },
  { label: 'D (4.0)', value: 4.0 },
  { label: 'F (0.0)', value: 0.0 },
];

const SCALE_4_GRADES = [
  { label: 'A/A+ (4.0)', value: 4.0 },
  { label: 'A- (3.7)', value: 3.7 },
  { label: 'B+ (3.3)', value: 3.3 },
  { label: 'B (3.0)', value: 3.0 },
  { label: 'B- (2.7)', value: 2.7 },
  { label: 'C+ (2.3)', value: 2.3 },
  { label: 'C (2.0)', value: 2.0 },
  { label: 'C- (1.7)', value: 1.7 },
  { label: 'D+ (1.3)', value: 1.3 },
  { label: 'D (1.0)', value: 1.0 },
  { label: 'F (0.0)', value: 0.0 },
];

export default function CGPACalculator() {
  const [scale, setScale] = useState<'10' | '4'>('10');
  const [multiplier, setMultiplier] = useState<number>(9.5); // Default CBSE/Indian multiplier
  
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: 'sem-1',
      name: 'Semester 1',
      courses: [
        { id: 'c1', name: 'Course 1', credits: 4, gradePoints: 9.0 },
        { id: 'c2', name: 'Course 2', credits: 3, gradePoints: 8.0 },
        { id: 'c3', name: 'Course 3', credits: 3, gradePoints: 10.0 },
      ],
    },
  ]);

  const currentGradeOptions = useMemo(() => {
    const list = scale === '10' ? SCALE_10_GRADES : SCALE_4_GRADES;
    return list.map((g) => ({
      value: g.value,
      label: g.label,
    }));
  }, [scale]);

  // Handle changing grading scale
  const handleScaleChange = (newScale: '10' | '4') => {
    setScale(newScale);
    setMultiplier(newScale === '10' ? 9.5 : 25.0);
    // Reset grade points to default maximum of new scale
    setSemesters((prev) =>
      prev.map((sem) => ({
        ...sem,
        courses: sem.courses.map((c) => ({
          ...c,
          gradePoints: newScale === '10' ? 9.0 : 4.0,
        })),
      }))
    );
  };

  const addSemester = () => {
    const defaultGrade = scale === '10' ? 9.0 : 4.0;
    const nextSemNum = semesters.length + 1;
    const newSem: Semester = {
      id: `sem-${Math.random().toString(36).substr(2, 9)}`,
      name: `Semester ${nextSemNum}`,
      courses: [{ id: `c-${Date.now()}`, name: 'Course 1', credits: 3, gradePoints: defaultGrade }],
    };
    setSemesters([...semesters, newSem]);
  };

  const removeSemester = (semId: string) => {
    if (semesters.length <= 1) {
      resetAll();
      return;
    }
    setSemesters((prev) => prev.filter((s) => s.id !== semId));
  };

  const addCourse = (semId: string) => {
    const defaultGrade = scale === '10' ? 9.0 : 4.0;
    setSemesters((prev) =>
      prev.map((sem) => {
        if (sem.id === semId) {
          return {
            ...sem,
            courses: [
              ...sem.courses,
              {
                id: `c-${Math.random().toString(36).substr(2, 9)}`,
                name: `Course ${sem.courses.length + 1}`,
                credits: 3,
                gradePoints: defaultGrade,
              },
            ],
          };
        }
        return sem;
      })
    );
  };

  const removeCourse = (semId: string, courseId: string) => {
    setSemesters((prev) =>
      prev.map((sem) => {
        if (sem.id === semId) {
          // Keep at least one course row
          const updatedCourses = sem.courses.filter((c) => c.id !== courseId);
          return {
            ...sem,
            courses: updatedCourses.length > 0 ? updatedCourses : [{ id: `c-${Date.now()}`, name: 'Course 1', credits: 3, gradePoints: scale === '10' ? 9.0 : 4.0 }],
          };
        }
        return sem;
      })
    );
  };

  const updateCourse = (semId: string, courseId: string, field: keyof Course, value: string | number) => {
    setSemesters((prev) =>
      prev.map((sem) => {
        if (sem.id === semId) {
          return {
            ...sem,
            courses: sem.courses.map((c) => {
              if (c.id === courseId) {
                return { ...c, [field]: value };
              }
              return c;
            }),
          };
        }
        return sem;
      })
    );
  };

  const resetAll = () => {
    const defaultGrade = scale === '10' ? 9.0 : 4.0;
    setSemesters([
      {
        id: 'sem-1',
        name: 'Semester 1',
        courses: [
          { id: 'c1', name: 'Course 1', credits: 3, gradePoints: defaultGrade },
        ],
      },
    ]);
  };

  // Calculations per semester and overall
  const calculationResults = useMemo(() => {
    const semestersResults = semesters.map((sem) => {
      let semCredits = 0;
      let semPoints = 0;

      sem.courses.forEach((c) => {
        const credits = Number(c.credits) || 0;
        const gp = Number(c.gradePoints) || 0;
        semCredits += credits;
        semPoints += gp * credits;
      });

      const sgpa = semCredits > 0 ? semPoints / semCredits : 0;

      return {
        semId: sem.id,
        name: sem.name,
        sgpa,
        credits: semCredits,
        points: semPoints,
      };
    });

    const totalCgpaCredits = semestersResults.reduce((sum, s) => sum + s.credits, 0);
    const totalCgpaPoints = semestersResults.reduce((sum, s) => sum + s.points, 0);

    const cgpa = totalCgpaCredits > 0 ? totalCgpaPoints / totalCgpaCredits : 0;
    const percentage = cgpa * multiplier;

    return {
      cgpa,
      percentage,
      totalCredits: totalCgpaCredits,
      semesters: semestersResults,
    };
  }, [semesters, multiplier]);

  return (
    <ToolPageWrapper toolId="cgpa-calculator">
      <div className="tool-layout lg:grid-cols-12 gap-6">
        
        {/* Dynamic Semesters Input - 7 Columns */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  Grading Scale & Multiplier
                </h2>
                <p className="text-xs text-[var(--text-tertiary)]">
                  Select grading system and custom multiplier for percentage calculation
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={scale === '10' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => handleScaleChange('10')}
                >
                  10.0 Scale (India)
                </Button>
                <Button
                  variant={scale === '4' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => handleScaleChange('4')}
                >
                  4.0 Scale (US)
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Input
                label="Percentage Multiplier"
                type="number"
                step="0.1"
                min="1"
                max="100"
                value={multiplier}
                onChange={(e) => setMultiplier(Number(e.target.value) || 0)}
                helperText="Percentage = CGPA × Multiplier (CBSE/Indian standard is 9.5)"
              />
              <div className="flex flex-col justify-end">
                <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase pb-1">Preset Multipliers</span>
                <div className="flex gap-2">
                  <Button variant="secondary" size="xs" onClick={() => setMultiplier(9.5)}>9.5</Button>
                  <Button variant="secondary" size="xs" onClick={() => setMultiplier(10.0)}>10.0</Button>
                  <Button variant="secondary" size="xs" onClick={() => setMultiplier(scale === '10' ? 9.5 : 25)}>
                    {scale === '10' ? '9.5 (10 Scale)' : '25.0 (4 Scale)'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* List of Semesters */}
          <div className="space-y-6">
            {semesters.map((sem) => {
              const semResult = calculationResults.semesters.find((s) => s.semId === sem.id);
              
              return (
                <Card key={sem.id} className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
                    <div className="space-y-0.5">
                      <span className="font-extrabold text-lg" style={{ color: 'var(--text-primary)' }}>
                        {sem.name}
                      </span>
                      {semResult && (
                        <div className="text-[11px] text-[var(--text-tertiary)] flex gap-3">
                          <span>SGPA: <strong className="text-[var(--primary)]">{semResult.sgpa.toFixed(2)}</strong></span>
                          <span>Total Credits: <strong>{semResult.credits}</strong></span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeSemester(sem.id)}
                      className="p-1.5 text-[var(--danger)] hover:bg-[rgba(239,68,68,0.1)] rounded-lg transition-colors cursor-pointer"
                      title="Remove Semester"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Course rows */}
                  <div className="space-y-3">
                    {sem.courses.map((course, cIdx) => (
                      <div key={course.id} className="grid grid-cols-12 gap-3 items-end">
                        <div className="col-span-5">
                          <Input
                            label={cIdx === 0 ? 'Course Title / Code' : undefined}
                            placeholder="e.g. Mathematics"
                            value={course.name}
                            onChange={(e) => updateCourse(sem.id, course.id, 'name', e.target.value)}
                          />
                        </div>
                        <div className="col-span-3">
                          <Input
                            label={cIdx === 0 ? 'Credit Hours' : undefined}
                            type="number"
                            min="0.5"
                            step="0.5"
                            placeholder="Credits"
                            value={course.credits}
                            onChange={(e) => updateCourse(sem.id, course.id, 'credits', Number(e.target.value) || 0)}
                          />
                        </div>
                        <div className="col-span-3">
                          <Select
                            label={cIdx === 0 ? 'Grade Value' : undefined}
                            options={currentGradeOptions}
                            value={course.gradePoints}
                            onChange={(e) => updateCourse(sem.id, course.id, 'gradePoints', Number(e.target.value))}
                          />
                        </div>
                        <div className="col-span-1 pb-1.5 flex justify-center">
                          <button
                            onClick={() => removeCourse(sem.id, course.id)}
                            className="p-1.5 text-[var(--danger)] hover:bg-[rgba(239,68,68,0.1)] rounded-lg transition-colors cursor-pointer"
                            title="Remove Course"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => addCourse(sem.id)}
                      className="flex items-center gap-1.5"
                    >
                      <Plus size={14} />
                      <span>Add Course</span>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="flex justify-between items-center pt-2">
            <Button onClick={addSemester} className="flex items-center gap-1.5" variant="primary">
              <Plus size={16} />
              <span>Add Semester</span>
            </Button>
            <Button onClick={resetAll} className="flex items-center gap-1.5" variant="secondary">
              <RotateCcw size={16} />
              <span>Reset Calculator</span>
            </Button>
          </div>
        </div>

        {/* Output Dashboard - 5 Columns */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 border-b pb-3" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}>
              <Calculator className="text-[var(--primary)]" size={20} />
              <span>Cumulative CGPA</span>
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <ResultBox
                label="Cumulative CGPA"
                value={calculationResults.cgpa.toFixed(2)}
                highlight
                shouldFormat={false}
                suffix={`/ ${scale}.0`}
              />
              
              <ResultBox
                label="Equivalent Percentage"
                value={calculationResults.percentage.toFixed(1)}
                shouldFormat={true}
                suffix="%"
              />
            </div>

            <div className="p-4 rounded-xl space-y-3" style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}>
              <div className="flex justify-between text-xs">
                <span style={{ color: 'var(--text-secondary)' }}>Total Credit Hours</span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {calculationResults.totalCredits}
                </span>
              </div>
              <div className="flex justify-between text-xs border-t pt-2" style={{ borderColor: 'var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Grading system scale</span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {scale === '10' ? '10-Point scale' : '4-Point scale'}
                </span>
              </div>
              <div className="flex justify-between text-xs border-t pt-2" style={{ borderColor: 'var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Percentage Formula</span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  CGPA × {multiplier}
                </span>
              </div>
            </div>
          </Card>

          {/* Semester Summary Table */}
          <Card className="space-y-4">
            <h3 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Calculator className="text-[var(--primary)]" size={18} />
              <span>Semester Performance</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-tertiary)' }}>
                    <th className="pb-2 font-bold uppercase">Semester</th>
                    <th className="pb-2 font-bold uppercase text-center">Total Credits</th>
                    <th className="pb-2 font-bold uppercase text-right">SGPA</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                  {calculationResults.semesters.map((sem) => (
                    <tr key={sem.semId} style={{ color: 'var(--text-secondary)' }}>
                      <td className="py-2.5 font-semibold" style={{ color: 'var(--text-primary)' }}>{sem.name}</td>
                      <td className="py-2.5 text-center">{sem.credits}</td>
                      <td className="py-2.5 text-right font-bold" style={{ color: 'var(--primary)' }}>
                        {sem.sgpa.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

      </div>
    </ToolPageWrapper>
  );
}
