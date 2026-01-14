import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const [ user, setUser ] = useState(null)
    const [ showLogin, setShowLogin ] = useState(false)
    const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken'))
    const [ refreshToken, setRefreshToken ] = useState(localStorage.getItem('refreshToken'))
    const [ credit, setCredit ] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL ?? "https://image-generator-backend-six.vercel.app";

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const response = await axios.get(`${backendUrl}/api/v1/users/me`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.data.success) {
                        setUser(response.data.data); 
                        setAccessToken(token);       
                        setRefreshToken(localStorage.getItem('refreshToken'));
                    } else {
                        // Clear tokens if the response indicates failure
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        setAccessToken(null);
                        setRefreshToken(null);
                        setUser(null);
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                    // Clear tokens on error (e.g., invalid/expired token)
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    setAccessToken(null);
                    setRefreshToken(null);
                    setUser(null);
                }
            }
        };
        fetchUser();
    }, []);


    const navigate = useNavigate()


    const loadCreditsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/v1/users/credits', { headers: { Authorization: `Bearer ${accessToken}`} })
            

            if ( data.success ) {
                // console.log(data)
                setCredit(data.data.credits)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/v1/images/generate', { prompt }, { headers: { Authorization: `Bearer ${accessToken}`} });

            if ( data.success ) {
                console.log(data)
                await loadCreditsData()
                return data.data.image
            } else {
                toast.error(data.data.message)
                await loadCreditsData()
                if ( data.data.creditBalance === 0 ) {
                    navigate('/buy')
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const logout = () => {
        localStorage.removeItem('accessToken')
        setAccessToken(null)
        setUser(null)
    }


    useEffect(() => {
        if (accessToken) {
            loadCreditsData()
        }
    }, [accessToken])

    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl, accessToken, setAccessToken, refreshToken, setRefreshToken, credit, setCredit, loadCreditsData, logout, generateImage
    }

    return (
        <AppContext.Provider value={value}>
            { props.children }
        </AppContext.Provider>
    )
}

export default AppContextProvider;