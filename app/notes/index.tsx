import AddNoteModal from "@/components/AddNoteModal";
import NoteList from "@/components/NoteList";
import { Note } from "@/types/notes";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NoteScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newNote, setNewNote] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, text: "Note one" },
    { id: 2, text: "Note two" },
    { id: 3, text: "Note three" },
    { id: 4, text: "Note four" },
  ]);

  const addNote = () => {
    if (newNote.trim() === "") return;
    const note = {
      id: notes.length + 1,
      text: newNote,
    };
    setNotes((prevNotes) => [...prevNotes, note]);
    setNewNote("");
    setModalVisible(false);
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
      {/* Node List */}
      <NoteList notes={notes} />
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
});
