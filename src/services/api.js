// import axios from "axios";
const base_url = "https://bookmyclass.fly.dev/"

const registerUser = async (values) => {
    let response;
    try {
        response = await fetch(`${base_url}api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstname: values.firstName,
                lastname: values.lastName,
                email: values.email,
                password: values.password,
                confirmpassword: values.confirmPassword,
            }),
        })
            ;
        if (response.ok) {
            response = response.json();
            return response;
            // window.location.href = local_url
        }
        else {
            response = response.json();
        }

    } catch (e) {
        return e;
    }
}

const loginUser = async (email,password) => {
    let response;
    try {
        response = await fetch(`${base_url}api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        return response.json();
    } catch (e) {
        return e;
    }
}

const userProfile = async (token) => {
    let response;
    try {
        response = await fetch(`${base_url}api/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token":token,
            },

        });
        return response;
    } catch (e) {
        return e;
    }
}
const apiCalls = {
    registerUser,
    userProfile,
    loginUser
};
export default apiCalls