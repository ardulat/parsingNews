/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, WebView, Platform} from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      html: '<p>Default paragraph.</p>'
    }
  }

  componentDidMount() {
    fetch('http://www.astanasu.kz/news/detail/?ELEMENT_ID=467')
    .then(response => response.text())
    .then((htmlString) => {
      const startIndex = htmlString.search(/<div class="news-detail">/);
      const endIndex = htmlString.search(/<p><a href="\/">Возврат к списку<\/a><\/p>/);
      const newsContent = htmlString.substring(startIndex, endIndex);
      this.setState({html: newsContent});
    })
  }

  render() {         
    return (
      <WebView 
        style={styles.WebViewStyle} 
        source={{ html: this.state.html }}
        scalesPageToFit={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    marginTop: (Platform.OS) === 'ios' ? 20 : 0,
    marginBottom: 30,
  }
});
