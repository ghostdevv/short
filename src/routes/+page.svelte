<script lang="ts">
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import LinkCard from '$lib/LinkCard.svelte';

    export let form;
</script>

<section class="col">
    <h1>Short Links</h1>
    <p>A foss, self hostable, and private link shortener</p>
</section>

<hr />

<section>
    <form method="POST" action="/" class="link-form" use:enhance>
        <label>
            What link would you like to shorten?

            <input
                type="url"
                required
                placeholder="https://example.com"
                name="link" />
        </label>

        <label>
            When should it expire?

            <select name="expiry" value={'one_month'} required>
                <option value="one_month">1 Month</option>
                <option value="one_week">1 Week</option>
                <option value="one_hour">1 Hour</option>
                <option value="thirty_minutes">30 Minutes</option>
                <option value="ten_minutes">10 Minutes</option>
            </select>
        </label>

        <button> Shorten it! </button>
    </form>
</section>

{#if form?.success && form?.link}
    <section class="col">
        <h2 class="success">Success!</h2>
        <LinkCard {...form.link} />
        <p class="case-note">Short Links are case insensitive</p>
    </section>
{/if}

{#if form?.error}
    <section class="col card no-hover">
        <h2 class="error">Error!</h2>
        <p>{form.error}</p>
    </section>
{/if}

<style lang="scss">
    .case-note {
        color: rgba(var(--text-rgb), 0.6);
        margin: 0 auto;
        font-size: 14px;
    }

    .success {
        color: var(--green);
    }

    .error {
        color: var(--red);
    }

    .link-form {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 32px;

        label {
            display: flex;
            flex-direction: column;
            font-size: 1.2rem;
            gap: 8px;
        }
    }
</style>
