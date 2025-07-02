import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { BACKGROUND, CARD_BACKGROUND, PRIMARY, TEXT } from '../constants/theme';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import TrackingScreen from '../screens/TrackingScreen'
import SettingsScreen from '../screens/SettingScreen';
import BagsScreen from '../screens/BagsScreen';
import VehiculesScreen from '../screens/VehiculesScreen';
import { WHITE } from '../styles/colors';
import VehicleTrackingScreen from '../screens/VehiculesTrackingScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: BACKGROUND }
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="Tracking" component={TrackingScreen} />
      {/* <Stack.Screen name="Tracking" component={VehicleTrackingScreen} /> */}
    </Stack.Navigator>
  );
};

// Drawer navigator for main app screens
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: CARD_BACKGROUND,
          width: 280,
        },
        drawerLabelStyle: {
          color: TEXT,
          marginLeft: 0,
        },
        drawerActiveBackgroundColor: PRIMARY,
        drawerActiveTintColor: BACKGROUND,
        drawerInactiveTintColor: TEXT,
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: 'Accueil',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Vehicles" 
        component={VehiculesScreen} 
        options={{
          title: 'Véhicules',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="car" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Bags" 
        component={BagsScreen} 
        options={{
          title: 'Sacs',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bag-personal" color={color} size={size} />
          ),
        }}
      />
      {/* <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          title: 'Paramètres',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      /> */}
      <Drawer.Screen 
        name="Logout" 
        component={LogoutScreen} 
        options={{
          title: 'Déconnexion',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

// Placeholder logout screen component
const LogoutScreen = ({ navigation }) => {
  React.useEffect(() => {
    // Simulate logout by navigating back to login
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Login' }],
    // });
    navigate.navigate('Login')
  }, []);
  
  return null;
};

export default MainStack;