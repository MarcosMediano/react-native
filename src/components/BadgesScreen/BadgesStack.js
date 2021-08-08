import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BadgesScreen from './BadgesScreen'
import BadgesDetail from '../BadgesDetail/BadgesDetail'
import BadgesEdit from '../BadgesEdit/BadgesEdit'
import Colors from '../../res/Colors'
import BadgesLogin from '../UsersScreen/BadgesLogin'
import BadgesSignup from '../UsersScreen/BadgesSignup'


const Stack = createStackNavigator()

const BadgesStack = () => {
    return(
        <Stack.Navigator

            screenOptions={{
                headerShown: false,
                headerStyle:{
                    backgroundColor: Colors.blackPearl,
                    shadowColor: Colors.blackPearl,
                },
            headerTintColor: Colors.white,
            }}>
                
            <Stack.Screen name="Badges" component={BadgesScreen} />
            <Stack.Screen name="BadgesDetail" component={BadgesDetail} />
            <Stack.Screen name="BadgesEdit" component={BadgesEdit} />
            <Stack.Screen name="BadgesLogin" component={BadgesLogin} options={{ headerShown: false}}/>
            <Stack.Screen name="BadgesSignup" component={BadgesSignup} options={{ headerShown: false}}/>

        </Stack.Navigator>
    );

};

export default BadgesStack;