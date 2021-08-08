import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Favorites from './Favorites.js'
import Colors from '../../res/Colors'
import BadgesDetail from '../BadgesDetail/BadgesDetail.js';

const Stack = createStackNavigator();

const FavoriteStack = () => {
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: Colors.blackPearl,
                    shadowColor: Colors.blackPearl,
                },
                headerTintColor: Colors.white,
            }}>
            <Stack.Screen name="Favorites" component={Favorites}/>
            <Stack.Screen name="FavoritesDetails" component={BadgesDetail}/>
        </Stack.Navigator>
    )
}
export default FavoriteStack;

