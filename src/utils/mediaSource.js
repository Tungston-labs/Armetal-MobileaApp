const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const normalizeMediaUri = (path) => {
  if (!path) return null;

  if (path.startsWith("https://")) return path;
  if (path.startsWith("http://")) return path.replace("http://", "https://");
  if (path.startsWith("//")) return `https:${path}`;

  const normalizedPath = path.startsWith("/")
    ? path
    : path.startsWith("media/")
      ? `/${path}`
      : `/media/${path}`;

  return `${BASE_URL}${normalizedPath}`;
};

export const buildAuthenticatedImageSource = ({
  path,
  token,
  fallbackUri = null,
}) => {
  const uri = normalizeMediaUri(path) || fallbackUri;

  if (!uri) return null;

  if (!token || uri === fallbackUri) {
    return { uri };
  }

  return {
    uri,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
