import { StyleSheet, Text, View } from "react-native";

const AuthScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Auth</Text>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
});
