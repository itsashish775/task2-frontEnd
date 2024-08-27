import React, { useRef } from 'react';
import avtarImg from "../asset/image/149071.png"
function ProfileImage({ data, handleImageUpload }) {
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    return (
        <div onClick={handleImageClick} style={{ cursor: 'pointer' }}>
            {data?.profileImage ? (
                <img
                    src={data?.profileImage}
                    alt="profileimg"
                    style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #ddd"
                    }}
                />
            ) : (
                <img
                    src={avtarImg}
                    alt="profileimg"
                    style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #ddd"
                    }}
                />
            )}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/*"
            />
        </div>
    );
}

export default ProfileImage;
