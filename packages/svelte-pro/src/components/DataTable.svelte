<script lang="ts">
  export let columns: Array<{ key: string; label: string }> = [];
  export let rows: Record<string, string | number>[] = [];
</script>

<div class="sm-data-table">
  <table>
    <thead><tr>{#each columns as column}<th>{column.label}</th>{/each}</tr></thead>
    <tbody>
      {#each rows as row}
        <tr>{#each columns as column}<td>{row[column.key]}</td>{/each}</tr>
      {/each}
    </tbody>
  </table>
</div>
