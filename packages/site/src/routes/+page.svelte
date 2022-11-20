<script lang="ts">
    import type { ActionData } from './$types';

    export let form: ActionData;
</script>

<section class="col">
    <h1>Short Links</h1>
    <p>A foss, self hostable, and private link shortener</p>
</section>

<hr />

<section>
    <form method="POST" action="/" class="link-form">
        <label>
            What link would you like to shorten?

            <input
                type="url"
                required
                value={form?.link ?? ''}
                placeholder="https://example.com"
                name="link" />
        </label>

        <label>
            When should it expire?

            <select name="expiry" value={form?.expiry ?? undefined} required>
                <option value={undefined}>Never</option>
                <option value="ten_minutes">10 Minutes</option>
                <option value="thirty_minutes">30 Minutes</option>
                <option value="one_hour">1 Hour</option>
                <option value="one_week">1 Week</option>
                <option value="one_month">1 Month</option>
            </select>
        </label>

        <button> Shorten it! </button>
    </form>
</section>

<style lang="scss">
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
