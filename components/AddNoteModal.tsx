import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  modalVisible: boolean;
  hideModal: () => void;
  newNote: string;
  onInputChange: (textInput: string) => void;
  addNote: () => void;
}

const AddNoteModal = ({
  modalVisible,
  hideModal,
  newNote,
  onInputChange,
  addNote,
}: Props) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent
      onRequestClose={hideModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}></Text>
          <TextInput
            style={styles.input}
            placeholder="Enter note..."
            placeholderTextColor="#aaa"
            value={newNote}
            onChangeText={onInputChange}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={hideModal}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                addNote();
              }}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddNoteModal;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007bff",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});
