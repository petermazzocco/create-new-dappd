'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      {theme === 'dark' ? (
        <button
          className="btn btn-circle btn-ghost "
          onClick={() => setTheme('lofi')}
        >
          <Sun className="h-4 w-4 cursor-pointer" />
        </button>
      ) : (
        <button
          className="btn btn-circle btn-ghost "
          onClick={() => setTheme('dark')}
        >
          <Moon className="h-4 w-4 cursor-pointer" />
        </button>
      )}
    </div>
  );
}
