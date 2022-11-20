<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<section class="col">
    <h1>Settings</h1>
    <p>Don't worry, these autosave ;)</p>
</section>

<hr />

<section class="settings">
    <h2>General</h2>

    <form method="POST" action="?/general">
        <label>
            Backend Url
            <input type="text" name="backendUrl" value={data.backendUrl} />
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
