import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { themeOptions } from '../redux/actions/themeActions';
import { changeTheme } from '../redux/actions/themeActions';

export class ColorPalette extends Component {
  
  renderPalette = (color) =>(
    <TouchableOpacity key={color} onPress={() => this.props.changeTheme(color)}>
      <View style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: color, margin: 5 }}>
      </View>
    </TouchableOpacity>
  );

  render() {
    const colorOptions = Object.keys(themeOptions);

    return (
      <View>
        <Text style={styles.themeTitle}>Choose your theme:</Text>
        <View style={styles.containPalettes}>
          {
            colorOptions.map(this.renderPalette)
          }
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, { changeTheme })(ColorPalette);