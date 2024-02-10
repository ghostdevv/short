<script lang="ts">
    import { themeColour, textColour } from '$lib/settings';
    import { enhance } from '$app/forms';

    export let data;
    export let form;

    let disabled = false;
</script>

<section class="col">
    <h1>Settings</h1>
    <p>Customise Short to be your own</p>
</section>

<hr />

{#if form?.error}
    <section class="col card no-hover">
        <h2 class="error">Error!</h2>
        <p>{form.error}</p>
    </section>
{/if}

<section class="settings">
    <h2>General</h2>

    <form
        method="POST"
        action="?/general"
        use:enhance={() => {
            disabled = true;
            return async ({ update }) => {
                disabled = false;
                await update({ reset: false });
            };
        }}>
        <label>
            Account UUID

            <input
                type="text"
                name="account"
                value={data?.account}
                {disabled} />
        </label>

        <button title="Save settings" {disabled}>Save</button>
    </form>
</section>

<section class="settings">
    <h2>Personalisation</h2>

    <label>
        Theme Colour

        <div class="row">
            <input type="color" bind:value={$themeColour} />

            <button
                title="Reset to default colour"
                on:click={() => ($themeColour = '#2160ec')}>
                Reset
            </button>
        </div>
    </label>

    <label>
        Text Colour

        <div class="row">
            <input type="color" bind:value={$textColour} />

            <button
                title="Reset to default colour"
                on:click={() => ($textColour = '#eeeeee')}>Reset</button>
        </div>
    </label>
</section>

<style lang="scss">
    form {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 16px;

        width: 100%;
    }

    .error {
        color: var(--red);
    }

    label {
        display: flex;
        flex-direction: column;
        font-size: 1.2rem;
        gap: 12px;
    }

    .settings {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .row {
        align-items: center;
    }
</style>
