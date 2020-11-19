import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import HomeScreen from './Screens/HomeScreen';
import SummaryScreen from './Screens/SummaryScreen';
import AppHeader from './components/AppHeader';
import db from './config';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <AppHeader />
        <AppContainer />
      </View>
    );
  }
}

var AppNavigator = createSwitchNavigator({
  HomeScreen:HomeScreen,
  SummaryScreen:SummaryScreen
})

const AppContainer = createAppContainer(AppNavigator)