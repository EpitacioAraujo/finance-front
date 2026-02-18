import Swal from "sweetalert2";

/**
 * Configuração global do SweetAlert2
 * Função simples sem verificações de typeof window
 */
export function setupSwalConfig() {
  // Configurar comportamento padrão
  Swal.mixin({
    allowOutsideClick: true,
    allowEscapeKey: true,
    buttonsStyling: true,
  });
}
