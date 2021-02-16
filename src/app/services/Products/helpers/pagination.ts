export function createPagination (currentPage: number, totalPages: number) {
  const maxWidth = 7

  const sidePages = Math.floor(maxWidth / 2)

  const startPagination = currentPage - sidePages
  const endPagination = currentPage + sidePages

  const pages = []
  for (let page = startPagination; page <= endPagination; page++) {
    if (page >= 1 && page <= totalPages) {
      pages.push(page)
    }
  }

  return pages
}
