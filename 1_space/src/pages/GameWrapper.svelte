<script>
    import Header from "../components/Header.svelte";
    import Card from "../components/Card.svelte";
    import Data from "../data/data.js";
    import {selectedStat} from "../store.js";


    let stack1 = shuffleArray(Data.slice());
    let stack2 = shuffleArray(Data.slice());

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    console.log(stack1, stack2);



    $: {
        if ($selectedStat !== null) {
            compareValues($selectedStat);
        }
    }

    function compareValues(value) {
        console.log("selectedStat has changed to", value);
        const stack1Value = stack1[$selectedStat];
        const stack2Value = stack2[$selectedStat];

        console.log("Stack 1 value", stack1Value);
        console.log("Stack 2 value", stack2Value);

        if (stack1Value > stack2Value) {
            console.log("Player 1 wins!");
        } else if (stack1Value < stack2Value) {
            console.log("Player 2 wins!");
        } else {
            console.log("It's a tie!");
        }

    }
</script>

<main>
    <Header />
    <h1>Game</h1>

    <div id="card-container">
        <div class="stack">
            {#each stack1 as rocket, index}
                <Card {rocket} {index} />
            {/each}
        </div>
        <div class="stack">
            {#each stack2 as rocket, index}
                <Card {rocket} {index} />
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
