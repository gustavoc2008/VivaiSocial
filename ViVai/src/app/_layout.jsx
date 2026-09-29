import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../context/Context";

export default function Layout() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#171717"
                />

                <Stack
                    screenOptions={{
                        headerShown: false,
                        contentStyle: { backgroundColor: "#171717" },
                    }}
                />
            </AuthProvider>
        </SafeAreaProvider>
    );
}