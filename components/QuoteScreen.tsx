import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Medication } from '../types';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SECRET_TOKEN } from '@env';

// Definición de los parámetros que acepta cada pantalla en la pila de navegación
type RootStackParamList = {
    Home: undefined;
    Quote: { medications: Medication[] };
};

// Tipos específicos para las propiedades de navegación y ruta en QuoteScreen
type QuoteScreenRouteProp = RouteProp<RootStackParamList, 'Quote'>;
type QuoteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Quote'>;

// Propiedades esperadas por el componente QuoteScreen
type Props = {
    route: QuoteScreenRouteProp;
};

// Componente funcional QuoteScreen que acepta las propiedades definidas en Props
const QuoteScreen: React.FC<Props> = ({ route }) => {
    const navigation = useNavigation<QuoteScreenNavigationProp>();
    const { medications } = route.params;
    const [sortedPharmas, setSortedPharmas] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAscending, setIsAscending] = useState<boolean>(false);

    // Efecto para buscar los datos de las farmacias
    useEffect(() => {
        const fetchPharmas = async () => {
            try {
                // Se inyecta la presentación para mejorar el match
                const response = await fetch(`http://127.0.0.1:5000/search?name=${medications.map(med => `${med.name} ${med.presentation}`).join(',')}&token=${SECRET_TOKEN}`);
                const data = await response.json();
                console.log(data);
                setSortedPharmas(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };
        setIsLoading(true);
        fetchPharmas();
    }, [medications]);

    // Función para ordenar las farmacias por precio
    const sortPharmas = () => {
        const sorted = [...sortedPharmas].sort((a, b) => {
            const priceA = a.products.reduce((acc: number, product: any) => acc + (product.price || 0), 0);
            const priceB = b.products.reduce((acc: number, product: any) => acc + (product.price || 0), 0);
            return isAscending ? priceA - priceB : priceB - priceA;
        });
        setSortedPharmas(sorted);
        setIsAscending(!isAscending);
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1E90FF" />
            </View>
        );
    }

    return (
        <View>
            {/* Encabezado de la pantalla */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="arrow-left" size={24} color="#1E90FF" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Medifácil</Text>
                </View>
            </View>
            {/* Contenido principal de la pantalla */}
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.warningContainer}>
                    <Icon name="exclamation-triangle" size={24} color="#FF0000" />
                    <Text style={styles.warningText}>Importante: Los precios son referenciales, tomados de las páginas web de las principales farmacias del Norte de Quito.</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={sortPharmas} style={styles.sortContainer}>
                        <Text style={styles.sortText}>Precio: Menor a Mayor</Text>
                        <FontAwesome5 name={isAscending ? "sort-amount-down" : "sort-amount-up"} size={24} color="#1E90FF" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.resultsText}>{sortedPharmas.length} Resultados</Text>
                {sortedPharmas.map((pharma, index) => {
                    const total = pharma.products.reduce((acc: number, product: any) => acc + (product.price || 0), 0).toFixed(2);
                    return (
                        <TouchableOpacity key={index} style={styles.pharmaCard} onPress={() => Linking.openURL(pharma.link)}>
                            <View style={styles.pharmaHeader}>
                                <View>
                                    <Text style={styles.pharmaName}>{pharma.name}</Text>
                                    <Text style={styles.pharmaLocation}>{pharma.location}</Text>
                                </View>
                                <Text style={styles.totalPrice}>${total}</Text>
                            </View>
                            <Text style={{ marginBottom: 8 }}><i>Encontrados {pharma.products.filter((product: any) => product.found).length} de {pharma.products.length} medicamentos</i></Text>
                            {pharma.products.map((product: any, idx: any) => (
                                <TouchableOpacity key={idx} style={styles.product} onPress={() => product.link && Linking.openURL(product.link)}>
                                    <Text style={{ fontSize: 16, lineHeight: 16 }}>{product.name}</Text>
                                    <Text style={{ fontSize: 16, lineHeight: 16 }}>{product.found ? `$${parseFloat(product.price)?.toFixed(2)}` : 'No disponible'}</Text>
                                </TouchableOpacity>
                            ))}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

// Definición de los estilos utilizados en el componente QuoteScreen
const styles = StyleSheet.create({
    container: {
        padding: 48,
        backgroundColor: '#ffffff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
    backButton: {
        marginRight: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E90FF',
        marginLeft: 8,
    },
    warningContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFE6E6',  // Fondo rosado
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        borderColor: '#FF6F6F',  // Bordes rosados más claros
    },
    warningText: {
        color: '#FF6F6F',  // Texto rosado
        marginLeft: 8,
        flex: 1,
        flexWrap: 'wrap',
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        padding: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
    },
    sortText: {
        fontSize: 16,
        color: '#333333',
    },
    resultsText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    pharmaCard: {
        padding: 16,
        backgroundColor: '#E6F0FA', // Fondo celeste claro
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    pharmaHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    pharmaLogo: {
        width: 50,
        height: 50,
        marginRight: 8,
    },
    pharmaName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    pharmaLocation: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'flex-end',
    },
    product: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
});

export default QuoteScreen; // Exporta el componente QuoteScreen como el valor por defecto del módulo
