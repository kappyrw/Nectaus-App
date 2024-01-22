
//addcard
import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

import { BASE_URL } from "../config";
import Spinner from "react-native-loading-spinner-overlay";
// import DisplayCard from './DisplayCard';
import * as SQLite from "expo-sqlite";

import { useFocusEffect } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const AddCard = ({ navigation }) => {
  const db = SQLite.openDatabase('localHive.db');

  const [haveFetchedHives, setHaveFetchedHives] = useState(false);
  const [HiveSN, setHiveSN] = useState('');
  const [HiveName, setHiveName] = useState('');
  const [DeviceSN, setDeviceSN] = useState('');

  const [HiveDimension, setHiveDimension] = useState('');
  const [HiveWeight, setHiveWeight] = useState('');
  const [HiveLocation, setHiveLocation] = useState('');
  const [Description, setDescription] = useState('');
  const [UpdateHiveSN, setUpdateHiveSN] = useState('');
  const [UpdateHiveName, setUpdateHiveName] = useState('');
  const [UpdateDeviceSN, setUpdateDeviceSN] = useState('');
  const [myRemoteHive, setMyRemoteHive] = useState([]);
  const [UpdateHiveDimension, setUpdateHiveDimension] = useState('');
  const [UpdateHiveWeight, setUpdateHiveWeight] = useState('');
  const [UpdateHiveLocation, setUpdateHiveLocation] = useState('');
  const [UpdateDescription, setUpdateDescription] = useState('');
  const [access_token, Setaccess_token] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [localHives, setLocalHives] = useState([]);
  const [updatingHiveId, setUpdatingHiveId] = useState(null);
  const [remoteHiveId, setRemoteHiveId] = useState(null);


  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  //token retriveal
  useEffect(() => {
    // Function to retrieve data from AsyncStorage
    const getData = async () => {
      try {

        const value = await AsyncStorage.getItem('userInfo');

        if (value !== null) {
          const tokenResponse = JSON.parse(value);

          // Extract and set the access token to the state
          const { access_token } = tokenResponse;
          Setaccess_token(access_token);



        } else {
          // No data found
          console.log('No data found in AsyncStorage');
        }
      } catch (error) {
        // Error retrieving data
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };

    // Call the function to retrieve data
    getData();
  }, []);
  // fetch remote hive data
  const fetchRemoteHives = async () => {
    if (haveFetchedHives) return; // Skip fetch if already done

    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/hive/getAll`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      setMyRemoteHive(res.data);
      setHaveFetchedHives(true); // Set flag after successful fetch
    } catch (error) {
      console.error(`remote hive error`, error);
    }
    setIsLoading(false);
  };

  // Use useEffect with conditional logic if needed
  useEffect(() => {
    if (!haveFetchedHives) { // Fetch only if not already done
      fetchRemoteHives();
    }
  }, [access_token]);
  // sqlite DB create
  useEffect(() => {

    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS localHivesV1(id INTEGER PRIMARY KEY AUTOINCREMENT,HiveSN INTEGER, HiveName TEXT, DeviceSN TEXT,  HiveDimension INTEGER, HiveWeight TEXT, HiveLocation TEXT, Description TEXT)');

    });

    fetchLocalHives();
  }, []);

  const updateRemoteHive = async (hiveId) => {
    // isLoading(true)
    try {
      // Build update request URL
      const updateUrl = `${BASE_URL}/hive/update/${hiveId}`;

      // Prepare PUT request with updated data
      const updatedHiveData = {
        HiveSN: UpdateHiveSN,
        HiveName: UpdateHiveName,
        DeviceSN: UpdateDeviceSN,
        HiveDimension: UpdateHiveDimension,
        HiveWeight: UpdateHiveWeight,
        HiveLocation: UpdateHiveLocation,
        Description: UpdateDescription,
      };
      console.log("update data .....", updatedHiveData);
      const requestOptions = {
        url: updateUrl,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        data: updatedHiveData,
      };

      // Send request and update internal state
      const response = await axios.request(requestOptions);
      const updatedRemoteHive = response.data;
      console.log("changed data", updatedRemoteHive);

      // Update specific hive within myRemoteHive array
      const updatedHives = myRemoteHive.map((hive) => {
        if (hive._id === hiveId) {
          console.log("compare ide", hive._id);
          return updatedRemoteHive; // Replace entire hive object
        }
        return hive;
        // Keep other hives unchanged
      });

      setMyRemoteHive(updatedHives);

      console.log(`Hive ${hiveId} updated successfully!`);

    } catch (error) {
      console.error(`Error updating hive ${hiveId}:`, error);

    }
  };
  const deleteRemoteHive = async (hiveId) => {
    // isLoading(true)
    try {
      // Build update request URL
      const updateUrl = `${BASE_URL}/hive/delete/${hiveId}`;

      // Prepare PUT request with updated data


      const requestOptions = {


        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },

      };

      // Send request and update internal state
      // const response = await axios.request(requestOptions);
      const res = await axios.delete(updateUrl, requestOptions)








      console.log(`Hive ${hiveId} DELETED successfully!`);

    } catch (error) {
      console.error(`Error DELETING  hive ${hiveId}:`, error);

    }
  };



  // Fetch local hives every time the screen is focused

  useFocusEffect(() => {
    fetchLocalHives();
  });


  const fetchLocalHives = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM localHivesV1',
        [],
        (_, resultSet) => {
          setLocalHives(resultSet.rows._array);
        },
        (_, error) => console.log(error)
      );
    });
  };


  const addHive = async (HiveSN, HiveName, DeviceSN, HiveDimension, HiveWeight, HiveLocation, Description) => {
    setIsLoading(true);
    try {


      console.log("create hive token 222", access_token);
      const res = await axios.post(`${BASE_URL}/hive/create`, {
        HiveSN, HiveName, DeviceSN, HiveDimension, HiveWeight, HiveLocation, Description
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log(res.data);
      // let userInfo = res.data;
      // setUserInfo(userInfo);
      // AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      setIsLoading(false);
      // navigation.navigate("DisplayCard");
    } catch (e) {

      console.error(`register error of creating hive `, e);



    }
    finally {
      setIsLoading(false); // Set loading to false regardless of success or error
    }

  };




  const addLocalHive = (HiveSN, HiveName, DeviceSN, HiveDimension, HiveWeight, HiveLocation, Description) => {
    db.transaction(tx => {
      setIsLoading(true);
      tx.executeSql(
        'INSERT INTO localHivesV1(HiveSN , HiveName , DeviceSN ,  HiveDimension , HiveWeight , HiveLocation , Description)  values(?,?,?,?,?,?,?)',
        [HiveSN, HiveName, DeviceSN, HiveDimension, HiveWeight, HiveLocation, Description],
        (txObj, resultSet) => {
          let existingHives = [...localHives];
          existingHives.push({
            id: resultSet.insertId,
            HiveSN: HiveSN,
            HiveName: HiveName,
            DeviceSN: DeviceSN,

            HiveDimension: HiveDimension,
            HiveWeight: HiveWeight,
            HiveLocation: HiveLocation,
            Description: Description
          });

          setLocalHives(existingHives);
          setHiveSN(undefined), setHiveName(undefined), setDeviceSN(undefined), setHiveDimension(undefined), setHiveWeight(undefined), setHiveLocation(undefined), setDescription(undefined);
          schedulePushNotification();
          let not = async () => {
            schedulePushNotification()
          }
          console.log("my localhive", existingHives);
          setIsLoading(false);

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
          (txObj, error) => console.log(error)
      );
    });
  };

      
  const deleteAllFromLocalHive = () => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM localHivesV1;', [], (_, result) => {
        // Handle success if needed
        console.log('All data deleted from yourTableName');
      },
        (error) => {
          // Handle error if needed
          console.error('Error deleting ALLLL data:', error);
        });
    });
  }

  const updateLocalHive = (id) => {
    db.transaction(tx => {
      tx.executeSql('UPDATE localHivesV1 SET HiveSN=?, HiveName=?, DeviceSN=?,  HiveDimension=?, HiveWeight=?, HiveLocation=?, Description=? WHERE id=?',
        [UpdateHiveSN, UpdateHiveName, UpdateDeviceSN, UpdateHiveDimension, UpdateHiveWeight, UpdateHiveLocation, UpdateDescription, id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let updatedHives = localHives.map(hive => {
              if (hive.id === id) {
                return {
                  ...hive,
                  HiveSN: UpdateHiveSN,
                  HiveName: UpdateHiveName,
                  DeviceSN: UpdateDeviceSN,

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

          setUpdateHiveDimension('');
          setUpdateHiveWeight('');
          setUpdateHiveLocation('');
          setUpdateDescription('');
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const showHiveDataLocally = () => {

    return localHives.map((Hive, index) => {
      return (
        <View key={index} style={styles.hiveInfoContainer}>
          <Text style={styles.hiveInfoText}>Hive SIN: {Hive?.HiveSN}</Text>
          <Text style={styles.hiveInfoText}>Hive Name: {Hive?.HiveName}</Text>
          <Text style={styles.hiveInfoText}>Device SIN: {Hive?.DeviceSN}</Text>

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


  const showHiveDataRemotelly = () => {

    return myRemoteHive.map((Hive, index) => {
      return (
        <View key={index} style={styles.hiveInfoContainer}>
          <Text style={styles.hiveInfoText}>Hive SIN: {Hive?.HiveSN}</Text>
          <Text style={styles.hiveInfoText}>Hive Name: {Hive?.HiveName}</Text>
          <Text style={styles.hiveInfoText}>Device SIN: {Hive?.DeviceSN}</Text>

          <Text style={styles.hiveInfoText}>Hive Dimension: {Hive?.HiveDimension}</Text>
          <Text style={styles.hiveInfoText}>Hive Weight: {Hive?.HiveWeight}</Text>
          <Text style={styles.hiveInfoText}>Hive Location: {Hive?.HiveLocation}</Text>
          <Text style={styles.hiveInfoText}>Hive Description: {Hive?.Description}</Text>

          {remoteHiveId === Hive._id ? (
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

              <TouchableOpacity onPress={() => updateRemoteHive(Hive._id)}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity onPress={() => deleteRemoteHive(Hive.id)}>
                <Text style={styles.deleteButton}>DELETE</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setRemoteHiveId(Hive._id)}>
                <Text style={styles.update}>Update</Text>
              </TouchableOpacity>
            </View>
          )}

          <Image source={require('../../assets/images/bee11.jpg')} style={{ width: 100, height: 100, resizeMode: 'cover', borderRadius: 8, marginTop: 10 }} />
        </View>
      );
    });
  };
  /////////// push notification user effect
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
        placeholder="Hive Dimension"
        value={HiveDimension}
        onChangeText={(text) => setHiveDimension(text)}

      />


      <TextInput
        style={styles.input}
        placeholder="Hive Weight"
        value={HiveWeight}
        onChangeText={(text) => setHiveWeight(text)}

        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Hive Location"
        value={HiveLocation}
        onChangeText={(text) => setHiveLocation(text)}

        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={Description}
        onChangeText={(text) => setDescription(text)}

      />

      <TouchableOpacity style={styles.button} onPress={addHive}>
        <Text style={styles.buttonText}>Create Hive</Text>
      </TouchableOpacity>



      <TouchableOpacity style={styles.button} onPress={() => {
        // addLocalHive(HiveSN, HiveName, DeviceSN, HiveDimension, HiveWeight, HiveLocation, Description);
        addHive(HiveSN, HiveName, DeviceSN, HiveDimension, HiveWeight, HiveLocation, Description);

      }
      }>

        <Text style={styles.buttonText}>Create Local Hive</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {
        deleteAllFromLocalHive()
      }
      }>
        <Text style={styles.buttonText}>Delet All From  Local Hive</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={async () => {
        await schedulePushNotification();
      }}>
        <Text style={styles.buttonText}>send notification</Text>
      </TouchableOpacity>

      <View style={styles.localHivesContainer}>
        <Text style={styles.localHivesTitle}>Local Hives:</Text>

        {renderHivesInGrid()}

        {showHiveDataLocally()}
      </View>

      <View style={styles.localHivesContainer}>
        <Text style={styles.localHivesTitle}>Remote  Hives:</Text>
        {showHiveDataRemotelly()}

      </View>
    </ScrollView>
  );
};

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: " Created a New Hive Succefully!!!! ",
      body: 'thanks for creating a new hive we wish you a striving Colony',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
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
