// screens/NewsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchNews } from '../services/api';


const NewsScreen = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews()
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching news data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorMessage}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>News</Text>
      {news.map((article) => (
        <View key={article._id} style={styles.newsItem}>
          <Text style={styles.articleTitle}>{article.title}</Text>
          <Text style={styles.articleContent}>{article.content}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  newsItem: {
    marginBottom: 20,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  articleContent: {
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    fontSize: 18,
  },
});

export default NewsScreen;
