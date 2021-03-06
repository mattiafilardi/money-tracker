/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName, Pressable} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import FeedScreen from '../screens/Feed/FeedScreen';
import ChartsScreen from '../screens/Charts/ChartsScreen';
import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import AddTransactionScreen from "../screens/AddTransaction/AddTransactionScreen";

export default function Navigation() {
    const colorScheme = useColorScheme()

    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme.mode === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}}/>
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="Modal" component={ModalScreen}/>
            </Stack.Group>
        </Stack.Navigator>
    );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="TabOne"
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: Colors[colorScheme.mode].tabIconDefault,
                tabBarActiveTintColor: Colors[colorScheme.mode].tint,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 90,
                    paddingVertical: 5,
                    marginBottom: 2
                },
                tabBarIconStyle: {
                  flex: 1
                }
            }}>
            <BottomTab.Screen
                name="TabOne"
                component={FeedScreen}
                options={({navigation}: RootTabScreenProps<'TabOne'>) => ({
                    title: 'Feed',
                    tabBarIcon: ({color}) => <TabBarIcon name="home" color={color}/>,
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate('Modal')}
                            style={({pressed}) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}>
                            <FontAwesome
                                name="info-circle"
                                size={25}
                                color={Colors[colorScheme.mode].text}
                                style={{marginRight: 15}}
                            />
                        </Pressable>
                    ),
                })}
            />
            <BottomTab.Screen
                name="AddTab"
                component={AddTransactionScreen}
                options={{
                    title: '',
                    tabBarIcon: ({color}) => <AntDesign name="pluscircle" size={44} color={Colors[colorScheme.mode].tint} />,
                }}
            />
            <BottomTab.Screen
                name="TabTwo"
                component={ChartsScreen}
                options={{
                    title: 'Charts',
                    tabBarIcon: ({color}) => <TabBarIcon name="pie-chart" color={color}/>,
                }}
            />

        </BottomTab.Navigator>
    );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{marginBottom: -3}} {...props} />;
}
