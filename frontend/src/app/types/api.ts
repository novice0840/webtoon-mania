export interface CommonResponseDTO<T = unknown> {
  status: number;
  message: string;
  data: T;
}
