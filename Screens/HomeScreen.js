import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import db from '../config';

class HomeScreen extends React.Component {

  constructor() {
    super();
    this.state ={
      all_students: [], 
      presentPressed: [], 
      absentPressed: []
    }
  }

  async showNames() {
    var class_ref = await db.ref('/').on('value', data => {
        var all_students = [];
        var class_VIII = data.val().class_VIII;

        for(var student in class_VIII) {
          all_students.push(class_VIII[student]);
        }

        all_students.sort(function(student1, student2) {
          return student1.roll_no - student2.roll_no;
        })

        this.setState({
          all_students: all_students
        });
      })
  }

  componentDidMount() {
    this.showNames()
  }

  updateAttendance(roll_no, status) {
    var id = '';

    if(roll_no <= 9) {
      id = '0' + roll_no;
    } else {
      id = roll_no;
    }

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

    var ref_path = '/' + 'class_VIII/' + id + '/';
    var class_ref =  db.ref(ref_path);
    class_ref.update({
      [today]:status
    })
  }

  render() {
    if(this.state.all_students.length === 0) {
      return (
        <Text style={styles.loading}>Loading students...</Text>
      )
    } else return (
      <View>
        {this.state.all_students.map((student, index) => (
          //got the idea from https://reactjs.org/docs/reconciliation.html#recursing-on-children
          <View key={index}>
            <Text style={styles.studentName}>{student.roll_no}. {student.name}</Text>
            
            <View style={[styles.attendance], {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: -50,
            marginLeft: 50}}>
            <TouchableOpacity>
            <Text style={
              //short if condition checking if the index is in this.state because it does not accept proper if condition
                      this.state.presentPressed.includes(index)
                        ? [styles.attendance, { backgroundColor: '#12A13A' }]
                        : styles.attendance
                    } onPress={() => {
                        var presentPressed = this.state.presentPressed;
                        presentPressed.push(index);
                        this.setState({ presentPressed: presentPressed });
                        this.updateAttendance(student.roll_no, 'present')
              }}>Present</Text>
            </TouchableOpacity>

            <TouchableOpacity>
            <Text style={this.state.absentPressed.includes(index)
                        ? [styles.attendance, { backgroundColor: 'red' }]
                        : styles.attendance
                    } onPress={() => {
                        var absentPressed = this.state.absentPressed;
                        absentPressed.push(index);
                        this.setState({ absentPressed: absentPressed });
                        this.updateAttendance(student.roll_no, 'absent')
              }}>Absent</Text>
            </TouchableOpacity>
            </View>
          </View>
        ))}

        

            <TouchableOpacity>
              <Text style={{
                borderWidth: 2,
                justifyContent: 'center',
                textAlign: 'center',
                marginTop: 40,
                backgroundColor: "#0AAD95",
                fontSize: 18,
                color: "white"
              }} onPress={() => {
                this.props.navigation.navigate('SummaryScreen', {total: 10})
              }}>Submit</Text>
            </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  studentName: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: "bold",
  },

  attendance: {
    borderWidth: 2,
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center'
  },

  loading: {
    marginTop: 30,
    fontSize: 20,
    textAlign: 'center'
  },
})

export default HomeScreen;