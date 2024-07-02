<script>
    import Header from "../components/Header.svelte";
    import Card from "../components/Card.svelte";
    import Data from "../data/data.js";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import { stack1, stack2, selectedStat } from "../store.js";
    import OpenAI from "openai";

    
    var countPlayer1 = 16;
    var countPlayer2 = 16;
    var valuePlayer1 = 0;
    var valuePlayer2 = 0;
    var centercontolls = "";
    
    let isLoading = false;
    let responseText = "klick a value to get a fact!";
    let winner = null;
    let winnerIndex = null;
    let playerTurn = 2;
    let showBacksite = true;
    let isSelected = false; 

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

        playerTurn = 2;
        console.log("Game started. Player 2's turn.");
    });

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

        showBacksite = !showBacksite;

        if (stack1Value > stack2Value) {
            console.log("Player 1 wins!");
            winner = { loserStack: stack2, winnerStack: stack1, winner: 1 };
            winnerIndex = stack1Data.length - 1;
            centercontolls = "Computer got the point!";
        } else if (stack1Value < stack2Value) {
            console.log("Player 2 wins!");
            winner = { loserStack: stack1, winnerStack: stack2, winner: 2 };
            winnerIndex = stack2Data.length - 1;
            centercontolls = "You got the point!";
        } else {
            console.log("It's a tie!");
            winner = { tie: true };
            winnerIndex = null;
            centercontolls = "It's a tie!";
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
        if (playerTurn === 2 && !isSelected) { // Check if a selection has been made
            selectedStat.set({ type, value: rocket[type], stack: stackNumber });
            isSelected = true; // Set the selection state to true
            runPrompt();
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

            responseText = "klick a value to get a fact!";
            centercontolls = "";
            showBacksite = !showBacksite;

            selectedStat.set({ type: null, value: null, stack: null });
            winner = null;
            winnerIndex = null;
            isSelected = false; // Reset the selection state

            playerTurn = playerTurn === 2 ? 1 : 2;
            console.log(`Next turn: Player ${playerTurn}`);

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

        // Find the stat with the highest value
        let maxStat = statTypes[0];
        let maxValue = lastRocket[statTypes[0]];

        for (let i = 1; i < statTypes.length; i++) {
            const stat = statTypes[i];
            const value = lastRocket[stat];
            if (value > maxValue) {
                maxStat = stat;
                maxValue = value;
            }
        }

        selectedStat.set({
            type: maxStat,
            value: maxValue,
            stack: 1,
        });
        handleNext();
        runPrompt();
    }

    const runPrompt = async () => {
        const config = {
            apiKey: import.meta.env.VITE_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true,
        };

        const openai = new OpenAI(config);

        try {
            isLoading = true;

            const selectedStatValue = get(selectedStat);

            let rocket;
            if (selectedStatValue.stack === 1) {
                const stack1Data = get(stack1);
                rocket = stack1Data[stack1Data.length - 1];
            } else {
                const stack2Data = get(stack2);
                rocket = stack2Data[stack2Data.length - 1];
            }

            const prompt = `Give me an interesting fact in one sentences about the rocket "${rocket.name}" regarding its ${selectedStatValue.type}, which has a value of ${selectedStatValue.value}.`;
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
            });
            console.log(prompt);

            console.log("API-Response:", response);
            responseText = response.choices[0].message.content;
        } catch (error) {
            console.error("Error while retrieving the fact:", error);
        } finally {
            isLoading = false;
        }
    };
</script>

<main>
    <Header />
    <div id="playground">
        <div id="card-container">
            <div class="stack">
                <h3 class="playerheading">Computer</h3>
                <h5>{countPlayer1} Cards</h5>
                {#each $stack1 as rocket, index}
                    <Card
                        {rocket}
                        {index}
                        {showBacksite}
                        stackNumber={1}
                        isWinner={winner &&
                            winner.winner === 1 &&
                            index === winnerIndex}
                    />
                {/each}
                <!-- <h5 class="valueStats">{valuePlayer1}</h5> -->
            </div>
            <div id="centercontolls">
                <p id="pointmaster">{centercontolls}</p>
                <button id="nextRound" on:click={handleNext}>next Round</button>
            </div>
            <div class="stack">
                <h3 class="playerheading">You</h3>
                <h5>{countPlayer2} Cards</h5>
                {#each $stack2 as rocket, index}
                    <Card
                        {rocket}
                        {index}
                        {showBacksite}
                        stackNumber={2}
                        isWinner={winner &&
                            winner.winner === 2 &&
                            index === winnerIndex}
                        on:cardClick={(e) =>
                            handleCardClick(e.detail.rocket, 2, e.detail.type)}
                    />
                {/each}
                <!-- <h5 class="valueStats">{valuePlayer2}</h5> -->
            </div>
        </div>

        <div id="extendedinformation">
            <h3>Interesting to know:</h3>
            {#if isLoading}
                <p>Loading...</p>
            {:else}
                <p class="result">{responseText}</p>
            {/if}
        </div>
    </div>
</main>

<style>
    #playground {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #ebebeb;
        border-radius: 8px;
        height: 86.9vh;
        margin: 15px;
    }
    #extendedinformation {
        margin-top: 220px;
        width: 50vw;
        max-width: 800px;
        /* border: solid black 0.1px; */
        padding: 10px;
        border-radius: 12px;
        text-align: center;
    }
    #card-container {
        display: flex;
        justify-content: center;
        gap: 80px;
        align-items: center;
        width: 100%;
    }

    .stack {
        position: relative;
        width: 360px;
        height: 450px;
    }
    #centercontolls {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    #nextRound {
        background-color: #323232;
        color: white;
        border: none;
        border-radius: 100px;
        padding: 10px 25px;
        font-size: 1rem;
        cursor: pointer;
        position: absolute;
        margin-top: 450px;
    }
    #pointmaster {
        font-size: 22px;
        width: 100px;
        text-align: center;
        margin-top: 300px;
    }
    .playerheading {
        font-size: 24px;
    }

    @media (max-width: 940px) {
        #card-container {
            flex-direction: column;
            gap: 50px;
        }
        #playground {
            background-color: white;
        }
    }
</style>
