import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import Colors from '../../res/Colors';

class BadgesItem extends React.Component {
    render() {
        const {item} = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={styles.row}>
                        <Image style={styles.profile} source={{uri: `${item.profile_picture_url}`}} />
                        <View style={styles.userData}>
                            <Text style={styles.nameText}> {item.name}</Text>
                            <Text style={styles.cityText}> {item.city}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.icons}>
                    {this.props.onEdit ? (
                        <Pressable onPress={this.props.onEdit}>
                            <Image 
                                style={styles.editIcon}
                                source={require('../../assets/edit.png')} />
                        </Pressable>
                    ) : null}
                    {this.props.onDelete ? (
                        <Pressable onPress={this.props.onDelete}>
                            <Image style={styles.deleteIcon}
                            source={require('../../assets/delete.png')} />
                        </Pressable>
                    ) : null}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomColor: Colors.zircon,
        borderBottomWidth: 1,
    },
    row: {
        flexDirection: 'row',
    },
    profile: {
        width: 55,
        height: 55,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20,
        color: Colors.white,
    },
    cityText: {
        fontWeight: '100',
        paddingLeft: 20,
        color: Colors.white,
    },
    icons:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    editIcon:{
        marginRight: 10,
        marginTop: 1,
        height:22,
        width:22,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    deleteIcon:{
        height: 22,
        width: 22,
        resizeMode: 'cover',
        justifyContent: 'center'
    }
});
export default BadgesItem;