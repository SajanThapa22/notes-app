import { PostItImage } from "@/assets/images";
import Screen from "@/components/shared/Screen";
import { useAuth } from "@/contexts/authContext";
import { Href, useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import colors from "./config/colors";

export default function HomeScreen() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/notes" as Href);
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <Screen>
        <View style={styles.container}>
          <Image style={styles.image} source={PostItImage} />
          <Text style={styles.title}>Welcome to Notes App</Text>
          <Text style={styles.subTitle}>
            Capture your thoughts anytime, anywhere
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/notes" as Href)}
          >
            <Text style={styles.buttonText}>Get started</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.text.primary,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 20,
    color: colors.text.secondary,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.accent.main,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: colors.neutral.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  centeredContainer: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});
