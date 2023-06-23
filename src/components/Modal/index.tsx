import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  children: any;
  onHandleOpenModal: () => void
  isOpenModal: boolean;
}

function Modal({children, isOpenModal,onHandleOpenModal}: ModalProps){

  const [modalStatus, setModalStatus] = useState<boolean>(isOpenModal)

  useEffect(()=> {
    if(modalStatus !== isOpenModal){
      setModalStatus(isOpenModal)
    }
  },[isOpenModal, modalStatus])


    return (
      <ReactModal
        shouldCloseOnOverlayClick={!false}
        onRequestClose={onHandleOpenModal}
        isOpen={modalStatus}
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#F0F0F5',
            color: '#000000',
            borderRadius: '8px',
            width: '736px',
            border: 'none',
          },
          overlay: {
            backgroundColor: '#121214e6',
          },
        }}
      >
        {children}
      </ReactModal>
    );
  
};

export default Modal;
