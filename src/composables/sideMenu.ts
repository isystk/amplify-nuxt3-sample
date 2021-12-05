import { ref, Ref } from "vue";
import { defineStore } from "pinia";

interface SideMenuState {
    isOpen: boolean;
}

export const useSideMenu = defineStore('sideMenu', {
    state: (): SideMenuState => ({
        isOpen: false,
    }),
    actions: {
        toggle() {
            this.isOpen = !this.isOpen;
        },

        close() {
            this.isOpen = false;
        },
    }
})

