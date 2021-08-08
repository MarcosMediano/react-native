import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
    static instance = new Storage();

// saves the key
    store = async (key, value) => {
        try{
            await AsyncStorage.setItem(key, value);
            return true;
        }catch(err){
            console.log('Storage store error', err);
            return false;
        }
    };

// gets the key
    get = async key => {
        try{
            return await AsyncStorage.getItem(key);
        }catch(err){
            console.log('Storage get err', err);
            throw Error(err);
        }
    };

//gets several keys
    multiGet = async keys => {
        try{
            return await AsyncStorage.multiGet(keys);
        }catch(err){
            console.log('Storage multiget err', err);
            throw Error(err);
        }
    }

//gets all the keys
    getAllKeys = async () => {
        try{
            return await AsyncStorage.getAllKeys();
        }catch(err){
            console.log('Storage get all keys error', err) 
            throw Error(err);
        }
    };

// deletes the key
    remove = async key => {
        try{
            await AsyncStorage.removeItem(key);
            return true           
        }catch(err){
            console.log('Storage delete error', err);
            throw Error(err);
        }

    }
    
// deletes all the keys
    multiRemove = async keys =>{
        try {
            await AsyncStorage.multiRemove(keys)
            return true
        } catch (error) {
            console.log('Multiremove error', error)
            return false
        }
    }
};

export default Storage;