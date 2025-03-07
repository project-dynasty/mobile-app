<template>
  <TransitionRoot :show="open" as="template" @after-leave="query = ''" appear>
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="ease-in duration-200" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
          <DialogPanel class="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
            <Combobox @update:modelValue="onSelect">
              <div class="relative">
                <i class="fa fa-magnifying-glass pointer-events-none absolute top-3.5 left-4 h-4 w-4 text-gray-400" aria-hidden="true"></i>
                <ComboboxInput class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm" placeholder="Search..." @change="query = $event.target.value" />
              </div>

              <ComboboxOptions v-if="filteredPeople.length > 0" static class="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                <ComboboxOption v-for="person in filteredPeople" :key="person.id" :value="person" as="template" v-slot="{ active }">
                  <li :class="['cursor-default select-none px-4 py-2', active && 'bg-cyan-600 text-white']">
                    {{ person.name }}
                  </li>
                </ComboboxOption>
              </ComboboxOptions>

              <p v-if="query !== '' && filteredPeople.length === 0" class="p-4 text-sm text-gray-500">No people found.</p>
            </Combobox>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
export default {
  name: "SearchBar"
}
</script>

<script setup>
import { computed, ref } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

const people = [
  { id: 1, name: 'Nico Kempe', url: '/profile' },
  { id: 2, name: 'Maximilian Wiegmann', url: '/profile' },
  { id: 3, name: 'Jonas Flügge', url: '/profile' },
  { id: 4, name: 'Alexander Wodarz', url: '/profile' },
  { id: 5, name: 'Lilly Kempe', url: '/profile' },
]

const open = ref(true)
const query = ref('')
const filteredPeople = computed(() =>
    query.value === ''
        ? []
        : people.filter((person) => {
          return person.name.toLowerCase().includes(query.value.toLowerCase())
        })
)

function onSelect(person) {
  window.location = person.url
}
</script>