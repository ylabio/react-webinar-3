const authServices = {
    login: async (login, password) => {
        const result = await fetch('http://example.front.ylab.io/api/v1/users/sign', {
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
    }
};

export default authServices;