export interface MessageI{
    id:string,
    content: string
    time: string
    isRead: boolean
    owner?: string
    isMe: boolean
    from:string
}
