import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Text } from "@rneui/base"
import { useEffect } from "react";
import { ImageBackground, StatusBar, View } from "react-native"

// Importing the necessary libraries and components
type RootStackParamList = {
    ZellerCustomers: undefined;
};

const SplashScreen = () => {
    // Variable used to navigate to the ZellerCustomers screen
    const navigation = useNavigation<import('@react-navigation/native').NavigationProp<RootStackParamList>>();
    // Variable used to check if the screen is focused
    const isFocused = useIsFocused();

    // Function to navigate to the ZellerCustomers screen
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('ZellerCustomers');
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View accessible accessibilityLabel="splashScreen" style={{ flex: 1, backgroundColor: '#ffffff' }}>
            {isFocused && <StatusBar backgroundColor={"transparent"} translucent={true} barStyle={'light-content'} />}
            <ImageBackground source={require('../assets/splash.png')} style={{ height: '100%', width: '100%', alignItems: "center", justifyContent: "center" }} resizeMode="cover" >
                <Text style={{ fontSize: 30, color: "#ffff" }}>Welcome to</Text>
                <Text style={{ fontSize: 25, color: "#ffff" }}>Zeller</Text>
            </ImageBackground>
        </View >
    )
}

export default SplashScreen