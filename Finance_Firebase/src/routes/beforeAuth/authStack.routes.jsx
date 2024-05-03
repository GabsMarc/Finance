import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { Welcome } from '../../screens/main/Welcome';
import { Infos } from '../../screens/main/Infos';
import { Register } from '../../screens/main/Register';
import { Login } from '../../screens/main/Login';
import { NavigationContainer } from '@react-navigation/native';
import { EditCard } from '../../screens/secondary/EditCard';



const Stack = createNativeStackNavigator();


export function AuthStack() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Welcome}>
                <Stack.Group screenOptions={{ headerShown: false }}>

                    <Stack.Screen
                        name='Welcome'
                        component={Welcome}
                    />

                    <Stack.Screen
                        name='Login'
                        component={Login}
                    />

                    <Stack.Screen
                        name='Register'
                        component={Register}
                    />

                    <Stack.Screen
                        name='Infos'
                        component={Infos}
                    />

                    <Stack.Screen
                    name='EditCard'
                    component={EditCard}
                    />
                    
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>

    )
}