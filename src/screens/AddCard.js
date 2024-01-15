// AddCard.js
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from "../config";
import Spinner from "react-native-loading-spinner-overlay"
import DisplayCard from './DisplayCard'; // Import the DisplayCard component
import * as SQLite from"expo-sqlite"
import { Button } from 'react-native-web';

const AddCard = ({ navigation }) => {
  const db= SQLite.openDatabase('localHive.db');

  const [HiveSN, setHiveSN] = useState('');
  const [HiveName, setHiveName] = useState('');
  const [DeviceSN, setDeviceSN] = useState('');
  const [HiveOwner, setHiveOwner] = useState('');
  const [HiveDimension, setHiveDimension] = useState('');
  const [HiveWeight, setHiveWeight] = useState('');
  const [HiveLocation, setHiveLocation] = useState('');
  const [Description, setDescription] = useState('');
  const [userInfo, setUserInfo] = useState(null); // Store user info
  const [isLoading,setIsLoading] =useState(false)
  const [localHives,setLocalHives] = useState([])

  const addHive = async (HiveSN, HiveName, DeviceSN, HiveOwner, HiveDimension, HiveWeight,HiveLocation,Description) => {
    try {
      setIsLoading(true)
      const res = await axios.post(`${BASE_URL}/hive/create`, {
        HiveSN, HiveName, DeviceSN, HiveOwner, HiveDimension, HiveWeight,HiveLocation,Description
      });
      console.log(res.data);
      let userInfo=res.data;
      setUserInfo(userInfo);
      
      AsyncStorage.setItem("userInfo",JSON.stringify(userInfo))
      setIsLoading(false)
      navigation.navigate("DisplayCard");
    } catch (e) {
      console.error(`register error of creating hive ${e}`);
      setIsLoading(false)
      
    }
  };
  console.log(userInfo);
  
  useEffect(()=>{
    db.transaction(tx=>{
      tx.executeSql('CREATE TABLE IF NOT  EXISTS localHives(id INTEGER PRIMARY KEY AUTOINCREMENT,HiveSN INTEGER, HiveName TEXT, DeviceSN TEXT, HiveOwner TEXT, HiveDimension INTEGER, HiveWeight TEXT, HiveLocation TEXT,Description TEXT)')
    });
    db.transaction(tx =>{
      tx.executeSql('select * from localHives ',

      (txObj,resultSet)=>setLocalHives(resultSet.rows._array),
      (txObj ,error) => console.log(error)
      );
    })
  },[]);
  const addLocalHive = (HiveSN, HiveName, DeviceSN, HiveOwner, HiveDimension, HiveWeight, HiveLocation, Description) => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO localHives(HiveSN , HiveName , DeviceSN , HiveOwner , HiveDimension , HiveWeight , HiveLocation ,Description)  values(?,?,?,?,?,?,?,?)', [HiveSN, HiveName, DeviceSN, HiveOwner, HiveDimension, HiveWeight, HiveLocation, Description],
        (txObj, resultSet) => {
          let existingHives = [...localHives];
          existingHives.push({ id: resultSet.insertId, HiveSN: HiveSN, HiveName: HiveName, DeviceSN: DeviceSN, HiveOwner: HiveOwner, HiveDimension: HiveDimension, HiveWeight: HiveWeight, HiveLocation: HiveLocation, Description: Description })

          setLocalHives(existingHives);
          setHiveSN(undefined), setHiveName(undefined), setDeviceSN(undefined), setHiveOwner(undefined), setHiveDimension(undefined), setHiveWeight(undefined), setHiveLocation(undefined), setDescription(undefined);
          
          console.log("my localhive", existingHives);
        },
        (txObj,error)=> console.log(error)
        );
      })
    }
    const deleteLocalHive=(id)=>
    {
      db.transaction(tx => {
        tx.executeSql('DELETE  FROM localHives WHERE id=?', [id],
        (txObj, resultSet) => {
          if(resultSet.rowsAffected>0){
            
            let existingHives = [...localHives].filter(localHive => localHive.id !==id);
            setLocalHives(existingHives);
        }

        
      },
      (txObj, error) => console.log(error)
    );
  })
}


  console.log("my out localhive", localHives);
const showHiveData= ()=>{
  return localHives.map((HiveName,index)=>{
    return(
      <View key={index}>
        <Text>{HiveName?.HiveOwner}</Text>
        <TouchableOpacity onPress={() => deleteLocalHive(HiveName.id)} >
        <Text >DELETE</Text>

        </TouchableOpacity>
        {/* <Button title="Delete Hive" onPress={() => deleteLocalHive(HiveName.id)}></Button> */}

      </View>
    )
  })

  
}
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create a New Hive </Text>
    

      <Spinner visible={isLoading}/>  
      <TextInput
        style={styles.input}
        placeholder="Hive SIN"
        value={HiveSN}
        // onChange={handleChange}
        onChangeText={(text) => setHiveSN(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Hive Name "
        value={HiveName}
        // onChange={handleChange}
        onChangeText={(text) => setHiveName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Device SIN"
        // onChange={handleChange}
        value={DeviceSN}
        onChangeText={(text) => setDeviceSN(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Hive Owner "
        // onChange={handleChange}
        value={HiveOwner}
        onChangeText={(text) => setHiveOwner(text)}
      />
      {showHiveData()}
      <TextInput
        style={styles.input}
        placeholder="Hive Dimension (L*W*H) "
        // onChange={handleChange}
        value={HiveDimension}
        onChangeText={(text) => setHiveDimension(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Hive Weight"
        // onChange={handleChange}
        value={HiveWeight}
        onChangeText={(text) => setHiveWeight(text)}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Hive Location"
        // onChange={handleChange}
        value={HiveLocation}
        onChangeText={(text) => setHiveLocation(text)}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Hive Discription"
        // onChange={handleChange}
        value={Description}
        onChangeText={(text) => setDescription(text)}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={() => {

        addLocalHive(HiveSN, HiveName, DeviceSN, HiveOwner, HiveDimension, HiveWeight, HiveLocation, Description);
      }}>
        <Text>create local hive</Text>

      </TouchableOpacity>
    
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    width: '80%',
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 18,
    paddingVertical: 18,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
});

export default AddCard;

