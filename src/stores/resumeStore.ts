// ─────────────────────────────────────────────────────────────
// Resume Builder — Zustand Store with localStorage Persistence
// ─────────────────────────────────────────────────────────────
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  DEFAULT_RESUME_DATA,
  DEFAULT_CUSTOMIZATION,
  SAMPLE_RESUME_DATA,
  type ResumeData,
  type ResumeCustomization,
  type PersonalInfo,
  type Education,
  type Experience,
  type Skill,
  type Project,
  type Certificate,
  type Achievement,
  type SectionKey,
  type VisibleSections,
} from '@/types/resume';

interface ResumeStore {
  // ── State ────────────────────────────────────
  resumeData: ResumeData;
  customization: ResumeCustomization;
  currentStep: number;
  hasUnsavedChanges: boolean;

  // ── Navigation ───────────────────────────────
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  // ── Personal Info ────────────────────────────
  updatePersonal: (data: Partial<PersonalInfo>) => void;

  // ── Education CRUD ───────────────────────────
  addEducation: (item: Education) => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (items: Education[]) => void;

  // ── Experience CRUD ──────────────────────────
  addExperience: (item: Experience) => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (items: Experience[]) => void;

  // ── Skills CRUD ──────────────────────────────
  addSkill: (item: Skill) => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;

  // ── Projects CRUD ────────────────────────────
  addProject: (item: Project) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;

  // ── Certificates CRUD ────────────────────────
  addCertificate: (item: Certificate) => void;
  updateCertificate: (id: string, data: Partial<Certificate>) => void;
  removeCertificate: (id: string) => void;

  // ── Achievements CRUD ────────────────────────
  addAchievement: (item: Achievement) => void;
  updateAchievement: (id: string, data: Partial<Achievement>) => void;
  removeAchievement: (id: string) => void;

  // ── Customization ────────────────────────────
  setTemplate: (id: string) => void;
  updateCustomization: (data: Partial<ResumeCustomization>) => void;
  setSectionOrder: (order: SectionKey[]) => void;
  toggleSection: (key: SectionKey) => void;
  updateVisibleSections: (sections: Partial<VisibleSections>) => void;

  // ── Bulk Operations ──────────────────────────
  loadSampleData: () => void;
  resetAll: () => void;
  importData: (data: ResumeData) => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      // ── Initial State ──────────────────────────
      resumeData: { ...DEFAULT_RESUME_DATA },
      customization: { ...DEFAULT_CUSTOMIZATION },
      currentStep: 0,
      hasUnsavedChanges: false,

