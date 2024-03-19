export function formatDate(postDate: Date) {
  const date = new Date(postDate);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
