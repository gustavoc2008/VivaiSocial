import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SocialHomeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },

    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
    },

    opacity: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },

    boxContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: height * 0.12,
    },

    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },

    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: 1,
    },

    titleVai: {
        color: '#E07C24',
    },

    description: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 15,
        paddingHorizontal: 40,
    },

    bottomContainer: {
        alignItems: 'center',
        paddingBottom: 40,
        paddingHorizontal: 25,
    },

    buttonStart: {
        width: '100%',
        height: 55,
        backgroundColor: '#E07C24',
        justifyContent: 'center',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    },

    buttonStartText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },

    buttonEntry: {
        width: '100%',
        height: 55,
        backgroundColor: '#000000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },

    buttonEntryText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});