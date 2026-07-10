import { ResumeProvider } from './resume/ResumeContext';
import StepWizard from './resume/StepWizard';

export default function ResumeBuilder() {
  return (
    <ResumeProvider>
      <StepWizard />
    </ResumeProvider>
  );
}
