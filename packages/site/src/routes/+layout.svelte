<script lang="ts">
    import 'ghostsui';
    import { faCog, faClose } from '@fortawesome/free-solid-svg-icons';
    import { page } from '$app/stores';
    import Fa from 'svelte-fa';

    $: settingsPage = $page.url.pathname.startsWith('/settings');
</script>

<nav>
    <a href={settingsPage ? '/' : '/settings'} class="settings">
        <Fa size="1.5x" icon={settingsPage ? faClose : faCog} />
    </a>
</nav>

<main>
    <slot />
</main>

<style lang="scss">
    nav {
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: flex-end;

        .settings {
            padding: 16px;

            color: rgba(var(--text-rgb), 0.6);

            &:hover,
            &:focus {
                color: var(--primary);
            }
        }
    }

    main,
    nav {
        max-width: 1200px;
        margin: 0 auto;

        padding: 16px;
    }
</style>
