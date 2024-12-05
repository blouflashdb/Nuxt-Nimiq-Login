import type { SignedMessage } from '#shared/signedMessage'
import { BufferUtils, Hash, PublicKey, Signature, SignatureProof } from '@nimiq/core'
import HubApi from '@nimiq/hub-api'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  if (!session.challenge) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No challenge',
    })
  }

  const signedMessage: SignedMessage = await readBody(event)
  const signature = Signature.deserialize(new Uint8Array(signedMessage.signature))
  const publicKey = new PublicKey(new Uint8Array(signedMessage.signerPublicKey))
  const signatureProof = SignatureProof.singleSig(publicKey, signature)

  const data = HubApi.MSG_PREFIX
    + session.challenge.length
    + session.challenge
  const dataBytes = BufferUtils.fromUtf8(data)
  const hash = Hash.computeSha256(dataBytes)

  await clearUserSession(event)

  const isValid = signatureProof.verify(hash)
  if (!isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid signature',
    })
  }

  await setUserSession(event, {
    user: {
      address: publicKey.toAddress().toUserFriendlyAddress(),
    },
    challenge: '',
  })
})
