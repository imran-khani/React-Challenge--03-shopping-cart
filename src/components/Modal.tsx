'use client';

import { useCallback, useEffect, useState } from "react";


interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string | null;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    disabled,

}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300)
    }, [onClose, disabled]);


    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                className="fixed inset-0 z-50 flex justify-center items-center bg-neutral-800/70 overflow-y-auto overflow-x-hidden"
            >
                <div
                    className="relative w-full h-full md:w-4/6 lg:w-3/6 xl:w-2/5 lg:h-auto md:h-auto"
                >
                    <div
                        className={
                            `
                        translate
                        duration-300
                        h-full
                        ${showModal ? 'translate-y-0' : 'translate-y-full'}
                        ${showModal ? 'opacity-100' : 'opacity-0'}
                        `
                        }
                    >
                        <div className="bg-white p-4 rounded-md ">
                            <span onClick={handleClose}>X</span>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Modal;