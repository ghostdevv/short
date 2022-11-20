<script lang="ts">
    import type { PageData, ActionData } from './$types';
    import { enhance } from '$app/forms';

    export let data: PageData;
    export let form: ActionData;
</script>

<section class="col">
    <h1>Settings</h1>
    <p>Customise Short to be your own</p>
</section>

<hr />

<section class="settings">
    <h2>General</h2>

    <form method="POST" action="?/general" use:enhance>
        <label>
            Backend Url

            <input
                type="text"
                name="backendUrl"
                value={form?.backendUrl || data?.backendUrl} />
        </label>

        <button>Save</button>
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

    label {
        display: flex;
        flex-direction: column;
        font-size: 1.2rem;
        gap: 8px;
    }

    .settings {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
</style>
