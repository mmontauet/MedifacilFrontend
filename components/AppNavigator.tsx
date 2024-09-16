// Importaciones necesarias desde React y React Navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import QuoteScreen from './QuoteScreen';
import { Medication } from '../types';

// Definición de los parámetros que acepta cada pantalla en la pila de navegación
export type RootStackParamList = {
    Home: undefined; // La pantalla Home no requiere parámetros
    Quote: { medications: Medication[] }; // La pantalla Quote recibe un arreglo de objetos Medication como parámetro
};

// Creación del stack navigator utilizando los parámetros definidos en RootStackParamList
const Stack = createStackNavigator<RootStackParamList>();

// Componente funcional AppNavigator que define la estructura de navegación de la aplicación
const AppNavigator: React.FC = () => {
    return (
        // NavigationContainer es el contenedor principal que gestiona el estado de navegación
        <NavigationContainer>
            {/* Definición del stack navigator con dos pantallas: Home y Quote */}
            <Stack.Navigator initialRouteName="Home">
                {/* Pantalla Home, sin mostrar el encabezado */}
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                {/* Pantalla Quote, sin mostrar el encabezado */}
                <Stack.Screen name="Quote" component={QuoteScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator; // Exporta el componente AppNavigator como el valor por defecto del módulo
