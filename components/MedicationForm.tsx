import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Medication } from '../types';
import formStyles from '../styles/formStyles';

// Definición de las propiedades que acepta el componente MedicationForm
interface MedicationFormProps {
    addMedication: (medication: Medication) => void; // Función para agregar un nuevo medicamento
}

// Componente funcional MedicationForm que acepta las propiedades definidas en MedicationFormProps
const MedicationForm: React.FC<MedicationFormProps> = ({ addMedication }) => {
    // Estados locales para manejar el nombre, presentación y cantidad del medicamento
    const [name, setName] = useState('');
    const [presentation, setPresentation] = useState('Tabletas');
    const [quantity, setQuantity] = useState('1');

    // Función para manejar la adición de un nuevo medicamento
    const handleAdd = () => {
        if (name && presentation && quantity) {
            let quantity_int = parseInt(quantity);

            if (quantity_int <= 0) {
                alert("La cantidad debe ser mayor a 0");
            } else {
                // Llama a la función addMedication con los datos del nuevo medicamento
                addMedication({ name, presentation, quantity: quantity_int });
                // Reinicia los campos del formulario
                setName('');
                setPresentation('Tabletas');
                setQuantity('1');
            }
        }
    };

    /*
    Función para manejar el cambio en la cantidad, solo permite números
    const handleQuantityChange = (text: string) => {
        if (/^\d*$/.test(text)) {
            setQuantity(text);
        }
    };
    */

    return (
        <View>
            <TextInput
                style={formStyles.input}
                placeholder="Nombre del medicamento"
                value={name}
                onChangeText={setName}
            />
            <View style={styles.horizontalContainer}>
                <Picker
                    selectedValue={presentation}
                    onValueChange={(itemValue) => setPresentation(itemValue as string)}
                    style={[formStyles.input, styles.picker]}
                >
                    <Picker.Item label="Otros" value="Otros" />
                    <Picker.Item label="Tabletas" value="Tabletas" />
                    <Picker.Item label="Gotas" value="Gotas" />
                </Picker>
                {/* Removido y establecido por defecto la cantidad a 1
                <TextInput
                    style={[formStyles.input, styles.quantity]}
                    placeholder="Cantidad"
                    value={quantity}
                    onChangeText={handleQuantityChange}
                    keyboardType="numeric"
                />*/}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleAdd}>
                <Text style={styles.buttonText}>AGREGAR</Text>
            </TouchableOpacity>
        </View>
    );
};

// Definición de los estilos utilizados en el componente MedicationForm
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fcfeff', // Fondo casi blanco
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#1E90FF', // Letras azules
        fontSize: 16,
        fontWeight: 'bold',
    },
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    picker: {
        flex: 1,
    },
    quantity: {
        flex: 1,
    }
});

export default MedicationForm; // Exporta el componente MedicationForm como el valor por defecto del módulo
