import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/admin/',
        '*.json',
        '*.xml',
      ],
    },
    sitemap: 'https://juyesu.dev/sitemap.xml',
    host: 'https://juyesu.dev',
  }
}
