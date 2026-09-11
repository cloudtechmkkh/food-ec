import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
    const token = useState<string | null>('token', () => {
        if (import.meta.client) {
            return localStorage.getItem('token');
        }
        return null;
    });

    const user = useState<any>('user', () => null);

    const setUserFromToken = (jwt: string) => {
        const decoded: any = jwtDecode(jwt);
        user.value = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role, //★ここが重要
        };
    };

    const login = async (email: string, password: string) => {
        const res: any = await $fetch('/api/auth/login', {
            method: 'POST',
            body: { email, password }
        });

        if (!res.token) throw new Error('Token not found');

        token.value = res.token;
        localStorage.setItem('token', res.token);

        setUserFromToken(res.token);
    };

    const logout = () => {
        token.value = null;
        user.value = null;
        localStorage.removeItem('token');
    };

    return { token, user, login, logout };
};