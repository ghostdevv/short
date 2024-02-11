<script lang="ts">
    import {
        faCopy,
        faCheck,
        faQrcode,
        faStopwatch,
        faUpRightFromSquare,
    } from '@fortawesome/free-solid-svg-icons';
    import { formatDistanceToNowStrict } from 'date-fns';
    import QRModal from './QRModal.svelte';
    import { copy } from 'svelte-copy';
    import { page } from '$app/stores';
    import { onDestroy } from 'svelte';
    import Fa from 'svelte-fa';

    export let link: string;
    export let key: string;
    export let expiresAt: number;

    let qrModalOpen = false;

    let copied = false;
    let timeout: NodeJS.Timeout | undefined;

    function confirmCopied() {
        copied = true;
        timeout = setTimeout(() => (copied = false), 2000);
    }

    onDestroy(() => {
        clearTimeout(timeout);
    });
</script>

<QRModal {key} bind:open={qrModalOpen} />

<div class="card no-hover link">
    <div class="col meta">
        <h4>{key}</h4>
        <p class="dest-link" title={link}>{link}</p>
    </div>

    <div class="buttons">
        <button
            title="Show QR code"
            class="simple"
            on:click={() => (qrModalOpen = true)}>
            <Fa size="1.2x" icon={faQrcode} />
        </button>

        <button
            title="Copy link URL"
            class="simple"
            on:svelte-copy={confirmCopied}
            use:copy={`${$page.url.origin}/${key}`}>
            <Fa
                size="1.2x"
                icon={copied ? faCheck : faCopy}
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

    <div class="stats">
        <p title="Expires at {new Date(expiresAt).toISOString()}">
            <Fa icon={faStopwatch} />&nbsp;
            {formatDistanceToNowStrict(expiresAt)}
        </p>
    </div>
</div>

<style lang="scss">
    @import 'include-media';

    .link {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        grid-template-rows: repeat(2, max-content);
        grid-template-areas: 'meta buttons' 'meta stats';
        align-items: center;
        gap: 8px 16px;

        @include media('<400px') {
            padding: 16px;
        }

        .meta {
            grid-area: meta;
            max-width: 100%;
        }

        .dest-link {
            color: rgba(var(--text-rgb), 0.8);

            width: 50ch;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .buttons {
            display: flex;
            align-items: center;
            gap: 8px;

            grid-area: buttons;
            justify-self: end;
        }

        .stats {
            grid-area: stats;
            justify-self: end;
            color: rgba(var(--text-rgb), 0.8);
        }
    }
</style>
