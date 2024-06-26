<script>
    import Header from "../components/Header.svelte";
    import OpenAI from "openai";
    let inputText = "";
    let isLoading = false;
    let responseText = "";
    
    const runPrompt = async () => {
        const config = {
            apiKey: import.meta.env.VITE_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true, };

        const openai = new OpenAI(config);

        try {
            isLoading = true;

            const prompt = `Return the name of a dinosaur that contains the word ${inputText} in a funny way.`;
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
            });

            console.log("API-Response:", response);
            responseText = response.choices[0].message.content;
        } catch (error) {
            // console.error("Error while retrieving the dinosaur name:", error);
        } finally {
            isLoading = false;
        }
    };
</script>

<main>
    <Header />
    <img id="backgroundimg" src="rockets/Venera 10.jpg" alt="" />

    <div id="wrapper">
        <img id="cardsimg" src="images/Cards.png" alt="" />
        <div id="infotext">
            <h1>Space Quartet</h1>
            <p>
                Discover the most powerful rockets and satellites in our
                thrilling card game! Challenge the rocketmaster and dominate
                space in categories like speed and mission duration – who will
                be the ultimate champion?
            </p>
            <button id="playbutton"><a href="#/game">Play Game</a></button>
        </div>
    </div>

    <div class="input-controls">
        <input
            type="text"
            bind:value={inputText}
            placeholder="Enter random name or thing..."
        />
         <button on:click={runPrompt} disabled={isLoading}>Dinofy!</button>
    </div>
    {#if isLoading}
        <p>Loading...</p>
    {:else}
        <p>Result after dinofication:</p>
        <p class="result">{responseText}</p>
    {/if}
</main>

<style>
    #backgroundimg {
        width: 100%;
        height: 40vh;
        position: absolute;
        z-index: -1;
        object-fit: cover;
    }

    #wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        display: grid;
        grid-template-columns: 2fr 3fr;
        gap: 50px;
        margin: 10rem;
    }
    #cardsimg {
        width: 100%;
    }
    #infotext {
        margin-top: 150px;
    }
    #playbutton {
        background-color: rgb(42, 42, 75);
        border: none;
        border-radius: 100px;
        padding: 10px 25px;
        font-size: 1rem;
        cursor: pointer;
        margin-top: 50px;
    }
    #playbutton a {
        text-decoration: none;
        color: white;
    }

    @media (max-width: 940px) {
        #wrapper {
            grid-template-columns: 1fr;
        }
        #infotext {
            margin-top: 0;
        }
    }
    @media (max-width: 600px) {
        #wrapper {
            margin: 2rem;
        }
    }
</style>
