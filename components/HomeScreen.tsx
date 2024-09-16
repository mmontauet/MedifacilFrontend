import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Button, Dimensions, Platform, Text } from 'react-native';
import MedicationForm from './MedicationForm';
import MedicationList from './MedicationList';
import { Medication } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './AppNavigator';

// Constantes para la lógica de la aplicación
const maximum_medications = 4; // Número máximo de medicamentos permitidos
const minimum_pc_width = 500; // Ancho mínimo para considerar una pantalla como PC

// Tipo de navegación específico para la pantalla Home
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// Propiedades esperadas por el componente HomeScreen
type Props = {
    navigation: HomeScreenNavigationProp;
};

// Componente funcional HomeScreen que acepta las propiedades definidas en Props
const HomeScreen: React.FC<Props> = ({ navigation }) => {
    // Estado para manejar la lista de medicamentos y el ancho de la ventana
    const [medications, setMedications] = useState<Medication[]>([]);
    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

    // Efecto para manejar los cambios en el tamaño de la ventana
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(Dimensions.get('window').width);
        };

        const subscription = Dimensions.addEventListener('change', handleResize);
        return () => {
            subscription?.remove();
        };
    }, []);

    // Función para agregar un nuevo medicamento a la lista
    const addMedication = (medication: Medication) => {
        if (medications.length < maximum_medications) {
            setMedications([...medications, medication]);
        } else {
            alert(`Solo puedes agregar hasta ${maximum_medications} opciones. Borra alguna antes de continuar`);
        }
    };

    // Función para eliminar un medicamento de la lista
    const removeMedication = (index: number) => {
        setMedications(medications.filter((_, i) => i !== index));
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Encabezado de la aplicación */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.title}>Medifácil</Text>
                </View>
            </View>
            {/* Contenido principal de la pantalla, ajustado según el ancho de la ventana */}
            <View style={windowWidth > minimum_pc_width ? styles.contentWrapperWide : styles.contentWrapperNarrow}>
                <View style={[styles.content, windowWidth > minimum_pc_width ? styles.contentWide : styles.contentNarrow]}>
                    <MedicationForm addMedication={addMedication} />
                    <MedicationList medications={medications} removeMedication={removeMedication} />
                    <Button
                        title="COTIZAR"
                        onPress={() => navigation.navigate('Quote', { medications })}
                        disabled={medications.length === 0}
                        color="#1E90FF"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

// Definición de los estilos utilizados en el componente HomeScreen
const styles = StyleSheet.create({
    // Estilo para el encabezado
    header: {
        backgroundColor: '#E6F0FA', // Fondo celeste claro
        padding: 16,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E90FF',
        marginLeft: 8,
    },
    // Estilo para el contenedor principal
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    // Estilos para el contenedor del contenido principal
    contentWrapperWide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentWrapperNarrow: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    content: {
        padding: 30,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    contentWide: {
        width: 500,
    },
    contentNarrow: {
        width: '90%',
        marginTop: 24,
    },
});

export default HomeScreen; // Exporta el componente HomeScreen como el valor por defecto del módulo
