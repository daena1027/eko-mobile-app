import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function UploadImage() {
  const [image, setImage] = useState(null); 
  const [hasPermission, setHasPermission] = useState(null); // Permission state
// Function to check for camera roll permission
  const  checkForCameraRollPermission=async()=>{
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Please grant camera roll permissions inside your system's settings");
      setHasPermission(false);
    }else{
      console.log('Media Permissions are granted')
      setHasPermission(true);
    }
};
// Function to add image 
  const addImage = async () => {
    if (!hasPermission) {
      alert ('Permission is required to access your gallery');
        return;
    }

    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.IMAGE],
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
   
    if (!_image.canceled) {
        const { uri, type } = _image.assets[0];
        if (type === 'image') {
            setImage(uri);  
        } else {
            alert('Please select an image.');
        }
    }
    
  };

  // Check for camera roll permission 
    useEffect(() => {
        checkForCameraRollPermission();
    }, []);

// Return the image uploader component
  return (
            <View style={imageUploaderStyles.container}>
                {
                    image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                }
                    <View style={imageUploaderStyles.uploadBtnContainer}>
                        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                            <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                            <AntDesign name="camera" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
            </View>
  );
}
// Styles for the image uploader component
const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:200,
        width:200,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})