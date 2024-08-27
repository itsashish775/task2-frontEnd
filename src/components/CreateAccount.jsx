import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accoutCreate } from '../API/createAccount';

const CreateAccount = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fName: '',
        lName: '',
        email: '',
        mobileNumber: ''
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

        if (!formData.lName) {
            formErrors.lName = 'Last Name is required';
        }

        if (!formData.email) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Email is invalid';
        }

        if (!formData.mobileNumber) {
            formErrors.mobileNumber = 'Mobile Number is required';
        } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
            formErrors.mobileNumber = 'Mobile Number must be 10 digits';
        }

        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length === 0) {
            // Submit the form
            setErrors({})
            console.log('Form submitted:', formData);
            try {
                const res = await accoutCreate(formData)
                console.log(res);
                if (res.status = 201) {
                    alert(res.message)
                    navigate("/login")
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
            <div style={{ maxWidth: "450px", margin: "50px auto", padding: "25px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)", fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9" }}>
                <h1 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Create Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: "20px" }}>
                        <label htmlFor="fName" style={{ display: "block", marginBottom: "5px", color: "#555" }}>First Name</label>
                        <input
                            type="text"
                            name="fName"
                            id="fName"
                            value={formData.fName}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                        />
                        {errors.fName && <span className="error" style={{ color: "red", fontSize: "12px" }}>{errors.fName}</span>}
                    </div>
                    <div className="form-group" style={{ marginBottom: "20px" }}>
                        <label htmlFor="lName" style={{ display: "block", marginBottom: "5px", color: "#555" }}>Last Name</label>
                        <input
                            type="text"
                            name="lName"
                            id="lName"
                            value={formData.lName}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                        />
                        {errors.lName && <span className="error" style={{ color: "red", fontSize: "12px" }}>{errors.lName}</span>}
                    </div>
                    <div className="form-group" style={{ marginBottom: "20px" }}>
                        <label htmlFor="email" style={{ display: "block", marginBottom: "5px", color: "#555" }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                        />
                        {errors.email && <span className="error" style={{ color: "red", fontSize: "12px" }}>{errors.email}</span>}
                    </div>
                    <div className="form-group" style={{ marginBottom: "20px" }}>
                        <label htmlFor="mobileNumber" style={{ display: "block", marginBottom: "5px", color: "#555" }}>Mobile Number</label>
                        <input
                            type="text"
                            name="mobileNumber"
                            id="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                        />
                        {errors.mobileNumber && <span className="error" style={{ color: "red", fontSize: "12px" }}>{errors.mobileNumber}</span>}
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px"
                    }}>
                        <button type="submit" style={{
                            padding: "10px 20px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}>Create Account</button>
                        <button onClick={() => navigate("/login")} style={{
                            padding: "10px 20px",
                            backgroundColor: "#008CBA",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}>Log In</button>
                    </div>
                </form>
            </div>
        </>

    );
};

export default CreateAccount;
