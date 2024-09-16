import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Medication } from '../types';
import Icon from 'react-native-vector-icons/FontAwesome';

// Definición de las propiedades que acepta el componente MedicationList
interface MedicationListProps {
    medications: Medication[]; // Lista de medicamentos a mostrar
    removeMedication: (index: number) => void; // Función para eliminar un medicamento de la lista
}

// Componente funcional MedicationList que acepta las propiedades definidas en MedicationListProps
const MedicationList: React.FC<MedicationListProps> = ({ medications, removeMedication }) => {
    return (
        <View style={{ minHeight: 128 }}>
            {medications.map((med, index) => (
                <View key={index} style={styles.medicationItem}>
                    <TouchableOpacity style={styles.roundButton} onPress={() => removeMedication(index)}>
                        <Icon name="minus" size={18} color="#E6F0FA" />
                    </TouchableOpacity>
                    <Text>{`${med.quantity} ${med.presentation}(s) - ${med.name}`}</Text>
                </View>
            ))}
        </View>
    );
};

// Definición de los estilos utilizados en el componente MedicationList
const styles = StyleSheet.create({
    roundButton: {
        backgroundColor: '#1E90FF', // Fondo azul
        width: 24,
        height: 24,
        borderRadius: 20, // Hace el botón redondo
        justifyContent: 'center',
        alignItems: 'center',
    },
    medicationItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E6F0FA', // Fondo celeste claro
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
});

export default MedicationList; // Exporta el componente MedicationList como el valor por defecto del módulo
