import { useEffect, useState } from "react"
import { getUserListing } from "../API/getUserListing"
import thumbnail from "./../asset/image/video.png"
import localImage from "./../asset/image/149071.png"
const Listing = () => {

    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const getListingData = async () => {
        try {
            setLoading(true)
            let res = await getUserListing()
            console.log(res.data);
            setData(res.data)
            setLoading(false)
        } catch (error) {

        }
    }
    useEffect(() => {
        getListingData()
    }, [])
    return (
        <>
            <h1>Listing Page</h1>
            <div>
                {isLoading ? <>Loading ... </>
                    :
                    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                        {data && data.length > 0 && data.map((n, i) => (
                            <div key={i} style={{
                                border: "1px solid black",
                                margin: "20px"
                            }}>
                                <div style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    padding: '15px',
                                    marginBottom: '20px',
                                    backgroundColor: '#f9f9f9',
                                    display: 'flex',
                                    justifyContent: "space-between",
                                    alignItems: 'center',
                                    width: "80%",
                                    margin: "auto",
                                    marginTop: "10px"
                                }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row-reverse",
                                        alignItems: "center",
                                        gap: 5
                                    }}>
                                        <div style={{
                                            flex: '0 0 auto',
                                            marginRight: '15px'
                                        }}>
                                            <img
                                                src={n.profileImage ? n.profileImage : localImage}
                                                alt="Profile"
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </div>
                                        <div style={{
                                            flex: '1 1 auto'
                                        }}>
                                            <h4 style={{
                                                margin: '0',
                                                fontSize: '1.2rem',
                                                color: '#333'
                                            }}>{n.fName}</h4>
                                        </div>
                                    </div>
                                    <div>
                                        <button>View more</button>
                                    </div>
                                </div>
                                <hr />
                                <h3> Uploaded video</h3>
                                <div style={{
                                    display: "flex",
                                    flexWrap: "wrap"
                                }}>
                                    {n?.videos && n.videos.length > 0 ? (
                                        n.videos.map((v, i) => (
                                            <a key={i} href={v.videoURL} target="_blank" style={{ textDecoration: "none" }}>
                                                <div style={{
                                                    border: '1px solid #ddd',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                                    overflow: 'hidden',
                                                    margin: '10px',
                                                    width: '200px',
                                                    height:"300px",
                                                    fontFamily: 'Arial, sans-serif',
                                                    backgroundColor: '#fff',
                                                    textAlign: 'center'
                                                }}>
                                                    <img
                                                        src={thumbnail}
                                                        alt={`video`}
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            display: 'block'
                                                        }}
                                                    />
                                                    <div style={{ padding: '15px' }}>
                                                        <h4 style={{
                                                            margin: '0',
                                                            fontSize: '1.2rem',
                                                            color: '#333'
                                                        }}>
                                                            {v.title}
                                                        </h4>
                                                        <p style={{
                                                            margin: '10px 0',
                                                            fontSize: '0.9rem',
                                                            color: '#666'
                                                        }}>
                                                            {v.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </a>

                                        ))
                                    ) : (
                                        <p>Video not uploaded yet</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                }

            </div>
        </>
    )
}

export default Listing