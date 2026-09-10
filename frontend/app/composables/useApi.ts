export const useApi = () => {
    const auth = useAuth();

    const getHeaders = (): Record<string, string> => {
            return auth.token.value
            ? { Authorization: `Bearer ${auth.token.value}` }
            : {};
    };
    
    const get = <T>(url: string, params: Record<string, unknown> = {}) => {
        return $fetch<T>(`${url}`, { 
            params,
            headers: getHeaders() 
        });
    };

    const post = (url: string, body: any) => {
        return $fetch(`${url}`, { 
            method: 'POST', 
            body,
            headers: getHeaders()
        })
    };

    const put = (url: string, body: any) => {
        return $fetch(`${url}`, { 
            method: 'PUT',
            body,
            headers: getHeaders()
        })
    };

    const del = (url: string) => {
        return $fetch(`${url}`, {
            method: 'DELETE',
            headers: getHeaders()
        })
    }

    return { get, post, put, del };
}