<script lang="ts">
    import type { ActionData, PageData } from './$types';
    import { enhance } from '$app/forms';

    export let data: PageData;
    export let form: ActionData;

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

        <button {disabled}>Save</button>
    </form>
</section>

<section class="settings">
    <h2>Personalisation</h2>

    <label>
        Theme Colour - Coming Soon
        <input type="color" disabled />
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
</style>
