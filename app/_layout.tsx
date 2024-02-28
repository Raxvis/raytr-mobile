import * as SplashScreen from 'expo-splash-screen';
import { Text, View } from 'react-native';
import store, { persistedStore } from '../store/configureStore';
import AddButton from '../components/layout/AddButton';
import NavButton from '../components/ui/NavButton';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_900Black,
} from '@expo-google-fonts/poppins';
import { Suspense, useCallback } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SQLiteProvider } from 'expo-sqlite/next';
import migrate from '../db/migrate';
import LoadingScreen from '../components/ui/LoadingScreen';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_900Black,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <SQLiteProvider databaseName="raytr.db" onInit={migrate} useSuspense={true}>
        <SafeAreaProvider>
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <Provider store={store}>
              <PersistGate persistor={persistedStore} loading={null}>
                <StatusBar style="dark" />
                <Stack
                  screenOptions={({ navigation }) => ({
                    animation: 'simple_push',
                    headerStyle: {
                      backgroundColor: 'black',
                    },
                    headerBackTitle: 'Back',
                    headerTintColor: 'white',
                    headerBackTitleStyle: {
                      fontFamily: 'Poppins_400Regular',
                    },
                    headerTitle: ({ children, tintColor }) => (
                      <Text
                        style={{ color: tintColor }}
                        className="pl-4 text-center font-poppins text-2xl font-bold tracking-[16px]"
                      >
                        {'RAYTR'}
                      </Text>
                    ),
                    headerLeft: ({ canGoBack }) =>
                      canGoBack ? <NavButton onPress={navigation.goBack} isBack text="Back" color="white" /> : null,
                  })}
                />
                <AddButton />
              </PersistGate>
            </Provider>
          </View>
        </SafeAreaProvider>
      </SQLiteProvider>
    </Suspense>
  );
};

export default App;
