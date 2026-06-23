export type Pet = {
  id: number;
  titulo: string;
  descricao: string;
  fotoUri: string;
  latitude: number;
  longitude: number;
  endereco?: string;
  status: "perdido" | "encontrado";
};
