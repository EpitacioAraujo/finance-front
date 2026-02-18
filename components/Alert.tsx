'use client';

import Swal from 'sweetalert2';

/**
 * Componente de Alerta Swal2
 * Use este para consistência em toda a aplicação
 */
export const Alert = {
  /**
   * Alerta de sucesso
   * @example Alert.success('Sucesso!', 'Operação concluída.')
   */
  success: (title: string, message: string) => {
    return Swal.fire({
      icon: 'success',
      title,
      text: message,
      confirmButtonText: 'OK',
      confirmButtonColor: '#10b981',
    });
  },

  /**
   * Alerta de erro
   * @example Alert.error('Erro!', 'Algo deu errado.')
   */
  error: (title: string, message: string) => {
    return Swal.fire({
      icon: 'error',
      title,
      text: message,
      confirmButtonText: 'OK',
      confirmButtonColor: '#ef4444',
    });
  },

  /**
   * Alerta de confirmação
   * @example if (await Alert.confirm('Deletar?', 'Tem certeza?')) { ... }
   */
  confirm: async (title: string, message: string, confirmText = 'Confirmar', cancelText = 'Cancelar') => {
    const result = await Swal.fire({
      icon: 'warning',
      title,
      text: message,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
    });
    return result.isConfirmed;
  },

  /**
   * Alerta com loading
   * @example Alert.loading('Processando...', 'Por favor aguarde.')
   */
  loading: (title: string, message: string) => {
    return Swal.fire({
      title,
      html: message,
      icon: 'info',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  },

  /**
   * Fechar alerta de loading
   * @example Alert.close()
   */
  close: () => {
    return Swal.close();
  },

  /**
   * Alerta informativo
   * @example Alert.info('Info', 'Operação concluída.')
   */
  info: (title: string, message: string) => {
    return Swal.fire({
      icon: 'info',
      title,
      text: message,
      confirmButtonText: 'OK',
      confirmButtonColor: '#3b82f6',
    });
  },

  /**
   * Alerta de aviso
   * @example Alert.warning('Aviso!', 'Cuidado com esta ação.')
   */
  warning: (title: string, message: string) => {
    return Swal.fire({
      icon: 'warning',
      title,
      text: message,
      confirmButtonText: 'OK',
      confirmButtonColor: '#f59e0b',
    });
  },
};
