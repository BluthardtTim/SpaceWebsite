<script>
    import { activeRoute } from '../store.js';
    import { onMount } from 'svelte';

    let currentRoute;
    const unsubscribe = activeRoute.subscribe(value => {
        currentRoute = value;
    });

    onMount(() => {
        return () => {
            unsubscribe();
        };
    });
</script>

<main>
    <div id="Wrapper">
        <nav>
            <ul>
                <li><a href="#/" class:active={currentRoute === '#/'}>Start</a></li>
                <li><a href="#/game" class:active={currentRoute === '#/game'}>Game</a></li>
            </ul>
        </nav>
    </div>
</main>

<style>
    #Wrapper {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 1rem;
        height: 10vh;
    }
    nav ul {
        list-style-type: none;
        padding: 0;
        margin-right: 2rem;
        display: flex;
        flex-direction: row;
    }
    nav ul li a {
        text-decoration: none;
        color: black;
        margin-left: 2rem;
    }
    nav ul li a:hover {
        color: rgb(0, 123, 255);
    }
    nav ul li a.active {
        color: rgb(42, 42, 75);
        text-decoration: underline;
        text-underline-offset: 8px;
    }
</style>
