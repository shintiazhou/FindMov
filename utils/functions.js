// basic math to merge first and second page so it shows more collection of movies
export const secondPageMerge = (x) => {
    const value = parseInt(x)
    const firstPage = (value - 1) + value
    const secondPage = value * 2
    return [firstPage, secondPage]
}