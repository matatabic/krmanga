import AsyncStorage from '@react-native-community/async-storage';
import Storage, {LoadParams} from 'react-native-storage';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24 * 7,
  enableCache: true,
  sync: {}
})

const storageLoad = (params: LoadParams) => {
  return storage.load(params);
}

export {storageLoad}

export default storage;
