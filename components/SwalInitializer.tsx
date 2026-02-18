'use client';

import { useEffect } from 'react';

/**
 * Componente que inicializa o SweetAlert2 no cliente
 * Pode ser colocado em qualquer lugar da aplicação (recomendado: próximo ao root)
 */
export function SwalInitializer() {
  useEffect(() => {
    // SweetAlert2 já vem configurado com padrões decentes
    // Qualquer configuração adicional pode ir aqui
  }, []);

  return null;
}
