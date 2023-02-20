<script lang="ts">
    import 'ghostsui';
    import { faCog, faClose, faUser } from '@fortawesome/free-solid-svg-icons';
    import { faGithub } from '@fortawesome/free-brands-svg-icons';
    import { faScroll } from '@fortawesome/free-solid-svg-icons';
    import { textColour, themeColour } from '$lib/settings';
    import { lightenColour } from '$lib/colour';
    import { browser } from '$app/environment';
    import { page } from '$app/stores';
    import Fa from 'svelte-fa';

    $: changelogPage = $page.url.pathname.startsWith('/changelog');
    $: settingsPage = $page.url.pathname.startsWith('/settings');
    $: accountPage = $page.url.pathname.startsWith('/account');

    $: if (browser && ($themeColour || $textColour)) {
        document.documentElement.style.setProperty('--primary', $themeColour);

        document.documentElement.style.setProperty(
            '--primary-hover',
            lightenColour($themeColour, 0.15),
        );

        document.documentElement.style.setProperty('--text', $textColour);
    }
</script>

<nav>
    <div class="buttons">
        <a
            href="https://github.com/ghostdevv/short"
            target="_blank"
            rel="noreferrer"
            title="GitHub">
            <Fa size="1.5x" icon={faGithub} />
        </a>

        <a href={changelogPage ? '/' : '/changelog'} title="Changelog">
            <Fa size="1.5x" icon={changelogPage ? faClose : faScroll} />
        </a>
    </div>

    <div class="buttons">
        <a href={accountPage ? '/' : '/account'} title="Account">
            <Fa size="1.4x" icon={accountPage ? faClose : faUser} />
        </a>

        <a href={settingsPage ? '/' : '/settings'} title="Settings">
            <Fa size="1.5x" icon={settingsPage ? faClose : faCog} />
        </a>
    </div>
</nav>

<main>
    <slot />
</main>

<style lang="scss">
    nav {
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;

        .buttons {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        a {
            padding: 8px;

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
