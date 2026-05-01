<script lang="ts">
  export let value = "";
  export let placeholder = "";
  export let disabled = false;
</script>

<input class="sm-input" bind:value {placeholder} {disabled} />
