export default function useAssetUrl(path) {
  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_HOST || ''
  return `${baseUrl}/storage/uploads${path}`
}
