import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { CARD_BACKGROUND, PRIMARY, TEXT } from '../constants/theme.js';

const BagCard = ({ bag, onPress }) => {
  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <Title style={styles.title}>Sac</Title>
        <Paragraph style={styles.text}>N° Série: {bag.numeroSerie}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button 
          mode="contained" 
          onPress={() => onPress(bag)}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Démarrer
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: CARD_BACKGROUND,
    marginBottom: 16,
    borderRadius: 10,
    elevation: 4,
  },
  title: {
    color: PRIMARY,
    fontWeight: 'bold',
  },
  text: {
    color: TEXT,
    marginTop: 5,
  },
  button: {
    backgroundColor: PRIMARY,
    borderRadius: 5,
  },
  buttonText: {
    color: CARD_BACKGROUND,
    fontWeight: 'bold',
  },
});

export default BagCard;