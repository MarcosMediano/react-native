import React from 'react'
import {
    View,
    ActivityIndicator,
    StyleSheet,
    FlatList,
    StatusBar,
} from 'react-native'
import Colors from '../../res/Colors'
import Loader from '../Generics/Loader'
import Storage from '../../libs/storage'
import exampleStyles from '../../styles/example'
import BadgesItem from '../BadgesScreen/BadgesItem'

class Favorites extends React.Component{
    state={
        loading: false,
        badges: undefined
    }
    //gets favorites
    componentDidMount = () => {
        this.getFavorites();
        this.focusEvent();
    }

    //gets all the favorite badges
    getFavorites =  async ()  => {
        this.setState({loading: true, badges: undefined});
        try{
            const allKeys = await Storage.instance.getAllKeys(); //saves the ids
            const key = allKeys.filter( key => key.includes('favorite-'));  //gets favorite ids
            const favs = await Storage.instance.multiGet(key); //saves favorite ids
            const favorites = favs. map( fav => JSON.parse(fav[1])) 
            this.setState({loading: false, badges: favorites}); //stops the loading 
        }catch(err){
            console.log('get favorites error', err);
        }
    }
    // Shows favorite badges details
    handlePress = item =>{
        this.props.navigation.navigate('FavoritesDetails', {item});
    }

    //gets all favorites
    focusEvent = () => {
        this.focusListener = this.props.navigation.addListener ('focus', () => {
            this.getFavorites();
        })
    }
    //calls focusListener to show  the favorite badges
    componentWillUnmount= () => {
        this.focusListener();
    }

    render(){
        const{badges, loading} = this.state
        if (loading == true && !badges) {
            <Loader />;
        }

        return(
            <View style={[styles.favoriteContainer, exampleStyles.container, exampleStyles.horizontal]}>
                <StatusBar backgroundColor="transparent" translucent={true} />
                <FlatList
                    style={styles.list}
                    data={badges}
                    renderItem = { ({item}) => (
                        <BadgesItem item={item} onPress = {() => this.handlePress(item)} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View> 
        );
    }
}

const styles = StyleSheet.create({

    favoriteContainer: {
      paddingTop: 40,
  
    },
    list: {
      width: '100%',
      paddingHorizontal: 10,
    },
  });
export default Favorites;