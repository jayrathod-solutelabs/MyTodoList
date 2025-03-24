import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    baseContainer: {
        flex: 1,
        backgroundColor: '#F1F5F9',
        width: '100%'
    },
    categoryWorkBgColorr: {
        backgroundColor: '#DBECF6'
    },
    categoryEventBgColor: {
        backgroundColor: '#E7E2F3'
    },
    categoryPersonalBgColor: {
        backgroundColor: '#FEF5D3'
    },
    categoryOtherBgColor: {
        backgroundColor: '#F5F5F5'
    },
    categoryIcon: {
        height: 22,
        width: 22
    },
    inputIcon: {
        width: 20,
        height: 20,
        marginRight: 5
    },
    addButtonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
        fontFamily: 'Inter-Bold'
    },
    categoryIconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },

});
