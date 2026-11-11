"use client";

import { useEffect } from 'react';
// import { useRouter } from "next/navigation";
import css from './Modal.module.css'

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal ({ onClose, children }: ModalProps) {

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
	  const handleKeyDown = (e: KeyboardEvent) => {
	    if (e.key === "Escape") {
	      onClose();
	    }
	  };
	
	  document.addEventListener("keydown", handleKeyDown);

	  return () => {
	    document.removeEventListener("keydown", handleKeyDown);
	  };
	}, [onClose]);

    useEffect(() => {
      document.body.style.overflow = "hidden";
	
	    return () => {
        document.body.style.overflow = "";
	    };
	  }, []);

  return (
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        {children}
      </div>
    </div>
  );
}

// "use client";

// import { useEffect } from 'react';
// import css from './Modal.module.css'

// import { useRouter } from "next/navigation";

// interface ModalProps {
//     children: React.ReactNode;
// }

// const Modal = ({ children }: ModalProps) => {
//   const router = useRouter();
  
//   const close = () => router.back();

//   const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
//     if (event.target === event.currentTarget) {
//       close();
//     }
//   };

//   useEffect(() => {
// 	  const handleKeyDown = (e: KeyboardEvent) => {
// 	    if (e.key === "Escape") {
// 	      close();
// 	    }
// 	  };

//     document.addEventListener("keydown", handleKeyDown);
	
// 	  return () => {
// 	    document.removeEventListener("keydown", handleKeyDown);
// 	  };
// 	}, []);

//    useEffect(() => {
//     document.body.style.overflow = "hidden";

//   	  return () => {
//         document.body.style.overflow = "";
// 	  };
// 	}, []);

//   return (
//     <div
//     className={css.backdrop}
//       onClick={handleBackdropClick}
//       role="dialog"
//       aria-modal="true">
//       <div className={css.modal}>
//         {children}
//         <button onClick={close}>Close</button>
//       </div>
//     </div>
//   );

// };

// export default Modal;


