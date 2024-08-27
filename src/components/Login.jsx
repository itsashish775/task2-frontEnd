import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../API/login';

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fName: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        let formErrors = {};

        if (!formData.fName) {
            formErrors.fName = 'First Name is required';
        }

        if (!formData.password) {
            formErrors.password = 'Password is required';
        }

        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length === 0) {
            // Submit the form (for example, make an API call)
            console.log('Login successful:', formData);
            try {
                const res = await login(formData)
                console.log(res);
                if (res.status = 200) {
                    alert(res.message)
                    localStorage.setItem("userId", res?.data?._id)
                    navigate("/profile")
                }
            } catch (error) {
                alert(error?.response?.data?.err);
            }
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <>
            <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9" }}>
                <h1 style={{ textAlign: "center", color: "#333" }}>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: "20px" }}>
                        <label htmlFor="fName" style={{ display: "block", marginBottom: "5px", color: "#555" }}>First Name</label>
                        <input
                            type="text"
                            name="fName"
                            id="fName"
                            value={formData.fName}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                        />
                        {errors.fName && <span className="error" style={{ color: "red", fontSize: "12px" }}>{errors.fName}</span>}
                    </div>
                    <div className="form-group" style={{ marginBottom: "20px" }}>
                        <label htmlFor="password" style={{ display: "block", marginBottom: "5px", color: "#555" }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                        />
                        {errors.password && <span className="error" style={{ color: "red", fontSize: "12px" }}>{errors.password}</span>}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button type="submit" style={{
                            padding: "10px 20px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}>Login</button>
                        <button onClick={() => navigate("/")} style={{
                            padding: "10px 20px",
                            backgroundColor: "#008CBA",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}>Create</button>
                    </div>
                </form>
            </div>
        </>

    );
};

export default Login;
