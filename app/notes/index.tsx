import AddNoteModal from "@/components/AddNoteModal";
import NoteList from "@/components/NoteList";
import noteService from "@/services/noteService";
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

const NoteScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newNote, setNewNote] = useState<string>("");
  const [notes, setNotes] = useState<Models.Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    const response = await noteService.getNotes();

    if (response.error) {
      setError(response.error);
      Alert.alert("Error:", response.error);
    } else if (response.data) {
      setNotes(response.data);
      setError(null);
    }

    setLoading(false);
  };

  //Add new note
  const addNote = async () => {
    if (newNote.trim() === "") return;

    const response = await noteService.addNote(newNote);

    if (response?.error) {
      Alert.alert("Error:", response.error);
    } else if (response?.data && !("error" in response.data)) {
      setNotes([...notes, response.data as Models.Document]);
    }

    setNewNote("");
    hideModal();
  };

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

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={"large"} color={"#007bff"} />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          {/* Node List */}
          <NoteList notes={notes} onDelete={deleteNote} />
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
