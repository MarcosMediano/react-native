import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ImageBackground, 
    TouchableOpacity, 
    StatusBar 
    } from 'react-native';
import Colors from '../../res/Colors'

const imageBackground = {
    uri: 'https://images.pexels.com/photos/6070351/pexels-photo-6070351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
};

class BadgeLanding extends React.Component{
    //shows the login
    handlePress1 = () => {
        this.props.navigation.navigate('BadgesLogin');
    };
    //shows the signup
    handlePress2 = () => {
        this.props.navigation.navigate('BadgesSignup');
    };

    render(){
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor="transparent" translucent={true}></StatusBar>
                <ImageBackground source={imageBackground} style={styles.image}>
                    <View style={styles.layerColor}>
                        <Text style={styles.title}>
                            Wellcome 
                        </Text>    
                        <TouchableOpacity style={styles.button} onPress={this.handlePress1}>
                            <Text style={styles.buttonText}>
                                Log In
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={this.handlePress2}>
                            <Text style={styles.buttonText}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>

                    </View>                        
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    layerColor:{
        flex:2,
        backgroundColor:'#00E3F560',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    title:{
        margin: 30,
        fontSize: 80,
        fontWeight: 'bold',
        color: Colors.white,
    },
    button:{
        padding: 15,
        marginTop:'15%',
        borderRadius: 15,
        backgroundColor: '#8143DE',
        borderColor: Colors.white,
        borderWidth: 1,
    },
    buttonText:{
        textAlign: 'center',
        fontSize:18,
        fontWeight: 'bold',
        paddingHorizontal: 25,
        color: Colors.white,
    },
    

});

export default BadgeLanding;