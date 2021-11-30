import { NuxtAxiosInstance } from "@nuxtjs/axios";

let $axios: NuxtAxiosInstance;

export function initializeAxios(axiosInstance: NuxtAxiosInstance): void {
  $axios = axiosInstance;
}

export { $axios };
