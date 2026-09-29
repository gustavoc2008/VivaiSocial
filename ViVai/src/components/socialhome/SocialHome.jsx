import { Image, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { SocialHomeStyle } from './SocialHomeStyle';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export const SocialHome = () => {
    const router = useRouter();

    return (
        <View style={SocialHomeStyle.container}>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />

            <Image
                source={require('../../../assets/fundo.png')}
                style={SocialHomeStyle.backgroundImage}
                resizeMode="cover"
            />

            <View style={SocialHomeStyle.opacity} />

            <SafeAreaView style={{ flex: 1 }}>
                <View style={SocialHomeStyle.boxContainer}>
                    <Image
                        source={require('../../../assets/712a884c-15f9-45b6-a83a-48e3c34d4494__1_-removebg-preview.png')}
                        style={SocialHomeStyle.logo}
                    />

                    <Text style={SocialHomeStyle.title}>
                        Vi<Text style={SocialHomeStyle.titleVai}>vaí</Text>
                    </Text>

                    <Text style={SocialHomeStyle.description}>
                        conecte-se, compartilhe{'\n'}e descubra novas histórias.
                    </Text>
                </View>

                <View style={SocialHomeStyle.bottomContainer}>
                    <TouchableOpacity
                        style={SocialHomeStyle.buttonStart}
                        onPress={() => router.push('/vivai/cadastro')}
                    >
                        <Text style={SocialHomeStyle.buttonStartText}>Começar agora</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={SocialHomeStyle.buttonEntry}
                        onPress={() => router.push('/vivai/login')}
                    >
                        <Text style={SocialHomeStyle.buttonEntryText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};
