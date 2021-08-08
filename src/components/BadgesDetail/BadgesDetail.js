import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Colors from '../../res/Colors'
import Storage from '../../libs/storage'

class BadgesDetail extends React.Component{
    state = {
        badge:{},
        isFavorite: false,
    };
    //calls getbadge
    componentDidMount (){
        this.getBadge();
    };
    //gets badge info
    getBadge = () => {
        const {item} = this.props.route.params;
        //sends the item to the badge
        this.setState({badge: item}, () => {
            this.getFavorite();
        });
        this.props.navigation.setOptions({title: item.name}) //shows name at the top of the screen
    };
    //gets badge id
    getFavorite = async () => {
        try{
            const key = `favorite-${this.state.badge._id}`;
            const favoriteStr = await Storage.instance.get(key);
            //if it isnt null sets state true
            if(favoriteStr!=null){
                this.setState({isFavorite: true});
            }
        }catch(err){
            console.log('Get favorite error', err);
            
        }
    }
    //adds or removes the badge to/from favorites
    toggleFavorite = () => {
        if(this.state.isFavorite){
            this.removeFavorite();
        }else{
            this.addFavorite();
        }
    };
    //adss user to favorite section
    addFavorite = async () => {
        //gets badge data, then saves the id
        const badge = JSON.stringify(this.state.badge);
        const key = `favorite-${this.state.badge._id}`; 
        const stored = await Storage.instance.store(key, badge);
        //changes the state 
        if(stored){
            this.setState({isFavorite: true});
        }
    };
    //deletes from favorite
    removeFavorite = async () => {
        const key = `favorite-${this.state.badge._id}` //saves id
        await Storage.instance.remove(key); //removes the badge
        this.setState({isFavorite: false}); //changes state to false
    };

    render(){
        const {badge, isFavorite} = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.badge}>
                    <Image style={styles.header} source={{uri: `${badge.header_img_url}`}}/>
                    <Image style={styles.profileImage} source={{uri: `${badge.profile_picture_url}`}} />
                    <TouchableOpacity style={styles.favorite} onPress={this.toggleFavorite}>
                        <Image source={
                            isFavorite
                            ? require('../../assets/isFavorite.png')
                            : require('../../assets/notFavorite.png')
                        }/>
                    </TouchableOpacity>
                    <View style={styles.userInfo}>
                        <Text style={styles.name}>{badge.name}</Text>
                        <Text style={styles.age}>{badge.age}</Text>
                    </View>
                    <Text style={styles.city}>{badge.city}</Text>
                    <View style={styles.data}>
                        <View style={styles.dataColumns}>
                            <Text style={styles.dataInfo}>{badge.followers || "0"} </Text>
                            <Text style={styles.smallText}>followers</Text>
                        </View>
                        <View style={styles.dataColumns}>
                            <Text style={styles.dataInfo}>{badge.likes || "None"} </Text>
                            <Text style={styles.smallText}>likes</Text>
                        </View>
                        <View style={styles.dataColumns}>
                            <Text style={styles.dataInfo}>{badge.post || "None"} </Text>
                            <Text style={styles.smallText}>post</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.charade,
    },
    badge:{
        flex:1,
        margin: 20,
        marginTop: 45,
        width:'90%',
        height: '90%',
        backgroundColor: Colors.white,
        borderRadius: 25,
    },
    header:{
        width:'100%',
        height:'40%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    profileImage:{
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius:100,
        borderWidth:5,
        borderColor:Colors.zircon,
        position:'absolute',
        top: '22%',
        left:'22%'
    },
    favorite:{
        position: 'absolute',
        top: 290,
        right: 40,

    },

    userInfo:{
        flexDirection:'row',
        marginTop:110,
        justifyContent:'center',
    },
    name:{
        fontSize:28,
        fontWeight:'bold',
        color:Colors.blackPearl,
    },
    age:{
        fontSize:28,
        marginLeft: 20,
        color: Colors.zircon,
    },
    city:{
        marginTop:10,
        fontSize:18,
        textAlign:'center',
        color: Colors.zircon,
    }, 
    data:{
        padding:20,
        marginTop:50,
        justifyContent: 'center',
        flexDirection: 'row',
        borderTopColor: 1,
        borderColor: Colors.zircon,    
    },
    dataColumns:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dataInfo:{
        marginTop:20,
        fontSize:28,
        fontWeight:'bold',
        marginHorizontal: 25,
        color: Colors.charade,
    },
    smallText:{
        color:Colors.zircon,
    },    
})

export default BadgesDetail;