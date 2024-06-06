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
            handleStatChange($selectedStat);
        }
    }

    // Funktion, die aufgerufen wird, wenn sich selectedStat ändert
    function handleStatChange(value) {
        console.log("selectedStat has changed to", value);
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
