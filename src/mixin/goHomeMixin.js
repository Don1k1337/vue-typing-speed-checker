export const goHomeMixin = {
    methods: {
        async goHome() {
            await this.$router.push('/');
        },
    },
};
