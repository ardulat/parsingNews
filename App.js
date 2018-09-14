/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, WebView, Platform, Dimensions, ScrollView} from 'react-native';

import HTML from 'react-native-render-html';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      html: '<p>Default paragraph.</p>'
    }
  }

  alterNode = node => {
    const { name } = node;
    if (name == 'img') {
      let uri = node.attribs.src;
      uri = `http://www.astanasu.kz/${uri}`;
      node.attribs.src = uri;
      node.attribs.height = 200;
      node.attribs.width = width - 30;
      return node;
    }
  };

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
      // <WebView 
      //   style={styles.WebViewStyle} 
      //   source={{ html: this.state.html }}
      //   scalesPageToFit={false}
      // />
      <ScrollView style={styles.container}>
        <HTML
        html={this.state.html}
        tagsStyles={htmlViewStyles}
        imagesMaxWidth={Dimensions.get('window').width}
        alterNode={this.alterNode}
        />
      </ScrollView>
    );
  }
}

const { width } = Dimensions.get('window');

const htmlViewStyles = {
  p: { color: 'white' },
  a: { color: 'gray' }
};

const styles = StyleSheet.create({
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    marginTop: (Platform.OS) === 'ios' ? 20 : 0,
    marginBottom: 30,
  }
});
