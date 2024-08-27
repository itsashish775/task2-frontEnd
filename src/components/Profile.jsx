import { useEffect, useState } from "react"
import { getLoginUserDetails } from "../API/getAuthDetails"
import AddBioModal from "./addBioModal"

import ProfileImage from "./ProfileImage"
import { uploadImage } from "../API/uploadImage"
import { updateProfileImage } from "../API/updateProfilePic"
import AddVideoModal from "./addVideoModel"

const Profile = () => {
    let userId = localStorage.getItem("userId")
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0)

    const [data, setData] = useState(null)
    const [open, setOpen] = useState(false)
    const [openVideo, setOpenVideo] = useState(false)
    const [profileImage, setProfileImage] = useState(null);
    const getProfileDetails = async () => {
        try {

            let res = await getLoginUserDetails({ id: userId })
            console.log(res);
            if (res.status == 200) {
                setLoading(true)
                setData(res.data)
                setProfileImage(res?.data?.profileImage)
            }
        } catch (error) {

        }
    }
    const uploadImagetoDb = async (file) => {
        const response = await uploadImage({ file: file });
        return response?.url
    }
    const handleImageUpload = async (file) => {

        let url = await uploadImagetoDb(file)
        await updateProfileImage({ id: localStorage.getItem("userId"), imageUrl: url })
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
        setCount(pre => pre + 1)
    };

    useEffect(() => {
        getProfileDetails()
    }, [count])
    return (
        <>
            {
                loading ? <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                    <h1 style={{ textAlign: "center", color: "#333" }}>Profile Page</h1>
                    <h3 style={{ textAlign: "left", color: "#555" }}>Upload data</h3>
                    <div style={{ width: "80%", margin: "20px auto", border: "1px solid #ccc", borderRadius: "8px", padding: "20px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                            <ProfileImage
                                data={{ profileImage }}
                                handleImageUpload={handleImageUpload}
                            />

                            <div style={{ flex: 1, marginLeft: "20px", color: "#333" }}>
                                <p style={{ margin: "10px 0" }}><strong>First Name:</strong> {data?.fName}</p>
                                <p style={{ margin: "10px 0" }}><strong>Last Name:</strong> {data?.lName}</p>
                                <p style={{ margin: "10px 0" }}><strong>Email Id:</strong> {data?.email}</p>
                                <p style={{ margin: "10px 0" }}><strong>Mobile no.:</strong> {data?.mobileNumber}</p>
                            </div>
                            <div>
                                <button style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                                    onClick={() => setOpen(true)}
                                >+ Add Bio</button>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <h4>Bio</h4>
                            <p>{data?.bio}</p>
                        </div>
                    </div>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <button style={{
                            padding: "12px 25px",
                            backgroundColor: "#FF5733",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "bold",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            transition: "background-color 0.3s ease"
                        }}
                            onClick={() => setOpenVideo(true)}>
                            + upload video
                        </button>
                    </div>
                    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "30px" }}>Video Listing</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
                            {/* Video Item 1 */}
                            <div style={{ border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", backgroundColor: "#fff", display: "flex" }}>
                                <div style={{ width: "200px", height: "150px" }}>
                                    <img src="https://picsum.photos/200/300" alt="Video Thumbnail" style={{ width: "100%", objectFit: "cover" }} />
                                </div>
                                <div style={{ padding: "15px" }}>
                                    <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>Video Title 2</h3>
                                    <p style={{ color: "#777" }}>This is a brief description of the video content. It provides an overview of what the video is about.</p>
                                </div>
                            </div>
                            {/* Video Item 2 */}
                            <div style={{ border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", backgroundColor: "#fff", display: "flex" }}>
                                <div style={{ width: "200px", height: "150px" }}>
                                    <img src="https://picsum.photos/200/300" alt="Video Thumbnail" style={{ width: "100%", objectFit: "cover" }} />
                                </div>
                                <div style={{ padding: "15px" }}>
                                    <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>Video Title 2</h3>
                                    <p style={{ color: "#777" }}>This is a brief description of the video content. It provides an overview of what the video is about.</p>
                                </div>
                            </div>
                            {/* Add more video items as needed */}
                        </div>
                    </div>


                </div> : <div>Loading...</div>
            }
            <AddBioModal open={open} setOpen={setOpen} />
            <AddVideoModal open={openVideo} setOpen={setOpenVideo} />
        </>
    )
}

export default Profile