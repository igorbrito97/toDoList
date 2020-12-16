/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Keyboard,
} from 'react-native';
import Popover from 'react-native-popover-view';
import { format } from 'date-fns';

interface ListaTarefasInterface {
  id: number;
  text: string;
  date: Date;
}

function App() {
  //const App: () => React$Node = () => {
  const [currentId, setId] = useState(0);
  const [task, setTask] = useState('');
  const [toDoList, setList] = useState<Array<ListaTarefasInterface>>([]);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverIndex, setIndex] = useState(-1);

  function popoverButtonPress() {
    setShowPopover(false);
    setIndex(-1);
  }

  function addNota() {
    const newItem = {
      id: currentId,
      text: task,
      date: new Date(),
    };
    let newArray = [newItem, ...toDoList];
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
        <Image
          source={require('C:/Users/igor.brito/Documents/toDoApp/assets/todo-list.png')}
          resizeMode="contain"
          style={{ width: '75%', height: 50 }}
        />
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
                Keyboard.dismiss();
              }
            }}>
            <Text style={styles.textButton}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          {toDoList.map((item, index) => {
            return (
              <View
                key={item.id}
                style={styles.listItem}
                onTouchEnd={() => {
                  setIndex(index);
                  setShowPopover(true);
                }}>
                <Text style={styles.itemDateText}>
                  {format(item.date, 'dd/MM/yyyy HH:mm')}
                </Text>
                <Text style={styles.itemTaskText}>{item.text}</Text>
              </View>
            );
          })}
        </View>
      </View>
      <Popover
        isVisible={showPopover}
        onRequestClose={() => setShowPopover(false)}>
        <View style={styles.popoverContainer}>
          <Text style={styles.popoverTitle}>Deseja excluir esse item?</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => popoverButtonPress()}
              style={[styles.popoverButton, { backgroundColor: 'green' }]}>
              <Text style={styles.popoverBtnText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                excluirNota();
                popoverButtonPress();
              }}
              style={[styles.popoverButton, { backgroundColor: 'red' }]}>
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
    padding: 16,
  },
  input: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#707070',
    marginRight: 12,
    marginTop: 10,
    alignContent: 'flex-end',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  addButon: {
    width: 52,
    backgroundColor: '#FFAA00',
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  textButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContainer: {
    width: '100%',
    marginBottom: 15,
    marginTop: 15,
  },
  listItem: {
    backgroundColor: '#F5F8F9',
    height: 50,
    borderLeftWidth: 7,
    borderLeftColor: '#1ABC9C',
    marginBottom: 15,
    padding: 8,
  },
  itemTaskText: {
    fontSize: 18,
    color: '#707070',
  },
  itemDateText: {
    fontSize: 12,
    color: '#707070',
    textAlign: 'right',
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
