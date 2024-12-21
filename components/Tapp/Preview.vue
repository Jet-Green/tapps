<script setup lang="ts">
import type Tapp from "../../types/tapp.interface"

defineProps<{
  data: Tapp
}>()
</script>
<template>
  <div>
    {{ data }}
  </div>
</template>
