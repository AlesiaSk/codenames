# codenames

<div align="center">
  <h1>Codenames</h1>
  <p>Project is in development</p>
  <p>
      A realtime multiplayer game
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#Rules">Rules</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

This is a realtime multiplayer game. Players can create or join *rooms* to play with other players. see the [rules](#rules) section to see the rules


### Built With

![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.


### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/AlesiaSk/codenames.git
   ```
2. Install packages for client:
   ```sh
   npm install
   ``` 
   or   
   ```sh
   yarn
   ```
3. Move to the server directory, install packages for server:
   ```sh
   npm install
   ``` 
   or 
   ```sh
   yarn
   ```   
5. Start the backend Node server:
   ```sh
   npm run start
   ```
   or
   ```sh
   yarn run start
   ```
6. Move to the frontend directory and start the React frontend:
   ```sh
   cd client
   npm run start
   ```

## Rules

1. Codenames is a game of guessing which codenames (i.e., words) in a set are related to a hint-word given by another player.
2. The game is played with least four players, or any even number of players. Players are split into two teams: blue and red. One player in each team is selected as the team's spymaster; the rest become field operatives.
3. Twenty-five codename cards, each bearing a word, are laid out in a 5×5 grid in random order. A number of these words represent blue agents, a number represent red agents, one represents an assassin, and the rest represent innocent bystanders. The teams' spymasters are given a randomly-dealt key card showing a 5×5 grid of 25 squares of various colors, each corresponding to one of the codename cards on the table. The key card can be rotated at the spymasters' will before being put into a stand. The 'lights' on the edges of the key card indicate which team plays first and has to find nine agents of their own (the other team only has to find eight).
4. On each turn, the appropriate spymaster gives a verbal hint (also known as clue) about the words on the respective cards. Each hint may only consist of one single word and a number. The clue has to be related to as many of the words on the team's own agents' cards as possible, but not to any others – lest the words accidentally lead them to choose a card representing an innocent bystander, an opposing agent, or the assassin. The clue word can be chosen freely, as long as it is not (and does not contain, nor is contained in) any of the words on the codename cards still visible at the time. Codename cards are covered as guesses, correct or otherwise, are made. If the spymaster of a team gives an invalid clue (their clue is explicitly invalidated by the opposing team's spymaster), their turn ends immediately and, as a penalty, the opposing team's spymaster randomly covers a codename belonging to one of their agents before the start of their turn.
5. The number in the hint tells the field operatives how many words in the grid are related to the clue word. It also determines the maximum number of guesses the field operatives may make on that turn, which is the stated number plus one. The field operatives of a team are required to make at least one guess per turn, risking a wrong guess and its consequences. If their first guess is right, the field operatives may continue to make guesses until they reach the guess limit or make a wrong guess, or they can instead choose to end their turn voluntarily. For a faster game, or if the opposing team is taking too long to think for example, a timer, such as the hourglass included with the game's packaging, may be used.
6. After a spymaster gives a clue with its word and number, their field operatives make guesses about which codename cards bear words related to the clue and point them out, one at a time. When a codename card is pointed out, the spymaster covers that card with an appropriate identity card – a blue agent, a red agent, an innocent bystander, or the assassin – as indicated on the spymasters' map of the grid. Revealing an opposing agent ends the team's turn, as does revealing an innocent bystander, though in the former case, the opposing team also gets a small advantage before the start of their turn as a result. If the assassin is revealed, the game ends immediately with a loss for the team who identified him.
7. Besides the aforementioned assassin, the game ends when all agents belonging to one team are identified, winning the game for that team. Given the nature of the gameplay, a team may win the game during the opponents' turn.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repository and create a pull request. You can also simply open an issue with the tag "enhancement".


<!-- CONTACT -->
## Contact
Alesia Skarakhod - alesya213@gmail.com
</br>
Project Link: [https://github.com/AlesiaSk/codenames](https://github.com/AlesiaSk/codenames)
</br>
LinkedIn: [alesyask](https://www.linkedin.com/in/alesyask/)

<p align="right">(<a href="#top">back to top</a>)</p>
