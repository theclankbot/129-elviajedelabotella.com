const DEFAULT_SITE_URL = 'https://elviajedelabotella.com'
const DEFAULT_CONTACT_EMAIL = 'contacto@elviajedelabotella.com'

function trimTrailingSlash(value: string) {
  return value.endsWith('/') ? value.slice(0, -1) : value
}

export const siteConfig = {
  siteName: 'El Viaje de la Botella',
  siteUrl: trimTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || DEFAULT_CONTACT_EMAIL,
}
