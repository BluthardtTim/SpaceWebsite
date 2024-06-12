<script>
    import { createEventDispatcher } from 'svelte';
    export let rocket;
    export let index;

    const dispatch = createEventDispatcher();

    function logValue(type, value) {
        dispatch('cardClick', { type, rocket });
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="card" style="transform: translateY({index * 2}px);">
    <div class="card-content">
        <div class="card-number">{rocket.group_letter}{rocket.number}</div>
        <div class="card-title">
            <div class="card-name">{rocket.name}</div>
            <div class="card-group">{rocket.group}</div>
        </div>

        <div class="rocket-image">
            <img src="../images/a1.jpg" alt="{rocket.name}" />
        </div>
        <div class="goal-icon">Goal</div>
        <div class="rocket-info">Solar system exploration</div>

        <div class="stat-icon">year built</div>
        <div class="stat-value" on:click={() => logValue('year_built', rocket.year_built)}>{rocket.year_built}</div>

        <div class="stat-icon">mission duration</div>
        <div class="stat-value" on:click={() => logValue('mission_duration', rocket.mission_duration)}>{rocket.mission_duration}</div>

        <div class="stat-icon">max speed</div>
        <div class="stat-value" on:click={() => logValue('max_speed', rocket.max_speed)}>{rocket.max_speed}</div>

        <div class="stat-icon">max earth distance</div>
        <div class="stat-value" on:click={() => logValue('max_earth_distance', rocket.max_earth_distance)}>{rocket.max_earth_distance}</div>

        <div class="stat-icon">development cost</div>
        <div class="stat-value" on:click={() => logValue('development_cost', rocket.development_cost)}>{rocket.development_cost}</div>

        <div class="stat-icon">weight</div>
        <div class="stat-value" on:click={() => logValue('weight', rocket.weight)}>{rocket.weight}</div>
    </div>
</div>

<style>
    .card {
        height: 450px;
        width: 325px;
        background-color: rgb(199, 228, 255);
        border-radius: 15px;
        padding: 12px;
        color: #222;
        position: absolute;
        border: solid 1px black;
    }

    /* .card:hover {
        background-color: rgb(224, 240, 255);
        cursor: pointer;
    } */

    .card-content {
        border: 1px solid #222;
        height: 100%;
        border-radius: 10px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: 1fr 4fr 1fr 1fr 1fr 1fr;
        gap: 5px;
    }

    .card-title {
        grid-column: span 3;
    }

    .rocket-image {
        grid-column: span 4;
        max-width: 100%;
        max-height: 170px;
    }

    .rocket-image img {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }

    .rocket-info {
        grid-column: span 3;
    }

    .stat-value:hover {
        background-color: rgb(224, 240, 255);
        cursor: pointer;
    }
</style>
