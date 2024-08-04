import { Player } from "./player";

function main() {
  console.log("**********RUNNING**********");

  let totalPlayer: number = 3;
  let totalDice: number = 4;

  initGame(totalPlayer, totalDice);
}

function initGame(players: number, dices: number) {
  console.log(`Players: ${players}`);
  console.log(`Dices: ${dices}`);

  let listOfPlayers: Player[] = [];

  for (let i = 1; i <= players; i++) {
    let newPlayer: Player = new Player();
    newPlayer.name = `Player ${i}`;
    newPlayer.score = 0;
    newPlayer.dices = rollDices(dices);

    listOfPlayers.push(newPlayer);
  }

  let iteration: number = 1;

  while (true) {
    console.log(`Iteration: ${iteration}`);

    let dicesToPass: { playerIndex: number, diceCount: number }[] = [];

    for (let i = 0; i < listOfPlayers.length; i++) {
      if (listOfPlayers[i].dices.length == 0) {
        listOfPlayers[i].isPlaying = false;
        continue;
      }

      listOfPlayers[i].dices = rollDices(listOfPlayers[i].dices.length);
    }

    console.log(listOfPlayers);

    console.log("#EVALUATION#");
    for (let i = 0; i < listOfPlayers.length; i++) {
      for (let j = 0; j < listOfPlayers[i].dices.length; j++) {
        if (listOfPlayers[i].dices[j] == 6) {
          listOfPlayers[i].score += 1;
          listOfPlayers[i].dices[j] = 0;
        } else if (listOfPlayers[i].dices[j] == 1) {
          listOfPlayers[i].dices[j] = 0;

          //When it's number 1, pass the dice to a next player that still playing

          let nextPlayerIndex = (i + 1) % listOfPlayers.length;
          while (!listOfPlayers[nextPlayerIndex].isPlaying) {
            nextPlayerIndex = (nextPlayerIndex + 1) % listOfPlayers.length;

            if (nextPlayerIndex === i) {
              break;
            }
          }
          if (listOfPlayers[nextPlayerIndex].isPlaying) {
            dicesToPass.push({ playerIndex: nextPlayerIndex, diceCount: 1 });
          }
        }
      }

      listOfPlayers[i].dices = listOfPlayers[i].dices.filter(
        (dice) => dice !== 0
      );
    }

    for (let pass of dicesToPass) {
      listOfPlayers[pass.playerIndex].dices.push(1);
    }

    console.log(listOfPlayers);
    // Check, if there is only 1 player left still playing, then break. game is over and print the winner (we can decide the winner during the whle loop).
    let playerRemaining = listOfPlayers.filter((player) => player.isPlaying);
    if (playerRemaining.length == 1 || playerRemaining.length == 0) {
      let winner = listOfPlayers.reduce((prev, current) =>
        prev.score > current.score ? prev : current
      );

      console.log("Game Finished!");
      console.log(
        `The winner is ${winner.name} with a score of ${winner.score}!`
      );
      break;
    }

    iteration += 1;
  }
}

function rollDices(dices: number): number[] {
  let results: number[] = [];
  for (let i = 0; i < dices; i++) {
    results.push(getRandomNumber(1, 6));
  }

  return results;
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

main();
