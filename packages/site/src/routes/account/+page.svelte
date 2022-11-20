<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<section class="col">
    <h1>Account</h1>
    <p>Don't forget to write down your account uuid from settings!</p>
</section>

<hr />

<section>
    {#each data.keys as key}
        <a href="/{key}" class="card">
            {key}
        </a>
    {/each}
</section>
