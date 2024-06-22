<script>
    import Header from "../components/Header.svelte";

//     import OpenAI from "openai";

// const openai = new OpenAI();

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
// }
</script>

<main>
    <Header />
    <img id="backgroundimg" src="images/background.png" alt="" />

    <div id="wrapper">
        <img id="cardsimg" src="images/Cards.png" alt="" />
        <div id="infotext">
            <p> Discover the most powerful rockets and satellites in our
                thrilling card game! Challenge the rocketmaster and dominate
                space in categories like speed and mission duration – who will
                be the ultimate champion?
                </p>
            <button id="playbutton"><a href="#/game">Play Game</a></button>
        </div>
    </div>
</main>

<style>
    #backgroundimg {
        width: 100%;
        height: 50vh;
        position: absolute;
        z-index: -1;
        object-fit: cover;
    }

    #wrapper {
        /* display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; */
        display: grid;
        grid-template-columns: 2fr 3fr;
        gap: 50px;
        margin: 200px 200px 100px 200px;
    }
    #cardsimg {
        width: 100%;
    }
    #infotext {
        margin-top: 300px;
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
</style>
