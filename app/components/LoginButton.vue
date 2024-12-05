<script setup lang="ts">
import type { SignedMessage } from '#shared/signedMessage'
import HubApi from '@nimiq/hub-api'

const runtimeConfig = useRuntimeConfig()
const { fetch: fetchSession } = useUserSession()

async function login() {
  const challange = await $fetch('/api/auth/challange', {
    method: 'POST',
  })

  const hubApi = new HubApi(runtimeConfig.public.nimiqHubUrl)
  const signMessageResponse = await hubApi.signMessage({
    appName: 'NimiqLogin',
    message: challange!,
  })

  await $fetch('/api/auth/verify', {
    method: 'POST',
    body: {
      signature: Array.from(signMessageResponse.signature),
      signerPublicKey: Array.from(signMessageResponse.signerPublicKey),
    } as SignedMessage,
  })

  await fetchSession()
}
</script>

<template>
  <ClientOnly>
    <button @click="login">
      Login with Nimiq
    </button>
    <template #fallback>
      <button disabled>
        Loading...
      </button>
    </template>
  </ClientOnly>
</template>
