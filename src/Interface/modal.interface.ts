export interface ModalUpdateUserProps {
  idUser: number;
  open: boolean;
  onClose: () => void;
  title?: string;
}
