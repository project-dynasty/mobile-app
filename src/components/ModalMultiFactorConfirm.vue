<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="$emit('close')">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Multi Faktor Autorisierung</DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">Du versuchst gerade dich auf einem neuen Gerät anzumelden. Bitte klicke die richtige Zahl an um den Vorgang zu autorisieren. Die richtige Zahl findest du auf dem Gerät wo du dich probiert anzumelden. Du kannst diesen Anmelde Vorgang auch ignorieren indem du außerhalb des Dialogs klickst.</p>
                  </div>
                </div>
              </div>
              <div class="mt-5 mt-4 flex sm:px-10 justify-evenly items-center">
                <button @click="solve(number.first)" type="button" class="mt-3 rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 mt-0 ml-3 sm:w-auto sm:text-sm" :class="{'bg-gray-100': loading}"><template v-if="!loading">{{ number.first }}</template><template v-else><LoadingComponent/></template></button>
                <button @click="solve(number.second)" type="button" class="mt-3 rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 mt-0 ml-3 sm:w-auto sm:text-sm" :class="{'bg-gray-100': loading}"><template v-if="!loading">{{ number.second }}</template><template v-else><LoadingComponent/></template></button>
                <button @click="solve(number.third)" type="button" class="mt-3 rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 mt-0 ml-3 sm:w-auto sm:text-sm" :class="{'bg-gray-100': loading}"><template v-if="!loading">{{ number.third }}</template><template v-else><LoadingComponent/></template></button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>

import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import app from "@/main";
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  props: {
    open: {
      type: Boolean,
      required: true
    },
    numbers: {
      type: Array,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  watch: {
    numbers() {
      const n = this.numbers
      const shuffledArray = n.sort(() => 0.5 - Math.random());
      this.number.first = shuffledArray[0]
      this.number.second = shuffledArray[1]
      this.number.third = shuffledArray[2]
    }
  },
  data(){
    return {
      number: {
        first: 0,
        second: 0,
        third: 0
      },
      loading: false
    }
  },
  methods: {
    async solve(number) {
      this.loading = true
      try {
        await app.axios.post('https://api.project-dynasty.de/auth/mobile-auth', {
          token: this.token,
          confirmCode: number
        });
        console.log(number)
        console.log(app)
        // eslint-disable-next-line
      } catch (ignored) {
      }
      this.loading = false
      this.$emit("close")
    }
  },
  components: {
    LoadingComponent,
    Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild
  }
}
</script>