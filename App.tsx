import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  useColorScheme,
  View,
} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';

function App(): React.JSX.Element {

  const [responseStatus, setResponseStatus ] = useState('');
  const [ localFilePath, setLocalFilePath ] = useState('');
  const remoteImageUrl = 'https://fake-theta.vercel.app/files/150100525831424d42075b53ce68c300/100RICOH/R0010015.JPG';

  const getRemoteImage = () => {
    ReactNativeBlobUtil
      .config({
        fileCache:true,
        appendExt: 'JPG',
      })
      .fetch('GET', remoteImageUrl)
      .then((res) => {
        let status = res.info().status;
        console.log('status: ', status.toString());
        setResponseStatus(status.toString());
        console.log('file path: ', res.path());
        setLocalFilePath(res.path());
    })

  }
  return (
    <SafeAreaView >
      <StatusBar/>
      <ScrollView>
        <Button onPress={getRemoteImage} title='Get Image'/> 
        <Text style={styles.responseText}>status: {responseStatus}</Text>
        <Text style={styles.responseText}>local file: {localFilePath}</Text>
        <Image source={{uri: localFilePath}} 
          style={{width: 400, height: 200}}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  responseText: {
    padding: 15,
    fontSize: 18,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default App;
