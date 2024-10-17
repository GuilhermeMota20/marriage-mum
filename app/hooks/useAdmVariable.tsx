import { create } from "zustand";

interface DataProps {
  isLogged: boolean;
};

interface AdmVariables {
  dataAdm?: DataProps;
  setDataAdm: (dataAdm: DataProps) => void;
};

const useAdmVariables = create<AdmVariables>((set) => ({
  dataAdm: undefined,
  setDataAdm: (dataAdm: DataProps) => set({ dataAdm }),
}));

export default useAdmVariables;