export const useApi = () => {
    const get = <T>(url: string, params: Record<string, unknown> = {}) => {
        return $fetch<T>(`${url}`, { params });
    };
    const post = (url: string, body: any) => $fetch(`${url}`, { method: 'POST', body });
    return { get, post };
}