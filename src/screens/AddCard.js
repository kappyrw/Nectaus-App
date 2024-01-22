// AddCard.js
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../config';
import Spinner from 'react-native-loading-spinner-overlay';
import DisplayCard from './DisplayCard';
import * as SQLite from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';

const AddCard = ({ navigation }) => {
  const db = SQLite.openDatabase('localHive.db');

  const initialState = {
    HiveSN: '',
    HiveName: '',
    DeviceSN: '',
    HiveOwner: '',
    HiveDimension: '',
    HiveWeight: '',
    HiveLocation: '',
    Description: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [localHives, setLocalHives] = useState([]);
  const [updatingHiveId, setUpdatingHiveId] = useState(null);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS localHives(id INTEGER PRIMARY KEY AUTOINCREMENT,HiveSN INTEGER, HiveName TEXT, DeviceSN TEXT, HiveOwner TEXT, HiveDimension INTEGER, HiveWeight TEXT, HiveLocation TEXT, Description TEXT)'
      );
    });

    fetchLocalHives();
  }, []);

  useFocusEffect(() => {
    fetchLocalHives();
  });

  const fetchLocalHives = () => {
    db.transaction((tx) => {
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

  const handleChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdateClick = (id) => {
    const hiveToUpdate = localHives.find((hive) => hive.id === id);

    if (hiveToUpdate) {
      setFormData(hiveToUpdate);
      setUpdatingHiveId(id);
    }
  };

  const handleUpdateLocalHive = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE localHives SET HiveSN=?, HiveName=?, DeviceSN=?, HiveOwner=?, HiveDimension=?, HiveWeight=?, HiveLocation=?, Description=? WHERE id=?',
        [
          formData.HiveSN,
          formData.HiveName,
          formData.DeviceSN,
          formData.HiveOwner,
          formData.HiveDimension,
          formData.HiveWeight,
          formData.HiveLocation,
          formData.Description,
          id,
        ],
        (_, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            const updatedHives = localHives.map((hive) => {
              if (hive.id === id) {
                return { ...hive, ...formData };
              }
              return hive;
            });
            setLocalHives(updatedHives);
          }
          setUpdatingHiveId(null);
          setFormData(initialState);
        },
        (_, error) => console.log(error)
      );
    });
  };

  const addHive = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_URL}/hive/create`, formData);
      console.log(res.data);
      let userInfo = res.data;
      setUserInfo(userInfo);

      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      setIsLoading(false);
      navigation.navigate('DisplayCard');
    } catch (e) {
      console.error('Error creating hive: ', e);
      setIsLoading(false);
    }
  };

  const addLocalHive = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO localHives(HiveSN , HiveName , DeviceSN , HiveOwner , HiveDimension , HiveWeight , HiveLocation , Description)  values(?,?,?,?,?,?,?,?)',
        Object.values(formData),
        (_, resultSet) => {
          let existingHives = [...localHives];
          existingHives.push({
            id: resultSet.insertId,
            ...formData,
          });

          setLocalHives(existingHives);
          setFormData(initialState);

          console.log('My local hives', existingHives);
        },
        (_, error) => console.log(error)
      );
    });
  };

  const deleteLocalHive = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM localHives WHERE id=?',
        [id],
        (_, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingHives = [...localHives].filter(
              (localHive) => localHive.id !== id
            );
            setLocalHives(existingHives);
          }
        },
        (_, error) => console.log(error)
      );
    });
  };

  const renderHivesInGrid = () => {
    const grid = [];
    const rowSize = 2; // Set the number of columns per row

    for (let i = 0; i < localHives.length; i += rowSize) {
      const row = localHives.slice(i, i + rowSize);
      const rowElements = row.map((hive) => (
        <View
          key={hive.id}
          style={[
            styles.hiveInfoContainer,
            hive.id === updatingHiveId ? styles.updatedHive : null,
          ]}
        >
          {Object.entries(hive).map(([key, value]) => (
            <Text key={key} style={styles.hiveInfoText}>
              {key}: {value}
            </Text>
          ))}

          {updatingHiveId === hive.id ? (
            <View>
              {Object.entries(initialState).map(([key, value]) => (
                <TextInput
                  key={key}
                  style={styles.input}
                  placeholder={`Update ${key}`}
                  value={formData[key]}
                  onChangeText={(text) => handleChange(key, text)}
                />
              ))}

              <TouchableOpacity
                onPress={() => handleUpdateLocalHive(hive.id)}
                style={styles.updateButton}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                onPress={() => deleteLocalHive(hive.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleUpdateClick(hive.id)}
                style={styles.updateButton}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
          )}

          <Image
            source={require('../../assets/images/bee11.jpg')}
            style={styles.hiveImage}
          />
        </View>
      ));

      grid.push(
        <View key={i} style={styles.rowContainer}>
          {rowElements}
        </View>
      );
    }

    return grid;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create a New Hive </Text>
      <Spinner visible={isLoading} />

      {Object.entries(initialState).map(([key, value]) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={`Enter ${key}`}
          value={formData[key]}
          onChangeText={(text) => handleChange(key, text)}
        />
      ))}

      <TouchableOpacity style={styles.button} onPress={addHive}>
        <Text style={styles.buttonText}>Create Hive</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={addLocalHive}>
        <Text style={styles.buttonText}>Create Local Hive</Text>
      </TouchableOpacity>

      <View style={styles.localHivesContainer}>
        <Text style={styles.localHivesTitle}>Local Hives:</Text>
        {renderHivesInGrid()}
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
  hiveImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 18,
    paddingVertical: 18,
    width: '80%',
    alignItems: 'center',
    marginTop: 5,
    borderWidth: 1,
    color: 'white',
  },
  updateButton: {
    backgroundColor: '#3498db',
    borderRadius: 18,
    paddingVertical: 18,
    width: '80%',
    alignItems: 'center',
    marginTop: 5,
    borderWidth: 1,
    color: 'white',
  },
  alternateRow: {
    backgroundColor: '#dfe6e9',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  updatedHive: {
    backgroundColor: '#f8f9fa',
  },
});

export default AddCard;
