export const formatDate = dateStr => {
  const date = new Date(dateStr)
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'short' })
  return `${day} ${month} ${date.getFullYear()}`
}

export const fetchContent = async (model, param = {}) => {
  try {
    const qs = Object.entries(param).reduce((acc, [key, value]) => {
      return acc += `${key}=${JSON.stringify(value)}`
    }, '')
    const res = await fetch(process.env.NEXT_PUBLIC_COCKPIT_URL + '/api/content/item/' + model + '?' + qs, {
      cache: 'no-store'
    })
    return await res.json()
  } catch(err) {
    return {}
  }
}

export const fetchContents = async models => {
  try {
    const qs = JSON.stringify(models.reduce((acc, curr) => {
      if (typeof curr === 'string') {
        return {
          ...acc,
          [curr]: {}
        }
      }
      return {
        ...acc,
        [curr.key]: curr.param || {}
      }
    }, {}))
    const res = await fetch(process.env.NEXT_PUBLIC_COCKPIT_URL + '/api/content/items?models='+qs, {
      cache: 'no-store'
    })
    return await res.json()
  } catch(err) {
    return {}
  }

}

/**
 * Helper to turn a relative Cockpit path into a full URL
 */
export const getAssetUrl = (path) => {
  if (!path) return "";
  
  // If the path is already a full URL, just return it
  if (path.startsWith('http')) return path;

  const host = process.env.NEXT_PUBLIC_ADMIN_HOST || 'https://admin.digitalplace.ai';
  
  // Clean up slashes to avoid "domain.com//storage"
  const cleanHost = host.replace(/\/$/, "");
  const cleanPath = path.replace(/^\//, "");
  
  return `${cleanHost}/${cleanPath}`;
};

