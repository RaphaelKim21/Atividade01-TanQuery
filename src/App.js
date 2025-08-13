import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from './api/posts';

export default function App() {
    const { data, isLoading, error, isError, isFetching, refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts, 
    });

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0e6816ff" />
                <Text style={styles.loadingText}>
                    Carregando usuários...
                </Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorTitle}>Erro ao carregar usuários</Text>
                <Text style={styles.errorMessage}>{error.message}</Text>
            </View>
        );
    }

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Lista de Usuários</Text>
            </View>
            
        <FlatList
            data={data}
            refreshing={isFetching} 
            onRefresh={refetch}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            renderItem={({item}) => (
                <View style={styles.card}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                    <Text style={styles.city}>Cidade: {item.address.city}</Text>
                </View>
            )}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212'
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#fff'
    },
    errorTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF4C4C'
    },
    errorMessage: {
        fontSize: 14,
        color: '#ccc',
        marginTop: 5
    },
    listContainer: {
        padding: 15,
        backgroundColor: '#121212'
    },
    card: {
        backgroundColor: '#1E1E1E',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#2A2A2A',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0e6816ff',
        marginBottom: 5
    },
    email: {
        fontSize: 14,
        color: '#ccc',
        marginBottom: 3
    },
    city: {
        fontSize: 14,
        color: '#aaa'
    },
    header:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0e6816ff'
    },
    textHeader:{
        fontSize: 20,
        fontWeight: '500',
        color: 'white'
    }
});
