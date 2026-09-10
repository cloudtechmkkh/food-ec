export const useAuth = () => {
    const token = useState<string | null>('token', () => {
        if (import.meta.client) {
            return localStorage.getItem('token');
        }
        return null;
    });

    const login = async (email: string, password: string) => {
        const res: any = await $fetch('/api/auth/login', {
            method: 'POST',
            body: { email, password }
        });

        if (!res.token) throw new Error('Token not found');

        token.value = res.token;

        if (import.meta.client) {
            localStorage.setItem('token', res.token);
        }
    };

    const logout = () => {
        token.value = null;
        if (import.meta.client) {
            localStorage.removeItem('token');
        }
    };

    return { token, login, logout };
};