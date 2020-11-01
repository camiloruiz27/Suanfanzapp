import { MessageI } from './MessageI';

export interface ChatI{
    identifier:any
    title: string
    icon: string
    msgPreview: string
    isRead: boolean
    lastMsg: string
    msgs: Array<MessageI>
}
