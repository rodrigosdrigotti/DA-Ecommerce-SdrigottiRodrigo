import { useFonts } from 'expo-font';
import Navigator from './src/Navigation/Navigator';
import { Provider } from 'react-redux';
import store from './src/Store/store';
import { dropTableSessions, init } from './src/SQLite';
import { useEffect } from 'react';

export default function App() {

  useEffect(()=> {
    init()
      .then((result)=> {
        //console.log('Db initialized/dropped')
        //console.log(result);
      })
      .catch(err => {
        //console.log("Initialization DB failed:");
        //console.log(err.message);
    })
  }, [])

  const [fontsLoaded] = useFonts({
    'Sofia': require('./src/Assets/Fonts/SofiaSans/SofiaSansExtraCondensed-Regular.ttf'),
    'SofiaBold': require('./src/Assets/Fonts/SofiaSans/SofiaSansExtraCondensed-Bold.ttf'),
    'SofiaExtraBold': require('./src/Assets/Fonts/SofiaSans/SofiaSansExtraCondensed-ExtraBold.ttf'),
  });
  
  if (!fontsLoaded) {
    return null;
  }


  return (
      <Provider store={store}>
        <Navigator />
      </Provider>
  );
}
