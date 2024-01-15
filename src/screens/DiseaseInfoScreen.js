// DiseaseInfoScreen.js
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const DiseaseInfoScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Bee Diseases Information</Text>

      {/* Information about Varroosis */}
      <View style={styles.diseaseContainer}>
        <Text style={styles.diseaseHeading}>Varroosis (Varroa destructor):</Text>
        <Text>{`- Description: Varroosis is caused by the parasitic mite Varroa destructor, which attaches itself to honeybees and feeds on their bodily fluids. This mite is a significant threat to honeybee colonies worldwide.`}</Text>
        <Text>{`- Symptoms: Infested bees may exhibit deformed wings, shortened abdomens, and reduced lifespan. Severe infestations can lead to colony collapse.`}</Text>
        <Text>{`- Prevention and Treatment: Beekeepers use various methods, such as chemical treatments, organic acids, and integrated pest management (IPM) practices, to control Varroa mite infestations.`}</Text>
      </View>

      {/* Information about Nosema */}
      <View style={styles.diseaseContainer}>
        <Text style={styles.diseaseHeading}>Nosema (Nosema apis and Nosema ceranae):</Text>
        <Text>{`- Description: Nosema is a gut infection caused by microsporidian parasites Nosema apis and Nosema ceranae. These pathogens can impact the digestive system of honeybees.`}</Text>
        <Text>{`- Symptoms: Infected bees may exhibit dysentery (diarrhea), reduced lifespan, and weakened immune systems. Nosema can lead to overall colony decline.`}</Text>
        <Text>{`- Prevention and Treatment: Good hive management practices, proper nutrition, and hygiene can help prevent Nosema. Treatment may involve using fumagillin or other medications.`}</Text>
      </View>

      {/* Information about American Foulbrood */}
      <View style={styles.diseaseContainer}>
        <Text style={styles.diseaseHeading}>American Foulbrood (Paenibacillus larvae):</Text>
        <Text>{`- Description: American Foulbrood (AFB) is a bacterial disease caused by Paenibacillus larvae. It is highly contagious and can result in the death of bee larvae.`}</Text>
        <Text>{`- Symptoms: Infected larvae turn dark and die, eventually forming a hard, scale-like crust. The disease can spread rapidly within a colony.`}</Text>
        <Text>{`- Prevention and Treatment: Prevention involves maintaining good hygiene, monitoring hive health, and destroying infected colonies. Antibiotic treatments, such as oxytetracycline, are used to control outbreaks.`}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60,
    backgroundColor: "#f8f8f8",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  diseaseContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginBottom: 16,
  },
  diseaseHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default DiseaseInfoScreen;
