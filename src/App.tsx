import {MantineProvider} from '@mantine/core';
import ApplicationShell from "./Components/ApplicationShell";


export default function App() {
  return (
    <MantineProvider
      theme={{ colorScheme: 'light' }}
      withGlobalStyles
      withNormalizeCSS
    >
      <ApplicationShell />
    </MantineProvider>
  );
}