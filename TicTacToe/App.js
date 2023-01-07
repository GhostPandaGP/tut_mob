import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Pressable, Alert } from 'react-native';
import bg from './assets/bg.png';
import Cell from './src/components/Cell';

const emptyMap = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];


export default function App() {
  const [map, setMap] = useState(emptyMap);
  const [currentTurn, setCurrentTurn] = useState('x');
  const [gameMode, setGameMode] = useState('LOCAL');  // LOCAL, BOT_EASY, BOT_MEDIUM;

  const copyArray = (original) => {
    const copy = JSON.parse(JSON.stringify(original));
    return copy;
  }

  useEffect(() => {
    if (currentTurn === 'o' && gameMode !== 'LOCAL') {
      botTurn();
    }
  }, [currentTurn]);

  useEffect(() => {
    let winner = getWinner(map);
    if (winner) {
      gameWon(winner);
    } else {
      checkTieState();
    }
  }, [map]);

  const onPress = (rowIndex, columnIndex) => {
    if (map[rowIndex][columnIndex] !== '') {
      Alert.alert("Position already occupied!");
      return;
    }

    setMap((existingMap) => {
      const updatedMap = [...existingMap]
      updatedMap[rowIndex][columnIndex] = currentTurn;
      return updatedMap
    });  // Принимает либо новый объект, либо функцию, которая его возвращает

    setCurrentTurn(currentTurn === 'x' ? 'o' : 'x');
  };

  const getWinner = (winnerMap) => {
    // check rows
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      let isRowXWinner =  winnerMap[rowIndex].every((cell) => cell === 'x');
      let isRowOWinner = winnerMap[rowIndex].every((cell) => cell === 'o');

      if (isRowOWinner) {
        return 'o';
      }
      if (isRowXWinner) {
        return 'x';
      }
    }

    // check column
    for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
      let isColumnXWinner = true;
      let isColumnOWinner = true;

      for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        if (winnerMap[rowIndex][columnIndex] !== 'x') {
          isColumnXWinner = false;
        }
        if (winnerMap[rowIndex][columnIndex] !== 'o') {
          isColumnOWinner = false;
        }
      }

      if (isColumnOWinner) {
        return 'o';
      }
      if (isColumnXWinner) {
        return 'x';
      }
    }

    // check diagonal
    let isDiagonal1XWinning = true;
    let isDiagonal2XWinning = true;

    let isDiagonal1OWinning = true;
    let isDiagonal2OWinning = true;

    for (let i = 0; i < 3; i++) {
      if (winnerMap[i][i] !== 'o') {
        isDiagonal1OWinning = false;
      }
      if (winnerMap[i][i] !== 'x') {
        isDiagonal1XWinning = false;
      }
      if (winnerMap[i][2 - i] !== 'o') {
        isDiagonal2OWinning = false;
      }
      if (winnerMap[i][2 - i] !== 'x') {
        isDiagonal2XWinning = false;
      }
    }

    if (isDiagonal1XWinning || isDiagonal2XWinning) {
      return 'x';
    }
    if (isDiagonal1OWinning || isDiagonal2OWinning) {
      return 'o';
    }
  };

  const checkTieState = () => {
    if (!map.some((row) => row.some((cell) => cell === ''))) {
      Alert.alert("It's a tie", 'tie', [
        {
          text: 'Restart',
          onPress: resetGame,
        }
      ]);
    }
  };

  const gameWon = (player) => {
    Alert.alert('Hurray', `Player '${player}' won`, [
      {
        text: 'Restart',
        onPress: resetGame,
      }
    ])
  };

  const resetGame = () => {
    setMap([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setCurrentTurn('x');
  };

  const botTurn = () => {
    // collect all possible options
    const possiblePositions = [];
    map.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (cell === '') {
          possiblePositions.push({row: rowIndex, col: columnIndex});
        }
      })
    });
    let chosenOption;

    if (gameMode === 'BOT_MEDIUM') {
      // Attack
      possiblePositions.forEach((possiblePosition) => {
        const mapCopy = copyArray(map);
        mapCopy[possiblePosition.row][possiblePosition.col] = 'o';
  
        const winner = getWinner(mapCopy);
        if (winner === 'o') {
          // Defend that position
          chosenOption = possiblePosition;
        }
      });

      if (!chosenOption) {
        // Defend
        // Check if the opponent WINS if it take one of the possible Positions
        possiblePositions.forEach((possiblePosition) => {
          const mapCopy = copyArray(map);
          mapCopy[possiblePosition.row][possiblePosition.col] = 'x';
    
          const winner = getWinner(mapCopy);
          if (winner === 'x') {
            // Defend that position
            chosenOption = possiblePosition;
          }
        });
      }
    }

    // choose random
    if (!chosenOption) {
      chosenOption = 
      possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
    }
    
    if (chosenOption) {
      onPress(chosenOption.row, chosenOption.col);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={bg}
        style={styles.bg} 
        resizeMode="contain"
        >
          <Text style={styles.header}>Current turn: '{currentTurn.toUpperCase()}'</Text>
          <View style={styles.map}>
            {map.map((row, rowIndex) => (
              <View style={styles.row} key={rowIndex}>
                {row.map((cell, columnIndex) => <Cell 
                  key={`row-${rowIndex}-col-${columnIndex}`} 
                  cell={cell} 
                  onPress={() => onPress(rowIndex, columnIndex)}/>
                  )}
              </View>
            )
            )}

          </View>

          <View style={styles.buttons}>
            <Text
            onPress={() => setGameMode('LOCAL')}
             style={[
              styles.button,
              gameMode === 'LOCAL' ? styles.activeButton : '',
              ]}>Local</Text>
            <Text 
            onPress={() => setGameMode('BOT_EASY')}
            style={[
              styles.button, 
              gameMode === 'BOT_EASY' ? styles.activeButton : '',
              ]}>Easy Bot</Text>
            <Text 
            onPress={() => setGameMode('BOT_MEDIUM')}
            style={[
              styles.button,
              gameMode === 'BOT_MEDIUM' ? styles.activeButton : '',
              ]}>Medium Bot</Text>
          </View>
        </ImageBackground>
      <StatusBar style="auto" />
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242D34',
  },
  bg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: '5%',
    fontSize: 24,
    color: '#fff',
  },
  map: {
    // borderWidth: 1,
    // borderColor: '#fff',
    width: '80%',
    aspectRatio: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  buttons: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  button: {
    color: '#fff',
    marginHorizontal: 5,
    marginVertical: 5,
    fontSize: 16,
    backgroundColor: '#191f24',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 2,
  },
  activeButton: {
    backgroundColor: '#4f5686',
  }
});

