type TabPart = 'info' | 'devices' | 'subscriptions' | 'payments'

export const validateProfilePart = (part: string | null): part is TabPart => {
  return ['info', 'devices', 'subscriptions', 'payments'].includes(part || '')
}