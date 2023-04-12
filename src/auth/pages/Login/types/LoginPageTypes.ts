export type TActiveState = 'login' | 'register';
export interface IRegisterComponent {
    setActive: (active: 'login' | 'register') => void
}
