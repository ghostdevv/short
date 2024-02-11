<script lang="ts">
    import {
        faClipboard,
        faQrcode,
        faUpRightFromSquare,
        faCheck,
    } from '@fortawesome/free-solid-svg-icons';
    import { copy } from 'svelte-copy';
    import { page } from '$app/stores';
    import { onDestroy } from 'svelte';
    import Fa from 'svelte-fa';

    export let qrLinkKey: string | undefined;

    export let link: string;
    export let key: string;

    let copied = false;
    let timeout: NodeJS.Timeout;

    function confirmCopied() {
        copied = true;
        setTimeout(() => (copied = false), 2000);
    }

    function truncateLink(link: string) {
        return link.length > 50 ? `${link.slice(0, 50)}...` : link;
    }

    onDestroy(() => {
        clearTimeout(timeout);
    });
</script>

<div class="card no-hover link">
    <h2>{key}</h2>
    <h5>{truncateLink(link)}</h5>

    <div class="buttons">
        <button
            title="Show QR code"
            class="simple"
            on:click={() => (qrLinkKey = key)}>
            <Fa size="1.2x" icon={faQrcode} />
        </button>

        <button
            title="Copy link URL"
            class="simple"
            on:svelte-copy={confirmCopied}
            use:copy={`${$page.url.origin}/${key}`}>
            <Fa
                size="1.2x"
                icon={copied ? faCheck : faClipboard}
                color={copied ? 'var(--green)' : undefined} />
        </button>

        <a
            title="Open link in new tab"
            href="/{key}"
            class="simple"
            target="blank"
            rel="noreferrer">
            <Fa size="1.2x" icon={faUpRightFromSquare} />
        </a>
    </div>
</div>

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
        }
    }
</style>
