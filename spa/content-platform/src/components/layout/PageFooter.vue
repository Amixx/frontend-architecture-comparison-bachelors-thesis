<template>
  <footer class="bg-white container text-sm">
    <div class="bg-yellow-700 flex gap-4 justify-between p-4 text-white">
      <div>© {{ currentYear }} Laimes Maize</div>
      <ul class="flex gap-4 items-center justify-center">
        <li v-for="link in data.social" :key="link.url">
          <a
            class="hover:text-lime-200 hover:underline text-white"
            :href="link.url"
            target="_blank"
            >{{ link.name }}</a
          >
        </li>
      </ul>
    </div>
    <div
      class="bg-black border-slate-200 flex justify-between px-2 py-1 text-[10px] text-white"
    >
      <div>
        Made with ❤️ by
        <a
          class="hover:underline text-orange-300"
          href="https://github.com/Amixx"
          target="_blank"
          >https://github.com/Amixx</a
        >
      </div>
      <div>
        Images by
        <a
          class="hover:underline text-orange-300"
          href="https://www.freepik.com/free-photo/sweet-pastry-assortment-top-view_7781342.htm#query=bakery&position=2&from_view=keyword&track=sph&uuid=4f2eded4-37c1-41cf-9fcf-80f3c7ad0459"
          target="_blank"
        >
          Freepik
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps<{ data: FooterData }>()

const currentYear = new Date().getFullYear()
</script>
