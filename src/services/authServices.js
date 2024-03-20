
const authServices = {
    login: async (login, password) => {
        const result = await fetch('/api/v1/users/sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login,
                password
            })
        })

        return result;
    },
    logout: async () => {
        await fetch('/api/v1/users/sign', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        localStorage.removeItem('token');     
    },
    user: async () => {
        const result = await fetch('/api/v1/users/self?fields=*', {
            method: 'GET',
            headers: {
                'X-Token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });
        return result;
    }
};

export default authServices;