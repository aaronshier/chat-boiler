const FBSDK = require('react-native-fbsdk');

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const {ShareDialog} = FBSDK;

class FBShareDialog extends Component {
  constructor(props) {
    super(props);
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: 'https://www.ohshutit.com/',
    };

    this.state = {
      shareLinkContent: shareLinkContent,
    };
  }

  shareLinkWithShareDialog() {
    var tmp = this;
    ShareDialog.canShow(this.state.shareLinkContent)
      .then(function(canShow) {
        if (canShow) {
          return ShareDialog.show(tmp.state.shareLinkContent);
        }
      })
      .then(
        function(result) {
          if (result.isCancelled) {
            alert('Share cancelled');
          } else {
            alert('Share success with postId: ' + result.postId);
          }
        },
        function(error) {
          alert('Share fail with error: ' + error);
        },
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.share}
          onPress={this.shareLinkWithShareDialog.bind(this)}>
          <Text style={styles.shareText}>Share link with ShareDialog</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 20
  },
  shareText: {
    fontSize: 20,
    margin: 10,
  },
});

export default FBShareDialog