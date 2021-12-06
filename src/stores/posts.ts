import {computed, inject, ref, Ref} from "vue";
import {acceptHMRUpdate, defineStore} from 'pinia'
import {API} from '@/utilities'
import {getApiEndpoint} from '@/common/constants/api'
import {useRuntimeConfig} from "#app";
import {Data, Post, Posts} from "~/@types/Posts";

export const usePostsStore = defineStore('posts', () => {
    /**
     * Current named of the user.
     */
    const items = ref<Posts>({})

    const displayPosts = computed(() => {
        const _ = inject('lodash')
        const moment = inject('moment')
        console.log(items.value)

        // data
        return _.map(items.value, function (e: Data<Post>) {
            const data = e.data
            return {
                id: e.id,
                ...data,
                regist_datetime_yyyymmdd: data.regist_datetime
                    ? moment(data.regist_datetime).format('YYYY/MM/DD')
                    : '',
            } as PostDisplay
        })
    })

    const fetchPosts = async () => {
        const config = useRuntimeConfig();
        const _ = inject('lodash')
        const response = await API.get(getApiEndpoint(config).POSTS)
        const res = _.mapKeys(response, 'id')
        console.log(res)
        items.value =  res
    }
    const fetchPost = async (id: string) => {
        const config = useRuntimeConfig();
        const response = await API.get(`${getApiEndpoint(config).POSTS}/${id}`)
        items.value = {[id]: response}
    }

    return {
        displayPosts,
        fetchPosts,
        fetchPost,
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usePostsStore, import.meta.hot))