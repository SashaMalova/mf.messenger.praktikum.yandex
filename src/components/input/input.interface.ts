export interface InputProps {
    profileData?: string;
    nameField: string;
    type: string;
    nameInput: string;
    idError: string;
    validation?: ((value: string) => string | null)[];
}