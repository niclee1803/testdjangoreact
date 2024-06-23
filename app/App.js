import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import axios from "axios";

// Use your local network IP address instead of 127.0.0.1
const API_URL = "http://127.0.0.1:8000/api/hello/";

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("Fetching data from:", API_URL);
      const response = await axios.get(API_URL);
      console.log("Data fetched successfully:", response.data);
      setData([response.data]);  // Wrap response data in an array
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Making API Requests</Text>
      {error && <Text style={styles.error}>Error: {error}</Text>}
      <Text style={styles.info}>Data length: {data.length}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.message}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
  info: {
    marginBottom: 16,
  },
  item: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
});

export default App;
