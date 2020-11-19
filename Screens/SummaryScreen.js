import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import db from '../config';

export default class SummaryScreen extends React.Component {

  constructor() {
    super();
    this.state ={
      present: [],
      absent: []
    }
  }

  getDate() {
    var today = new Date();

    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if(dd < 10) {
      dd = '0' + dd;
    }

    if(mm < 10) {
      mm = '0' + mm;
    }

    today = dd + '-' + mm + '-'+ yyyy;
    return today;
  }

  async attendance() {
    var today = await this.getDate();

    var class_ref = await db.ref('/').on('value', data => {
        var present = [];
        var absent = [];
        //need .class_VIII otherwise the data.val() is just class_VIII
        var class_VIII = data.val().class_VIII;

        //checking for "present" or "absent" for each student and updating in present/absent
        for(var student in class_VIII) {
          if(class_VIII[student][today] === "present") {
            present.push(class_VIII[student])
          }

          if(class_VIII[student][today] === "absent") {
            absent.push(class_VIII[student])
          }

          console.log(student)
        }

        present.sort(function(student1, student2) {
          return student1.roll_no - student2.roll_no;
        })

        absent.sort(function(student1, student2) {
          return student1.roll_no - student2.roll_no;
        })

        this.setState({
          present: present,
          absent: absent
        });
      })
  }

  async componentDidMount() {
    await this.attendance()
  }

  render() {
    return(
      //passing data and getting info from this.state
      <View>
      <Text style = {styles.bold}>Total no. of students: {this.props.navigation.getParam('total')}</Text>
      <Text style = {styles.present}>{this.state.present.length} students are present</Text>
      <Text style = {styles.absent}>{this.state.absent.length} students are absent</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bold: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "bold",
  },

  present: {
    marginTop: 30,
    marginLeft: 20,
    fontSize: 20,
    textAlign: 'left',
    color: "#12A13A"
  },

  absent: {
    marginTop: 30,
    marginLeft: 20,
    fontSize: 20,
    textAlign: 'left',
    color: "red"
  }
})