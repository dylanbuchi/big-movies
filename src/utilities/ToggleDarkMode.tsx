import { useState, useMemo, createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

interface DarkModeContextProps {
  toggleDarkMode: () => void;
}
export const DarkModeContext = createContext({} as DarkModeContextProps);

const ToggleDarkMode = ({ children }: React.PropsWithChildren) => {
  const [colorMode, setColorMode] = useState<PaletteMode>('light');

  const toggleDarkMode = () => {
    setColorMode((prevColorMode) =>
      prevColorMode === 'light' ? 'dark' : 'light',
    );
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode,
        },
      }),
    [colorMode],
  );

  const value = {
    mode: colorMode,
    setMode: setColorMode,
    toggleDarkMode,
  };

  return (
    <DarkModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </DarkModeContext.Provider>
  );
};

export default ToggleDarkMode;
