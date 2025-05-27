import { AuthProvider } from "@/contexts/authContext";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ff8c00",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          contentStyle: {
            paddingHorizontal: 10,
            paddingTop: 10,
            backgroundColor: "#fff",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "Home", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="notes"
          options={{ headerTitle: "Notes", headerTitleAlign: "center" }}
        />
      </Stack>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
  },
});
