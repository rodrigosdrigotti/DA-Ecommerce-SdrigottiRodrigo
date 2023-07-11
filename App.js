import { StyleSheet, Text, View } from 'react-native';
import { colors } from './src/Global/Colors';
import Header from './src/Components/Header';
import Home from './src/Screens/Home';
import ItemListCategory from './src/Screens/ItemListCategory';
import { useFonts } from 'expo-font';
import { useState } from 'react';

export default function App() {

  const [categorySelected, setCategorySelected] = useState("");

  const [fontsLoaded] = useFonts({
    'Sofia': require('./src/Assets/fonts/SofiaSans/SofiaSansExtraCondensed-Regular.ttf'),
    'SofiaBold': require('./src/Assets/fonts/SofiaSans/SofiaSansExtraCondensed-Bold.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style = {styles.container}>
      <Header/>
      {
        categorySelected ? 
        <ItemListCategory 
          category={categorySelected}
          setCategory={setCategorySelected}
        /> :
        <Home
          setCategorySelected={setCategorySelected}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});