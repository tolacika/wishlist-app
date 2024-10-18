
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

type ModalButtonsProps = {
  submitText: string;
  closeText?: string;
  onClose: () => void;
}

export const ModalButtons = ({ submitText, closeText = "Cancel", onClose }: ModalButtonsProps) => {
  return (
    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
      <button
        type="submit"
        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-span-2 sm:w-auto"
      >
        {submitText}
      </button>
      <button
        onClick={onClose}
        type="button"
        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-span-2 sm:w-auto"
      >
        {closeText}
      </button>
    </div>
  );
};

const Modal = ({isOpen, onClose, children}: ModalProps) => {

  return(
    // Modal Wrapper
    <div className={`${isOpen ? 'block' : 'hidden'} fixed z-10 inset-0 overflow-y-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center ">
        {/* Background Overlay */}
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" aria-hidden="true"
        />

        {/* Modal Content */}
        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full mt-12">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;