import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    let messageToSend = newMessage.trim() === '' ? 'Hello, how can I help you?' : newMessage;

    // Add the new message to the messages state
    setMessages([...messages, { id: messages.length, text: messageToSend, user: 'user' }]);
    
    // Clear the input field
    setNewMessage('');
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Display chat messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={item.user === 'user' ? styles.userContainer : styles.adminContainer}>
            <Text style={item.user === 'user' ? styles.userText : styles.adminText}>
              {item.text}
            </Text>
          </View>
        )}
      />

      {/* Input field for new messages */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#3498db',
    padding: 8,
    marginVertical: 8,
    borderRadius: 8,
    maxWidth: '80%', // Limit width for better readability
  },
  adminContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 8,
    maxWidth: '80%', // Limit width for better readability
  },
  userText: {
    color: '#fff',
  },
  adminText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#f96163',
    padding: 8,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
