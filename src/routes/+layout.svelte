<script lang="ts">
    import 'ghostsui';
    import '../app.scss';

    import { faGithub } from '@fortawesome/free-brands-svg-icons';
    import { textColour, themeColour } from '$lib/settings';
    import { lightenColour } from '$lib/colour';
    import { browser } from '$app/environment';
    import { page } from '$app/stores';
    import Fa from 'svelte-fa';
    import {
        faScroll,
        faUser,
        faHome,
        faCog,
    } from '@fortawesome/free-solid-svg-icons';

    $: tab = $page.url.pathname.split('/')[1] || 'home';

    $: if (browser && ($themeColour || $textColour)) {
        document.documentElement.style.setProperty('--primary', $themeColour);
        document.documentElement.style.setProperty('--secondary', $themeColour);

        document.documentElement.style.setProperty(
            '--primary-hover',
            lightenColour($themeColour, 0.15),
        );

        document.documentElement.style.setProperty('--text', $textColour);
    }
</script>

<nav>
    <div class="buttons">
        <a href="/" class:active={tab == 'home'} title="Home">
            <Fa size="1.2x" icon={faHome} />
        </a>

        <a href="/account" class:active={tab == 'account'} title="Account">
            <Fa size="1.2x" icon={faUser} />
        </a>

        <a href="/settings" class:active={tab == 'settings'} title="Settings">
            <Fa size="1.2x" icon={faCog} />
        </a>

        <a
            href="/changelog"
            class:active={tab == 'changelog'}
            title="Changelog">
            <Fa size="1.2x" icon={faScroll} />
        </a>
    </div>

    <div class="buttons">
        <a
            href="https://github.com/ghostdevv/short"
            target="_blank"
            rel="noreferrer"
            title="GitHub">
            <Fa size="1.2x" icon={faGithub} />
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
            &:focus,
            &.active {
                color: var(--primary);
            }
        }
    }

    main,
    nav {
        max-width: 1000px;
        margin: 0 auto;

        padding: 16px;
    }
</style>
