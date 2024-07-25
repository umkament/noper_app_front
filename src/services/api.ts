export async function fetchPosts() {
  const response = await fetch('http://localhost:4411/posts')

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()

  return data
}
