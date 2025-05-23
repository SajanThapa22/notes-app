import { Notes } from "@/types/notes";
import React from "react";
import { FlatList } from "react-native";
import NoteItem from "./NoteItem";

const NoteList = ({ notes }: Notes) => {
  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <NoteItem note={item} />}
    />
  );
};

export default NoteList;
