import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ImageBackground, Button } from 'react-native';

const UserDashboard = ({ navigation }) => {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(1);

  const toggleMenu = () => {
    setMenuVisibility(!isMenuVisible);
  };

  const handleRegularFunction = () => {
    navigation.navigate('HivesScreen'); // Update with the correct screen name for hive information
    toggleMenu();
  };

  const handleUpdates = () => {
    navigation.navigate('RecipeList');
    toggleMenu();
  };

  const handleNews = () => {
    navigation.navigate('News');
    toggleMenu();
  };

  const handleViewAnalytics = () => {
    navigation.navigate('AnalyticsScreen');
    toggleMenu();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImageIndex((prevIndex) => (prevIndex % 3) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getBackgroundImage = () => {
    switch (backgroundImageIndex) {
      case 1:
        return require('../../assets/images/bee11.jpg');
      case 2:
        return require('../../assets/images/bee12.jpg');
      case 3:
        return require('../../assets/images/bee11.jpg');
      default:
        return require('../../assets/images/bee12.jpg');
    }
  };

  return (
    <ImageBackground source={getBackgroundImage()} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>🚀 User Dashboard 🚀</Text>
        <TouchableOpacity style={styles.hamburgerButton} onPress={toggleMenu}>
          <View style={styles.hamburgerIcon}>
            <View style={[styles.line, { backgroundColor: '#000000' }]}></View>
            <View style={[styles.line, { backgroundColor: '#000000' }]}></View>
            <View style={[styles.line, { backgroundColor: '#000000' }]}></View>
          </View>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isMenuVisible}
          onRequestClose={() => {
            setMenuVisibility(!isMenuVisible);
          }}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={handleUpdates}>
              <Text style={styles.menuItemText}> Hives Info</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleNews}>
              <Text style={styles.menuItemText}>News</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleViewAnalytics}>
              <Text style={styles.menuItemText}>View Analytics</Text>
            </TouchableOpacity>
            <Button title="Close" onPress={toggleMenu} />
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
    textAlign: 'center',
  },
  hamburgerButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  hamburgerIcon: {
    width: 30,
    height: 30,
    justifyContent: 'space-between',
  },
  line: {
    height: 4,
    width: '100%',
    backgroundColor: '#000000',
    borderRadius: 2,
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuItem: {
    backgroundColor: '#3498db',
    borderRadius: 18,
    paddingVertical: 18,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  menuItemText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default UserDashboard;
