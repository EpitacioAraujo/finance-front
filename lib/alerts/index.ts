import Swal from "sweetalert2";

/**
 * Alerta de sucesso
 */
export function alertSuccess(
  title: string = "Sucesso!",
  message: string = "Operação realizada com sucesso.",
) {
  return Swal.fire({
    icon: "success",
    title,
    text: message,
    confirmButtonText: "OK",
    confirmButtonColor: "#10b981",
    didClose: () => {
      // Callback opcional após fechar
    },
  });
}

/**
 * Alerta de erro
 */
export function alertError(
  title: string = "Erro!",
  message: string = "Ocorreu um erro ao processar a solicitação.",
) {
  return Swal.fire({
    icon: "error",
    title,
    text: message,
    confirmButtonText: "OK",
    confirmButtonColor: "#ef4444",
  });
}

/**
 * Alerta de confirmação
 */
export function alertConfirm(
  title: string = "Confirmação",
  message: string = "Tem certeza?",
  confirmText: string = "Confirmar",
  cancelText: string = "Cancelar",
): Promise<boolean> {
  return Swal.fire({
    icon: "warning",
    title,
    text: message,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: "#3b82f6",
    cancelButtonColor: "#6b7280",
  }).then((result) => result.isConfirmed);
}

/**
 * Alerta de loading
 */
export function alertLoading(
  title: string = "Processando...",
  message: string = "Por favor aguarde.",
) {
  return Swal.fire({
    title,
    html: message,
    icon: "info",
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: (modal) => {
      Swal.showLoading();
    },
  });
}

/**
 * Fechar alerta de loading
 */
export function closeLoading() {
  return Swal.close();
}

/**
 * Alerta informativo
 */
export function alertInfo(
  title: string = "Informação",
  message: string = "Operação concluída.",
) {
  return Swal.fire({
    icon: "info",
    title,
    text: message,
    confirmButtonText: "OK",
    confirmButtonColor: "#3b82f6",
  });
}
