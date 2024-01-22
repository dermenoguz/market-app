import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Screens/Login'; 
import HomeScreen from './Screens/HomeScreen';
import CategoriesScreen from './Screens/CategoriesScreen';
import CategoryDetailScreen from './Screens/CategoryDetailScreen';
import QrCodeScreen from './Screens/QrCodeScreen';
import RegisterScreen from './Screens/RegisterScreen';
import AdminQrCodeScreen from './Screens/AdminQrCodeScreen';
import Productone from './Screens/Productone';
import Sepet from './Screens/Sepet';
import hakkımda from './Screens/hakkımda';
import clientQr from './Screens/clientQr';
import adminQr from './Screens/adminQr';
import { UserProvider } from './Screens/UserContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
          <Stack.Screen name="Categories" options={{ headerShown: false }} component={CategoriesScreen} />
          <Stack.Screen name="CategoryDetail" options={{ headerShown: false }} component={CategoryDetailScreen} />
          <Stack.Screen name="QrCode" options={{ headerShown: false }} component={QrCodeScreen} />
          <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
          <Stack.Screen name="AdminQrCode" options={{ headerShown: false }} component={AdminQrCodeScreen} />
          <Stack.Screen name="Productone" options={{ headerShown: false }} component={Productone} />
          <Stack.Screen name="Sepet" options={{ headerShown: false }} component={Sepet} />
          <Stack.Screen name="hakkımda" options={{ headerShown: false }} component={hakkımda} />
          <Stack.Screen name="clientQr" options={{ headerShown: false }} component={clientQr} />
          <Stack.Screen name="adminQr" options={{ headerShown: false }} component={adminQr} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
