import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button, ImageBackground, Image, } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
  super(props);

  this.state = {
    gameState: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ], 
    currentPlayer: 1,
  }
}

componentDidMount() {
  this.initializeGame();
}

initializeGame = () => {
  this.setState({gameState:
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]
});
}
//Return hwo won
getWinner = () => {
  const NUM_TILES = 3;
  var arr = this.state.gameState;
  var sum;

  //check rows
  for (var i = 0; i < NUM_TILES; i++) {
    sum = arr[i][1] + arr[i][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }
  }

  //Check column
  for (var i = 0; i < NUM_TILES; i++) {
    sum = arr[0][i] + arr[1][i] + arr[2][i];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }
  }

  // Check the diagonals
  sum = arr[0][0] + arr[1][1] + arr[2][2];
  if (sum == 3) { return 1; }
  else if (sum == -3) { return -1; }

  sum = arr[2][0] + arr[1][1] + arr[0][2];
  if (sum == 3) { return 1; }
  else if (sum == -3) { return -1; }
// no winner
return 0;

}

onTilePress = (row, col) => {

  // Don't allow tiles to change. 
  var value = this.state.gameState[row][col];
  if (value !== 0) { return; };

  var currentPlayer = this.state.currentPlayer;
  
  // Set the correct tile..
  var arr = this.state.gameState.slice();
  arr[row][col] = currentPlayer;
  this.setState({gameState: arr});
  //Switch to other Player
  var nextPlayer = (currentPlayer === 1) ? -1 : 1;
  this.setState({currentPlayer: nextPlayer});

  //check for winners
  var winner = this.getWinner(); 
  if (winner == 1) { 
  Alert.alert("The leek twins are the WINNER!");
  this.initializeGame();
} else if (winner == -1) {
  Alert.alert("Mr Radish snatch the FIRST PLACE!");
  this.initializeGame();
}
}

onNewGamePress = () => {
  this.initializeGame();
}

renderIcon = (row,col) => {
  var value = this.state.gameState[row][col];
  switch(value)
  {
    case 1: return <Image source={require('./img/TwoLeeks.png')} style={styles.tileX} />;
    case -1: return <Image source={require('./img/mrradish.png')} style={styles.tileO} />;
    default: return <View />;
  }
}

 render() {
  return ( 
    <ImageBackground source={require('./img/background.png')} style = {styles.container}>

    <View style={styles.overlayContainer}> 
  

  <View style={{flexDirection: "row"}}>
     <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0}]}>
       {this.renderIcon(0, 0)}
       </TouchableOpacity>
     <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.tile, {borderTopWidth: 0}]}>
      {this.renderIcon(0, 1)}
     </TouchableOpacity>  
     <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.tile, {borderTopWidth:0, borderRightWidth:0}]}>
     {this.renderIcon(0, 2)}
     </TouchableOpacity>
</View>
<View style={{flexDirection: "row"}}>
    <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.tile, {borderLeftWidth:0}]}>
    {this.renderIcon(1, 0)}
    </TouchableOpacity>
    <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={[styles.tile, {}]}>
    {this.renderIcon(1, 1)}
    </TouchableOpacity> 
    <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.tile, {borderRightWidth:0}]}>
    {this.renderIcon(1, 2)}
    </TouchableOpacity>
</View>
<View style={{flexDirection: "row"}}>
    <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.tile, {borderLeftWidth:0, borderBottomWidth:0}]}>
    {this.renderIcon(2, 0)}
    </TouchableOpacity>
    <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.tile, {borderBottomWidth: 0}]}>
    {this.renderIcon(2, 1)}
    </TouchableOpacity> 
    <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.tile, {borderBottomWidth: 0, borderRightWidth:0}]}>
    {this.renderIcon(2, 2)}
    </TouchableOpacity>
</View>

<View style={styles.buttonBox}>
<Button title="New Game" color='black' onPress={this.onNewGamePress}/>
</View>

</View>
</ImageBackground>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
 overlayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  }, 
  tile: {
    borderWidth: 8,
    backgroundColor: 'rgba(41,157,157, .3)',
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  
  },
  tileX: {
    flex: 1,
    width: 100,
    height: '100%',
  },
  tileO: {
    flex: 1,
    width: 100,
    height: '100%',
  },
  buttonBox: {   
    backgroundColor: 'rgba(229,169,159, .8)',
    padding: 10,    
    borderRadius: 12,
}
});