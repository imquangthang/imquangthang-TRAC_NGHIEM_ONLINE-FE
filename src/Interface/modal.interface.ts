export interface ModalUpdateUserProps {
  idUser: number;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  gender?: number;
  open: boolean;
  onClose: () => void;
  title?: string;
}
