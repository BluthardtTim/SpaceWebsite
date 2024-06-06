<script>
    import Header from "../components/Header.svelte";
    import Card from "../components/Card.svelte";
    import Data from "../data/data.js";
    import { selectedStat, stack1, stack2 } from "../store.js";
    import { onMount } from 'svelte';

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

    $: {
        if ($selectedStat.type && $selectedStat.value !== null) {
            compareValues($selectedStat);
        }
    }

    function compareValues({ type, value }) {
        let stack1Value, stack2Value;

        if ($selectedStat.stack === 1) {
            stack1Value = value;
            stack2Value = $stack2[$stack2.length - 1][type];
        } else {
            stack1Value = $stack1[$stack1.length - 1][type];
            stack2Value = value;
        }

        console.log("Stack 1 value:", stack1Value);
        console.log("Stack 2 value:", stack2Value);

        if (stack1Value > stack2Value) {
            console.log("Player 1 wins!");
        } else if (stack1Value < stack2Value) {
            console.log("Player 2 wins!");
        } else {
            console.log("It's a tie!");
        }
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
            {#each $stack1 as rocket, index}
                <Card {rocket} {index} on:cardClick={(e) => handleCardClick(e.detail.rocket, 1, e.detail.type)} />
            {/each}
        </div>
        <div class="stack">
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
