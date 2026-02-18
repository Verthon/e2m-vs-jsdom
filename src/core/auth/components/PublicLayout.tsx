import { type ReactNode } from 'react';

type PublicLayoutProps = {
  children: ReactNode;
};

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-gray-200 py-4" />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-gray-200 py-4" />
    </div>
  );
};
