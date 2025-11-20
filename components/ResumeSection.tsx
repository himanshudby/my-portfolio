import React, { ReactNode } from 'react';

interface ResumeSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ title, children, className = '' }) => {
  return (
    <section className={`mb-8 ${className}`}>
      <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-blue-100 pb-2 flex items-center">
        <span className="bg-blue-600 w-2 h-8 mr-3 rounded-sm inline-block print:hidden"></span>
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
};

export default ResumeSection;
