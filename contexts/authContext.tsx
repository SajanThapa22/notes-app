import authService from "@/services/authService";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Models } from "react-native-appwrite";

interface ErrorResponse {
  error: string;
}

// Define the context shape
interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: true } | { error: string }>;
  register: (
    email: string,
    password: string
  ) => Promise<{ success: true } | { error: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    setLoading(true);
    const response = await authService.getUser();

    if ((response as any)?.error) {
      setUser(null);
    } else {
      setUser(response as Models.User<Models.Preferences>);
    }

    setLoading(false);
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: true } | { error: string }> => {
    const response = await authService.login(email, password);

    if ("error" in response) {
      return response;
    }

    await checkUser();
    return { success: true };
  };

  const register = async (
    email: string,
    password: string
  ): Promise<{ success: true } | { error: string }> => {
    const response = await authService.register(email, password);

    if (!response || "error" in response) {
      return {
        error: (response as ErrorResponse)?.error ?? "Registration failed",
      };
    }

    return login(email, password);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    await checkUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
