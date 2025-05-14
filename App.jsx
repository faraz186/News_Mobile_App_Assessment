import {useState} from 'react';
import {Button, FlatList, StyleSheet, TextInput, View} from 'react-native';
import axios from 'axios';
import {Card, Title, Paragraph} from 'react-native-paper';

const App = () => {
  const API_KEY = '50463ecf0eeab43c2d369e8873b3d0df';

  const BASE_URL = 'https://gnews.io/api/v4/search?';

  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}q=${query}&lang=en&max=15&apikey=${API_KEY}`,
      );

      setArticles(response.data.articles);
      setQuery('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by keyword, title or author"
        value={query}
        onChangeText={setQuery}
      />

      <Button color="green" onPress={fetchNews} title="Search" />

      <View>
        {articles.length > 0 ? (
          <FlatList
            data={articles}
            keyExtractor={item => item.url}
            renderItem={({item}) => (
              <Card style={styles.card}>
                <Card.Content>
                  <Card.Cover source={{uri: item.image}} />
                  <Title>{item.title}</Title>
                  <Paragraph>{item.description}</Paragraph>
                  <Paragraph>By: {item.source.name}</Paragraph>
                </Card.Content>
              </Card>
            )}
          />
        ) : (
          <View style={{alignItems: 'center', marginTop: 100}}>
            <TextInput
              style={styles.input}
              placeholder="No articles found.."
              editable={false}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: 'darkgray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    marginTop: 30,
  },
  card: {
    marginBottom: 20,
  },
});

export default App;
