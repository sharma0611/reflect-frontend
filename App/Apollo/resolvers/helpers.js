export const withType = async (data, type) => ({ ...(await data), __typename: type })
export const arrayWithType = async (arr, type) =>
    (await arr).map(item => ({ ...item, __typename: type }))
