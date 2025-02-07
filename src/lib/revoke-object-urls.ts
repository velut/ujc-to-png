export const revokeObjectUrls = (urlContainers: { url: string }[]) => {
  setTimeout(() => {
    for (const { url } of urlContainers) {
      URL.revokeObjectURL(url);
    }
  }, 100);
};
