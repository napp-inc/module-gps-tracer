import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { BACKGROUND, PRIMARY } from '../constants/theme.js';
import { WHITE } from '../styles/colors.js';

const Header = ({ title, navigation, showBackButton = false, showMenu = true }) => {
  return (
    <Appbar.Header style={styles.header} >
      {showBackButton ? (
        <Appbar.BackAction onPress={() => navigation.goBack()} color={PRIMARY} />
      ) : (
        showMenu && <Appbar.Action icon="menu" color={PRIMARY} onPress={() => navigation.openDrawer()} />
      )}
      <Appbar.Content title={title} titleStyle={styles.title} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: BACKGROUND,
    elevation: 0,
    padding:0,
    // borderColor:WHITE,
    // borderWidth:2,
  },
  title: {
    color: PRIMARY,
    fontWeight: 'bold',
  },
});

export default Header;