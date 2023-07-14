import { useFonts } from 'expo-font';
import Navigator from './src/Navigation/Navigator';

export default function App() {
   
  const [fontsLoaded] = useFonts({
    'Sofia': require('./src/Assets/Fonts/SofiaSans/SofiaSansExtraCondensed-Regular.ttf'),
    'SofiaBold': require('./src/Assets/Fonts/SofiaSans/SofiaSansExtraCondensed-Bold.ttf')
  });
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Navigator />
  );
}
