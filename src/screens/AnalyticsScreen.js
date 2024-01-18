import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { BarChart, PieChart, LineChart, ProgressChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
  barPercentage: 0.8,
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const barChartData = {
  labels: ['Hive 1', 'Hive 2', 'Hive 3', 'Hive 4'],
  datasets: [
    {
      data: [0.8, 0.6, 0.9, 0.7], // Replace with your actual data (percentages)
    },
  ],
};

const pieChartData = [
  {
    name: 'Hive 1',
    percentage: 20,
    color: '#FF5733',
  },
  {
    name: 'Hive 2',
    percentage: 30,
    color: '#33FF57',
  },
  {
    name: 'Hive 3',
    percentage: 25,
    color: '#5733FF',
  },
  {
    name: 'Hive 4',
    percentage: 25,
    color: '#FF5733',
  },
];

const progressChartData = [0.4, 0.6, 0.8]; // Replace with your actual data

const AnalyticsScreen = () => {
  const navigation = useNavigation();
  const [dynamicData, setDynamicData] = useState([50, 75, 60, 80, 70]);

  useEffect(() => {
    // Simulate real-time data update (replace with actual data fetching logic)
    const interval = setInterval(() => {
      // Generate random data for illustration purposes
      const newDataPoint = Math.floor(Math.random() * 100);
      setDynamicData((prevData) => [...prevData.slice(1), newDataPoint]);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const navigateToHome = () => {
    navigation.navigate('Login'); // Update with the correct screen name
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Hive Performance Analytics</Text>

          {/* Dynamic Line Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Dynamic Line Chart</Text>
            <LineChart
              style={styles.chart}
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [
                  {
                    data: dynamicData,
                  },
                ],
              }}
              width={350}
              height={200}
              yAxisSuffix="%"
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
            <Text style={styles.legend}>Legend: Blue - Trend</Text>
          </View>

          {/* Bar Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Bar Chart</Text>
            <BarChart
              style={styles.chart}
              data={barChartData}
              width={350}
              height={200}
              yAxisSuffix="%"
              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />
            <Text style={styles.legend}>Legend: Blue - Performance</Text>
          </View>

          {/* Pie Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Pie Chart</Text>
            <PieChart
              data={pieChartData}
              width={350}
              height={200}
              chartConfig={chartConfig}
              accessor="percentage"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
            <Text style={styles.legend}>Legend: Red - Hive 1, Green - Hive 2, Purple - Hive 3, Orange - Hive 4</Text>
          </View>

          {/* Progress Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Progress Chart</Text>
            <ProgressChart
              style={styles.chart}
              data={progressChartData}
              width={350}
              height={200}
              chartConfig={chartConfig}
            />
            <Text style={styles.legend}>Legend: Blue - Progress</Text>
          </View>

          {/* Button to navigate back to home */}
          <TouchableOpacity style={styles.button} onPress={navigateToHome}>
            <Text style={styles.buttonText}>Go Back to Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 70,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartContainer: {
    marginTop: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginTop: 10,
  },
  legend: {
    marginTop: 10,
    fontSize: 12,
    color: '#666',
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default AnalyticsScreen;
