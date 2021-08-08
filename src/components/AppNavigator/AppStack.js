import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BadgesTabNavigator from '../BadgesScreen/BadgesTabNavigator'
import BadgeLanding from '../BadgesLanding/BadgeLanding'
import BadgesLogin from '../UsersScreen/BadgesLogin'
import BadgesSignup from '../UsersScreen/BadgesSignup'
import Colors from '../../res/Colors'

const Stack = createStackNavigator();


const AppStack = () => {
    
    return(
        <Stack.Navigator 
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: Colors.charade,
                    shadowColor: Colors.charade,
                },
                headerTintColor: Colors.white
            }}>
            
            <Stack.Screen 
                name = 'Landing' 
                component = {BadgeLanding} 
                option = {{headerShown: false} }/>

            <Stack.Screen 
                name = 'BadgesTabNavigator' 
                component = {BadgesTabNavigator} />

            <Stack.Screen 
                name="BadgesLogin" 
                component={BadgesLogin} 
                options={{ headerShown: false}}/>

            <Stack.Screen 
                name="BadgesSignup" 
                component={BadgesSignup} 
                options={{ headerShown: false}}/>
                 
        </Stack.Navigator>
    )
};

export default AppStack;