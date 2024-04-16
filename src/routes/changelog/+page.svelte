<section class="col">
    <h1>Changelog</h1>

    <p>
        List of changes that have happend to short! Checkout the
        <a href="https://github.com/ghostdevv/short">GitHub</a> to contribute ;)
    </p>
</section>

<hr />

<section class="col changelog">
    <!-- svelte-ignore missing-declaration -->
    {@html __CHANGELOG_HTML__}
</section>

<style lang="scss">
    :global(.changelog h1) {
        margin-bottom: 12px;
        margin-top: 12px;
    }

    :global(.changelog li) {
        margin-bottom: 8px;
    }
</style>
