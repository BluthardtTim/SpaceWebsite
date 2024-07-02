<script>
    import Header from "../components/Header.svelte";
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
