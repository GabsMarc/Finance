import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'


import { Help } from '../../screens/secondary/Help';
import { Home } from '../../screens/secondary/Home';
import { Profile } from '../../screens/secondary/Profile';

const Tab = createBottomTabNavigator();


export function TabsRoutes() {
    return (
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',
                        elevation: 0,
                        backgroundColor: '#7e22bb'
                    }
                }}
            >

                <Tab.Screen
                    name='Home'
                    component={Home}
                    options={{
                        tabBarLabel: 'Início',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons
                                name='home'
                                color={color}
                                size={size}
                            />
                        )
                    }}
                />
                {/* <Tab.Screen
                    name='Help'
                    component={Help}
                    options={{
                        tabBarLabel: 'Ajuda',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons
                                name='help'
                                color={color}
                                size={size}
                            />
                        )
                    }}
                /> */}
                <Tab.Screen
                    name='Profile'
                    component={Profile}
                    options={{
                        tabBarLabel: 'Ajuda',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons
                                name='account-circle'
                                color={color}
                                size={size}
                            />
                        )
                    }}
                />
            </Tab.Navigator>
    )
}
