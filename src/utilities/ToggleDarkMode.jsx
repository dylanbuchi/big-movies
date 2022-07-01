import { useState, useMemo, createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const DarkModeContext = createContext({});

const ToggleDarkMode = ({ children }) => {
  const [colorMode, setColorMode] = useState('light');

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

  const valueObject = {
    mode: colorMode,
    setMode: setColorMode,
    toggleDarkMode,
  };

  const wrapValueObject = useMemo(() => valueObject, [valueObject]);

  return (
    <DarkModeContext.Provider value={wrapValueObject}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </DarkModeContext.Provider>
  );
};

export default ToggleDarkMode;
