export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuth();

    if (to.path.startsWith('/admin')) {
        if (!auth.token.value) {
            return navigateTo('/login');
        }
    }
})