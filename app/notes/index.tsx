import AddNoteModal from "@/components/notes/AddNoteModal";
import NoteList from "@/components/notes/NoteList";
import UpdateNoteModal from "@/components/notes/updateNoteModal";
import { useAuth } from "@/contexts/authContext";
import noteService from "@/services/noteService";
import { Href, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Models } from "react-native-appwrite";
import colors from "../config/colors";

import {
  default as AddIcon,
  default as EventNoteIcon,
} from "react-native-vector-icons/MaterialIcons";

const NoteScreen = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [newNote, setNewNote] = useState<string>("");
  const [notes, setNotes] = useState<Models.Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState({
    id: "",
    text: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/auth" as Href);
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  //Get notes
  const fetchNotes = async () => {
    setLoading(true);

    if (user && user.$id) {
      const response = await noteService.getNotes(user?.$id);

      if (response?.error) {
        setError(response.error);
        Alert.alert("Error:", response.error);
      } else if (response?.data) {
        setNotes(response.data);
        setError(null);
      }
      setLoading(false);
    }
  };

  //Add new note
  const addNote = async () => {
    if (newNote.trim() === "") return;

    if (user && user.$id) {
      const response = await noteService.addNote(user?.$id, newNote);
      if (response?.error) {
        Alert.alert("Error:", response.error);
      } else if (response?.data && !("error" in response.data)) {
        setNotes([...notes, response.data as Models.Document]);
      }
    }

    setNewNote("");
    hideModal();
  };

  //Handle update icon click
  const handleClickUpdate = (id: string, text: string) => {
    setNewNote(text);
    setUpdateModalVisible(true);
    setSelectedNote({
      id: id,
      text: text,
    });
  };

  //Update note
  const updateNote = async () => {
    if (newNote.trim() === "") return;

    console.log(selectedNote.id, selectedNote.text);

    const response = await noteService.updateNote(selectedNote.id, newNote);

    console.log("updating");

    if (response?.error) {
      console.log("error in if");
      Alert.alert("Error:", response.error);
    } else if (response?.data && !("error" in response.data)) {
      console.log("error in else if");
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.$id === selectedNote.id
            ? (response.data as Models.Document)
            : note
        )
      );
    }

    setNewNote("");
    hideUpdateModal();
  };

  //Delete note
  const deleteNote = async (id: string) => {
    Alert.alert("Delete note", "Do you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const response = await noteService.deleteNote(id);
          if (response.error) {
            Alert.alert("Error", response.error);
          } else {
            setNotes(notes.filter((note) => note.$id !== id));
          }
        },
      },
    ]);
  };

  const handleInputChange = (textInput: string) => {
    setNewNote(textInput);
  };

  const hideModal = () => {
    setModalVisible(false);
  };
  const showModal = () => {
    setModalVisible(true);
  };

  const hideUpdateModal = () => {
    setUpdateModalVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size={"large"} color={"#007bff"} />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}

          {notes.length === 0 ? (
            <View style={styles.noNotesContainer}>
              <EventNoteIcon
                name="event"
                size={60}
                color={colors.neutral.lightGray}
              />
              <Text style={styles.noNotesText}>No notes added yet</Text>
            </View>
          ) : (
            <NoteList
              notes={notes}
              onUpdate={handleClickUpdate}
              onDelete={deleteNote}
            />
          )}
        </>
      )}
      <TouchableOpacity onPress={showModal} style={styles.addNoteButton}>
        <AddIcon name="add" size={35} color={colors.neutral.white} />
      </TouchableOpacity>

      {/* Modal */}
      <AddNoteModal
        addNote={addNote}
        hideModal={hideModal}
        modalVisible={modalVisible}
        newNote={newNote}
        onInputChange={handleInputChange}
      />

      <UpdateNoteModal
        newNote={newNote}
        onInputChange={handleInputChange}
        modalVisible={updateModalVisible}
        onCancel={() => {
          setNewNote("");
          hideUpdateModal();
        }}
        updateNote={updateNote}
      />
    </SafeAreaView>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.neutral.white,
  },
  addNoteButton: {
    position: "absolute",
    width: 60,
    height: 60,
    aspectRatio: 1,
    bottom: 25,
    right: 15,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: colors.accent.main,
    borderRadius: "50%",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 17,
  },
  noNotesContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flexDirection: "column",
    height: "70%",
  },
  noNotesText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.secondary,
    marginTop: 15,
  },
});
