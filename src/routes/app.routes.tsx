import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AppointmentCreate, AppointmentDetails, Home } from '../screens';

import { theme } from '../global/styles/theme';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: theme.colors.secondary,
        },
      }}
    >
      <Screen name='Home' component={Home} />
      <Screen name='AppointmentDetails' component={AppointmentDetails} />
      <Screen name='AppointmentCreate' component={AppointmentCreate} />
    </Navigator>
  );
}
