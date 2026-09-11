export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuth();

    const publicAdminPaths = ['/admin/login', '/admin/register'];

    if (publicAdminPaths.includes(to.path)) {
        return;
    }

    if (to.path.startsWith('/admin')) {
        // 未ログイン
        if (!auth.token.value) {
            return navigateTo('/admin/login');
        }
        // 権限チェック
        if (auth.user.value?.role !== 'admin') {
            return navigateTo('/admin/login');
        }
    }
})