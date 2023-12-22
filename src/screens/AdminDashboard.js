import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ImageBackground, Button } from 'react-native';

const AdminDashboard = ({ navigation }) => {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(1);

  const toggleMenu = () => {
    setMenuVisibility(!isMenuVisible);
  };

  const manageUsers = () => {
    navigation.navigate('ManageUsers');
    toggleMenu();
  };

  const manageContent = () => {
    navigation.navigate('AdminNewsScreen');
    toggleMenu();
  };

  const viewAnalytics = () => {
    navigation.navigate('AnalyticsScreen');
    toggleMenu();
  };

  const handleUpdates = () => {
    navigation.navigate('RecipeList');
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
        <Text style={styles.title}>🚀Admin Dashboard 🚀</Text>
        <TouchableOpacity style={styles.hamburgerButton} onPress={toggleMenu}>
          <Text style={styles.hamburgerButtonText}>☰</Text>
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
            <TouchableOpacity style={styles.menuItem} onPress={manageUsers}>
              <Text style={styles.menuItemText}>Manage Users</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={manageContent}>
              <Text style={styles.menuItemText}>Manage Content</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={viewAnalytics}>
              <Text style={styles.menuItemText}>View Analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleUpdates}>
              <Text style={styles.menuItemText}>Hives info</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleUpdates}>
              <Text style={styles.menuItemText}>Hives info</Text>
            </TouchableOpacity>
            
            {/* Additional menu items for other functionalities */}
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
  },
  hamburgerButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
    
  },
  hamburgerButtonText: {
    fontSize: 60,
    color: '#000000', // Change the color to black
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
export default AdminDashboard;
