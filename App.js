import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';

const UNSPLASH_BASE_URL = 'https://source.unsplash.com/random?sig=';

const App = () => {

  const [randomImageIndexes, setRandomImageIndexes] = useState([]);

  const fetchMore = () => {

    const getAdditionalIndexes = () => {
      // adds 20 additional indexes to randomImageIndexes length
      const additionalIndexes = Array.from({ length: 20 }).map((value, index) => index + 1 + randomImageIndexes.length);

      return [
        ...randomImageIndexes,
        ...additionalIndexes,
      ]
    }

    setRandomImageIndexes(getAdditionalIndexes());
  }

  useEffect(() => {
    fetchMore();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={randomImageIndexes}
        style={styles.list}
        numColumns={3}
        onEndReached={fetchMore}
        keyExtractor={item => item}
        renderItem={
          ({ item }) => <Image
            source={{ uri: UNSPLASH_BASE_URL + item }}
            style={styles.item}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    backgroundColor: '#000',
  },
  item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  }
});

export default App;
