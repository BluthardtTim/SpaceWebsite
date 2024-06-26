<script>
    import { createEventDispatcher } from 'svelte';
    import { decimalSeparators, shortenBigValue } from '../utils';
    export let rocket;
    export let index;
    export let stackNumber; 
    export let isWinner = false;
    export let showBacksite;

    const dispatch = createEventDispatcher();

    function logValue(type, value) {
        dispatch('cardClick', { type, rocket });
    }
    
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="card {isWinner ? 'winner' : ''}" style="transform: translateY({index * 2}px);">
    <div class="card-content">
        {#if stackNumber === 1 && showBacksite}
            <div id="backsite"><h3>Space <br>Quartet</h3></div>
        {/if}
            <div class="card-number">{rocket.group_letter}{rocket.number}</div>
            <div class="card-title">
                <div class="card-name">{rocket.name}</div>
                <div class="card-group">{rocket.group}</div>
            </div>

        <div class="rocket-image">
            <img src="rockets/{rocket.name}.jpg" alt="{rocket.name}" />
        </div>

        <div id="spacer"></div>
        <div id="spacer"></div>
        <div id="spacer"></div>
        <div id="spacer"></div>

        <div id="rocketstatsbackground"></div>

        <div class="goal-icon">Goal</div>
        <div class="rocket-info">{rocket.mission_goal}</div>

        <div class="stat-icon"><img src="icons/wrench.svg" alt=""/></div>
        <div class="stat-value" on:click={() => logValue('year_built', rocket.year_built)}>{rocket.year_built}</div>

        <div class="stat-icon"><img src="icons/timer.svg" alt=""/></div>
        <div class="stat-value" on:click={() => logValue('mission_duration', rocket.mission_duration)}>{decimalSeparators(rocket.mission_duration)}</div>

        <div class="stat-icon"><img src="icons/speedometer.svg" alt=""/></div>
        <div class="stat-value" on:click={() => logValue('max_speed', rocket.max_speed)}>{decimalSeparators(rocket.max_speed)}</div>

        <div class="stat-icon"><img src="icons/ruler.svg" alt=""/></div>
        <div class="stat-value" on:click={() => logValue('max_earth_distance', rocket.max_earth_distance)}>{decimalSeparators(shortenBigValue(rocket.max_earth_distance))}</div>

        <div class="stat-icon"><img src="icons/coins.svg" alt=""/></div>
        <div class="stat-value" on:click={() => logValue('development_cost', rocket.development_cost)}>{decimalSeparators(rocket.development_cost)}</div>

        <div class="stat-icon"><img src="icons/barbell.svg" alt=""/></div>
        <div class="stat-value" on:click={() => logValue('weight', rocket.weight)}>{decimalSeparators(shortenBigValue(rocket.weight))}</div>
    </div>
</div>

<style>
    .card {
        height: 500px;
        width: 360px;
        /* background-color: rgb(199, 228, 255); */
        border-radius: 15px;
        color: #222;
        position: absolute;
        /* border: solid 1px rgb(108, 108, 108); */
    }

    .card.winner {
        border: solid 3px green;
        background-color: rgb(224, 240, 255);
    }

    .card-content {
        border: 1px solid #ffffff;
        height: 100%;
        border-radius: 15px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: 1fr 5fr 1fr 1fr 1fr 1fr;
        gap: 5px;
        position: relative;
        padding: 20px;
    }

    .card-number {
        color: white;
        font-size: 22px;
        font-weight: bold;
    }

    .card-title {
        grid-column: span 3;
        color: white;
    }

    .card-name {
        font-size: 22px;
        font-weight: bold;
    }

    .card-group {
        font-size: 18px;
    }

    .rocket-image {
        grid-column: span 4;
        max-width: 100%;
        max-height: 170px;
        position: absolute;
        z-index: -2;
    }

    .rocket-image img {
        object-fit: cover;
        height: 100%;
        width: 100%;
        border-radius: 15px 15px 0px 0px;
    }

    .stat-icon{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .stat-value{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 5px;
    }

    #rocketstatsbackground {
        background-color: white;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 240px;
        border-radius: 15px;
        z-index: -1;
    }

    .rocket-info {
        grid-column: span 3;
    }

    .stat-value:hover {
        background-color: rgb(242, 242, 255);
        cursor: pointer;
    }
    
    #backsite{
        background-color: rgb(42, 42, 75);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 15px;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 26px;
        color: white;
    }
</style>
