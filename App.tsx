import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import {ThemeProvider} from "./components/ThemeProvider";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}
