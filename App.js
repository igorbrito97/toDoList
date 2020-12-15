/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';

const App: () => React$Node = () => {
  const [task, setTask] = useState('');
  const [toDoList, setList] = useState([]);

  function getFormatedDate(today) {
    return String(
      today.getDate() +
        '/' +
        today.getMonth() +
        '/' +
        today.getFullYear() +
        ' ' +
        today.getHours() +
        ':' +
        today.getMinutes(),
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.titleText}>LISTA DE TAREFAS</Text>
        <View style={styles.rowContainer}>
          <TextInput
            onChangeText={(value) => {
              setTask(value);
            }}
            value={task}
            style={styles.input}
            placeholder="Adicionar tarefa"
          />
          <TouchableOpacity
            style={styles.addButon}
            onPress={() => {
              if (task.trim() === '') {
                Alert.alert('Digite algo para inserir!!!');
              } else {
                const newItem = {
                  text: task,
                  date: getFormatedDate(new Date()),
                };
                let newArray = [...toDoList, newItem];
                setList(newArray);
                setTask('');
              }
            }}>
            <Text style={styles.textButton}>+</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.listContainer}
          data={toDoList}
          renderItem={({item, index}) => {
            return (
              <View key={index} style={styles.listItem}>
                <Text style={styles.itemTaskText}>{item.text}</Text>
                <Text style={styles.itemDateText}>{item.date}</Text>
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleText: {
    fontSize: 35,
    color: '#1ABC9C',
    margin: 25,
  },
  input: {
    width: '70%',
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#707070',
    marginRight: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addButon: {
    width: 32,
    height: 32,
    backgroundColor: '#FFAA00',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContainer: {
    width: '100%',
    marginLeft: 50,
    marginBottom: 15,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#F5F8F9',
    width: '85%',
    height: 50,
    borderLeftWidth: 7,
    borderLeftColor: '#1ABC9C',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  itemTaskText: {
    fontSize: 18,
    color: '#707070',
    textAlignVertical: 'bottom',
    margin: 5,
  },
  itemDateText: {
    fontSize: 10,
    color: '#707070',
    margin: 5,
  },
});

export default App;
/*


        <Image
          source={require('')}
          style={{height: 58, width: '75%'}}
          resizeMode="cover"
        />

        */
