<script lang="ts">
    import LinkCard from '$lib/LinkCard.svelte';

    export let data;
</script>

<section class="col">
    <h1>Account</h1>

    <p>
        Don't forget to write down your <a href="/settings">account uuid</a> if you
        want to keep track of your links!
    </p>
</section>

<hr />

<section class="col g16">
    {#each data.links as link}
        <LinkCard {...link} />
    {:else}
        <p>You don't have any links yet!</p>
    {/each}
</section>
