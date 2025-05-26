import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Models } from "react-native-appwrite";
import {
  default as DeleteOutlineIcon,
  default as EditOutlinedIcon,
} from "react-native-vector-icons/MaterialIcons";

interface NoteItemProps {
  note: Models.Document;
  onUpdate: (id: string, text: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onUpdate, onDelete }) => {
  return (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{note.text}</Text>

      <View style={styles.buttonsContainer}>
        {/* Update button */}
        <TouchableOpacity onPress={() => onUpdate(note.$id, note.text)}>
          <EditOutlinedIcon name="edit" size={30} color="black" />
        </TouchableOpacity>

        {/* Delete button */}
        <TouchableOpacity onPress={() => onDelete(note.$id)}>
          <DeleteOutlineIcon name="delete-outline" size={30} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoteItem;

const styles = StyleSheet.create({
  noteText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "space-between",
    alignItems: "center",
  },
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
