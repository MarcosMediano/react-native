import React from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    FlatList,
    StatusBar,
    Text,
    Alert,} from 'react-native'
import BadgesItem from './BadgesItem';
import Colors from '../../res/Colors'
import Loader from '../Generics/Loader'
import Http from '../../libs/http'
import Storage from '../../libs/storage';
import BadgesSearch from './BadgesSearch';

class BadgesScreen extends React.Component {
    state = {
        loading: false,
        badges: undefined,
        badgesCopy: undefined,
    };
    //calls 3 functions at the same time 
    componentDidMount() {
        this.fetchdata();
        this.focusEvent();
        this.blurEvent();
    }

    focusEvent = () => {
        this.focusListener = this.props.navigation.addListener('focus', () =>{
            this.setFetchInterval();
        });
        
    }
////clears the last set interval
    blurEvent = () => {
        this.blurListener = this.props.navigation.addListener('blur', () =>{
            clearInterval(this.interval);
        });
    }
//sets interval of specified ammount this case 3s
    setFetchInterval = () =>{
        this.interval = setInterval(this.fetchdata,3000);
    };
//gets badges
    fetchdata = async () => {
        this.setState({loading: true});
        let response = await Http.instance.get_all();
        this.setState({loading: false, badges: response, badgesCopy: response});
    };
//ggets badges deta.ii.ls
    handlePress = item =>{
        this.props.navigation.navigate('BadgesDetail', {item});
    };
//edits badges
    handleEdit = item => {
        this.props.navigation.navigate('BadgesEdit', {item});
    }

    handleChange = query => {
        const {badgesCopy} = this.state; //saves a copy of the badge
        //filters the badges
        const badgesFiltered = badgesCopy.filter(badge => {
            return badge.name.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({badges: badgesFiltered});
        //clears the interval
        if(query){
            clearInterval(this.interval);
        }else{
            this.setFetchInterval();
        }
    };
// deletes badges
    handleDelete = item => {
        //ALerts message to confirm procedure
        Alert.alert('Are you sure?',
        `Do you really want to delete ${item.name}'s badge?\n\nThis process cannot be undone`,
        
        [
            {
                text:'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: async () =>{
                    this.setState({loading: true, badges: undefined}); //stars loading
                    await Http.instance.remove(item._id); //removes the badge
                    let key = `favorite-${item._id}`; // remove it from favorites
                    await Storage.instance.remove(key);
                    this.fetchdata();
                },
                style:'destructive',
            },
        ],
        {
            cancelable: true,
        },
        );
    }
    //calls focuslistener and blur listener
    componentWillUnMount () {
        this.focusListener();
        this.blurListener();
    }

    render() {
        const {badges, loading} = this.state;
        
        if(loading===true && !badges){
            return(
                <Loader/>
            );
        }
        return (
            <View style={[styles.container, styles.horizontal]}>
                <StatusBar backgroundColor="transparent" translucent={true} />
                <BadgesSearch onChange={this.handleChange}/>
                <FlatList 
                    style={styles.list} 
                    data={badges} 
                    renderItem={({item})=> 
                    <BadgesItem 
                    key={item._id} 
                    item={item}
                    onPress={() => this.handlePress(item)}
                    onEdit={() => this.handleEdit(item)}
                    onDelete={() => this.handleDelete(item)}
                    />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.charade,
    },
    horizontal: {
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    loader:{
        height:'100%',
        paddingHorizontal: 10,
    },
    list:{
        width: '100%',
        paddingHorizontal: 10
    },
});

export default BadgesScreen;