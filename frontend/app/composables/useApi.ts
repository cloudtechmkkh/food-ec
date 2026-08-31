export const useApi = () => {

    const config = useRuntimeConfig();

    const get = <T>(url: string, params: Record<string, unknown> = {}) => {
        return $fetch<T>(`/api${url}`, { params });
    };
    const post = (url: string, body: any) => $fetch(`/api${url}`, { method: 'POST', body });
    return { get, post };
}