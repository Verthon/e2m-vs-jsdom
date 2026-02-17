import { createContext, useContext, useRef } from 'react';
import type { ReactNode } from 'react';
import type { StepMeta } from './types';

type RegistrationContextValue = {
  register: (key: string, meta: Partial<StepMeta>) => void;
  unregister: (key: string) => void;
  update: (key: string, partial: Partial<StepMeta>) => void;
  getOrderedKeys: () => string[];
  getMeta: (key: string) => StepMeta | undefined;
  getAllMeta: () => Map<string, StepMeta>;
};

const RegistrationContext = createContext<RegistrationContextValue | null>(null);

const DEFAULT_META: Omit<StepMeta, 'key'> = {
  label: null,
  description: null,
  optional: false,
  onBeforeLeave: null,
};

interface RegistrationProviderProps {
  children: ReactNode;
}

export const RegistrationProvider = ({ children }: RegistrationProviderProps) => {
  const registryRef = useRef<Map<string, StepMeta>>(new Map());

  const register = (key: string, meta: Partial<StepMeta>) => {
    registryRef.current.set(key, { ...DEFAULT_META, ...meta, key });
  };

  const unregister = (key: string) => {
    registryRef.current.delete(key);
  };

  const update = (key: string, partial: Partial<StepMeta>) => {
    const existing = registryRef.current.get(key);
    if (existing) {
      registryRef.current.set(key, { ...existing, ...partial, key });
    }
  };

  const getOrderedKeys = () => Array.from(registryRef.current.keys());

  const getMeta = (key: string) => registryRef.current.get(key);

  const getAllMeta = () => new Map(registryRef.current);

  return (
    <RegistrationContext.Provider
      value={{ register, unregister, update, getOrderedKeys, getMeta, getAllMeta }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = (): RegistrationContextValue => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};

export { RegistrationContext };
