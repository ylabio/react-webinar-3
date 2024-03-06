import React,{useContext, useState} from "react";

export const ModalContext = React.createContext();

export const useModal = () => {
    return useContext(ModalContext);
}

export const ModalProvider = ({children}) => {
    const [visible,setVisible] = useState(false);
    
    const onModalVisible = () => {
        setVisible(!visible);
      }

    return (
        <ModalContext.Provider value = {{
            visible,
            onModalVisible
        }}>
            {children}
        </ModalContext.Provider>
    )
}