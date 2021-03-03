import React, { useState } from 'react';
import ModalAlert from '../../componenst/modal-alert';

export const AlertContext = React.createContext({});

export default function AlertContextProvider({ children }) {
    
    const [isAlert, setisAlert] = useState(false);
    const [alert, setalert] = useState({})

    const getAlert = () => {
        return <ModalAlert title={alert.title} description={alert.description} setisAlert={setisAlert} />
    }
    
    

    return(
        <AlertContext.Provider value={{
            isAlert, getAlert, setalert, setisAlert
        }}>
            { children }
        </AlertContext.Provider>
    )
};

