import { AuthProvider, useAuth } from "@/contexts/authContext";
import { Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "./config/colors";

const HeaderLogout = () => {
  const { user, logout } = useAuth();

  return user ? (
    <TouchableOpacity style={styles.logoutButton} onPress={logout}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  ) : null;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary.main,
          },
          headerTintColor: colors.neutral.white,
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          headerRight: () => <HeaderLogout />,
          contentStyle: {
            paddingHorizontal: 10,
            paddingTop: 10,
            backgroundColor: colors.neutral.white,
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
        <Stack.Screen
          name="auth"
          options={{ headerTitle: "Login", headerTitleAlign: "center" }}
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
  logoutButton: {
    marginRight: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.primary.light,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
