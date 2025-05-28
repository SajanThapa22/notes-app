import colors from "@/app/config/colors";
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
          <EditOutlinedIcon name="edit" size={30} color={colors.accent.main} />
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
    color: colors.text.secondary,
    textAlign: "center",
  },
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.neutral.offWhite,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: colors.neutral.lightGray,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
