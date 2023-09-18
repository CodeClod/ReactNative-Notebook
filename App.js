import { StatusBar } from 'expo-status-bar';
import { app, database } from './firebase'
import { useState } from 'react';
import { collection, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Image} from 'react-native';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function App() {
  

  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='ListPage'>
        <Stack.Screen
        name="ListPage"
        component={ListPage}
        options={{
          headerTitle: "notes", 
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="New Note"
              backgroundColor="#fff"
            />
          )
        }} />
        <Stack.Screen name="DetailPage" component={DetailPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );



}

const ListPage = ({navigation, route}) => {
  const [text, setText] = useState('')
  const [editObj, setEditObj] = useState(null)
  const [values, loading, error] = useCollection(collection(database, "notes"))
  const data = values?.docs.map((doc) => ({...doc.data(), id: doc.id})) 

  async function deleteDocument(id){
    await deleteDoc(doc(database,"notes", id))
  }
  
  

  async function handleButton(item) {
    try {
      await addDoc(collection(database, "notes"),{
      text: text
    })
    }catch(err){
      console.log("Fej i DB" + err)
    }
    
  }

 function viewUpdateDialog(item){
    setEditObj(item)
  }

  async function saveUpdate() {
    await updateDoc(doc(database,"notes", editObj.id), {
      text: text
    })
    setText("")
    setEditObj(null)
  }

  return (
    

    <View>

      { editObj && 
        <View>
          <TextInput defaultValue={editObj.text} onChangeText={(txt) => setText(txt)}></TextInput>
          <Text onPress={saveUpdate}>Save</Text>
        </View>}

      <TextInput style={styles.textInput} onChangeText={(txt) => setText(txt)} />
      <Button title='Press Me' onPress={handleButton}></Button>
      <FlatList 
      data={data}
      renderItem={(note) =>
      <View>
        <Text>{note.item.text}</Text>
        <Text onPress={() => deleteDocument(note.item.id)}>Delete</Text>
        <Text onPress={() => viewUpdateDialog(note.item)}>Update</Text>
      </View>
      }
      />
      <StatusBar style="auto" />
    </View>
  )
}

const DetailPage = ({navigation, route}) => {
  const message = route.params?.message
  
  return (
    <View>
      <Text>Detailjer... {message.name}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    
  },
  textInput: {
    backgroundColor: 'lightblue',
    minWidth: 200,
    
  }
});
