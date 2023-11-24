import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingMessage, setEditingMessage] = useState(null);

  const handleSend = () => {
    let messageToSend =
      newMessage.trim() === ""
        ? "Hello user Kappy, how can I help you please?"
        : newMessage;

    if (editingMessage !== null) {
      // Edit the existing message
      const updatedMessages = messages.map((msg) =>
        msg.id === editingMessage
          ? { ...msg, text: newMessage, user: "user" }
          : msg
      );
      setMessages(updatedMessages);
      setEditingMessage(null);
    } else {
      // Add a new message to the messages state
      setMessages([
        ...messages,
        { id: messages.length, text: messageToSend, user: "user" },
      ]);
    }

    // Clear the input field
    setNewMessage("");
  };

  const handleEdit = (id, text) => {
    setEditingMessage(id);
    setNewMessage(text);
  };

  const handleDelete = (id) => {
    // Display a confirmation modal before deleting the message
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this message?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Delete", onPress: () => performDelete(id) },
      ]
    );
  };

  const performDelete = (id) => {
    // Delete the message with the given id
    const updatedMessages = messages.filter((msg) => msg.id !== id);
    setMessages(updatedMessages);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <View style={{ flex: 1, padding: 16 }}>
        {/* Display chat messages */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={
                item.user === "user"
                  ? styles.userContainer
                  : styles.adminContainer
              }
            >
              <Text
                style={
                  item.user === "user" ? styles.userText : styles.adminText
                }
              >
                {item.text}
              </Text>
              {item.user === "user" && (
                <View style={styles.messageOptions}>
                  <TouchableOpacity
                    onPress={() => handleEdit(item.id, item.text)}
                    style={styles.editButton}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(item.id)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#3498db",
    padding: 8,
    marginVertical: 8,
    borderRadius: 8,
    maxWidth: "80%", // Limit width for better readability
  },
  adminContainer: {
    
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 8,
    borderRadius: 8,
    maxWidth: "80%", // Limit width for better readability
  },
  userText: {
    color: "#fff",
  },
  adminText: {
    color: "#333",

  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fff",
    marginRight: 8,
    
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#f96163",
    padding: 8,
    borderRadius: 8,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  messageOptions: {
    flexDirection: "row",
    marginTop: 8,
    
  },
  editButton: {
    marginRight: 8,
    backgroundColor: "#2ecc71",
    padding: 8,
    borderRadius: 8,
  },
  editButtonText: {
    color: "#fff",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#fff",
  },
});

export default ChatScreen;
