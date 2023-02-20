<script lang="ts">
    import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
    import { faClipboard } from '@fortawesome/free-solid-svg-icons';
    import type { PageData } from './$types';
    import { copy } from 'svelte-copy';
    import Fa from 'svelte-fa';
    import { page } from '$app/stores';

    export let data: PageData;
</script>

<section class="col">
    <h1>Account</h1>

    <p>
        Don't forget to write down your <a href="/settings">account uuid</a> if you
        want to keep track of your links!
    </p>
</section>

<hr />

<section class="col">
    {#each data.links as { key, link }}
        <div class="card no-hover link">
            <h2>{key}</h2>
            <h5>{link}</h5>

            <div class="buttons">
                <button class="button" use:copy={`${$page.url.origin}/${key}`}>
                    <Fa size="1.2x" icon={faClipboard} />
                </button>

                <a href="/{key}" class="button" target="blank" rel="noreferrer">
                    <Fa size="1.2x" icon={faUpRightFromSquare} />
                </a>
            </div>
        </div>
    {/each}
</section>

<style lang="scss">
    .link {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;

        .buttons {
            display: flex;
            align-items: center;
            gap: 8px;

            .button {
                padding: 8px;

                border: none;
                background: transparent;
                color: rgba(var(--text-rgb), 0.6);

                &:hover,
                &:focus {
                    color: var(--primary);
                }
            }
        }
    }
</style>
