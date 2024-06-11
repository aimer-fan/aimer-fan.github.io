---
layout: blank
---

<script setup lang="ts">
  import XlsxParser from '../../pages/XlsxParser.vue'
</script>

<ClientOnly>
  <Suspense>
    <template #fallback>Loading...</template>
    <XlsxParser class="p4" />
  </Suspense>
</ClientOnly>
