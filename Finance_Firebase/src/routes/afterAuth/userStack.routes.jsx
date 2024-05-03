import { EditCard } from '../../screens/secondary/EditCard';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dashboard } from '../../screens/main/Dashboard';

const Stack = createNativeStackNavigator();


export function UserStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Group screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name='Dashboard'
                        component={Dashboard}
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
