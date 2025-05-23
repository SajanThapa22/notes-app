import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Note {
  note: { id: number; text: string };
}

const NoteItem = ({ note }: Note) => {
  return (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{note.text}</Text>
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
});
