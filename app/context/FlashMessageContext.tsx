'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type FlashMessage = {
  type: 'success' | 'error';
  message: string;
};

type FlashMessageContextType = {
  flashMessage: FlashMessage | null;
  setFlashMessage: (message: FlashMessage) => void;
  clearFlashMessage: () => void;
};

const FlashMessageContext = createContext<FlashMessageContextType | undefined>(undefined);

export const FlashMessageProvider = ({ children }: { children: ReactNode }) => {
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);

  const clearFlashMessage = () => setFlashMessage(null);

  return (
    <FlashMessageContext.Provider value={{ flashMessage, setFlashMessage, clearFlashMessage }}>
      {children}
    </FlashMessageContext.Provider>
  );
};

export const useFlashMessage = () => {
  const context = useContext(FlashMessageContext);
  if (context === undefined) {
    throw new Error('useFlashMessage must be used within a FlashMessageProvider');
  }
  return context;
};
