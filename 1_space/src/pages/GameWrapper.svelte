<script>
    import Header from "../components/Header.svelte";
    import Card from "../components/Card.svelte";
    import Data from "../data/data.js";
    import { stack1, stack2, selectedStat } from "../store.js";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    var countPlayer1 = 16;
    var countPlayer2 = 16;
    var valuePlayer1 = 0;
    var valuePlayer2 = 0;
    let winner = null; // Variable to keep track of the winner
    let winnerIndex = null; // Variable to keep track of the winner card index
    let playerTurn = 2; // Variable to keep track of the current player's turn (2 for human, 1 for computer)

    // Karten sortieren
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    onMount(() => {
        const shuffledData = shuffleArray(Data.slice());
        const midIndex = Math.floor(shuffledData.length / 2);
        stack1.set(shuffledData.slice(0, midIndex));
        stack2.set(shuffledData.slice(midIndex));

        // Set initial turn to Player 2 (human)
        playerTurn = 2;
        console.log("Game started. Player 2's turn.");
    });

    // Werte vergleichen
    $: if ($selectedStat.type && $selectedStat.value !== null) {
        compareValues($selectedStat);
    }

    function compareValues({ type, value }) {
        let stack1Value, stack2Value;

        const stack1Data = get(stack1);
        const stack2Data = get(stack2);

        if ($selectedStat.stack === 1) {
            stack1Value = value;
            stack2Value = stack2Data[stack2Data.length - 1][type];
            valuePlayer1 = stack1Value;
            valuePlayer2 = stack2Value;
        } else {
            stack1Value = stack1Data[stack1Data.length - 1][type];
            stack2Value = value;
            valuePlayer1 = stack1Value;
            valuePlayer2 = stack2Value;
        }

        console.log("Stack 1 value:", stack1Value);
        console.log("Stack 2 value:", stack2Value);

        if (stack1Value > stack2Value) {
            console.log("Player 1 wins!");
            winner = { loserStack: stack2, winnerStack: stack1, winner: 1 };
            winnerIndex = stack1Data.length - 1;
        } else if (stack1Value < stack2Value) {
            console.log("Player 2 wins!");
            winner = { loserStack: stack1, winnerStack: stack2, winner: 2 };
            winnerIndex = stack2Data.length - 1;
        } else {
            console.log("It's a tie!");
            winner = { tie: true };
            winnerIndex = null;
        }
    }

    function moveCards(loserStack, winnerStack) {
        const loserStackValue = get(loserStack);
        const winnerStackValue = get(winnerStack);

        const removedCard = loserStackValue.pop();
        const lastCard = winnerStackValue.pop();

        winnerStackValue.unshift(lastCard, removedCard);

        loserStack.set(loserStackValue);
        winnerStack.set(winnerStackValue);
    }

    function moveTieCards() {
        const stack1Value = get(stack1);
        const stack2Value = get(stack2);

        const stack1Card = stack1Value.pop();
        const stack2Card = stack2Value.pop();

        stack1Value.unshift(stack1Card);
        stack2Value.unshift(stack2Card);

        stack1.set(stack1Value);
        stack2.set(stack2Value);
    }

    function handleCardClick(rocket, stackNumber, type) {
        if (playerTurn === 2) {
            selectedStat.set({ type, value: rocket[type], stack: stackNumber });
        }
    }

    function handleNext() {
        if (winner) {
            if (winner.tie) {
                moveTieCards();
            } else {
                moveCards(winner.loserStack, winner.winnerStack);
                if (winner.winner === 1) {
                    countPlayer2 -= 1;
                    countPlayer1 += 1;
                } else {
                    countPlayer2 += 1;
                    countPlayer1 -= 1;
                }
            }
            // Reset the selected stat and winner
            selectedStat.set({ type: null, value: null, stack: null });
            winner = null;
            winnerIndex = null;

            // Toggle player turn
            playerTurn = playerTurn === 2 ? 1 : 2;
            console.log(`Next turn: Player ${playerTurn}`);

            // If it's the computer's turn, select a stat
            if (playerTurn === 1) {
                setTimeout(() => computerSelectStat(), 1000);
            }
        }
    }

    function computerSelectStat() {
        const stack1Data = get(stack1);
        const lastRocket = stack1Data[stack1Data.length - 1];

        const statTypes = [
            "year_built",
            "mission_duration",
            "max_speed",
            "max_earth_distance",
            "development_cost",
            "weight",
        ];
        const randomStat =
            statTypes[Math.floor(Math.random() * statTypes.length)];

        selectedStat.set({
            type: randomStat,
            value: lastRocket[randomStat],
            stack: 1,
        });
        handleNext();
    }
</script>

<main>
    <Header />

    <div id="card-container">
        <div class="stack">
            <h3>Player 1 (Computer)</h3>
            <h5>{countPlayer1} Cards</h5>
            <h5>{valuePlayer1}</h5>
            {#each $stack1 as rocket, index}
                <Card
                    {rocket}
                    {index}
                    stackNumber={1}
                    isWinner={winner &&
                        winner.winner === 1 &&
                        index === winnerIndex}
                />
            {/each}
        </div>
        <div class="stack">
            <h3>Player 2</h3>
            <h5>{countPlayer2} Cards</h5>
            <h5>{valuePlayer2}</h5>
            {#each $stack2 as rocket, index}
                <Card
                    {rocket}
                    {index}
                    stackNumber={2}
                    isWinner={winner &&
                        winner.winner === 2 &&
                        index === winnerIndex}
                    on:cardClick={(e) =>
                        handleCardClick(e.detail.rocket, 2, e.detail.type)}
                />
            {/each}
        </div>
    </div>
    <div id="controls">
        <button on:click={handleNext}>Weiter</button>
    </div>
</main>

<style>
    #card-container {
        display: flex;
        justify-content: center;
        gap: 50px;
    }

    .stack {
        position: relative;
        width: 325px;
        height: 450px;
    }
    #controls {
        display: flex;
        justify-content: center;
        margin-top: 200px;
    }
    
</style>
