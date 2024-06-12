<script>
    import Header from "../components/Header.svelte";
    import Card from "../components/Card.svelte";
    import Data from "../data/data.js";
    import { stack1, stack2, selectedStat } from "../store.js";
    import { onMount } from 'svelte';
    import { get } from 'svelte/store'; // Import the get function

    var countPlayer1 = 16;
    var countPlayer2 = 16;


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
    });

    // Werte vergleichen
    $: {
        if ($selectedStat.type && $selectedStat.value !== null) {
            compareValues($selectedStat);
        }
    }

    function compareValues({ type, value }) {
        let stack1Value, stack2Value;

        const stack1Data = get(stack1);
        const stack2Data = get(stack2);

        if ($selectedStat.stack === 1) {
            stack1Value = value;
            stack2Value = stack2Data[stack2Data.length - 1][type];
        } else {
            stack1Value = stack1Data[stack1Data.length - 1][type];
            stack2Value = value;
        }

        console.log("Stack 1 value:", stack1Value);
        console.log("Stack 2 value:", stack2Value);

        if (stack1Value > stack2Value) {
            console.log("Player 1 wins!");
            moveCards(stack2, stack1);
            countPlayer2 -= 1;
            countPlayer1 += 1;
        } else if (stack1Value < stack2Value) {
            console.log("Player 2 wins!");
            moveCards(stack1, stack2);
            countPlayer2 += 1;
            countPlayer1 -= 1;
        } else {
            console.log("It's a tie!");
            moveTieCards();
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

        // Reset the selected stat
        selectedStat.set({ type: null, value: null, stack: null });
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

        // Reset the selected stat
        selectedStat.set({ type: null, value: null, stack: null });
    }

    function handleCardClick(rocket, stackNumber, type) {
        selectedStat.set({ type, value: rocket[type], stack: stackNumber });
    }
</script>

<main>
    <Header />
    <h1>Game</h1>

    <div id="card-container">
        <div class="stack">
            <h3>Player 1</h3>
            <h5>{countPlayer1} Cards</h5>
            {#each $stack1 as rocket, index}
                <Card {rocket} {index} on:cardClick={(e) => handleCardClick(e.detail.rocket, 1, e.detail.type)} />
            {/each}
        </div>
        <div class="stack">
            <h3>Player 2</h3>
            <h5>{countPlayer2} Cards</h5>
            {#each $stack2 as rocket, index}
                <Card {rocket} {index} on:cardClick={(e) => handleCardClick(e.detail.rocket, 2, e.detail.type)} />
            {/each}
        </div>
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
</style>
