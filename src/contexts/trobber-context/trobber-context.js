import React, { useState } from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const TrobberContext = React.createContext({}); 


export default function TrobberContextProvider({ children }) {
    
    const [trobber, settrobber] = useState(<div style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        display: 'flex',
                                                        flex: 1,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        background: '#212121',
                                                    }} > 
                                                        <Loader 
                                                            type="Bars"
                                                            color="#1A237E"
                                                            height={100}
                                                            width={100}/> 
                                                    </div>)
    const [isTrobber, setisTrobber] = useState(false);
     
    return(
        <TrobberContext.Provider value={{
           trobber, isTrobber, setisTrobber, settrobber
        }}>
            { children }
        </TrobberContext.Provider>
    )
};

