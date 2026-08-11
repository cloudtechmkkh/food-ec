import { $fetch } from 'ofetch';

export const useApi = () => {
    const get = (url: string) => $fetch(`/api${url}`);
    const post = (url: string, body: any) => $fetch(`/api${url}`, { method: 'POST', body });
    return { get, post };
}