import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

class AppHeader extends React.Component{
  render(){
    return(
      <View style={{ backgroundColor: "#12A13A"}}>
        <Text style={styles.text}>School Attendance App</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text:{
    color: 'white',
    padding: 20,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default AppHeader;