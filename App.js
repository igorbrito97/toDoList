/* eslint-disable react-native/no-inline-styles */
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
  Modal,
} from 'react-native';
import Popover from 'react-native-popover-view';

function App() {
  //const App: () => React$Node = () => {
  const [currentId, setId] = useState(0);
  const [task, setTask] = useState('');
  const [toDoList, setList] = useState([]);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverIndex, setIndex] = useState(-1);

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

  function popoverButtonPress() {
    setShowPopover(false);
    setIndex(-1);
  }

  function addNota() {
    const newItem = {
      id: currentId,
      text: task,
      date: getFormatedDate(new Date()),
    };
    let newArray = [...toDoList, newItem];
    setList(newArray);
    setTask('');
    setId(currentId + 1);
  }

  function excluirNota() {
    let newArray = toDoList;
    newArray.splice(popoverIndex, 1);
    setList(newArray);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Image
            source={require('C:/Users/igor.brito/Documents/toDoApp/assets/toDoIcon2.png')}
            //style={{marginLeft: 25}}
          />
          <Text style={styles.titleText}>LISTA DE TAREFAS</Text>
        </View>
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
                addNota();
              }
            }}>
            <Text style={styles.textButton}>+</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.listContainer}
          data={toDoList}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item, index}) => {
            console.log(item);
            return (
              <View
                key={item.id}
                style={styles.listItem}
                onTouchEnd={(e) => {
                  setIndex(index);
                  setShowPopover(true);
                }}>
                <Text style={styles.itemTaskText}>{item.text}</Text>
                <Text style={styles.itemDateText}>{item.date}</Text>
              </View>
            );
          }}
        />
      </View>
      <Popover
        isVisible={showPopover}
        onRequestClose={() => setShowPopover(false)}>
        <View style={styles.popoverContainer}>
          <Text style={styles.popoverTitle}>Deseja excluir esse item?</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => popoverButtonPress()}
              style={[styles.popoverButton, {backgroundColor: 'green'}]}>
              <Text style={styles.popoverBtnText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                excluirNota();
                popoverButtonPress();
              }}
              style={[styles.popoverButton, {backgroundColor: 'red'}]}>
              <Text style={styles.popoverBtnText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Popover>
    </>
  );
}

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
    margin: 15,
    fontFamily: 'sans-serif-condensed',
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
  popoverContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  popoverTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 15,
    marginBottom: 5,
  },
  popoverButton: {
    width: '35%',
    height: 30,
    borderRadius: 20,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popoverBtnText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
