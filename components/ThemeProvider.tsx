'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeName, theme as themeConfig } from '@/content.config';

const ThemeContext = createContext<{
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
}>({ theme: 'amber', setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(themeConfig.default as ThemeName);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme') as ThemeName | null;
    if (saved && themeConfig.options.includes(saved)) setThemeState(saved);
  }, []);

  const setTheme = (t: ThemeName) => {
    setThemeState(t);
    localStorage.setItem('portfolio-theme', t);
    document.documentElement.setAttribute('data-theme', t);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
