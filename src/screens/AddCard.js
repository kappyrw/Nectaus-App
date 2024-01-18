// AddCard.js
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from "../config";
import Spinner from "react-native-loading-spinner-overlay";
import DisplayCard from './DisplayCard';
import * as SQLite from "expo-sqlite";
import { useFocusEffect } from '@react-navigation/native';

const AddCard = ({ navigation }) => {
  const db = SQLite.openDatabase('localHive.db');

  const [HiveSN, setHiveSN] = useState('');
  const [HiveName, setHiveName] = useState('');
  const [DeviceSN, setDeviceSN] = useState('');
  const [HiveOwner, setHiveOwner] = useState('');
  const [HiveDimension, setHiveDimension] = useState('');
  const [HiveWeight, setHiveWeight] = useState('');
  const [HiveLocation, setHiveLocation] = useState('');
  const [Description, setDescription] = useState('');
  const [UpdateHiveSN, setUpdateHiveSN] = useState('');
  const [UpdateHiveName, setUpdateHiveName] = useState('');
  const [UpdateDeviceSN, setUpdateDeviceSN] = useState('');
  const [UpdateHiveOwner, setUpdateHiveOwner] = useState('');
  const [UpdateHiveDimension, setUpdateHiveDimension] = useState('');
  const [UpdateHiveWeight, setUpdateHiveWeight] = useState('');
  const [UpdateHiveLocation, setUpdateHiveLocation] = useState('');
  const [UpdateDescription, setUpdateDescription] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [localHives, setLocalHives] = useState([]);
  const [updatingHiveId, setUpdatingHiveId] = useState(null);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS localHives(id INTEGER PRIMARY KEY AUTOINCREMENT,HiveSN INTEGER, HiveName TEXT, DeviceSN TEXT, HiveOwner TEXT, HiveDimension INTEGER, HiveWeight TEXT, HiveLocation TEXT, Description TEXT)');
    });

    fetchLocalHives(); // Fetch local hives on initial mount
  }, []);

  // Fetch local hives every time the screen is focused
  useFocusEffect(() => {
    fetchLocalHives();
  });

  const fetchLocalHives = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM localHives',
        [],
        (_, resultSet) => {
          setLocalHives(resultSet.rows._array);
        },
        (_, error) => console.log(error)
      );
    });
  };

  const addHive = async (HiveSN, HiveName, DeviceSN, HiveOwner, HiveDimension, HiveWeight, HiveLocation, Description) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_URL}/hive/create`, {
        HiveSN, HiveName, DeviceSN, HiveOwner, HiveDimension, HiveWeight, HiveLocation, Description
      });
      console.log(res.data);
      let userInfo = res.data;
      setUserInfo(userInfo);

      AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      setIsLoading(false);
      navigation.navigate("DisplayCard");
    } catch (e) {
      console.error(`register error of creating hive ${e}`);
      setIsLoading(false);
    }
  };

  const addLocalHive = (HiveSN, HiveName, DeviceSN, HiveOwner, HiveDimension, HiveWeight, HiveLocation, Description) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO localHives(HiveSN , HiveName , DeviceSN , HiveOwner , HiveDimension , HiveWeight , HiveLocation , Description)  values(?,?,?,?,?,?,?,?)',
        [HiveSN, HiveName, DeviceSN, HiveOwner, HiveDimension, HiveWeight, HiveLocation, Description],
        (txObj, resultSet) => {
          let existingHives = [...localHives];
          existingHives.push({
            id: resultSet.insertId,
            HiveSN: HiveSN,
            HiveName: HiveName,
            DeviceSN: DeviceSN,
            HiveOwner: HiveOwner,
            HiveDimension: HiveDimension,
            HiveWeight: HiveWeight,
            HiveLocation: HiveLocation,
            Description: Description
          });

          setLocalHives(existingHives);
          setHiveSN(undefined), setHiveName(undefined), setDeviceSN(undefined), setHiveOwner(undefined), setHiveDimension(undefined), setHiveWeight(undefined), setHiveLocation(undefined), setDescription(undefined);

          console.log("my localhive", existingHives);
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const deleteLocalHive = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM localHives WHERE id=?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingHives = [...localHives].filter(localHive => localHive.id !== id);
            setLocalHives(existingHives);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const updateLocalHive = (id) => {
    db.transaction(tx => {
      tx.executeSql('UPDATE localHives SET HiveSN=?, HiveName=?, DeviceSN=?, HiveOwner=?, HiveDimension=?, HiveWeight=?, HiveLocation=?, Description=? WHERE id=?',
        [UpdateHiveSN, UpdateHiveName, UpdateDeviceSN, UpdateHiveOwner, UpdateHiveDimension, UpdateHiveWeight, UpdateHiveLocation, UpdateDescription, id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let updatedHives = localHives.map(hive => {
              if (hive.id === id) {
                return {
                  ...hive,
                  HiveSN: UpdateHiveSN,
                  HiveName: UpdateHiveName,
                  DeviceSN: UpdateDeviceSN,
                  HiveOwner: UpdateHiveOwner,
                  HiveDimension: UpdateHiveDimension,
                  HiveWeight: UpdateHiveWeight,
                  HiveLocation: UpdateHiveLocation,
                  Description: UpdateDescription,
                };
              }
              return hive;
            });
            setLocalHives(updatedHives);
          }
          setUpdatingHiveId(null);
          setUpdateHiveSN('');
          setUpdateHiveName('');
          setUpdateDeviceSN('');
          setUpdateHiveOwner('');
          setUpdateHiveDimension('');
          setUpdateHiveWeight('');
          setUpdateHiveLocation('');
          setUpdateDescription('');
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const showHiveData = () => {
    return localHives.map((Hive, index) => {
      return (
        <View key={index} style={styles.hiveInfoContainer}>
          <Text style={styles.hiveInfoText}>Hive SIN: {Hive?.HiveSN}</Text>
          <Text style={styles.hiveInfoText}>Hive Name: {Hive?.HiveName}</Text>
          <Text style={styles.hiveInfoText}>Device SIN: {Hive?.DeviceSN}</Text>
          <Text style={styles.hiveInfoText}>Hive Owner: {Hive?.HiveOwner}</Text>
          <Text style={styles.hiveInfoText}>Hive Dimension: {Hive?.HiveDimension}</Text>
          <Text style={styles.hiveInfoText}>Hive Weight: {Hive?.HiveWeight}</Text>
          <Text style={styles.hiveInfoText}>Hive Location: {Hive?.HiveLocation}</Text>
          <Text style={styles.hiveInfoText}>Hive Description: {Hive?.Description}</Text>

          {updatingHiveId === Hive.id ? (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Update Hive SIN"
                value={UpdateHiveSN}
                onChangeText={(text) => setUpdateHiveSN(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Update Hive Name"
                value={UpdateHiveName}
                onChangeText={(text) => setUpdateHiveName(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Update Device SIN"
                value={UpdateDeviceSN}
                onChangeText={(text) => setUpdateDeviceSN(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Update Hive Owner"
                value={UpdateHiveOwner}
                onChangeText={(text) => setUpdateHiveOwner(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Update Hive Dimension"
                value={UpdateHiveDimension}
                onChangeText={(text) => setUpdateHiveDimension(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Update Hive Weight"
                value={UpdateHiveWeight}
                onChangeText={(text) => setUpdateHiveWeight(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Update Hive Location"
                value={UpdateHiveLocation}
                onChangeText={(text) => setUpdateHiveLocation(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Update Description"
                value={UpdateDescription}
                onChangeText={(text) => setUpdateDescription(text)}
              />

              <TouchableOpacity onPress={() => updateLocalHive(Hive.id)}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity onPress={() => deleteLocalHive(Hive.id)}>
                <Text style={styles.deleteButton}>DELETE</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setUpdatingHiveId(Hive.id)}>
                <Text style={styles.update}>Update</Text>
              </TouchableOpacity>
            </View>
          )}

          <Image source={require('../../assets/images/bee11.jpg')} style={{ width: 100, height: 100, resizeMode: 'cover', borderRadius: 8, marginTop: 10 }} />
        </View>
      );
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create a New Hive </Text>
      <Spinner visible={isLoading} />

      <TextInput
        style={styles.input}
        placeholder="Hive SIN"
        value={HiveSN}
        onChangeText={(text) => setHiveSN(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Hive Name"
        value={HiveName}
        onChangeText={(text) => setHiveName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Device SIN"
        value={DeviceSN}
        onChangeText={(text) => setDeviceSN(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Hive Owner"
        value={HiveOwner}
        onChangeText={(text) => setHiveOwner(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Hive Dimension"
        value={HiveDimension}
        onChangeText={(text) => setHiveDimension(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Hive Weight"
        value={HiveWeight}
        onChangeText={(text) => setHiveWeight(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Hive Location"
        value={HiveLocation}
        onChangeText={(text) => setHiveLocation(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={Description}
        onChangeText={(text) => setDescription(text)}
      />

      <TouchableOpacity style={styles.button} onPress={() => addLocalHive(HiveSN, HiveName, DeviceSN, HiveOwner, HiveDimension, HiveWeight, HiveLocation, Description)}>
        <Text style={styles.buttonText}>Create Local Hive</Text>
      </TouchableOpacity>

      <View style={styles.localHivesContainer}>
        <Text style={styles.localHivesTitle}>Local Hives:</Text>
        {showHiveData()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  update: {
    color: 'blue',
    marginTop: 5,
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
  localHivesContainer: {
    marginTop: 20,
    width: '80%',
  },
  localHivesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hiveInfoContainer: {
    backgroundColor: '#ecf0f1',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  hiveInfoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  deleteButton: {
    color: 'red',
    marginTop: 5,
  },
});

export default AddCard;
