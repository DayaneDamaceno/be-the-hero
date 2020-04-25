import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import * as MailCompose from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;

    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso: ${incident.title}, com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`;
    const phone = incident.whatsapp;
    const mail = incident.email;

    function navigateBack() {
        navigation.goBack();
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${phone}&text=${message}`);
    }

    function sendMail() {
        MailCompose.composeAsync({
            subject: `Heroi do caso: ${incident.title}`,
            recipients: [mail],
            body: message
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                
                <TouchableOpacity 
                        title="Voltar"
                        onPress={navigateBack}
                    >
                    <Feather name="arrow-left" size={18} color="#e02041"/>
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>
                
                <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
                <Text style={styles.incidentValue}>{incident.description}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o heroi desse caso</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>
                
                <View style={styles.actions}>
                    <View style={styles.action}>
                        <TouchableOpacity 
                            style={styles.detailsButton}
                            title="Whatsapp"
                            onPress={sendWhatsapp}
                        >
                            <Text style={{color: '#FFF', fontSize: 15, fontWeight: 'bold'}}>Whatsapp</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.action}>
                        <TouchableOpacity 
                            style={styles.detailsButton}
                            title="E-mail"
                            onPress={sendMail}
                        >
                            <Text style={{color: '#FFF', fontSize: 15, fontWeight: 'bold'}}>E-mail</Text>
                        </TouchableOpacity>
                    </View>
                    
                    
                </View>
                
            </View>
        </View>
    );
}


