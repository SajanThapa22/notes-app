import AddNoteModal from "@/components/AddNoteModal";
import NoteList from "@/components/NoteList";
import UpdateNoteModal from "@/components/updateNoteModal";
import { useAuth } from "@/contexts/authContext";
import noteService from "@/services/noteService";
import { Href, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Models } from "react-native-appwrite";

interface Note {
  id: string;
  text: string;
}

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

    const response = await noteService.updateNote(
      selectedNote.id,
      selectedNote.text
    );

    if (response?.error) {
      Alert.alert("Error:", response.error);
    } else if (response?.data && !("error" in response.data)) {
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
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={"large"} color={"#007bff"} />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          {/* Node List */}
          <NoteList
            notes={notes}
            onUpdate={handleClickUpdate}
            onDelete={deleteNote}
          />
        </>
      )}
      <TouchableOpacity onPress={showModal} style={styles.button}>
        <Text style={styles.buttonText}>+Add Notes</Text>
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
        selectedNote={selectedNote}
        updateNote={updateNote}
      />
    </View>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    marginBottom: 15,
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
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 17,
  },
});
