// import { mount, shallowMount, RouterLinkStub } from "@vue/test-utils";
// import Vue from "vue";
// import VueI18n from "vue-i18n";
// import Logo from "@/components/Logo.vue";
// import * as C from "@/common/constants/";
//
// Vue.prototype.$C = C;
// Vue.use(VueI18n);
//
// // VueI18nオブジェクトを作成する
// const i18n = new VueI18n({
//   locale: "ja",
//   messages: {
//     ja: require("@/locales/ja.json")
//   }
// });
//
// describe("Logo", (): void => {
//   test("Vueインスタンスが生成されること", (): void => {
//     const wrapper = shallowMount(Logo, {
//       i18n,
//       stubs: { NuxtLink: RouterLinkStub }
//     });
//     expect(wrapper.isVueInstance()).toBeTruthy();
//   });
// });
