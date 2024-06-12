// MyContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface MyContextProps {
  value: string;
  setValue: (value: string) => void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

const MyProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<string>('Hello, world!');

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
