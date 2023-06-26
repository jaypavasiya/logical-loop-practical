
export interface User {
    id: number
    name: string
    email: string
    gender: string
    status: string
}
export interface Meta {
    total: number
    pages: number
    page: number
    limit: number
    links: {
        previous: string
        current: string
        next: string
    }
}
export interface Post {
    id: number
    body: string
    title: string
    user_id: number
}