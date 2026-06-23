import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SQLiteProvider } from "expo-sqlite";
import { inicializarBanco } from "./src/database/database";
import { HomeScreen } from "./src/screens/HomeScreen";
import { CadastroScreen } from "./src/screens/CadastroScreen";

export type RootStackParamList = {
  Home: undefined;
  Cadastro: { idParaEditar?: number } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SQLiteProvider databaseName="helppet_v2.db" onInit={inicializarBanco}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "HelpPet - Animais" }}
          />
          <Stack.Screen
            name="Cadastro"
            component={CadastroScreen}
            options={{ title: "Registrar / Editar" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
