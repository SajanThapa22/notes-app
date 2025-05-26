import React from "react";
import { FlatList } from "react-native";
import { Models } from "react-native-appwrite";
import NoteItem from "./NoteItem";

interface NoteListProps {
  notes: Models.Document[];
  onUpdate: (id: string, text: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onUpdate, onDelete }) => {
  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <NoteItem note={item} onDelete={onDelete} onUpdate={onUpdate} />
      )}
    />
  );
};

export default NoteList;
