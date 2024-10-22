import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()

export default {
    API_URL: publicRuntimeConfig?.API_URL ?? '',
}
