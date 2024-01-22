import React, { useState, useEffect } from "react";
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
// import Voice from "react-native-voice";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingMessage, setEditingMessage] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  // useEffect(() => {
  //   Voice.onSpeechStart = () => setIsRecording(true);
  //   Voice.onSpeechEnd = () => setIsRecording(false);

  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);

  const handleSend = () => {
    let messageToSend =
      newMessage.trim() === ""
        ? "Hello user Kappy, how can I help you please?"
        : newMessage;

    if (editingMessage !== null) {
      const updatedMessages = messages.map((msg) =>
        msg.id === editingMessage
          ? { ...msg, text: newMessage, user: "user" }
          : msg
      );
      setMessages(updatedMessages);
      setEditingMessage(null);
    } else {
      setMessages([
        ...messages,
        { id: messages.length, text: messageToSend, user: "user" },
      ]);
    }

    setNewMessage("");
  };

  const handleEdit = (id, text) => {
    setEditingMessage(id);
    setNewMessage(text);
  };

  const handleDelete = (id) => {
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
    const updatedMessages = messages.filter((msg) => msg.id !== id);
    setMessages(updatedMessages);
  };

  const handleVoiceNote = async () => {
    try {
      setIsRecording(true);
      await Voice.start("en-US");
    } catch (error) {
      console.error("Error starting voice note recording: ", error);
    }
  };

  const handleVoiceNoteStop = async () => {
    try {
      setIsRecording(false);
      await Voice.stop();
    } catch (error) {
      console.error("Error stopping voice note recording: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
              style={item.user === "user" ? styles.userText : styles.adminText}
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

      {/* <TouchableOpacity
        onPressIn={handleVoiceNote}
        onPressOut={handleVoiceNoteStop}
        style={[
          styles.voiceNoteButton,
          isRecording ? styles.recordingButton : null,
        ]}
      >
        <Text style={styles.voiceNoteButtonText}>
          {isRecording ? "Recording..." : "Hold to Record Voice Note"}
        </Text> */}
      {/* </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 16,
  },
  userContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#3498db",
    padding: 8,
    marginVertical: 8,
    borderRadius: 8,
    maxWidth: "80%",
  },
  adminContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 8,
    borderRadius: 8,
    maxWidth: "80%",
  },
  userText: {
    color: "#fff",
  },
  adminText: {
    color: "#333",
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
  voiceNoteButton: {
    backgroundColor: "#2ecc71",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  recordingButton: {
    backgroundColor: "#e74c3c",
  },
  voiceNoteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChatScreen;
