<script lang="ts">
    import { faClose } from '@fortawesome/free-solid-svg-icons';
    import { qrcode } from '$lib/qrcode';
    import { page } from '$app/stores';
    import Fa from 'svelte-fa';

    export let key: string;
    export let open: boolean;

    let dialog: HTMLDialogElement | undefined;

    $: if (open) {
        dialog?.showModal();
    } else {
        dialog?.close();
    }

    $: dest = `${$page.url.origin}/${key}`;
</script>

<dialog class="qr-modal" bind:this={dialog}>
    <div class="content">
        <button class="simple close" on:click={() => (open = false)}>
            <Fa icon={faClose} size="1.2x" />
        </button>

        <div
            class="qrcode skeleton"
            use:qrcode={{
                text: dest,
                size: 200,
                back: '#212123',
                fill: 'var(--primary)',
                render: 'svg',
            }}>
        </div>

        <p><code>{dest}</code></p>
    </div>
</dialog>

<style lang="scss">
    .qrcode {
        width: 200px;
        height: 200px;
    }

    .skeleton {
        background-color: var(--background-tertiary);
        animation: infinite 600ms skeleton alternate;
    }

    @keyframes skeleton {
        from {
            filter: brightness(90%);
        }

        to {
            filter: brightness(100%);
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;

        padding: 32px 0px;
    }

    .close {
        position: absolute;
        top: 16px;
        right: 16px;
    }
</style>
