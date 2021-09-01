import React from 'react';
import { 
  Modal, 
  StyleSheet, 
  TouchableOpacity, 
  View, 
  Text, 
  Platform, 
  PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';



const UploadImage = ({visible, close, setResponse}) => {
  
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      quality: 1,
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        let res = response.assets[0]
        if (response.didCancel) {
          alert('Kamera di batalkan');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Kamera tidak tersedia');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Kamera tidak di izinkan');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        const data = {
          uri : res.uri,
          type: res.type,
          name: res.fileName.slice(49)
        }
        setResponse(data);
        close();
      });
    }
  };

  const uploadImage = async (type) => {
    let options = {
      mediaType: type,
      includeBase64: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          alert('Kamera di batalkan');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Kamera tidak tersedia');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Kamera tidak di izinkan');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        setResponse(response.assets[0]);
        close();
      });
    }
  };

  return(
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={close}
    >
      <View style={styles.container}>
        <TouchableOpacity
        activeOpacity={0.5}
        style={styles.buttonStyle}
        onPress={() => captureImage('photo')}>
        <Text style={styles.textStyle}>Ambil gambar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => uploadImage('photo')}>
          <Text style={styles.textStyle}>Pilih gambar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
  
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderTopRightRadius:30,
    borderTopLeftRadius:30,
    backgroundColor: 'white',
    alignItems: 'center',
    position:'absolute',
    bottom: 0,
    borderColor:'grey',
    alignSelf:'center',
    borderWidth:1,
    width: '100%',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    fontSize: 20,
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 1,
    borderRadius:10,
    marginVertical: 5,
    width: '50%',
  },
});

export default UploadImage