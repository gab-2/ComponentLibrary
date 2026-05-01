<template>
  <div class="sm-data-table">
    <table>
      <thead><tr><th v-for="column in columns" :key="column.key">{{ column.label }}</th></tr></thead>
      <tbody>
        <tr v-for="(row, idx) in rows" :key="idx">
          <td v-for="column in columns" :key="column.key">{{ row[column.key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{ columns: Array<{ key: string; label: string }>; rows: Record<string, string | number>[] }>();
</script>