      // ── Navigation ─────────────────────────────
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 8) })),
      prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 0) })),

      // ── Personal Info ──────────────────────────
      updatePersonal: (data) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            personal: { ...s.resumeData.personal, ...data },
          },
          hasUnsavedChanges: true,
        })),

      // ── Education ──────────────────────────────
      addEducation: (item) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            education: [...s.resumeData.education, item],
          },
          hasUnsavedChanges: true,
        })),
      updateEducation: (id, data) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            education: s.resumeData.education.map((e) =>
              e.id === id ? { ...e, ...data } : e
            ),
          },
          hasUnsavedChanges: true,
        })),
      removeEducation: (id) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            education: s.resumeData.education.filter((e) => e.id !== id),
          },
          hasUnsavedChanges: true,
        })),
      reorderEducation: (items) =>
        set((s) => ({
          resumeData: { ...s.resumeData, education: items },
          hasUnsavedChanges: true,
        })),

      // ── Experience ─────────────────────────────
      addExperience: (item) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            experience: [...s.resumeData.experience, item],
          },
          hasUnsavedChanges: true,
        })),
      updateExperience: (id, data) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            experience: s.resumeData.experience.map((e) =>
              e.id === id ? { ...e, ...data } : e
            ),
          },
          hasUnsavedChanges: true,
        })),
      removeExperience: (id) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            experience: s.resumeData.experience.filter((e) => e.id !== id),
          },
          hasUnsavedChanges: true,
        })),
      reorderExperience: (items) =>
        set((s) => ({
          resumeData: { ...s.resumeData, experience: items },
          hasUnsavedChanges: true,
        })),

      // ── Skills ─────────────────────────────────
      addSkill: (item) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            skills: [...s.resumeData.skills, item],
          },
          hasUnsavedChanges: true,
        })),
      updateSkill: (id, data) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            skills: s.resumeData.skills.map((e) =>
              e.id === id ? { ...e, ...data } : e
            ),
          },
          hasUnsavedChanges: true,
        })),
      removeSkill: (id) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            skills: s.resumeData.skills.filter((e) => e.id !== id),
          },
          hasUnsavedChanges: true,
        })),

      // ── Projects ───────────────────────────────
      addProject: (item) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            projects: [...s.resumeData.projects, item],
          },
          hasUnsavedChanges: true,
        })),
      updateProject: (id, data) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            projects: s.resumeData.projects.map((e) =>
              e.id === id ? { ...e, ...data } : e
            ),
          },
          hasUnsavedChanges: true,
        })),
      removeProject: (id) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            projects: s.resumeData.projects.filter((e) => e.id !== id),
          },
          hasUnsavedChanges: true,
        })),

      // ── Certificates ───────────────────────────
      addCertificate: (item) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            certificates: [...s.resumeData.certificates, item],
          },
          hasUnsavedChanges: true,
        })),
      updateCertificate: (id, data) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            certificates: s.resumeData.certificates.map((e) =>
              e.id === id ? { ...e, ...data } : e
            ),
          },
          hasUnsavedChanges: true,
        })),
      removeCertificate: (id) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            certificates: s.resumeData.certificates.filter((e) => e.id !== id),
          },
          hasUnsavedChanges: true,
        })),

      // ── Achievements ───────────────────────────
      addAchievement: (item) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            achievements: [...s.resumeData.achievements, item],
          },
          hasUnsavedChanges: true,
        })),
      updateAchievement: (id, data) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            achievements: s.resumeData.achievements.map((e) =>
              e.id === id ? { ...e, ...data } : e
            ),
          },
          hasUnsavedChanges: true,
        })),
      removeAchievement: (id) =>
        set((s) => ({
          resumeData: {
            ...s.resumeData,
            achievements: s.resumeData.achievements.filter((e) => e.id !== id),
          },
          hasUnsavedChanges: true,
        })),

      // ── Customization ──────────────────────────
      setTemplate: (id) =>
        set((s) => ({
          customization: { ...s.customization, templateId: id },
          hasUnsavedChanges: true,
        })),
      updateCustomization: (data) =>
        set((s) => ({
          customization: { ...s.customization, ...data },
          hasUnsavedChanges: true,
        })),
      setSectionOrder: (order) =>
        set((s) => ({
          customization: { ...s.customization, sectionOrder: order },
          hasUnsavedChanges: true,
        })),
      toggleSection: (key) =>
        set((s) => ({
          customization: {
            ...s.customization,
            visibleSections: {
              ...s.customization.visibleSections,
              [key]: !s.customization.visibleSections[key],
            },
          },
          hasUnsavedChanges: true,
        })),
      updateVisibleSections: (sections) =>
        set((s) => ({
          customization: {
            ...s.customization,
            visibleSections: {
              ...s.customization.visibleSections,
              ...sections,
            },
          },
          hasUnsavedChanges: true,
        })),

      // ── Bulk Operations ────────────────────────
      loadSampleData: () =>
        set({
          resumeData: JSON.parse(JSON.stringify(SAMPLE_RESUME_DATA)),
          hasUnsavedChanges: true,
        }),
      resetAll: () =>
        set({
          resumeData: JSON.parse(JSON.stringify(DEFAULT_RESUME_DATA)),
          customization: JSON.parse(JSON.stringify(DEFAULT_CUSTOMIZATION)),
          currentStep: 0,
          hasUnsavedChanges: false,
        }),
      importData: (data) =>
        set({
          resumeData: data,
          hasUnsavedChanges: true,
        }),
    }),
    {
      name: 'toolpilot-resume-builder',
      version: 1,
    }
  )
);
