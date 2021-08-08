import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Image,
    TextInput,
    StatusBar,
} from 'react-native';

import Colors from '../../res/Colors.js';
import UserSession from '../../libs/sessions';
import Loader from '../Generics/Loader'

class Login extends React.Component{
    state = {
        loading: false,
        error: null,
        user: undefined,
        isPasswordVisible: true,
        form: {},
    };

    componentDidMount = () => {
        this.deleteTokens();
      };
    
    deleteTokens = async () => {
        await UserSession.instance.logout();
      };
    // sends data to the database
    handleSubmit = async () => {
        //starts loading
        try {
            this.setState({loading:true, error:null, user:undefined})
            let response = await UserSession.instance.login(this.state.form)
            //checks if response is an object 
            if (typeof response === 'object'){
              console.log(response)
              if (response["Login Error"]){ // if its a login error shows a message if not shows other
                var message = "Account is not verified."
              } else {
                var message = "Invalid credentials. Try again."
              }
              this.setState({loading:false, error: message, user: undefined}) //saves the erros
            }else {
              this.setState({loading:false, error: null, user:response}) //saves the user data
            }
          } catch (err) {
              this.setState({loading:false, error:err})
              console.log(err)
          }
          if(this.state.user){
            this.props.navigation.replace('BadgesTabNavigator')
          }
    };
   
    //displays the real information of the apssword instead of *
    toggleisPasswordVisible = () => {
    if (this.state.isPasswordVisible) {
        this.setState({isPasswordVisible: false});
    } else {
        this.setState({isPasswordVisible: true});
        }
    };
    // redirects to signup
    handleSignUp = () => {
        this.props.navigation.navigate('BadgesSignup');
    };

    render(){

        const {isPasswordVisible, loading, error, user} = this.state;
        if (loading === true) {
        return <Loader />;
        }
        return(

            <View style={styles.container}>
                <StatusBar backgroundColor="transparent" translucent={true}/>
                    <ImageBackground source={{uri: 'https://images.pexels.com/photos/6070351/pexels-photo-6070351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}} style={styles.image}>
                        <View style={styles.layerColor}>
                            <View style={styles.form}>
                                <Text style={styles.title}>Log in</Text>
                                {error ? (
                                    <View style={styles.errorContainer}>
                                        <Text style={styles.errorMessage}>
                                            {'Invalid username or password'}
                                        </Text>
                                    </View> 
                                ) : null}
                                <TextInput
                                    style={styles.input}
                                    placeholder="Username"
                                    placeholderTextColor={Colors.charade}
                                    onChangeText={text => {
                                        this.setState(prevState => {
                                            let form = Object.assign({}, prevState.form);
                                            form.username = text;
                                            return {form};
                                        });
                                    }}
                                />
                                <TextInput
                                    style={styles.input}
                                    secureTextEntry={isPasswordVisible}
                                    placeholder={'Password'}
                                    keyboardAppearance="dark"
                                    placeholderTextColor={Colors.charade}
                                    onChangeText={text => {
                                        this.setState(prevState => {
                                            let form = Object.assign({}, prevState.form);
                                            form.password = text;
                                            return {form};
                                        });
                                    }}
                                />
                                <TouchableOpacity onPress={this.toggleisPasswordVisible}>
                                    <Image
                                        style={{
                                            marginLeft: 200,
                                            marginTop: -26,
                                            width: 16,
                                            height: 13,
                                        }}
                                        source={isPasswordVisible ? require('../../assets/show.png') : require('../../assets/hide.png')}
                                    />
                            </TouchableOpacity> 
                                <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
                                    <Text style={styles.buttonText}>LogIn</Text>
                                </TouchableOpacity>

                                <Text style={styles.Text}>Not have an account? <Text style={styles.clickableText} onPress={this.handleSignUp}>Register</Text></Text>

                            </View>
                            
                        </View>
                    </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    containerKey:{
        flex: 1
    },

    container: {
        flex: 1,
        color: Colors.charade,

    },


    image:{
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        justifyContent: 'center',

    },

    content:{
        flex:1,
        margin: 20,
        width:'90%',
        height: '90%',
        marginTop: 50,
        backgroundColor: '#FFFFFF60',
        borderRadius: 25,
        alignItems: 'center'

    },
    
    form:{
        alignItems: 'center',
        position: 'relative'

    },

    layerColor:{
        flex:2,
        backgroundColor:'#00E3F560',
        justifyContent: 'center',
    },

    title:{
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 50
    },

    inputText:{
        fontSize:18,
        marginTop: 10,
        marginBottom:5,
        marginLeft:10,
        fontWeight: 'bold',
        color: Colors.black,
    },

    input:{
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:10,
        borderBottomWidth: 1,
        borderColor:Colors.blacks,
        width:250,
        marginTop: 30,
        width: 200
    },

    button:{
        padding:15,
        marginTop: 50,
        borderRadius: 15,
        backgroundColor: '#8143DEcc',
        borderColor: Colors.black,
        borderWidth: 1,
        width: 180,
        bottom: 20,

    },

    buttonText:{
        textAlign: 'center',
        fontSize: 18,
        fontWeight:'bold',
        paddingHorizontal: 25,
        color: Colors.white,
    },

    Text: {
        marginTop: 5,
        textAlign: 'center',
        color: Colors.black,
        marginBottom: 10
    },
    facebookIcon:{
        marginTop: 20,
        marginBottom: 25,
        height:50,
        width:50,
        resizeMode: 'cover',
        alignItems: 'flex-end'
    },
    clickableText:{
        fontWeight: 'bold'
    }, 
    
    errorMsg: {
        color: '#990009',
    },
    
    errorContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#FF353C40',
        borderRadius: 5,
    },
    
});
    export default Login;