import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Models } from "react-native-appwrite";
import {
  default as DeleteOutlineIcon,
  default as EditOutlinedIcon,
} from "react-native-vector-icons/MaterialIcons";

interface NoteItemProps {
  note: Models.Document;
  onUpdate: (id: string, text: string) => void;
  // onUpdate: (id: string, text: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onUpdate, onDelete }) => {
  return (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{note.text}</Text>

      <View style={styles.buttonsContainer}>
        {/* Update button */}
        <TouchableOpacity onPress={() => onUpdate(note.$id, note.text)}>
          <EditOutlinedIcon name="edit" size={30} color="dodgerblue" />
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
});
